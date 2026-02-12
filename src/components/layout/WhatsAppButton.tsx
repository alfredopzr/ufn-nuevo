"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ message }: { message?: string }) {
  const href = message
    ? `https://wa.me/528991604645?text=${encodeURIComponent(message)}`
    : "https://wa.me/528991604645";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />
      <MessageCircle className="relative h-7 w-7" />
    </Link>
  );
}
