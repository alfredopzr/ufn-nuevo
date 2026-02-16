import type { StaticImageData } from "next/image";

export interface Program {
  slug: string;
  name: string;
  shortName: string;
  category: "licenciatura" | "ingenieria";
  description: string;
  perfilIngreso: string;
  perfilEgreso: string;
  campoLaboral: string;
  duration: string;
  semesters: Semester[];
  icon: string;
  image: StaticImageData;
  heroImage: StaticImageData;
}

export interface Semester {
  number: number;
  subjects: string[];
}

export interface SiteConfig {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  sepCredential: string;
  contact: ContactInfo;
  social: SocialLinks;
  address: Address;
}

export interface ContactInfo {
  phones: string[];
  whatsapp: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export interface Address {
  street: string;
  colony: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  full: string;
  googleMapsUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
}
