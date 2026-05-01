import { Target, Eye } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function MisionVision() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Nuestra Identidad"
          subtitle="Formamos profesionales comprometidos con el desarrollo social, económico, político y cultural de la comunidad."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <article className="rounded-lg bg-muted p-8 border-l-4 border-primary">
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

          <article className="rounded-lg bg-muted p-8 border-l-4 border-primary">
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
      </div>
    </section>
  );
}
