import { createClient } from "@/lib/supabase/server";
import SectionHeading from "@/components/ui/SectionHeading";
import type { FechaImportante } from "@/types/database";
import { cn } from "@/lib/utils";

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

        <div className="max-w-3xl mx-auto space-y-0">
          {(fechas as FechaImportante[]).map((fecha, i) => {
            const dateObj = new Date(fecha.fecha + "T12:00:00");
            const day = dateObj.getDate();
            const month = MONTH_ABBR[dateObj.getMonth()];
            const isLast = i === fechas.length - 1;

            return (
              <div key={fecha.id} className="flex gap-6">
                {/* Date + timeline line */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shrink-0">
                    <span className="text-lg font-bold leading-none">{day}</span>
                    <span className="text-[10px] font-medium uppercase">{month}</span>
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-border my-2" />}
                </div>
                {/* Content */}
                <div className={cn("pb-8", isLast && "pb-0")}>
                  <h3 className="font-semibold text-foreground leading-tight pt-3">
                    {fecha.titulo}
                  </h3>
                  {fecha.descripcion && (
                    <p className="text-sm text-muted-foreground mt-1">
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
