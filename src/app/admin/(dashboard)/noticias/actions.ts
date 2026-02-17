"use server";

import { createClient } from "@/lib/supabase/server";
import type { NoticiaEnvio } from "@/types/database";

interface EmailFilters {
  programa?: string;
  status?: string;
}

export async function getRecipientCount(filters: EmailFilters) {
  const supabase = createClient();

  let query = supabase
    .from("applications")
    .select("id", { count: "exact", head: true });

  if (filters.programa) {
    query = query.eq("programa_id", filters.programa);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  const { count, error } = await query;

  if (error) {
    return { error: "Error al contar destinatarios." };
  }
  return { count: count ?? 0 };
}

export async function getNoticiaEnvios(noticiaId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("noticia_envios")
    .select("*")
    .eq("noticia_id", noticiaId)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: "Error al cargar historial de envíos." };
  }
  return { envios: (data as NoticiaEnvio[]) ?? [] };
}

export async function sendNoticiaEmail(
  noticiaId: string,
  filters: EmailFilters
) {
  const supabase = createClient();

  // Verify admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "No autorizado." };
  }

  // Fetch the noticia
  const { data: noticia, error: noticiaError } = await supabase
    .from("noticias")
    .select("*")
    .eq("id", noticiaId)
    .eq("publicado", true)
    .single();

  if (noticiaError || !noticia) {
    return { error: "Noticia no encontrada o no está publicada." };
  }

  // Fetch recipient emails
  let recipientsQuery = supabase.from("applications").select("email");

  if (filters.programa) {
    recipientsQuery = recipientsQuery.eq("programa_id", filters.programa);
  }
  if (filters.status) {
    recipientsQuery = recipientsQuery.eq("status", filters.status);
  }

  const { data: recipients, error: recipientsError } = await recipientsQuery;

  if (recipientsError || !recipients || recipients.length === 0) {
    return { error: "No se encontraron destinatarios con esos filtros." };
  }

  // Deduplicate emails
  const emails = Array.from(new Set(recipients.map((r) => r.email)));
  const { buildNoticiaEmail } = await import("@/lib/email-templates/noticia");
  const html = buildNoticiaEmail(noticia.titulo, noticia.extracto, noticia.slug);
  const fromAddress = process.env.EMAIL_FROM ?? "admisiones@ufn.edu.mx";

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Send in batches of 50 (Resend batch limit is 100, using 50 for safety)
  const BATCH_SIZE = 50;
  let totalSent = 0;

  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);

    try {
      await resend.batch.send(
        batch.map((to) => ({
          from: fromAddress,
          to,
          subject: noticia.titulo,
          html,
        }))
      );
      totalSent += batch.length;
    } catch (err) {
      console.error("Error sending batch:", err);
      // If first batch fails, return error. If later batch fails, log what we sent.
      if (totalSent === 0) {
        return { error: "Error al enviar los correos." };
      }
      break;
    }
  }

  // Log the send
  await supabase.from("noticia_envios").insert({
    noticia_id: noticiaId,
    filtros: filters,
    total_destinatarios: totalSent,
    enviado_por: user.email ?? "admin",
  });

  return { success: true, count: totalSent };
}
