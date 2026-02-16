# Students Table & Targeted Messaging — Design Document

**Date:** 2026-02-16
**Status:** Approved
**Approach:** Separate students table with linking (Approach A)

---

## Overview

Expand the platform with a `students` table that links to accepted applications (or stands alone for manual entries), an admin UI for student management, and a targeted messaging system that lets admins send emails or generate WhatsApp lists for filtered subsets of students and applicants.

---

## 1. Database Schema

### New table: `students`

```sql
CREATE TYPE student_status AS ENUM ('activo', 'egresado', 'baja');

CREATE TABLE students (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matricula       TEXT UNIQUE NOT NULL,
  nombre          TEXT NOT NULL,
  email           TEXT NOT NULL,
  telefono        TEXT NOT NULL,
  curp            TEXT,
  programa_id     TEXT NOT NULL,
  cuatrimestre    INTEGER NOT NULL CHECK (cuatrimestre BETWEEN 1 AND 9),
  status          student_status NOT NULL DEFAULT 'activo',
  fecha_ingreso   DATE NOT NULL,
  application_id  UUID REFERENCES applications(id) UNIQUE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_students_programa ON students(programa_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_cuatrimestre ON students(cuatrimestre);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth full access" ON students FOR ALL USING (auth.role() = 'authenticated');
```

### Altered table: `applications`

```sql
ALTER TABLE applications ADD COLUMN student_id UUID REFERENCES students(id) UNIQUE;
```

Bidirectional linking: `applications.student_id` ↔ `students.application_id`.

### New table: `message_sends`

```sql
CREATE TYPE message_tipo AS ENUM ('email', 'whatsapp_list');
CREATE TYPE message_audiencia AS ENUM ('estudiantes', 'aplicantes');

CREATE TABLE message_sends (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo                message_tipo NOT NULL,
  audiencia           message_audiencia NOT NULL,
  filtros             JSONB NOT NULL DEFAULT '{}',
  asunto              TEXT NOT NULL,
  mensaje             TEXT NOT NULL,
  total_destinatarios INTEGER NOT NULL,
  enviado_por         TEXT NOT NULL,
  noticia_id          UUID REFERENCES noticias(id),
  fecha_id            UUID REFERENCES fechas_importantes(id),
  created_at          TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE message_sends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth full access" ON message_sends FOR ALL USING (auth.role() = 'authenticated');
```

---

## 2. Auto-Conversion: Application → Student

Triggered in the `updateApplicationStatus` server action when status changes to `aceptada`:

1. Check if a student already exists for this application (idempotency).
2. If not, create a student record:
   - Copy nombre, email, telefono, curp, programa_id from application.
   - Set cuatrimestre = 1, status = activo, fecha_ingreso = today.
   - Generate matricula: `UFN-{YYYY}-{NNN}` (zero-padded sequential per year).
3. Link bidirectionally: set `applications.student_id` and `students.application_id`.

If status changes FROM `aceptada` to something else: do NOT delete the student record. Admin can manually set student status to `baja` if needed.

### Matricula generation

Format: `UFN-{YYYY}-{NNN}`. Query count of existing matriculas for the year to get next number. Unique constraint handles race conditions at this scale.

---

## 3. Admin UI — Student Management

### Route: `/admin/estudiantes`

**List view:**
- Search: nombre, matricula, CURP, email (ilike)
- Filters: programa (dropdown), cuatrimestre (1-9), status (activo/egresado/baja)
- Table columns: Matricula, Nombre, Programa, Cuatrimestre, Status, Fecha Ingreso
- Color-coded status badges: green=activo, blue=egresado, red=baja
- Export: CSV, XLSX (reuse existing export pattern)
- "Agregar Estudiante" button → modal form

**Manual entry modal:**
- Fields: nombre, email, telefono, curp, programa_id, cuatrimestre, fecha_ingreso
- Matricula auto-generated on save
- Zod validation
- application_id = null

### Route: `/admin/estudiantes/[id]`

**Detail view:**
- StudentInfo: all fields, editable (cuatrimestre, status, contact info)
- Linked application: link to `/admin/aplicaciones/[application_id]` if exists
- WhatsApp link: direct chat link (existing pattern)

