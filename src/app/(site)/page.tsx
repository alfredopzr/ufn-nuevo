import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero from "@/components/sections/Hero";
import estudiantesImg from "@/assets/estudiantes-ufn.png";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/ui/ProgramCard";
import { getProgramsByCategory } from "@/data/programs";
import { siteConfig } from "@/data/site";
import FechasImportantes from "@/components/sections/FechasImportantes";
import SocialFeed from "@/components/sections/SocialFeed";
import Partners from "@/components/sections/Partners";
import {
  HeartHandshake,
  Users,
  GraduationCap,
  MapPin,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Servicio Personalizado",
    description:
      "Marcamos la diferencia acompañándote de principio a fin en tu aprendizaje. Creemos en ti y valoramos tu esfuerzo.",
  },
  {
    icon: GraduationCap,
    title: "Calidad Académica",
    description:
      "Programas con validez oficial SEP, diseñados para formar profesionales competitivos a nivel nacional e internacional.",
  },
  {
    icon: Users,
    title: "Comunidad Académica",
    description:
      "Los estudiantes encuentran una comunidad académica que fomenta el crecimiento personal y profesional.",
  },
  {
    icon: MapPin,
    title: "Ubicación Estratégica",
    description:
      "En el corazón de Reynosa, Tamaulipas, con acceso privilegiado a oportunidades de comercio internacional y desarrollo industrial.",
  },
];

export default function HomePage() {
  const licenciaturas = getProgramsByCategory("licenciatura");
  const ingenierias = getProgramsByCategory("ingenieria");

  return (
    <>
      <Hero
        kicker="Liderazgo & Excelencia"
        title="Forjando el"
        titleEmphasis="Futuro del Norte"
        subtitle={siteConfig.description}
        ctaText="Explorar Carreras"
        ctaHref="/carreras"
        secondaryCtaText="Conoce el Campus"
        secondaryCtaHref="/contacto"
        imageSrc={estudiantesImg}
        imageAlt="Estudiantes de la Universidad Frontera Norte"
      />

      {/* <StatsBar /> */}
      
      <Partners />

      {/* Programs Section */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nuestras Carreras"
            subtitle="Descubre las mejores opciones de carreras universitarias en Reynosa, Tamaulipas"
          />

          <div className="mb-8 md:mb-10">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
              Licenciaturas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {licenciaturas.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
              Ingenierías
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {ingenierias.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fechas Importantes Section */}
      <FechasImportantes />

      {/* Why UFN Section */}
      <section className="py-10 md:py-14 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="¿Por qué elegir la Universidad Frontera Norte?"
            subtitle="Marcamos la diferencia con nuestro servicio personalizado. Al creer en ti y valorar tu esfuerzo, te conviertes en parte de este proyecto educativo que busca una transformación social en beneficio de nuestra ciudad."
            className="[&_p]:line-clamp-3 [&_p]:md:line-clamp-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 md:gap-5 p-4 md:p-6 rounded-lg bg-background shadow-sm border-l-4 border-primary transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary shrink-0">
                  <feature.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm md:text-lg mb-0.5 md:mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores Section */}
      {/* <Valores /> */}

      {/* Social Feed Section */}
      <SocialFeed />

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Inicia tu futuro hoy
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Nuestro proceso de inscripción es sencillo y está diseñado para
            guiarte paso a paso. Da el primer paso hacia tu carrera profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base"
            >
              <Link href="/inscripcion">
                Iniciar mi Inscripción
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground"
            >
              <Link href="/carreras">Ver Carreras</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
