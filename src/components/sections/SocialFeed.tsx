"use client";

import { useRef } from "react";
import Link from "next/link";
import { Instagram, Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  instagramPosts,
  facebookEmbeds,
  instagramProfileUrl,
  facebookProfileUrl,
} from "@/data/social-feed";

function igEmbedUrl(postUrl: string) {
  const clean = postUrl.replace(/\?.*$/, "").replace(/\/+$/, "");
  return `${clean}/embed/captioned/`;
}

function parseFacebookEmbed(embedHtml: string): { src: string; height: number } | null {
  const srcMatch = embedHtml.match(/src="([^"]+)"/);
  const heightMatch = embedHtml.match(/height="(\d+)"/);
  if (!srcMatch) return null;
  return {
    src: srcMatch[1],
    height: heightMatch ? parseInt(heightMatch[1], 10) : 690,
  };
}

function Carousel({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 320;
    const amount = cardWidth + 32;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        aria-label={label}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Fade edges to indicate scrollability */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-muted/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-muted/40 to-transparent" />

      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background border shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background border shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function SocialFeed() {
  const hasInstagram = instagramPosts.length > 0;
  const hasFacebook = facebookEmbeds.length > 0;

  if (!hasInstagram && !hasFacebook) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Síguenos en Redes"
          subtitle="Mantente al día con las novedades de la Universidad Frontera Norte"
        />

        {/* Instagram */}
        {hasInstagram && (
          <div className={hasFacebook ? "mb-12" : ""}>
            <div className="flex items-center gap-2 mb-6">
              <Instagram className="h-5 w-5 text-pink-500" />
              <h3 className="text-lg font-semibold">Instagram</h3>
            </div>
            <Carousel label="Publicaciones de Instagram">
              {instagramPosts.map((postUrl) => (
                <div
                  key={postUrl}
                  className="snap-start shrink-0 rounded-xl bg-background shadow-sm border overflow-hidden w-[300px] h-[430px]"
                >
                  <iframe
                    src={igEmbedUrl(postUrl)}
                    className="w-full border-0 -mt-[54px] h-[calc(100%+54px)]"
                    loading="lazy"
                    title="Publicación de Instagram"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Facebook */}
        {hasFacebook && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Facebook className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Facebook</h3>
            </div>
            <Carousel label="Publicaciones de Facebook">
              {facebookEmbeds.map((embedHtml, i) => {
                const parsed = parseFacebookEmbed(embedHtml);
                if (!parsed) return null;
                return (
                  <div
                    key={i}
                    className="snap-start shrink-0 w-[500px] rounded-xl shadow-sm border overflow-hidden"
                  >
                    <iframe
                      src={parsed.src}
                      width="500"
                      height={parsed.height}
                      className="border-0 block"
                      scrolling="no"
                      allowFullScreen
                      loading="lazy"
                      title="Publicación de Facebook"
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {hasInstagram && (
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link
                href={instagramProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Seguir en Instagram
              </Link>
            </Button>
          )}
          {hasFacebook && (
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link
                href={facebookProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="mr-2 h-5 w-5" />
                Seguir en Facebook
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
