import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GoogleFormGuideProps {
  googleFormUrl: string;
}

const formTips = [
  {
    icon: User,
    text: "Ten preparados tus datos de contacto y la carrera de tu interés.",
  },
  {
    icon: FileText,
    text: "Responde todas las preguntas con la información más actualizada posible.",
  },
  {
    icon: Mail,
    text: "Usa un correo electrónico que revises con frecuencia para recibir nuestra respuesta.",
  },
];

export default function GoogleFormGuide({ googleFormUrl }: GoogleFormGuideProps) {
  const hasFormUrl = googleFormUrl.trim().length > 0;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-primary/20">
        <div className="bg-primary/5 border-b border-primary/10 px-6 py-4">
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
            Paso 2 · Completar formulario
          </span>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">
            Completa tu solicitud de inscripción
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Para continuar, llena nuestro formulario en línea. Te tomará unos
            minutos y nos ayudará a conocerte mejor para darte seguimiento
            personalizado.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <ol className="space-y-4">
            {formTips.map((tip, index) => (
              <li key={tip.text} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <tip.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="pt-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Antes de empezar
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    {index + 1}. {tip.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-lg border bg-muted/50 p-5">
            {hasFormUrl ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">¿Listo para continuar?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    El formulario se abrirá en una nueva pestaña de Google
                    Forms.
                  </p>
                </div>
                <Button asChild size="lg" className="shrink-0">
                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ir al formulario
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">Formulario en línea</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    El enlace al formulario estará disponible aquí muy pronto.
                    Mientras tanto, puedes contactarnos si deseas iniciar tu
                    proceso.
                  </p>
                </div>
                <Button size="lg" disabled className="shrink-0">
                  Enlace próximamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <div className="text-sm leading-relaxed">
              <p className="font-medium">Después de enviar el formulario</p>
              <p className="mt-1 text-green-800">
                Nuestro equipo de admisiones revisará tu información y se
                pondrá en contacto contigo para indicarte los siguientes pasos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        ¿Aún no has elegido carrera?{" "}
        <Link
          href="/carreras"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Explora nuestros programas académicos
        </Link>
      </p>
    </div>
  );
}
