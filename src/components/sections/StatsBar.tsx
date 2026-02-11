import { stats } from "@/data/site";

export default function StatsBar() {
  return (
    <section className="w-full bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-secondary-foreground">
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
