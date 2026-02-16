# Next.js + Supabase Scaffold Template — Design

**Date:** 2026-02-12
**Status:** Approved
**Reference project:** ufn-nuevo

## Overview

A GitHub template repository that provides a ready-to-use scaffold for building Next.js + Supabase applications. Includes pre-built components, standardized CRUD patterns, theme-driven styling, and a comprehensive CLAUDE.md for Claude Code-driven customization.

## Goals

- Reduce project setup time by providing all common patterns pre-wired
- Support both marketing/landing sites and full-stack apps with admin panels
- Make rebranding/customization a matter of editing `site.config.ts` + `theme.css`
- No cleanup needed — unused components stay dormant in the codebase
- Standardize database schema, CRUD operations, and server action patterns

## Tech Stack

- Next.js 14 (App Router)
- TypeScript 5
- Tailwind CSS 3.4 (theme-driven via CSS variables)
- shadcn/ui (Radix UI)
- Supabase (Auth + PostgreSQL)
- Zustand (state management)
- Zod (validation)
- Lucide React (icons)

## Architecture

### File Structure

```
nextjs-supabase-scaffold/
├── CLAUDE.md                         # Comprehensive Claude Code guide
├── site.config.ts                    # Single source of truth for all site content
├── src/
│   ├── app/
│   │   ├── globals.css               # Imports theme + component + section styles
│   │   ├── layout.tsx                # Root layout (reads from site.config)
│   │   ├── (site)/                   # Public pages
│   │   │   ├── layout.tsx            # Header + Footer (data-driven from config)
│   │   │   └── page.tsx              # Homepage (composes sections)
│   │   └── admin/                    # Optional admin panel (pre-wired, auth-gated)
│   │       ├── login/
│   │       └── (dashboard)/
│   ├── components/
│   │   ├── layout/                   # Header, Footer, WhatsAppButton
│   │   ├── sections/                 # Hero, StatsBar, Testimonials, FAQ, Gallery, CTA
│   │   ├── ui/                       # shadcn/ui + custom (SectionHeading, Cards, etc.)
│   │   └── admin/                    # Admin components (tables, stats, forms)
│   ├── stores/                       # Zustand stores
│   │   ├── ui-store.ts               # Mobile menu, modals, toasts
│   │   ├── auth-store.ts             # Auth state
│   │   └── create-data-store.ts      # Factory for entity-level client state
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser Supabase client
│   │   │   ├── server.ts             # Server-side Supabase client
│   │   │   ├── middleware.ts          # Auth session management
│   │   │   ├── crud.ts               # createCrudService<T>() factory
│   │   │   └── schema/               # SQL migrations
│   │   │       ├── 000_extensions.sql
│   │   │       ├── 001_items.sql      # Example table
│   │   │       ├── _seed.sql          # Dev seed data
│   │   │       └── _rls_patterns.sql  # RLS policy reference
│   │   ├── utils.ts                  # cn() utility
│   │   └── validations.ts            # Zod schemas
│   ├── styles/
│   │   ├── theme.css                 # Design tokens (colors, fonts, spacing, radii)
│   │   ├── components.css            # Component classes via @apply
│   │   └── sections.css              # Section-level styles
│   ├── data/                         # Static data files
│   ├── types/
│   │   ├── index.ts                  # Core types
│   │   └── database.ts               # Database/entity types
│   └── middleware.ts                 # Next.js middleware for admin auth
├── tailwind.config.ts                # References CSS variables from theme.css
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
├── components.json                   # shadcn/ui config
└── package.json
```

### Content Hub — `site.config.ts`

Single file driving all site content. Header, Footer, Hero, StatsBar, and SEO metadata read from it.

```ts
export const siteConfig = {
  name: 'Acme Corp',
  tagline: 'Your tagline here',
  description: 'SEO description',
  url: 'https://example.com',
  locale: 'en',
  contact: { email, phone, whatsapp, address },
  social: { facebook, instagram, twitter, linkedin, youtube },
  nav: [{ label, href }],
  hero: { title, subtitle, cta: { label, href }, backgroundImage },
  stats: [{ value, label }],
  footer: { columns: [{ title, links }], copyright },
}
```