### Navigation

Add "Estudiantes" and "Mensajes" links to AdminNav.

---

## 4. Targeted Messaging — `/admin/mensajes`

### Layout

Two tabs: **"Estudiantes"** | **"Aplicantes"**

Each tab has: Audience Builder → Recipient List → Compose Area → Send History.

### Audience Builder — Students Tab

Filters:
- Programa: dropdown (6 programs + "Todos")
- Cuatrimestre: dropdown (1-9 + "Todos")
- Status: dropdown (activo/egresado/baja + "Todos")

### Audience Builder — Applicants Tab

Filters:
- Programa: dropdown
- Status: dropdown (nueva, en_revision, documentos_pendientes, aceptada, rechazada)
- Documentos pendientes: checkbox (applicants missing at least one required document)

### Recipient List (both tabs)

After setting filters, the admin clicks **"Ver destinatarios"** to expand a full checkboxed list:

- All filter matches are pre-selected
- Each row: checkbox, nombre, email, programa, status/cuatrimestre
- **Deselect** anyone to exclude
- **Search within list** to find specific people
- **"Agregar destinatario"** search box: queries ALL students/applicants (regardless of filters) to manually add anyone
- Live count updates with every check/uncheck
- Final send uses the explicit list of selected IDs, not filters

### Compose Area

- **Source selector** (optional): "Vincular a noticia" or "Vincular a fecha importante" — auto-fills subject + template body
- **Asunto**: text input
- **Mensaje**: textarea (converted to branded HTML email using shared template)
- **Channel toggle**:
  - **Email**: sends via Resend in batches of 50
  - **Lista WhatsApp**: displays names + phone numbers with "Copiar números" button for manual WhatsApp broadcast

### Send History

Table of past sends from `message_sends`:
- Date, Audiencia (badge), Asunto, Filters summary, Total recipients, Channel
- Filtered to active tab

### Server Actions

```
getStudentRecipientCount(filters)
getApplicantRecipientCount(filters)
getStudentRecipients(filters)          → {id, nombre, email, telefono, programa, cuatrimestre, status}[]
getApplicantRecipients(filters)        → {id, nombre, email, telefono, programa, status, missing_docs}[]
searchStudents(query)                  → for manual add
searchApplicants(query)                → for manual add
sendTargetedEmail(audiencia, ids[], asunto, mensaje, filtros, noticia_id?, fecha_id?)
getWhatsAppList(audiencia, ids[])      → {nombre, telefono}[]
getMessageHistory(audiencia)           → paginated
```

---

## 5. Email Template

New generic template: `buildTargetedEmail(asunto, mensaje, ctaUrl?, ctaLabel?)`.
Same branded header/footer as `buildNoticiaEmail`. When linked to a noticia or fecha, the CTA button points to the relevant public page.

---

## 6. Integration Points

- **Existing `noticia_envios`**: kept as-is. The noticias page's SendNoticiaEmailDialog continues to work as a quick-send shortcut.
- **Existing `SendNoticiaEmailDialog`**: unchanged. `/admin/mensajes` is the full-featured alternative.
- **Existing `updateApplicationStatus`**: extended with auto-conversion logic.

---

## 7. Types

```typescript
export type StudentStatus = "activo" | "egresado" | "baja";
export type MessageTipo = "email" | "whatsapp_list";
export type MessageAudiencia = "estudiantes" | "aplicantes";

export interface Student {
  id: string;
  matricula: string;
  nombre: string;
  email: string;
  telefono: string;
  curp: string | null;
  programa_id: string;
  cuatrimestre: number;
  status: StudentStatus;
  fecha_ingreso: string;
  application_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface MessageSend {
  id: string;
  tipo: MessageTipo;
  audiencia: MessageAudiencia;
  filtros: Record<string, unknown>;
  asunto: string;
  mensaje: string;
  total_destinatarios: number;
  enviado_por: string;
  noticia_id: string | null;
  fecha_id: string | null;
  created_at: string;
}
```
