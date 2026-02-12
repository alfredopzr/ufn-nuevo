"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  instagramPosts,
  facebookPosts,
  instagramProfileUrl,
  facebookProfileUrl,
} from "@/data/social-feed";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement) => void;
      };
    };
  }
}

function loadScript(src: string, onLoad: () => void) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    onLoad();
    return;
  }
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.addEventListener("load", onLoad);
  document.body.appendChild(script);
}

export default function SocialFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [igReady, setIgReady] = useState(false);
  const [fbReady, setFbReady] = useState(false);

  const hasInstagram = instagramPosts.length > 0;
  const hasFacebook = facebookPosts.length > 0;

  useEffect(() => {
    if (hasInstagram) {
      loadScript("https://www.instagram.com/embed.js", () => {
        setIgReady(true);
        window.instgrm?.Embeds.process();
      });
    }
    if (hasFacebook) {
      loadScript(
        "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v18.0",
        () => {
          setFbReady(true);
          window.FB?.XFBML.parse();
        }
      );
    }
  }, [hasInstagram, hasFacebook]);

  useEffect(() => {
    if (igReady && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [igReady]);

  useEffect(() => {
    if (fbReady && window.FB) {
      window.FB.XFBML.parse();
    }
  }, [fbReady]);

  if (!hasInstagram && !hasFacebook) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Síguenos en Redes"
          subtitle="Mantente al día con las novedades de la Universidad Frontera Norte"
        />

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {instagramPosts.map((postUrl) => (
            <div
              key={postUrl}
              className="flex justify-center max-w-[360px] mx-auto w-full"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={postUrl}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "3px",
                  boxShadow:
                    "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: "0",
                  maxWidth: "540px",
                  minWidth: "260px",
                  padding: 0,
                  width: "100%",
                }}
              >
                <div className="p-4 text-center">
                  <Instagram className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Ver publicación en Instagram
                  </a>
                </div>
              </blockquote>
            </div>
          ))}

          {facebookPosts.map((postUrl) => (
            <div
              key={postUrl}
              className="flex justify-center max-w-[360px] mx-auto w-full"
            >
              <div
                className="fb-post"
                data-href={postUrl}
                data-width="360"
                data-show-text="true"
              >
                <div className="p-4 text-center">
                  <Facebook className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Ver publicación en Facebook
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
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
