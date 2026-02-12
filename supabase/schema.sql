-- ============================================================
-- UFN Admissions System — Database Schema
-- Run this in the Supabase SQL Editor to set up the database.
-- ============================================================

-- ── Enums ───────────────────────────────────────────────────

CREATE TYPE application_status AS ENUM (
  'nueva',
  'en_revision',
  'documentos_pendientes',
  'aceptada',
  'rechazada'
);

CREATE TYPE document_estado AS ENUM (
  'pendiente',
  'subido',
  'recibido_externo',
  'aprobado',
  'rechazado'
);

CREATE TYPE communication_tipo AS ENUM (
  'email',
  'nota_interna'
);

-- ── Tables ──────────────────────────────────────────────────

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status application_status NOT NULL DEFAULT 'nueva',
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  curp TEXT NOT NULL,
  preparatoria TEXT NOT NULL,
  direccion TEXT NOT NULL,
  programa_id TEXT NOT NULL,
  como_se_entero TEXT,
  notas_internas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE required_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  obligatorio BOOLEAN NOT NULL DEFAULT true,
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES required_documents(id) ON DELETE CASCADE,
  estado document_estado NOT NULL DEFAULT 'pendiente',
  archivo_url TEXT,
  notas TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  tipo communication_tipo NOT NULL DEFAULT 'email',
  asunto TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  enviado_por TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Indexes ─────────────────────────────────────────────────

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_programa ON applications(programa_id);
CREATE INDEX idx_applications_created ON applications(created_at DESC);
CREATE INDEX idx_application_documents_app ON application_documents(application_id);
CREATE INDEX idx_communications_app ON communications(application_id);

-- ── Updated_at trigger ──────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER application_documents_updated_at
  BEFORE UPDATE ON application_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row-Level Security ──────────────────────────────────────

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE required_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

-- Applications: anonymous can INSERT, authenticated can SELECT/UPDATE
CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view applications"
  ON applications FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update applications"
  ON applications FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Required documents: anyone can SELECT active docs, admins can manage
CREATE POLICY "Anyone can view active documents"
  ON required_documents FOR SELECT
  USING (activo = true);

CREATE POLICY "Admins can view all documents"
  ON required_documents FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert documents"
  ON required_documents FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update documents"
  ON required_documents FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete documents"
  ON required_documents FOR DELETE
  USING (auth.role() = 'authenticated');

-- Application documents: anonymous can INSERT, admins can SELECT/UPDATE
CREATE POLICY "Anyone can submit document records"
  ON application_documents FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view document records"
  ON application_documents FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update document records"
  ON application_documents FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Communications: admins only
CREATE POLICY "Admins can manage communications"
  ON communications FOR ALL
  USING (auth.role() = 'authenticated');

-- ── Seed: initial required documents ────────────────────────

INSERT INTO required_documents (nombre, descripcion, obligatorio) VALUES
  ('INE o identificación oficial', 'Copia legible de tu credencial de elector (INE) o pasaporte vigente.', true),
  ('Certificado de preparatoria', 'Copia del certificado de estudios de nivel medio superior.', true);

-- ── Storage bucket ──────────────────────────────────────────
-- Run this separately or via the Supabase dashboard:
-- 1. Create a private bucket named "application-documents"
-- 2. Set max file size to 5MB
-- 3. Allowed MIME types: application/pdf, image/jpeg, image/png
