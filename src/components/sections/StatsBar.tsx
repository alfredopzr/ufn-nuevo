import { stats } from "@/data/site";
import { cn } from "@/lib/utils";

export default function StatsBar() {
  return (
    <section className="w-full bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "text-center py-2",
                i < stats.length - 1 && "md:border-r md:border-secondary-foreground/15"
              )}
            >
              <div className="text-3xl md:text-4xl font-bold text-secondary-foreground">
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
