import MensajesClient from "@/components/admin/MensajesClient";
import { programs } from "@/data/programs";
import { createClient } from "@/lib/supabase/server";
import type { Noticia, FechaImportante } from "@/types/database";

export default async function AdminMensajesPage() {
  const supabase = createClient();

  const [{ data: noticias }, { data: fechas }] = await Promise.all([
    supabase
      .from("noticias")
      .select("id, titulo, slug")
      .eq("publicado", true)
      .order("fecha", { ascending: false })
      .limit(20),
    supabase
      .from("fechas_importantes")
      .select("id, titulo, fecha")
      .eq("activo", true)
      .order("fecha", { ascending: false })
      .limit(20),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Mensajes</h1>
        <p className="text-sm text-muted-foreground">
          Envía correos o genera listas de WhatsApp para grupos de estudiantes o
          aplicantes.
        </p>
      </div>

      <MensajesClient
        programs={programs}
        noticias={(noticias as Pick<Noticia, "id" | "titulo" | "slug">[]) ?? []}
        fechas={
          (fechas as Pick<FechaImportante, "id" | "titulo" | "fecha">[]) ?? []
        }
      />
    </div>
  );
}
