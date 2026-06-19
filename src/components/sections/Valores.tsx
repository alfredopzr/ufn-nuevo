import {
  Target,
  Eye,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// const valores = [
//   { icon: Sparkles, label: "Aptitud" },
//   { icon: Scale, label: "Ética" },
//   { icon: Compass, label: "Liderazgo" },
//   { icon: Handshake, label: "Compromiso" },
//   { icon: Award, label: "Calidad" },
//   { icon: ShieldCheck, label: "Responsabilidad" },
//   { icon: Heart, label: "Empatía" },
//   { icon: Users, label: "Colaboración" },
// ];

export default function Valores() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Nuestros Valores"
          subtitle="Formamos profesionales comprometidos con el desarrollo social, económico, político y cultural de la comunidad, guiados por principios sólidos e identidad institucional."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
          <article className="rounded-lg bg-background p-8 border-l-4 border-primary shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold">Misión</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Formar profesionales pensantes, analíticos y de sólidos principios
              éticos, que conciban ideas innovadoras a fin de que participen de
              manera activa, emprendedora, responsable, honesta, crítica y
              pragmática en el proceso de desarrollo social, económico,
              político y cultural de la comunidad.
            </p>
          </article>

          <article className="rounded-lg bg-background p-8 border-l-4 border-primary shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold">Visión</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Mantener la excelencia en la formación de profesionistas y en la
              creación de conocimiento actualizado. Siendo una institución
              dinámica, competitiva y consolidada; en completo paralelismo con
              los avances tecnológicos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Logrando con esto, obtener un alto impacto en el desarrollo
              empresarial e industrial a nivel regional, estatal y nacional.
              Comprometidos a custodiar el diálogo intercultural en la búsqueda
              de un futuro mejor.
            </p>
          </article>
        </div>

        {/* <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Principios que nos guían
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {valores.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg bg-background border border-border transition-all duration-200 hover:shadow-md hover:border-primary/40"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
