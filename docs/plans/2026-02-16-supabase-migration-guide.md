# Supabase Migration Guide — Students & Targeted Messaging

**Date:** 2026-02-16

Run these steps in order after deploying the code changes.

---

## Step 1: Run the SQL Migration

Go to **Supabase Dashboard > SQL Editor** and run the contents of:

```
supabase/migrations/001_add_students_and_messaging.sql
```

This creates:
- 3 new enums: `student_status`, `message_tipo`, `message_audiencia`
- `students` table with RLS (authenticated only)
- `message_sends` table with RLS (authenticated only)
- `student_id` column on `applications` table
- Indexes on students (programa, status, cuatrimestre) and message_sends (audiencia, created_at)
- `updated_at` trigger on students

**Verify after running:**
1. Go to **Table Editor** — you should see `students` and `message_sends` tables
2. Go to **Authentication > Policies** — confirm both tables have "Admins can manage" policies
3. Check `applications` table has the new `student_id` column

---

## Step 2: Verify RLS Policies

For each new table, confirm in **Authentication > Policies**:

| Table | Policy | Target | Using |
|-------|--------|--------|-------|
| `students` | Admins can manage students | ALL | `auth.role() = 'authenticated'` |
| `message_sends` | Admins can manage message sends | ALL | `auth.role() = 'authenticated'` |

---

## Step 3: No Storage Changes Needed

No new buckets or storage policies required for this feature.

---

## Step 4: No Environment Variable Changes

No new environment variables. The existing `RESEND_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` are sufficient.

---

## Step 5: Test the Auto-Conversion

1. Go to an existing application in the admin dashboard
2. Change its status to **Aceptada**
3. Navigate to `/admin/estudiantes` — a new student record should appear with:
   - Matricula format: `UFN-2026-001`
   - Cuatrimestre: 1
   - Status: Activo
   - Same nombre, email, telefono, curp as the application
4. The student detail page should show a "Ver Solicitud" link back to the application

---

## Step 6: Test Messaging

1. Go to `/admin/mensajes`
2. Select the "Estudiantes" tab
3. Set a filter and click "Ver destinatarios"
4. Verify you can check/uncheck recipients and manually add others
5. Compose a message, select Email channel, and send
6. Verify the send appears in the history table
7. Switch to "Lista WhatsApp" channel, generate list, and verify "Copiar números" works

---

## Rollback

If anything goes wrong, run this SQL to undo:

```sql
-- Remove bidirectional link
ALTER TABLE applications DROP COLUMN IF EXISTS student_id;

-- Drop new tables
DROP TABLE IF EXISTS message_sends;
DROP TABLE IF EXISTS students;

-- Drop new enums
DROP TYPE IF EXISTS message_audiencia;
DROP TYPE IF EXISTS message_tipo;
DROP TYPE IF EXISTS student_status;
```
