"use server";

import { createClient } from "@/lib/supabase/server";
import { applicationSchema } from "@/lib/validations";

export async function submitApplication(formData: FormData) {
  const supabase = createClient();

  // Parse and validate personal info
  const raw = {
    nombre: formData.get("nombre") as string,
    email: formData.get("email") as string,
    telefono: formData.get("telefono") as string,
    curp: formData.get("curp") as string,
    preparatoria: formData.get("preparatoria") as string,
    direccion: formData.get("direccion") as string,
    programa_id: formData.get("programa_id") as string,
    como_se_entero: (formData.get("como_se_entero") as string) || undefined,
  };

  const validation = applicationSchema.safeParse(raw);
  if (!validation.success) {
    return { error: "Datos inválidos. Por favor verifica tu información." };
  }

  const data = validation.data;

  // Insert application (generate ID server-side to avoid needing RETURNING,
  // which would require SELECT permission the anon role doesn't have)
  const applicationId = crypto.randomUUID();
  const { error: insertError } = await supabase
    .from("applications")
    .insert({
      id: applicationId,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      curp: data.curp,
      preparatoria: data.preparatoria,
      direccion: data.direccion,
      programa_id: data.programa_id,
      como_se_entero: data.como_se_entero ?? null,
    });

  if (insertError) {
    console.error("Failed to insert application:", insertError);
    return { error: "Error al enviar la solicitud. Por favor intenta de nuevo." };
  }

  // Parse document IDs
  const documentIdsRaw = formData.get("document_ids") as string;
  let documentIds: string[] = [];
  try {
    documentIds = JSON.parse(documentIdsRaw);
  } catch {
    // No documents to process
  }

  // Process each document
  const uploadedDocs: string[] = [];
  const pendingDocs: string[] = [];

  for (const docId of documentIds) {
    const file = formData.get(`doc_${docId}`) as File | null;

    if (file && file.size > 0) {
      // Upload file to Supabase Storage
      const filePath = `${applicationId}/${docId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("application-documents")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error(`Failed to upload file for doc ${docId}:`, uploadError);
        // Create as pending if upload fails
        await supabase.from("application_documents").insert({
          application_id: applicationId,
          document_id: docId,
          estado: "pendiente",
        });
        pendingDocs.push(docId);
      } else {
        await supabase.from("application_documents").insert({
          application_id: applicationId,
          document_id: docId,
          estado: "subido",
          archivo_url: filePath,
        });
        uploadedDocs.push(docId);
      }
    } else {
      // No file provided — create as pending
      await supabase.from("application_documents").insert({
        application_id: applicationId,
        document_id: docId,
        estado: "pendiente",
      });
      pendingDocs.push(docId);
    }
  }

  // Fetch document names for the email
  let pendingDocNames: string[] = [];
  if (pendingDocs.length > 0) {
    const { data: docs } = await supabase
      .from("required_documents")
      .select("id, nombre")
      .in("id", pendingDocs);
    pendingDocNames = docs?.map((d) => d.nombre) ?? [];
  }

  // Send confirmation email
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "admisiones@ufn.edu.mx",
      to: data.email,
      subject: "Confirmación de solicitud — Universidad Frontera Norte",
      html: buildConfirmationEmail(data.nombre, pendingDocNames),
    });
  } catch (emailError) {
    console.error("Failed to send confirmation email:", emailError);
    // Don't fail the submission if email fails
  }

  return { success: true };
}

function buildConfirmationEmail(
  nombre: string,
  pendingDocs: string[]
): string {
  const pendingSection =
    pendingDocs.length > 0
      ? `
        <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #92400e;">Documentos pendientes:</p>
          <ul style="margin: 0; padding-left: 20px; color: #92400e;">
            ${pendingDocs.map((doc) => `<li>${doc}</li>`).join("")}
          </ul>
          <p style="margin: 8px 0 0; font-size: 14px; color: #92400e;">
            Nuestro equipo te contactará para indicarte cómo entregarlos.
          </p>
        </div>`
      : "";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 20px;">Universidad Frontera Norte</h1>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 24px;">
        <p>Hola <strong>${nombre}</strong>,</p>
        <p>Hemos recibido tu solicitud de inscripción correctamente. Nuestro equipo de admisiones revisará tu información y te contactará con los siguientes pasos.</p>
        ${pendingSection}
        <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
          Si tienes alguna duda, no dudes en contactarnos por WhatsApp o llamando a nuestras oficinas.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          Universidad Frontera Norte — J. B. Chapa 787 y Colón, Centro, Reynosa, Tamaulipas
        </p>
      </div>
    </div>
  `;
}
