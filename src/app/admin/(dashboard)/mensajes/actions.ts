"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { buildTargetedEmail } from "@/lib/email-templates/targeted";
import type {
  MessageAudiencia,
  MessageSend,
  Student,
  Application,
} from "@/types/database";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Filter types ──────────────────────────────────────────

export interface StudentFilters {
  programa?: string;
  cuatrimestre?: string;
  status?: string;
}

export interface ApplicantFilters {
  programa?: string;
  status?: string;
  missing_docs?: boolean;
}

// ── Recipient types ───────────────────────────────────────

export interface Recipient {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  programa_id: string;
  extra: string; // cuatrimestre for students, status for applicants
}

// ── Count queries ─────────────────────────────────────────

export async function getStudentRecipientCount(
  filters: StudentFilters
): Promise<{ count: number } | { error: string }> {
  const supabase = createClient();

  let query = supabase
    .from("students")
    .select("id", { count: "exact", head: true });

  if (filters.programa) query = query.eq("programa_id", filters.programa);
  if (filters.cuatrimestre)
    query = query.eq("cuatrimestre", Number(filters.cuatrimestre));
  if (filters.status) query = query.eq("status", filters.status);

  const { count, error } = await query;
  if (error) return { error: "Error al contar estudiantes." };
  return { count: count ?? 0 };
}

export async function getApplicantRecipientCount(
  filters: ApplicantFilters
): Promise<{ count: number } | { error: string }> {
  const supabase = createClient();

  if (filters.missing_docs) {
    // Need a join to check for pending documents
    const recipients = await getApplicantRecipients(filters);
    if ("error" in recipients) return recipients;
    return { count: recipients.length };
  }

  let query = supabase
    .from("applications")
    .select("id", { count: "exact", head: true });

  if (filters.programa) query = query.eq("programa_id", filters.programa);
  if (filters.status) query = query.eq("status", filters.status);

  const { count, error } = await query;
  if (error) return { error: "Error al contar aplicantes." };
  return { count: count ?? 0 };
}

// ── Recipient list queries ────────────────────────────────

export async function getStudentRecipients(
  filters: StudentFilters
): Promise<Recipient[] | { error: string }> {
  const supabase = createClient();

  let query = supabase
    .from("students")
    .select("id, nombre, email, telefono, programa_id, cuatrimestre, status")
    .order("nombre");

  if (filters.programa) query = query.eq("programa_id", filters.programa);
  if (filters.cuatrimestre)
    query = query.eq("cuatrimestre", Number(filters.cuatrimestre));
  if (filters.status) query = query.eq("status", filters.status);

  const { data, error } = await query;
  if (error) return { error: "Error al obtener estudiantes." };

  return ((data as Student[]) ?? []).map((s) => ({
    id: s.id,
    nombre: s.nombre,
    email: s.email,
    telefono: s.telefono,
    programa_id: s.programa_id,
    extra: `Cuatrimestre ${s.cuatrimestre}`,
  }));
}

export async function getApplicantRecipients(
  filters: ApplicantFilters
): Promise<Recipient[] | { error: string }> {
  const supabase = createClient();

  let query = supabase
    .from("applications")
    .select("id, nombre, email, telefono, programa_id, status")
    .order("nombre");

  if (filters.programa) query = query.eq("programa_id", filters.programa);
  if (filters.status) query = query.eq("status", filters.status);

  const { data, error } = await query;
  if (error) return { error: "Error al obtener aplicantes." };

  let recipients = ((data as Application[]) ?? []).map((a) => ({
    id: a.id,
    nombre: a.nombre,
    email: a.email,
    telefono: a.telefono,
    programa_id: a.programa_id,
    extra: a.status,
  }));

  if (filters.missing_docs) {
    // Filter to only applicants who have at least one pending document
    const appIds = recipients.map((r) => r.id);
    if (appIds.length > 0) {
      const { data: docs } = await supabase
        .from("application_documents")
        .select("application_id")
        .in("application_id", appIds)
        .eq("estado", "pendiente");

      const idsWithPending = new Set(
        (docs ?? []).map((d) => (d as { application_id: string }).application_id)
      );
      recipients = recipients.filter((r) => idsWithPending.has(r.id));
    }
  }

  return recipients;
}

// ── Search (for manual add) ───────────────────────────────

export async function searchStudents(
  query: string
): Promise<Recipient[] | { error: string }> {
  const supabase = createClient();
  const search = `%${query}%`;

  const { data, error } = await supabase
    .from("students")
    .select("id, nombre, email, telefono, programa_id, cuatrimestre")
    .or(
      `nombre.ilike.${search},matricula.ilike.${search},email.ilike.${search}`
    )
    .limit(20);

  if (error) return { error: "Error al buscar estudiantes." };

  return ((data as Student[]) ?? []).map((s) => ({
    id: s.id,
    nombre: s.nombre,
    email: s.email,
    telefono: s.telefono,
    programa_id: s.programa_id,
    extra: `Cuatrimestre ${s.cuatrimestre}`,
  }));
}

