"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { generateMatricula } from "@/lib/matricula";
import { studentSchema } from "@/lib/validations";
import type { StudentStatus } from "@/types/database";

export async function createStudent(
  formData: Record<string, unknown>
): Promise<{ success?: boolean; error?: string }> {
  const parsed = studentSchema.safeParse(formData);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { error: firstIssue?.message ?? "Datos inválidos." };
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

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

  revalidatePath("/admin/estudiantes");
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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

  const { error } = await supabase
    .from("students")
    .update(data)
    .eq("id", studentId);

  if (error) {
    console.error("Failed to update student:", error);
    return { error: "Error al actualizar el estudiante." };
  }

  revalidatePath("/admin/estudiantes");
  return { success: true };
}

export async function deleteStudent(
  studentId: string
): Promise<{ success?: boolean; error?: string }> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado." };

  const { error } = await supabase
    .from("students")
    .update({ status: "baja" as StudentStatus })
    .eq("id", studentId);

  if (error) {
    console.error("Failed to soft-delete student:", error);
    return { error: "Error al dar de baja al estudiante." };
  }

  revalidatePath("/admin/estudiantes");
  return { success: true };
}
