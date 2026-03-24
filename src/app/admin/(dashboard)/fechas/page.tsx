import { createClient } from "@/lib/supabase/server";
import type { FechaImportante } from "@/types/database";
import FechasClient from "./fechas-client";

export default async function AdminFechasPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("fechas_importantes")
    .select("*")
    .order("fecha", { ascending: false });

  return <FechasClient fechas={(data as FechaImportante[]) ?? []} />;
}
