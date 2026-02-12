import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/ui/ProgramCard";
import { getProgramsByCategory } from "@/data/programs";
import { siteConfig } from "@/data/site";
import {
  GraduationCap,
  Users,
  Building2,
  MapPin,
  ArrowRight,
} from "lucide-react";

const features = [
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
    icon: Building2,
    title: "Preparación Profesional",
    description:
      "Institución dinámica, capaz de responder a los requerimientos locales, nacionales y globales del mercado laboral.",
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
        title={siteConfig.tagline}
        subtitle="Universidad Frontera Norte — Reynosa, Tamaulipas, México"
        ctaText="Inscríbete Ahora"
        ctaHref="/inscripcion"
      />

      <StatsBar />

      {/* Programs Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nuestras Carreras"
            subtitle="Descubre las mejores opciones de carreras universitarias en Reynosa, Tamaulipas"
          />

          <div className="mb-10">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Licenciaturas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {licenciaturas.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Ingenierías
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingenierias.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why UFN Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="¿Por qué elegir la Universidad Frontera Norte?"
            subtitle={siteConfig.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-lg bg-background shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
