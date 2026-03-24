import { createClient } from "@/lib/supabase/server";

/**
 * Generate the next sequential matricula for a new student.
 * Format: UFN-{year}-{sequential 3-digit number}
 *
 * NOTE: This uses a count-based approach which has a race condition under
 * concurrent requests. For production scale, replace with a Postgres sequence.
 */
export async function generateMatricula(
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
