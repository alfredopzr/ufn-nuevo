import { createClient } from "@/lib/supabase/server";
import SectionHeading from "@/components/ui/SectionHeading";
import type { FechaImportante } from "@/types/database";

const MONTH_ABBR = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

export default async function FechasImportantes() {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: fechas } = await supabase
    .from("fechas_importantes")
    .select("*")
    .eq("activo", true)
    .gte("fecha", today)
    .order("fecha", { ascending: true })
    .limit(5);

  if (!fechas || fechas.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Fechas Importantes"
          subtitle="Mantente al tanto de las proximas fechas clave"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {(fechas as FechaImportante[]).map((fecha) => {
            const dateObj = new Date(fecha.fecha + "T12:00:00");
            const day = dateObj.getDate();
            const month = MONTH_ABBR[dateObj.getMonth()];

            return (
              <div
                key={fecha.id}
                className="flex items-start gap-4 rounded-lg border bg-background p-4 shadow-sm"
              >
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
                  <span className="text-xl font-bold leading-none">{day}</span>
                  <span className="text-xs font-medium uppercase">{month}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground leading-tight">
                    {fecha.titulo}
                  </h3>
                  {fecha.descripcion && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {fecha.descripcion}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