export async function searchApplicants(
  query: string
): Promise<Recipient[] | { error: string }> {
  const supabase = createClient();
  const search = `%${query}%`;

  const { data, error } = await supabase
    .from("applications")
    .select("id, nombre, email, telefono, programa_id, status")
    .or(
      `nombre.ilike.${search},curp.ilike.${search},email.ilike.${search}`
    )
    .limit(20);

  if (error) return { error: "Error al buscar aplicantes." };

  return ((data as Application[]) ?? []).map((a) => ({
    id: a.id,
    nombre: a.nombre,
    email: a.email,
    telefono: a.telefono,
    programa_id: a.programa_id,
    extra: a.status,
  }));
}

// ── Send email ────────────────────────────────────────────

export async function sendTargetedEmail(params: {
  audiencia: MessageAudiencia;
  recipientIds: string[];
  asunto: string;
  mensaje: string;
  filtros: Record<string, unknown>;
  noticiaId?: string;
  fechaId?: string;
}): Promise<{ success: boolean; count: number } | { error: string }> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

  // Fetch emails for the selected IDs
  const table =
    params.audiencia === "estudiantes" ? "students" : "applications";

  const { data: recipients, error: recipientsError } = await supabase
    .from(table)
    .select("email")
    .in("id", params.recipientIds);

  if (recipientsError || !recipients || recipients.length === 0) {
    return { error: "No se encontraron destinatarios." };
  }

  const emails = Array.from(
    new Set(recipients.map((r) => (r as { email: string }).email))
  );

  // Build CTA based on linked content
  let ctaUrl: string | undefined;
  let ctaLabel: string | undefined;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ufn.edu.mx";

  if (params.noticiaId) {
    const { data: noticia } = await supabase
      .from("noticias")
      .select("slug")
      .eq("id", params.noticiaId)
      .single();
    if (noticia) {
      ctaUrl = `${siteUrl}/noticias/${(noticia as { slug: string }).slug}`;
      ctaLabel = "Leer más";
    }
  }

  if (params.fechaId) {
    ctaUrl = `${siteUrl}/fechas-importantes`;
    ctaLabel = "Ver fechas importantes";
  }

  const html = buildTargetedEmail(params.asunto, params.mensaje, ctaUrl, ctaLabel);
  const fromAddress = process.env.EMAIL_FROM ?? "admisiones@ufn.edu.mx";

  // Send in batches of 50
  const BATCH_SIZE = 50;
  let totalSent = 0;

  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);
    try {
      await resend.batch.send(
        batch.map((to) => ({
          from: fromAddress,
          to,
          subject: params.asunto,
          html,
        }))
      );
      totalSent += batch.length;
    } catch (err) {
      console.error("Error sending batch:", err);
      if (totalSent === 0) return { error: "Error al enviar los correos." };
      break;
    }
  }

  // Log the send
  await supabase.from("message_sends").insert({
    tipo: "email",
    audiencia: params.audiencia,
    filtros: params.filtros,
    asunto: params.asunto,
    mensaje: params.mensaje,
    total_destinatarios: totalSent,
    enviado_por: user.email ?? "admin",
    noticia_id: params.noticiaId ?? null,
    fecha_id: params.fechaId ?? null,
  });

  return { success: true, count: totalSent };
}

// ── WhatsApp list ─────────────────────────────────────────

export async function getWhatsAppList(
  audiencia: MessageAudiencia,
  recipientIds: string[]
): Promise<
  { recipients: { nombre: string; telefono: string }[] } | { error: string }
> {
  const supabase = createClient();
  const table = audiencia === "estudiantes" ? "students" : "applications";

  const { data, error } = await supabase
    .from(table)
    .select("nombre, telefono")
    .in("id", recipientIds);

  if (error) return { error: "Error al obtener lista de WhatsApp." };

  return {
    recipients: (data ?? []).map((r) => ({
      nombre: (r as { nombre: string }).nombre,
      telefono: (r as { telefono: string }).telefono,
    })),
  };
}

// ── Message history ───────────────────────────────────────

export async function getMessageHistory(
  audiencia: MessageAudiencia
): Promise<{ sends: MessageSend[] } | { error: string }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("message_sends")
    .select("*")
    .eq("audiencia", audiencia)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return { error: "Error al cargar historial." };
  return { sends: (data as MessageSend[]) ?? [] };
}

// ── Log WhatsApp list generation ──────────────────────────

export async function logWhatsAppSend(params: {
  audiencia: MessageAudiencia;
  filtros: Record<string, unknown>;
  asunto: string;
  mensaje: string;
  totalDestinatarios: number;
}): Promise<{ success: boolean } | { error: string }> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

  const { error } = await supabase.from("message_sends").insert({
    tipo: "whatsapp_list",
    audiencia: params.audiencia,
    filtros: params.filtros,
    asunto: params.asunto,
    mensaje: params.mensaje,
    total_destinatarios: params.totalDestinatarios,
    enviado_por: user.email ?? "admin",
  });

  if (error) return { error: "Error al registrar el envío." };
  return { success: true };
}
