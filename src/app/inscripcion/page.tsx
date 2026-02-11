import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import EnrollmentForm from "@/components/ui/EnrollmentForm";
import { siteConfig } from "@/data/site";
import {
  ClipboardList,
  CheckCircle2,
  FileText,
  GraduationCap,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Inscripción",
  description:
    "Inscríbete en la Universidad Frontera Norte en Reynosa. Proceso de inscripción sencillo y diseñado para guiarte paso a paso.",
};

const steps = [
  {
    icon: ClipboardList,
    title: "Llena el Formulario",
    description:
      "Completa el formulario de inscripción con tu información personal y académica.",
  },
  {
    icon: CheckCircle2,
    title: "Recibe Confirmación",
    description:
      "Nuestro equipo revisará tu solicitud y te contactará para confirmar tu inscripción.",
  },
  {
    icon: FileText,
    title: "Entrega Documentos",
    description:
      "Presenta la documentación requerida en nuestras instalaciones para formalizar tu registro.",
  },
  {
    icon: GraduationCap,
    title: "Comienza Clases",
    description:
      "¡Bienvenido a la Universidad Frontera Norte! Inicia tu camino hacia el éxito profesional.",
  },
];

export default function InscripcionPage() {
  return (
    <>
      <Hero
        title="Inscríbete en la Universidad Frontera Norte"
        subtitle="Estás a punto de ser parte del CESFN. Nuestro proceso de inscripción es sencillo y está diseñado para guiarte paso a paso."
      />

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Proceso de Inscripción"
            subtitle="Sigue estos sencillos pasos para formar parte de nuestra comunidad universitaria"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute top-8 left-1/2 w-full h-px bg-border hidden lg:block -z-10" />
                <span className="inline-block bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full mb-2">
                  Paso {index + 1}
                </span>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Solicitud de Inscripción"
                subtitle="Agradecemos que por favor nos proporciones tu información completa para poder darte un mejor servicio."
                centered={false}
              />
              <EnrollmentForm />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">
                    ¿Necesitas ayuda?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Si tienes dudas sobre el proceso de inscripción, no dudes en
                    contactarnos. Estamos aquí para apoyarte.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Teléfonos
                        </p>
                        {siteConfig.contact.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:+52${phone.replace(/-/g, "")}`}
                            className="block text-sm font-medium hover:text-primary transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          WhatsApp
                        </p>
                        <a
                          href={`https://wa.me/52${siteConfig.contact.whatsapp.replace(/-/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-green-600 transition-colors"
                        >
                          {siteConfig.contact.whatsapp}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Dirección
                        </p>
                        <p className="text-sm font-medium">
                          {siteConfig.address.full}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
