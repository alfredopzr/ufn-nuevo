import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Universidad Frontera Norte",
    default:
      "Universidad Frontera Norte — Carreras Universitarias en Reynosa",
  },
  description: siteConfig.description,
  metadataBase: new URL("https://cesfn.edu.mx"),
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Universidad Frontera Norte",
    title: "Universidad Frontera Norte — Carreras Universitarias en Reynosa",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
