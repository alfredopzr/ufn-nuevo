"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DocumentEstado } from "@/types/database";
import { updateDocumentStatus } from "@/app/admin/(dashboard)/aplicaciones/[id]/actions";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Loader2,
  Save,
} from "lucide-react";

const estadoLabels: Record<DocumentEstado, string> = {
  pendiente: "Pendiente",
  subido: "Subido",
  recibido_externo: "Recibido Externo",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

const estadoColors: Record<DocumentEstado, string> = {
  pendiente: "bg-gray-100 text-gray-800",
  subido: "bg-blue-100 text-blue-800",
  recibido_externo: "bg-purple-100 text-purple-800",
  aprobado: "bg-green-100 text-green-800",
  rechazado: "bg-red-100 text-red-800",
};

interface DocumentRecord {
  id: string;
  application_id: string;
  document_id: string;
  estado: DocumentEstado;
  archivo_url: string | null;
  notas: string | null;
  updated_at: string;
  required_documents: {
    id: string;
    nombre: string;
    descripcion: string | null;
    obligatorio: boolean;
  };
}

interface Props {
  documents: DocumentRecord[];
}

export default function DocumentChecklist({ documents }: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 space-y-4">
      <h2 className="font-semibold text-lg">Documentos</h2>

      <div className="space-y-3">
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay documentos registrados.
          </p>
        ) : (
          documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))
        )}
      </div>
    </div>
  );
}

function DocumentRow({ doc }: { doc: DocumentRecord }) {
  const [estado, setEstado] = useState(doc.estado);
  const [notas, setNotas] = useState(doc.notas ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const hasChanges = estado !== doc.estado || notas !== (doc.notas ?? "");

  async function handleSave() {
    setIsSaving(true);
    await updateDocumentStatus(doc.id, estado, notas);
    setIsSaving(false);
    router.refresh();
  }

  async function handleDownload() {
    if (!doc.archivo_url) return;
    setIsDownloading(true);

    const { data } = await supabase.storage
      .from("application-documents")
      .createSignedUrl(doc.archivo_url, 60);

    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
    setIsDownloading(false);
  }

  return (
    <div className="rounded-md border p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">
            {doc.required_documents.nombre}
          </span>
          {doc.required_documents.obligatorio && (
            <Badge variant="secondary" className="text-xs">
              Requerido
            </Badge>
          )}
        </div>

        {doc.archivo_url && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <Download className="mr-1 h-3 w-3" />
            )}
            Descargar
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Estado</label>
          <Select
            value={estado}
            onValueChange={(v) => setEstado(v as DocumentEstado)}
          >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue>
                <Badge variant="secondary" className={estadoColors[estado]}>
                  {estadoLabels[estado]}
                </Badge>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(estadoLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  <Badge
                    variant="secondary"
                    className={estadoColors[value as DocumentEstado]}
                  >
                    {label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px] space-y-1">
          <label className="text-xs text-muted-foreground">Notas</label>
          <Input
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Ej: Entregado en oficina el 15 de marzo"
            className="h-9"
          />
        </div>

        {hasChanges && (
          <Button size="sm" onClick={handleSave} disabled={isSaving} className="h-9">
            {isSaving ? (
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <Save className="mr-1 h-3 w-3" />
            )}
            Guardar
          </Button>
        )}
      </div>
    </div>
  );
}
