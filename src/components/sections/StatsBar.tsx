import { stats } from "@/data/site";
import { cn } from "@/lib/utils";

export default function StatsBar() {
  const colClass =
    stats.length === 3
      ? "grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <section className="w-full bg-secondary py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className={cn("grid gap-1 md:gap-6", colClass)}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "text-center px-1 md:px-2 py-1 md:py-2",
                i < stats.length - 1 &&
                  "border-r border-secondary-foreground/15",
              )}
            >
              <div className="text-sm sm:text-2xl md:text-4xl font-bold text-secondary-foreground leading-tight">
                <span className="md:hidden">{stat.mobileValue ?? stat.value}</span>
                <span className="hidden md:inline">{stat.value}</span>
              </div>
              <div className="text-[10px] sm:text-sm text-secondary-foreground/80 mt-0.5 md:mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
