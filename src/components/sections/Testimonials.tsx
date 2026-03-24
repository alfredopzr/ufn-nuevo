import { Quote, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Lo que dicen nuestros estudiantes"
          subtitle="Conoce las experiencias de quienes han formado parte de nuestra comunidad académica"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className={cn(
                "relative rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md",
                i === 0 ? "lg:col-span-5 lg:row-span-2 flex flex-col justify-between" : "lg:col-span-7"
              )}
            >
              <Quote className={cn("text-secondary/40 mb-4", i === 0 ? "h-10 w-10" : "h-8 w-8")} />

              <p className={cn("text-muted-foreground leading-relaxed mb-6", i === 0 && "text-lg")}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted flex-shrink-0">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.program} &middot; {testimonial.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
