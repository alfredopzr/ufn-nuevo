import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { programs, getProgramBySlug } from "@/data/programs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Clock,
  UserCheck,
  GraduationCap,
  Briefcase,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const program = getProgramBySlug(params.slug);
  if (!program) return {};
  return {
    title: program.name,
    description: program.description,
    openGraph: {
      title: `${program.name} | Universidad Frontera Norte`,
      description: program.description,
      type: "website",
    },
  };
}

export default function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  const categoryLabel =
    program.category === "licenciatura" ? "Licenciatura" : "Ingeniería";
  const totalSubjects = program.semesters.reduce(
    (acc, s) => acc + s.subjects.length,
    0,
  );

  return (
    <>
      {/* Program Header with Hero Image */}
      <section className="relative text-primary-foreground overflow-hidden">
        <div className="relative min-h-[220px] md:min-h-0 py-10 md:py-24">
          <Image
            src={program.heroImage}
            alt={program.name}
            fill
            className="object-cover"
            placeholder="blur"
            priority
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="container mx-auto px-4 relative z-10">
            <Link
              href="/carreras"
              className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4 md:mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Carreras
            </Link>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Badge variant="secondary" className="text-xs md:text-sm">
                {categoryLabel}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs md:text-sm border-primary-foreground/30 text-primary-foreground"
              >
                <Clock className="w-3 h-3 mr-1" />
                {program.duration}
              </Badge>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
              {program.name}
            </h1>
            <p className="hidden md:block mt-4 text-lg text-primary-foreground/80 max-w-3xl leading-relaxed">
              {program.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:hidden">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/inscripcion">
                  Inscríbete
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="#programa-contenido">Ver programa</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile description — readable section below compact hero */}
      <section className="md:hidden border-b bg-background">
        <div className="container mx-auto px-4 py-8">
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Sobre esta carrera
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {program.description}
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted p-3 text-center">
              <dt className="text-xs text-muted-foreground">Duración</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {program.duration}
              </dd>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <dt className="text-xs text-muted-foreground">Materias</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {totalSubjects}
              </dd>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <dt className="text-xs text-muted-foreground">Tipo</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {categoryLabel}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Program Details */}
      <section id="programa-contenido" className="py-10 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="plan-estudio" className="w-full">
                <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
                  <TabsList className="inline-flex w-max min-w-full md:grid md:w-full md:grid-cols-4 h-auto gap-1 p-1">
                    <TabsTrigger
                      value="plan-estudio"
                      className="text-xs md:text-sm whitespace-nowrap px-3"
                    >
                      Plan de Estudio
                    </TabsTrigger>
                    <TabsTrigger
                      value="ingreso"
                      className="text-xs md:text-sm whitespace-nowrap px-3"
                    >
                      Perfil de Ingreso
                    </TabsTrigger>
                    <TabsTrigger
                      value="egreso"
                      className="text-xs md:text-sm whitespace-nowrap px-3"
                    >
                      Perfil de Egreso
                    </TabsTrigger>
                    <TabsTrigger
                      value="campo"
                      className="text-xs md:text-sm whitespace-nowrap px-3"
                    >
                      Campo Laboral
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="plan-estudio" className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {program.semesters.map((semester) => (
                      <AccordionItem
                        key={semester.number}
                        value={`semester-${semester.number}`}
                      >
                        <AccordionTrigger className="text-base">
                          <span className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {semester.number}
                            </span>
                            Cuatrimestre {semester.number}
                            <span className="text-muted-foreground text-sm ml-2">
                              ({semester.subjects.length} materias)
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                            {semester.subjects.map((subject) => (
                              <li
                                key={subject}
                                className="flex items-center gap-2 text-muted-foreground"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                {subject}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                <TabsContent value="ingreso" className="mt-6">
                  <div className="flex items-start gap-4 p-6 bg-muted rounded-lg">
                    <UserCheck className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Perfil de Ingreso
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.perfilIngreso}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="egreso" className="mt-6">
                  <div className="flex items-start gap-4 p-6 bg-muted rounded-lg">
                    <GraduationCap className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Perfil de Egreso
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.perfilEgreso}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="campo" className="mt-6">
                  <div className="flex items-start gap-4 p-6 bg-muted rounded-lg">
                    <Briefcase className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Campo Laboral
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.campoLaboral}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 lg:col-start-3 lg:row-start-1">
              <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">
                <div className="hidden md:block p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">
                    Información Rápida
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Duración
                      </dt>
                      <dd className="font-medium">{program.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Categoría
                      </dt>
                      <dd className="font-medium">{categoryLabel}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Total de Materias
                      </dt>
                      <dd className="font-medium">{totalSubjects}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Validez Oficial
                      </dt>
                      <dd className="font-medium">SEP (Clave: 28PSU0198S)</dd>
                    </div>
                  </dl>
                </div>

                <Button asChild size="lg" className="w-full hidden md:flex">
                  <Link href="/inscripcion">
                    Inscríbete en esta Carrera
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/contacto">Solicitar Información</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Link
                    href={`https://wa.me/528991604645?text=${encodeURIComponent(`Hola, me interesa la carrera de ${program.name}. ¿Podrían darme más información?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Consultar por WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
