"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import type { ApplicationStatus, DocumentEstado } from "@/types/database";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId);

  if (error) {
    return { error: "Error al actualizar el estado." };
  }
  return { success: true };
}

export async function updateInternalNotes(
  applicationId: string,
  notas_internas: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("applications")
    .update({ notas_internas })
    .eq("id", applicationId);

  if (error) {
    return { error: "Error al guardar las notas." };
  }
  return { success: true };
}

export async function updateDocumentStatus(
  documentRecordId: string,
  estado: DocumentEstado,
  notas?: string
) {
  const supabase = createClient();
  const updateData: { estado: DocumentEstado; notas?: string } = { estado };
  if (notas !== undefined) {
    updateData.notas = notas;
  }

  const { error } = await supabase
    .from("application_documents")
    .update(updateData)
    .eq("id", documentRecordId);

  if (error) {
    return { error: "Error al actualizar el documento." };
  }
  return { success: true };
}

export async function sendEmailToApplicant(
  applicationId: string,
  to: string,
  asunto: string,
  mensaje: string,
  senderEmail: string
) {
  // Send the email via Resend
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "admisiones@ufn.edu.mx",
      to,
      subject: asunto,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">Universidad Frontera Norte</h1>
          </div>
          <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 24px;">
            ${mensaje.replace(/\n/g, "<br>")}
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
              Universidad Frontera Norte — J. B. Chapa 787 y Colón, Centro, Reynosa, Tamaulipas
            </p>
          </div>
        </div>
      `,
    });
  } catch (emailError) {
    console.error("Failed to send email:", emailError);
    return { error: "Error al enviar el correo." };
  }

  // Log the communication
  const supabase = createClient();
  await supabase.from("communications").insert({
    application_id: applicationId,
    tipo: "email",
    asunto,
    mensaje,
    enviado_por: senderEmail,
  });

  return { success: true };
}
