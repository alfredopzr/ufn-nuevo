export type ApplicationStatus =
  | "nueva"
  | "en_revision"
  | "documentos_pendientes"
  | "aceptada"
  | "rechazada";

export type DocumentEstado =
  | "pendiente"
  | "subido"
  | "recibido_externo"
  | "aprobado"
  | "rechazado";

export type CommunicationTipo = "email" | "nota_interna";

export interface Application {
  id: string;
  status: ApplicationStatus;
  nombre: string;
  email: string;
  telefono: string;
  curp: string;
  preparatoria: string;
  direccion: string;
  programa_id: string;
  como_se_entero: string | null;
  notas_internas: string | null;
  student_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface RequiredDocument {
  id: string;
  nombre: string;
  descripcion: string | null;
  obligatorio: boolean;
  activo: boolean;
  created_at: string;
}

export interface ApplicationDocument {
  id: string;
  application_id: string;
  document_id: string;
  estado: DocumentEstado;
  archivo_url: string | null;
  notas: string | null;
  updated_at: string;
}

export interface Communication {
  id: string;
  application_id: string;
  tipo: CommunicationTipo;
  asunto: string;
  mensaje: string;
  enviado_por: string;
  created_at: string;
}

// Joined types for admin views
export interface ApplicationWithDocuments extends Application {
  application_documents: (ApplicationDocument & {
    required_document: RequiredDocument;
  })[];
}

export interface ApplicationWithAll extends ApplicationWithDocuments {
  communications: Communication[];
}

export interface Noticia {
  id: string;
  titulo: string;
  slug: string;
  fecha: string;
  extracto: string;
  categoria: string;
  contenido: string;
  publicado: boolean;
  created_at: string;
  updated_at: string;
}

export interface FechaImportante {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string | null;
  activo: boolean;
  created_at: string;
}

export interface NoticiaEnvio {
  id: string;
  noticia_id: string;
  filtros: { programa?: string; status?: string };
  total_destinatarios: number;
  enviado_por: string;
  created_at: string;
}

// ── Students ──────────────────────────────────────────────

export type StudentStatus = "activo" | "egresado" | "baja";

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

// ── Targeted Messaging ────────────────────────────────────

export type MessageTipo = "email" | "whatsapp_list";
export type MessageAudiencia = "estudiantes" | "aplicantes";

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

