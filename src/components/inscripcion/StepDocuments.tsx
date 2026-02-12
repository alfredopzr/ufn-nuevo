"use client";

import { useState } from "react";
import type { RequiredDocument } from "@/types/database";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";

interface DocumentFile {
  documentId: string;
  file: File | null;
}

interface Props {
  requiredDocuments: RequiredDocument[];
  documentFiles: DocumentFile[];
  onComplete: (files: DocumentFile[]) => void;
  onBack: () => void;
}

export default function StepDocuments({
  requiredDocuments,
  documentFiles,
  onComplete,
  onBack,
}: Props) {
  const [files, setFiles] = useState<DocumentFile[]>(documentFiles);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleFileChange(documentId: string, file: File | null) {
    if (file) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setErrors((prev) => ({
          ...prev,
          [documentId]: "El archivo excede el tamaño máximo de 5MB",
        }));
        return;
      }
      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [documentId]: "Solo se aceptan archivos PDF, JPG o PNG",
        }));
        return;
      }
      setErrors((prev) => {
        const next = { ...prev };
        delete next[documentId];
        return next;
      });
    }

    setFiles((prev) =>
      prev.map((f) => (f.documentId === documentId ? { ...f, file } : f))
    );
  }

  function handleContinue() {
    // We allow skipping — applicant can submit without all docs
    onComplete(files);
  }

  const uploadedCount = files.filter((f) => f.file).length;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        <div className="flex gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Documentos requeridos</p>
            <p className="mt-1">
              Si no cuentas con algún documento en este momento, puedes continuar
              sin subirlo. Nuestro equipo te contactará para indicarte cómo
              entregarlo después.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {requiredDocuments.map((doc) => {
          const currentFile = files.find((f) => f.documentId === doc.id);
          const error = errors[doc.id];

          return (
            <div
              key={doc.id}
              className="rounded-lg border p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Label className="text-base font-medium">{doc.nombre}</Label>
                  {doc.obligatorio ? (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Requerido
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Opcional
                    </Badge>
                  )}
                  {doc.descripcion && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {doc.descripcion}
                    </p>
                  )}
                </div>
              </div>

              {currentFile?.file ? (
                <div className="flex items-center gap-3 rounded-md bg-muted p-3">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {currentFile.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(currentFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFileChange(doc.id, null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-primary/50 hover:bg-muted/50">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Haz clic para seleccionar archivo (PDF, JPG, PNG — máx. 5MB)
                  </span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(doc.id, e.target.files?.[0] ?? null)
                    }
                  />
                </label>
              )}

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {uploadedCount} de {requiredDocuments.length} documentos
          </span>
          <Button type="button" onClick={handleContinue}>
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
