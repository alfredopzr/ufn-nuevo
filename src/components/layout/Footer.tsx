import Link from "next/link";
import {
  Phone,
  MapPin,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { siteConfig, navigation } from "@/data/site";
import { programs } from "@/data/programs";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Universidad Frontera Norte
            </h3>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              {siteConfig.description.slice(0, 160)}...
            </p>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              Clave SEP: {siteConfig.sepCredential}
            </span>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces R&aacute;pidos</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Carreras</h3>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={`/carreras/${program.slug}`}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {program.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{siteConfig.address.full}</span>
                </Link>
              </li>
              {siteConfig.contact.phones.map((phone) => (
                <li key={phone}>
                  <Link
                    href={`tel:+52${phone.replace(/-/g, "")}`}
                    className="flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{phone}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`https://wa.me/52${siteConfig.contact.whatsapp.replace(/-/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>WhatsApp: {siteConfig.contact.whatsapp}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-center text-sm text-primary-foreground/60">
            &copy; 2025 Universidad Frontera Norte. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
