"use client";

import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import type { Application, Communication } from "@/types/database";

interface DocumentRecord {
  id: string;
  estado: string;
  notas: string | null;
  required_documents: {
    nombre: string;
    obligatorio: boolean;
  };
}

interface Props {
  application: Application;
  programName: string;
  applicationDocs: DocumentRecord[];
  communications: Communication[];
}

export default function ExportPDFButton({
  application,
  programName,
  applicationDocs,
  communications,
}: Props) {
  async function handleExport() {
    // Dynamic import to avoid loading jsPDF on every page load
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header bar
    doc.setFillColor(30, 58, 95); // Dark blue
    doc.rect(0, 0, pageWidth, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("Universidad Frontera Norte", pageWidth / 2, 15, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text("Expediente de Solicitud", pageWidth / 2, 23, {
      align: "center",
    });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    let y = 40;

    // Status badge
    const statusLabels: Record<string, string> = {
      nueva: "Nueva",
      en_revision: "En Revisión",
      documentos_pendientes: "Docs. Pendientes",
      aceptada: "Aceptada",
      rechazada: "Rechazada",
    };

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Información del Solicitante", 14, y);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Status on the right
    const statusText = statusLabels[application.status] ?? application.status;
    doc.text(`Estado: ${statusText}`, pageWidth - 14, y, { align: "right" });

    y += 8;

    // Personal info table
    const personalData = [
      ["Nombre", application.nombre],
      ["Correo", application.email],
      ["Teléfono", application.telefono],
      ["CURP", application.curp],
      ["Preparatoria", application.preparatoria],
      ["Domicilio", application.direccion],
      ["Programa", programName],
      ["Cómo se enteró", application.como_se_entero ?? "—"],
      [
        "Fecha de solicitud",
        new Date(application.created_at).toLocaleDateString("es-MX", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      ],
    ];

    autoTable(doc, {
      startY: y,
      head: [],
      body: personalData,
      theme: "plain",
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 45, textColor: [100, 100, 100] },
        1: { cellWidth: "auto" },
      },
    });

    y = // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any).lastAutoTable.finalY + 12;

    // Documents section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Documentos", 14, y);
    y += 4;

    const estadoLabels: Record<string, string> = {
      pendiente: "Pendiente",
      subido: "Subido",
      recibido_externo: "Recibido Externo",
      aprobado: "Aprobado",
      rechazado: "Rechazado",
    };

    const docData = applicationDocs.map((d) => [
      d.required_documents.nombre,
      d.required_documents.obligatorio ? "Sí" : "No",
      estadoLabels[d.estado] ?? d.estado,
      d.notas ?? "—",
    ]);

    autoTable(doc, {
      startY: y,
      head: [["Documento", "Requerido", "Estado", "Notas"]],
      body: docData,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: {
        fillColor: [30, 58, 95],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    y = // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any).lastAutoTable.finalY + 12;

    // Communications section
    if (communications.length > 0) {
      // Check if we need a new page
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Historial de Comunicación", 14, y);
      y += 4;

      const commData = communications.map((c) => [
        new Date(c.created_at).toLocaleDateString("es-MX", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        c.asunto,
        c.enviado_por,
      ]);

      autoTable(doc, {
        startY: y,
        head: [["Fecha", "Asunto", "Enviado por"]],
        body: commData,
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: {
          fillColor: [30, 58, 95],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
      });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Universidad Frontera Norte — J. B. Chapa 787 y Colón, Centro, Reynosa, Tamaulipas — Generado el ${new Date().toLocaleDateString("es-MX")}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    doc.save(`expediente-${application.nombre.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <FileDown className="mr-2 h-4 w-4" />
      Exportar PDF
    </Button>
  );
}
