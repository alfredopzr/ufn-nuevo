import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site";
import {
  Phone,
  MessageCircle,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para más información sobre carreras universitarias, inscripciones y servicios de la Universidad Frontera Norte en Reynosa.",
};

const socialLinks = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
];

export default function ContactoPage() {
  return (
    <>
      <Hero
        title="Contacto"
        subtitle="Estamos aquí para responder todas tus preguntas y apoyarte en tu camino académico"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SectionHeading
                title="Envíanos un Mensaje"
                subtitle="Revisamos todas las consultas y nos pondremos en contacto contigo lo antes posible para apoyarte en tus metas académicas."
                centered={false}
              />
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dirección</p>
                      <p className="text-sm font-medium">
                        {siteConfig.address.full}
                      </p>
                      <a
                        href={siteConfig.address.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                      >
                        Ver en Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="rounded-lg overflow-hidden border h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.2!2d-98.2861!3d26.0925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866504e0e0e0e0e0%3A0x0!2sJ.+B.+Chapa+787%2C+Centro%2C+88500+Reynosa%2C+Tamps.!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la Universidad Frontera Norte"
            />
          </div>
        </div>
      </section>
    </>
  );
}
