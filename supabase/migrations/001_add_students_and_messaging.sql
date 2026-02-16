-- ============================================================
-- Migration: Add students table, message_sends table, and
-- student_id column on applications.
-- Run this in the Supabase SQL Editor on an existing database.
-- ============================================================

-- ── New enums ─────────────────────────────────────────────

CREATE TYPE student_status AS ENUM ('activo', 'egresado', 'baja');
CREATE TYPE message_tipo AS ENUM ('email', 'whatsapp_list');
CREATE TYPE message_audiencia AS ENUM ('estudiantes', 'aplicantes');

-- ── Students table ────────────────────────────────────────

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
  application_id  UUID UNIQUE REFERENCES applications(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_students_programa ON students(programa_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_cuatrimestre ON students(cuatrimestre);

CREATE TRIGGER students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage students"
  ON students FOR ALL
  USING (auth.role() = 'authenticated');

-- ── Bidirectional link on applications ────────────────────

ALTER TABLE applications ADD COLUMN student_id UUID UNIQUE REFERENCES students(id);

-- ── Message sends table ───────────────────────────────────

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
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_message_sends_audiencia ON message_sends(audiencia);
CREATE INDEX idx_message_sends_created ON message_sends(created_at DESC);

ALTER TABLE message_sends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage message sends"
  ON message_sends FOR ALL
  USING (auth.role() = 'authenticated');
