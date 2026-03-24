import { stats } from "@/data/site";
import { cn } from "@/lib/utils";

export default function StatsBar() {
  const colClass =
    stats.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <section className="w-full bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className={cn("grid gap-6", colClass)}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "text-center py-2",
                i < stats.length - 1 && "sm:border-r sm:border-secondary-foreground/15"
              )}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-secondary-foreground/80 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
