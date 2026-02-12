import type { Application } from "@/types/database";
import type { Program } from "@/types";
import * as XLSX from "xlsx";

const statusLabels: Record<string, string> = {
  nueva: "Nueva",
  en_revision: "En Revisión",
  documentos_pendientes: "Documentos Pendientes",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
};

function buildRows(applications: Application[], programs: Program[]) {
  return applications.map((app) => ({
    Nombre: app.nombre,
    Email: app.email,
    Teléfono: app.telefono,
    CURP: app.curp,
    Preparatoria: app.preparatoria,
    Domicilio: app.direccion,
    Programa:
      programs.find((p) => p.slug === app.programa_id)?.shortName ??
      app.programa_id,
    Estado: statusLabels[app.status] ?? app.status,
    "Cómo se enteró": app.como_se_entero ?? "",
    "Fecha de solicitud": new Date(app.created_at).toLocaleDateString("es-MX"),
  }));
}

export function exportApplicationsCSV(
  applications: Application[],
  programs: Program[]
) {
  const rows = buildRows(applications, programs);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Solicitudes");
  XLSX.writeFile(workbook, `solicitudes-ufn-${Date.now()}.csv`, {
    bookType: "csv",
  });
}

export function exportApplicationsXLSX(
  applications: Application[],
  programs: Program[]
) {
  const rows = buildRows(applications, programs);
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns
  const colWidths = Object.keys(rows[0] ?? {}).map((key) => ({
    wch: Math.max(
      key.length,
      ...rows.map((r) => String((r as Record<string, string>)[key] ?? "").length)
    ) + 2,
  }));
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Solicitudes");
  XLSX.writeFile(workbook, `solicitudes-ufn-${Date.now()}.xlsx`);
}
