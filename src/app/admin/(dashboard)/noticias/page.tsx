import { createClient } from "@/lib/supabase/server";
import type { Noticia } from "@/types/database";
import NoticiasClient from "./noticias-client";

export default async function AdminNoticiasPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("noticias")
    .select("*")
    .order("fecha", { ascending: false });

  return <NoticiasClient noticias={(data as Noticia[]) ?? []} />;
}
