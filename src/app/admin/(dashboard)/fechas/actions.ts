"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createFecha(data: {
  titulo: string;
  fecha: string;
  descripcion: string | null;
}): Promise<{ success?: boolean; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

  const { error } = await supabase.from("fechas_importantes").insert({
    titulo: data.titulo,
    fecha: data.fecha,
    descripcion: data.descripcion,
    activo: true,
  });

  if (error) return { error: "Error al crear la fecha." };
  revalidatePath("/admin/fechas");
  return { success: true };
}

export async function updateFecha(
  id: string,
  data: {
    titulo: string;
    fecha: string;
    descripcion: string | null;
    activo: boolean;
  }
): Promise<{ success?: boolean; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

  const { error } = await supabase
    .from("fechas_importantes")
    .update(data)
    .eq("id", id);

  if (error) return { error: "Error al actualizar la fecha." };
  revalidatePath("/admin/fechas");
  return { success: true };
}

export async function deleteFecha(
  id: string
): Promise<{ success?: boolean; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

  const { error } = await supabase
    .from("fechas_importantes")
    .delete()
    .eq("id", id);

  if (error) return { error: "Error al eliminar la fecha." };
  revalidatePath("/admin/fechas");
  return { success: true };
}
