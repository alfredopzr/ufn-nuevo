/** Centralised status labels, colours, and icons for application & document workflows. */

export const applicationStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  nueva: { label: "Nueva", className: "bg-blue-100 text-blue-800" },
  en_revision: { label: "En Revisión", className: "bg-yellow-100 text-yellow-800" },
  documentos_pendientes: { label: "Docs. Pendientes", className: "bg-orange-100 text-orange-800" },
  aceptada: { label: "Aceptada", className: "bg-green-100 text-green-800" },
  rechazada: { label: "Rechazada", className: "bg-red-100 text-red-800" },
};

export const documentStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  pendiente: { label: "Pendiente", className: "bg-gray-100 text-gray-800" },
  subido: { label: "Subido", className: "bg-blue-100 text-blue-800" },
  recibido_externo: { label: "Recibido", className: "bg-purple-100 text-purple-800" },
  aprobado: { label: "Aprobado", className: "bg-green-100 text-green-800" },
  rechazado: { label: "Rechazado", className: "bg-red-100 text-red-800" },
};

export const studentStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  activo: { label: "Activo", className: "bg-green-100 text-green-800" },
  egresado: { label: "Egresado", className: "bg-blue-100 text-blue-800" },
  baja: { label: "Baja", className: "bg-red-100 text-red-800" },
};

export function getApplicationStatusLabel(status: string): string {
  return applicationStatusConfig[status]?.label ?? status;
}

export function getApplicationStatusClass(status: string): string {
  return applicationStatusConfig[status]?.className ?? "";
}
