"use server";

import { createClient } from "@/lib/supabase/server";
import { studentSchema } from "@/lib/validations";
import type { StudentStatus } from "@/types/database";

async function generateMatricula(
  supabase: ReturnType<typeof createClient>
): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `UFN-${year}-`;

  const { count } = await supabase
    .from("students")
    .select("id", { count: "exact", head: true })
    .like("matricula", `${prefix}%`);

  const next = (count ?? 0) + 1;
  return `${prefix}${String(next).padStart(3, "0")}`;
}

export async function createStudent(
  formData: Record<string, unknown>
): Promise<{ success?: boolean; error?: string }> {
  const parsed = studentSchema.safeParse(formData);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { error: firstIssue?.message ?? "Datos inválidos." };
  }

  const supabase = createClient();
  const matricula = await generateMatricula(supabase);

  const { error } = await supabase.from("students").insert({
    matricula,
    nombre: parsed.data.nombre,
    email: parsed.data.email,
    telefono: parsed.data.telefono,
    curp: parsed.data.curp || null,
    programa_id: parsed.data.programa_id,
    cuatrimestre: parsed.data.cuatrimestre,
    fecha_ingreso: parsed.data.fecha_ingreso,
    status: "activo",
  });

  if (error) {
    console.error("Failed to create student:", error);
    return { error: "Error al crear el estudiante." };
  }

  return { success: true };
}

export async function updateStudent(
  studentId: string,
  data: {
    nombre?: string;
    email?: string;
    telefono?: string;
    curp?: string | null;
    programa_id?: string;
    cuatrimestre?: number;
    status?: StudentStatus;
  }
): Promise<{ success?: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase
    .from("students")
    .update(data)
    .eq("id", studentId);

  if (error) {
    console.error("Failed to update student:", error);
    return { error: "Error al actualizar el estudiante." };
  }

  return { success: true };
}

export async function deleteStudent(
  studentId: string
): Promise<{ success?: boolean; error?: string }> {
  const supabase = createClient();

  // Remove bidirectional link from applications first
  await supabase
    .from("applications")
    .update({ student_id: null })
    .eq("student_id", studentId);

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", studentId);

  if (error) {
    console.error("Failed to delete student:", error);
    return { error: "Error al eliminar el estudiante." };
  }

  return { success: true };
}
