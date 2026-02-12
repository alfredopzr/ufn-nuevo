import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/ui/ProgramCard";
import { getProgramsByCategory } from "@/data/programs";

export const metadata: Metadata = {
  title: "Carreras Universitarias",
  description:
    "Descubre las carreras universitarias disponibles en la Universidad Frontera Norte en Reynosa, Tamaulipas. Licenciaturas e ingenierías con validez oficial SEP.",
};

export default function CarrerasPage() {
  const licenciaturas = getProgramsByCategory("licenciatura");
  const ingenierias = getProgramsByCategory("ingenieria");

  return (
    <>
      <Hero
        title="Atrévete a cruzar la frontera del conocimiento"
        subtitle="Descubre las mejores opciones de carreras universitarias en Reynosa, Tamaulipas"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-muted-foreground">
              En la Universidad Frontera Norte, nuestro compromiso es ofrecer a
              los estudiantes una experiencia educativa enriquecedora y completa.
              Nuestros programas están diseñados para preparar a los egresados
              para los retos de la industria y desarrollar competencias de
              gestión.
            </p>
          </div>

          <div className="mb-16">
            <SectionHeading
              title="Licenciaturas"
              subtitle="Programas de formación profesional en administración, comercio y logística"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {licenciaturas.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              title="Ingenierías"
              subtitle="Programas de formación técnica y tecnológica de alto nivel"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingenierias.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
