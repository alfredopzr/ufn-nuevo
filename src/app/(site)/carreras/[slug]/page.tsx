import { Metadata } from "next";
import Link from "next/link";
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
  BookOpen,
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

  return (
    <>
      {/* Program Header */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link
            href="/carreras"
            className="inline-flex items-center text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Carreras
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary" className="text-sm">
              {categoryLabel}
            </Badge>
            <Badge
              variant="outline"
              className="text-sm border-primary-foreground/30 text-primary-foreground"
            >
              <Clock className="w-3 h-3 mr-1" />
              {program.duration}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {program.name}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-3xl">
            {program.description}
          </p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="descripcion" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="descripcion" className="text-xs md:text-sm">
                    Descripción
                  </TabsTrigger>
                  <TabsTrigger value="ingreso" className="text-xs md:text-sm">
                    Perfil de Ingreso
                  </TabsTrigger>
                  <TabsTrigger value="egreso" className="text-xs md:text-sm">
                    Perfil de Egreso
                  </TabsTrigger>
                  <TabsTrigger value="campo" className="text-xs md:text-sm">
                    Campo Laboral
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="descripcion" className="mt-6">
                  <div className="flex items-start gap-4 p-6 bg-muted rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Descripción General
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>
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

              {/* Curriculum */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Plan de Estudios</h2>
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 bg-muted rounded-lg">
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
                      <dd className="font-medium">
                        {program.semesters.reduce(
                          (acc, s) => acc + s.subjects.length,
                          0
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Validez Oficial
                      </dt>
                      <dd className="font-medium">SEP (Clave: 28PSU0198S)</dd>
                    </div>
                  </dl>
                </div>

                <Button asChild size="lg" className="w-full">
                  <Link href="/inscripcion">
                    Inscríbete en esta Carrera
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/contacto">Solicitar Información</Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full border-green-500 text-green-600 hover:bg-green-50">
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
