"use client";

import { useState } from "react";
import type { ApplicationFormData } from "@/lib/validations";
import type { RequiredDocument } from "@/types/database";
import { programs } from "@/data/programs";
import { submitApplication } from "@/app/(site)/inscripcion/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface DocumentFile {
  documentId: string;
  file: File | null;
}

interface Props {
  formData: ApplicationFormData;
  requiredDocuments: RequiredDocument[];
  documentFiles: DocumentFile[];
  onBack: () => void;
  onSuccess: () => void;
}

export default function StepReview({
  formData,
  requiredDocuments,
  documentFiles,
  onBack,
  onSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const program = programs.find((p) => p.slug === formData.programa_id);

  const missingDocs = requiredDocuments.filter((doc) => {
    const file = documentFiles.find((f) => f.documentId === doc.id);
    return doc.obligatorio && !file?.file;
  });

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataObj = new FormData();

      // Add personal info
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataObj.append(key, String(value));
        }
      });

      // Add files
      documentFiles.forEach(({ documentId, file }) => {
        if (file) {
          formDataObj.append(`doc_${documentId}`, file);
        }
      });

      // Add document IDs list for creating pending records
      const allDocIds = requiredDocuments.map((d) => d.id);
      formDataObj.append("document_ids", JSON.stringify(allDocIds));

      const result = await submitApplication(formDataObj);

      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }

      onSuccess();
    } catch {
      setError("Ocurrió un error inesperado. Por favor intenta de nuevo.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Personal Info Summary */}
      <div className="rounded-lg border p-6 space-y-4">
        <h3 className="font-semibold text-lg">Datos Personales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Carrera:</span>
            <p className="font-medium">{program?.name ?? formData.programa_id}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Nombre:</span>
            <p className="font-medium">{formData.nombre}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Correo:</span>
            <p className="font-medium">{formData.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Teléfono:</span>
            <p className="font-medium">{formData.telefono}</p>
          </div>
          <div>
            <span className="text-muted-foreground">CURP:</span>
            <p className="font-medium">{formData.curp}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Preparatoria:</span>
            <p className="font-medium">{formData.preparatoria}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-muted-foreground">Domicilio:</span>
            <p className="font-medium">{formData.direccion}</p>
          </div>
          {formData.como_se_entero && (
            <div>
              <span className="text-muted-foreground">
                ¿Cómo se enteró?
              </span>
              <p className="font-medium">{formData.como_se_entero}</p>
            </div>
          )}
        </div>
      </div>

      {/* Documents Summary */}
      <div className="rounded-lg border p-6 space-y-4">
        <h3 className="font-semibold text-lg">Documentos</h3>
        <div className="space-y-2">
          {requiredDocuments.map((doc) => {
            const fileEntry = documentFiles.find(
              (f) => f.documentId === doc.id
            );
            const hasFile = !!fileEntry?.file;

            return (
              <div key={doc.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  {hasFile ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-sm">{doc.nombre}</span>
                  {doc.obligatorio && (
                    <Badge variant="secondary" className="text-xs">
                      Requerido
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {hasFile ? fileEntry!.file!.name : "No adjuntado"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Missing docs warning */}
      {missingDocs.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">
                Faltan {missingDocs.length} documento(s) requerido(s)
              </p>
              <p className="mt-1">
                Puedes enviar tu solicitud sin estos documentos. Nuestro equipo
                te contactará para indicarte cómo entregarlos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Enviar Solicitud
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