### Styling System

No inline styles. All styling in CSS files.

**Layer 1 — Theme tokens (`styles/theme.css`):**
CSS variables for colors, fonts, spacing, radii, shadows. Change these to retheme the entire site.

**Layer 2 — Component classes (`styles/components.css`):**
Semantic classes built with `@apply`:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`
- `.card`, `.card-header`, `.card-content`
- `.section`, `.section-alt`, `.container-narrow`
- `.input`, `.label`, `.badge`

**Layer 3 — Section styles (`styles/sections.css`):**
Section-specific classes:
- `.hero`, `.hero-overlay`, `.hero-title`
- `.stats-bar`, `.stat-item`, `.stat-value`
- etc.

**Tailwind config** maps to CSS variables so utilities still work for one-off layout tweaks.

### Database & CRUD

**Schema migrations** — Numbered SQL files in `src/lib/supabase/schema/`:
- Standard table template with RLS, triggers, indexes
- `_rls_patterns.sql` as reference for common policies (public-read, auth-full, owner-only)

**CRUD service factory** — `src/lib/supabase/crud.ts`:
```ts
export function createCrudService<T>(tableName: string) {
  return {
    getAll:  (options?: { filters?, orderBy?, limit? }) => Promise<T[]>,
    getById: (id: string) => Promise<T | null>,
    create:  (data: Omit<T, 'id' | 'created_at' | 'updated_at'>) => Promise<T>,
    update:  (id: string, data: Partial<T>) => Promise<T>,
    remove:  (id: string) => Promise<void>,
  }
}
```

**Server actions pattern** — Zod validation + CRUD + revalidation:
```ts
'use server'
export async function createItem(formData: FormData) {
  const parsed = itemSchema.safeParse(...)
  if (!parsed.success) return { error: parsed.error.flatten() }
  const item = await itemsService.create(parsed.data)
  revalidatePath('/items')
  return { data: item }
}
```

### State Management

**Zustand stores:**
- `ui-store.ts` — Mobile menu, modals, toasts
- `auth-store.ts` — Wraps Supabase auth state
- `create-data-store.ts` — Factory for entity-level client state (mirrors CRUD factory)

**Rules:**
- Server components: fetch via CRUD services directly
- Client components with shared state: use Zustand stores
- Component-local state: plain `useState`

### Component Architecture

**Pre-built, import only what you use:**

| Category | Components |
|----------|-----------|
| Layout | Header, Footer, WhatsAppButton |
| Sections | Hero, StatsBar, Testimonials, FAQ, Gallery, CTA |
| UI | SectionHeading, ProgramCard, NewsCard, ContactForm, Button, Card, Input, etc. |
| Admin | AdminNav, DataTable, DashboardStats, EntityForm, StatusSelector |

Homepage composes sections via imports — unused sections remain dormant.

### CLAUDE.md

Comprehensive guide with:
1. Project overview and architecture
2. Customization checklist (step-by-step)
3. Available components catalog with props and CSS class references
4. Coding conventions
5. Entity creation workflow (type → migration → service → actions → components)
6. File map

### Admin Panel

Pre-wired but optional:
- Login with Supabase email/password auth
- Dashboard with stats cards
- Generic data table with search, filter, export
- Entity forms with Zod validation
- Middleware-protected routes

## Customization Workflow

To create a new project:
1. `gh repo create my-project --template username/nextjs-supabase-scaffold`
2. Edit `site.config.ts` with project content
3. Edit `styles/theme.css` with brand colors
4. Define entities in `types/database.ts`
5. Create SQL migrations
6. Create CRUD services with `createCrudService<T>()`
7. Compose homepage from available sections
8. Write project-specific CLAUDE.md
