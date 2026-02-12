"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Communication } from "@/types/database";
import { sendEmailToApplicant } from "@/app/admin/(dashboard)/aplicaciones/[id]/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Loader2, Clock } from "lucide-react";

interface Props {
  applicationId: string;
  applicantEmail: string;
  applicantName: string;
  senderEmail: string;
  communications: Communication[];
  pendingDocNames: string[];
}

interface EmailTemplate {
  label: string;
  subject: string;
  body: string;
}

export default function CommunicationSection({
  applicationId,
  applicantEmail,
  applicantName,
  senderEmail,
  communications,
  pendingDocNames,
}: Props) {
  const templates: EmailTemplate[] = [
    {
      label: "Documentos pendientes",
      subject: "Documentos pendientes — Universidad Frontera Norte",
      body: `Estimado/a ${applicantName},\n\nGracias por tu solicitud de inscripción a la Universidad Frontera Norte.\n\nPara continuar con tu proceso de admisión, necesitamos que nos entregues los siguientes documentos:\n\n${pendingDocNames.map((d) => `- ${d}`).join("\n")}\n\nPuedes entregarlos en nuestras instalaciones o responder a este correo con los archivos adjuntos.\n\nQuedamos a tus órdenes.\n\nAtentamente,\nAdmisiones — Universidad Frontera Norte`,
    },
    {
      label: "Solicitud aceptada",
      subject: "¡Felicidades! Tu solicitud ha sido aceptada — Universidad Frontera Norte",
      body: `Estimado/a ${applicantName},\n\n¡Felicidades! Nos complace informarte que tu solicitud de inscripción a la Universidad Frontera Norte ha sido aceptada.\n\nLos siguientes pasos son:\n\n1. Acudir a nuestras instalaciones para completar tu registro\n2. Realizar el pago de inscripción\n3. Asistir a la sesión de orientación\n\nTe contactaremos con las fechas y horarios correspondientes.\n\n¡Bienvenido/a a la Universidad Frontera Norte!\n\nAtentamente,\nAdmisiones — Universidad Frontera Norte`,
    },
    {
      label: "Solicitud rechazada",
      subject: "Resultado de tu solicitud — Universidad Frontera Norte",
      body: `Estimado/a ${applicantName},\n\nGracias por tu interés en la Universidad Frontera Norte.\n\nDespués de revisar tu solicitud, lamentamos informarte que en esta ocasión no es posible proceder con tu inscripción.\n\nMotivo: [Especificar motivo]\n\nTe invitamos a contactarnos si tienes alguna pregunta o si deseas información sobre futuras convocatorias.\n\nAtentamente,\nAdmisiones — Universidad Frontera Norte`,
    },
  ];

  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  function applyTemplate(templateLabel: string) {
    const template = templates.find((t) => t.label === templateLabel);
    if (template) {
      setAsunto(template.subject);
      setMensaje(template.body);
    }
  }

  async function handleSend() {
    if (!asunto.trim() || !mensaje.trim()) return;
    setIsSending(true);
    setSent(false);

    const result = await sendEmailToApplicant(
      applicationId,
      applicantEmail,
      asunto,
      mensaje,
      senderEmail
    );

    setIsSending(false);

    if (!result.error) {
      setSent(true);
      setAsunto("");
      setMensaje("");
      router.refresh();
      setTimeout(() => setSent(false), 3000);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-6 space-y-6">
      <h2 className="font-semibold text-lg">Comunicación</h2>

      {/* Compose email */}
      <div className="space-y-4 border-b pb-6">
        <div className="flex items-center justify-between">
          <Label>Enviar correo a {applicantEmail}</Label>
          <Select onValueChange={applyTemplate}>
            <SelectTrigger className="w-[200px] h-8">
              <SelectValue placeholder="Usar plantilla..." />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t.label} value={t.label}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Input
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            placeholder="Asunto"
          />
        </div>

        <div className="space-y-2">
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje..."
            rows={6}
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
          />
        </div>

        <div className="flex items-center justify-between">
          {sent && (
            <span className="text-sm text-green-600">Correo enviado</span>
          )}
          <Button
            onClick={handleSend}
            disabled={isSending || !asunto.trim() || !mensaje.trim()}
            className="ml-auto"
          >
            {isSending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Enviar
          </Button>
        </div>
      </div>

      {/* Communication history */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Historial ({communications.length})
        </h3>
        {communications.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No se han enviado correos a este solicitante.
          </p>
        ) : (
          communications.map((comm) => (
            <div key={comm.id} className="rounded-md border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{comm.asunto}</span>
                  <Badge variant="outline" className="text-xs">
                    {comm.tipo === "email" ? "Email" : "Nota"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {new Date(comm.created_at).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {comm.mensaje}
              </p>
              <p className="text-xs text-muted-foreground">
                Enviado por: {comm.enviado_por}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
