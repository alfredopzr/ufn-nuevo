import {
  Sparkles,
  Scale,
  Compass,
  Handshake,
  Award,
  ShieldCheck,
  Heart,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const valores = [
  { icon: Sparkles, label: "Aptitud" },
  { icon: Scale, label: "Ética" },
  { icon: Compass, label: "Liderazgo" },
  { icon: Handshake, label: "Compromiso" },
  { icon: Award, label: "Calidad" },
  { icon: ShieldCheck, label: "Responsabilidad" },
  { icon: Heart, label: "Empatía" },
  { icon: Users, label: "Colaboración" },
];

export default function Valores() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Nuestros Valores"
          subtitle="Los principios que guían la formación de cada estudiante en la Universidad Frontera Norte."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {valores.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg bg-muted border border-border transition-all duration-200 hover:shadow-md hover:border-primary/40"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
