# Bundle A+B Features Design

**Date:** 2026-02-12
**Status:** Approved

## Overview

Seven lightweight features for the UFN university website, combining Bundle A (low-hanging fruit) and Bundle B (content engine). All features prioritize simplicity — minimal new dependencies, leveraging existing tech stack (Next.js 14, Supabase, shadcn/ui, Tailwind).

## Features

### 1. Instagram/Facebook Feed Embed

**Goal:** Surface existing social media content on the website without a CMS.

**Approach:** Client-side Instagram embed using the official `embed.js` script. A data file holds an array of Instagram post URLs. A React component renders `<blockquote class="instagram-media">` elements and loads the embed script once.

**Files:**
- `src/data/social-feed.ts` — Array of Instagram post URLs
- `src/components/sections/SocialFeed.tsx` — Grid component that renders embeds
- `src/app/(site)/page.tsx` — Add SocialFeed section before CTA

**No API keys required.** To update: staff adds/removes URLs in `social-feed.ts`.

### 2. FAQ Page (Preguntas Frecuentes)

**Goal:** Deflect repetitive student questions from staff.

**Approach:** New `/preguntas-frecuentes` route using existing Accordion component. Data-driven from a TypeScript file.

**Files:**
- `src/data/faq.ts` — Array of `{ question, answer, category }` objects
- `src/app/(site)/preguntas-frecuentes/page.tsx` — Page with grouped accordions
- `src/data/site.ts` — Add nav item

**Categories:** Admisiones, Costos y Pagos, Vida Académica, Documentos y Trámites.

### 3. Admin Dashboard Analytics Cards

**Goal:** Give staff instant visibility into application pipeline without exporting.

**Approach:** Aggregate the existing `applications` query results in the server component. No new database queries.

**Cards:**
- Total solicitudes
- Solicitudes este mes
- Breakdown by status (nueva, en revisión, aceptada, rechazada)
- Top program by application count

**Files:**
- `src/components/admin/DashboardStats.tsx` — Stats cards component
- `src/app/admin/(dashboard)/page.tsx` — Add DashboardStats above ApplicationsTable

### 4. WhatsApp Pre-filled Messages per Program

**Goal:** Higher-quality leads by knowing which program the prospect is interested in.

**Approach:** Add optional `message` prop to `WhatsAppButton`. On program detail pages, pass a pre-filled message with the program name. URL-encode into the `wa.me` link.

**Files:**
- `src/components/layout/WhatsAppButton.tsx` — Add `message` prop
- `src/app/(site)/layout.tsx` — Pass no message (default)
- `src/app/(site)/carreras/[slug]/page.tsx` — Render WhatsAppButton with program-specific message

**Message template:** "Hola, me interesa la carrera de {program.name}. ¿Podrían darme más información?"

### 5. Supabase-Powered News CMS

**Goal:** Let staff publish news without touching code.

**Approach:** New `noticias` Supabase table. Replace static `news.ts` import with server-side Supabase query. Simple admin CRUD page.

**Table schema:**
```sql
create table noticias (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  slug text unique not null,
  fecha date not null default current_date,
  extracto text not null,
  categoria text not null default 'General',
  contenido text not null,
  publicado boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**Files:**
- `src/app/(site)/noticias/page.tsx` — Query Supabase instead of static data
- `src/app/admin/(dashboard)/noticias/page.tsx` — List + create/edit/delete
- `src/app/admin/(dashboard)/noticias/[id]/page.tsx` — Edit form

**RLS:** Same pattern as applications — authenticated users can CRUD, public can read where `publicado = true`.

### 6. Fechas Importantes (Important Dates Widget)

**Goal:** Communicate deadlines and events without social media dependency.

**Approach:** New `fechas_importantes` Supabase table. Homepage widget showing upcoming dates. Simple admin page.

**Table schema:**
```sql
create table fechas_importantes (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  fecha date not null,
  descripcion text,
  activo boolean not null default true,
  created_at timestamptz default now()
);
```

**Files:**
- `src/components/sections/FechasImportantes.tsx` — Compact date list for homepage
- `src/app/(site)/page.tsx` — Add FechasImportantes section
- `src/app/admin/(dashboard)/fechas/page.tsx` — Admin CRUD

**Display logic:** Only show dates where `fecha >= today AND activo = true`, ordered by date ascending.

### 7. SEO Open Graph Meta Tags

**Goal:** Professional social media share cards when URLs are shared.

**Approach:** Enhance existing `generateMetadata` functions to include `openGraph` fields. Use a static OG image (no dynamic generation).

**Files:**
- `src/app/layout.tsx` — Add default OG metadata
- `src/app/(site)/carreras/[slug]/page.tsx` — Add program-specific OG tags
- `public/og-image.jpg` — Static OG image (provided by university or placeholder)

## Guide Document

A `docs/guides/nuevas-funcionalidades.md` will document:
- What each feature does
- SQL scripts to run for new Supabase tables + RLS policies
- How to manage content (social posts, FAQs, news, dates)
- Any environment variables needed

## Non-Goals

- No rich text editor for news (plain text/textarea is sufficient)
- No dynamic OG image generation
- No Instagram API authentication (embed-only approach)
- No real-time updates or WebSockets
- No new npm dependencies beyond what's already installed
