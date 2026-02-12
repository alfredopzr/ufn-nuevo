# Admissions System Design — UFN Nuevo

**Date:** 2026-02-12
**Status:** Approved
**Approach:** Full-stack with Supabase (Approach 1)

## Overview

Build an online admissions system that allows applicants to submit applications and documents through the website, and provides university staff with an admin dashboard to manage applications, track documents, and communicate with applicants.

## Context

- Current process is partially digital (some steps via email/WhatsApp, most in-person)
- Expected volume: under 100 applications per semester
- Staff is non-technical — the admin interface must be simple and intuitive
- Document requirements may change over time — system must be flexible

## Architecture

### Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14 (existing) | Applicant form + admin dashboard |
| UI | Tailwind + shadcn/ui (existing) | Consistent with current site |
| Database | Supabase PostgreSQL | Application data, document tracking, communications log |
| Auth | Supabase Auth | Admin login (email/password) |
| File Storage | Supabase Storage | Document uploads (private bucket) |
| Email | Resend | Confirmation emails + staff-composed messages |
| Bulk Export | SheetJS (xlsx) | CSV + XLSX generation |
| PDF Export | jsPDF + jspdf-autotable | Individual application "expediente" |

### New Dependencies

- `@supabase/supabase-js` — Supabase client
- `@supabase/ssr` — Supabase auth helpers for Next.js server components
- `resend` — email API client
- `xlsx` — spreadsheet export
- `jspdf` + `jspdf-autotable` — PDF generation
- `zod` — schema validation for form data

## Data Model

### `applications`

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | Auto-generated |
| status | enum | `nueva`, `en_revision`, `documentos_pendientes`, `aceptada`, `rechazada` |
| nombre | text | Full name |
| email | text | |
| telefono | text | For WhatsApp contact |
| curp | text | Unique national ID |
| preparatoria | text | High school name |
| direccion | text | Address |
| programa_id | text | Program slug (matches existing `programs.ts` data) |
| como_se_entero | text | Referral source |
| notas_internas | text (nullable) | Staff-only notes |
| created_at | timestamp | Submission date |
| updated_at | timestamp | Last modified |

### `required_documents`

Configurable list of documents required for admission. Staff can add/remove types over time.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| nombre | text | e.g., "INE", "Certificado de preparatoria" |
| descripcion | text (nullable) | Instructions for the applicant |
| obligatorio | boolean | Required or optional |
| activo | boolean | Soft-delete — deactivate without removing |

### `application_documents`

Per-application document checklist. Tracks what has been submitted and through which medium.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| application_id | FK → applications | |
| document_id | FK → required_documents | |
| estado | enum | `pendiente`, `subido`, `recibido_externo`, `aprobado`, `rechazado` |
| archivo_url | text (nullable) | Supabase Storage URL (null if handed in physically) |
| notas | text (nullable) | e.g., "Entregado en oficina el 15 de marzo" |
| updated_at | timestamp | |

### `communications`

Log of all official messages sent to applicants.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| application_id | FK → applications | |
| tipo | enum | `email`, `nota_interna` |
| asunto | text | Subject line |
| mensaje | text | Body content |
| enviado_por | text | Staff member name/email |
| created_at | timestamp | |

## Applicant-Facing Flow

Multi-step form at `/inscripcion` (replaces existing `EnrollmentForm`):

### Step 1: Personal Information
- nombre, email, telefono, CURP, preparatoria, direccion, como_se_entero
- Program selection (from existing programs data)
- Client-side + server-side validation (Zod)
- CURP format validation

### Step 2: Document Upload
- Fetches active `required_documents` from Supabase
- File upload input per document (PDF, JPG, PNG — max 5MB each)
- Optional documents clearly marked
- Applicants can skip uploads — creates entries with status `pendiente`

### Step 3: Review & Submit
- Summary of all entered info and uploaded documents
- Clear indication of missing documents
- Submit → writes to Supabase, uploads files to Storage
- Confirmation screen: "Tu solicitud ha sido recibida. Te contactaremos por correo electrónico con los siguientes pasos."

### Post-Submission
- Automatic confirmation email via Resend (summary + missing documents list)
- Application appears in admin dashboard with status `nueva`

### Explicitly NOT building:
- No applicant login/portal (submit once, get contacted)
- No payment processing
- No application editing after submission

## Admin Dashboard

Protected by Supabase Auth at `/admin`. Email/password login only — accounts created manually in Supabase dashboard. Single role, no permission levels.

### Applications List (`/admin`)
- Table of all applications, sorted by newest first
- Columns: nombre, programa, fecha, status (color-coded badge)
- Filter by: status, programa
- Search by: nombre, CURP, email
- Clickable rows → detail view

### Application Detail (`/admin/aplicaciones/[id]`)

**Sections:**

1. **Applicant Info** — all personal data. Phone number as clickable WhatsApp link (`https://wa.me/52...`).
2. **Status** — dropdown to change status (nueva → en_revision → aceptada/rechazada/documentos_pendientes). Immediate save.
3. **Document Checklist** — table of required documents with status per document. Staff can:
   - View/download uploaded file
   - Change status: pendiente → recibido_externo / aprobado / rechazado
   - Add notes per document
4. **Internal Notes** — free-text field for staff notes about this applicant
5. **Communication** — compose and send email (subject + body). View log of all previous messages sent.

### Email Templates
Pre-filled templates staff can select and edit before sending:
- "Documentos pendientes" — lists missing documents
- "Solicitud aceptada" — congratulations + next steps
- "Solicitud rechazada" — respectful decline with reason field

### Export

| Format | Scope | Use case |
|---|---|---|
| CSV | Bulk (all/filtered applications) | Data analysis, import into other tools |
| XLSX | Bulk (all/filtered applications) | Formatted nicely for Excel users |
| PDF | Single application | Printable "expediente" with university branding |

### Explicitly NOT building:
- No bulk actions
- No analytics/reporting dashboards
- No document upload from admin side (staff marks as received externally)
- No multi-user permissions or audit trail beyond communications log

## Email System

### Provider: Resend
- Free tier: 100 emails/day (sufficient for volume)
- Branded sender: `admisiones@ufn.edu.mx` (requires DNS verification)

### Automatic Emails
- **Submission confirmation** — sent on form submit. Contains: thank you, summary, list of missing documents, "we'll contact you" message.

### Manual Emails (from admin panel)
- Staff composes subject + body in application detail view
- Sent via Resend, logged in `communications` table
- Pre-filled templates available as starting points

### WhatsApp
- No integration — clickable `wa.me` link in admin detail view
- Staff handles WhatsApp on their own device

## Security

### File Storage
- Private Supabase Storage bucket (`application-documents`)
- Path structure: `/{application_id}/{document_id}/{filename}`
- Access via signed URLs (time-limited, generated on demand for admin users)
- Max 5MB per file, accepted formats: PDF, JPG, PNG
- MIME type verification on upload

### Row-Level Security (RLS)

| Table | Anonymous | Authenticated (admin) |
|---|---|---|
| applications | INSERT | SELECT, UPDATE |
| required_documents | SELECT | SELECT, INSERT, UPDATE, DELETE |
| application_documents | INSERT | SELECT, UPDATE |
| communications | — | ALL |

### Form Protection
- Rate limiting: max 5 submissions per IP per hour
- Server-side validation of all fields (Zod schemas)
- CURP format validation
- File MIME type verification

### Explicitly NOT building:
- No encryption beyond Supabase defaults
- No CAPTCHA (rate limiting sufficient at this volume; can add later)
