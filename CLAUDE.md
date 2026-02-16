# UFN Nuevo — University Admissions Platform

## Overview

Public-facing university website and admissions system for Universidad Frontera Norte (Reynosa, Tamaulipas). Anonymous applicants submit applications with documents; authenticated admins review, manage, and communicate.

## Hard Rules

NEVER:
- Create a Supabase table without RLS enabled and at least one policy
- Use the service role key in client-side code
- Skip Zod validation in server actions
- Commit `.env` or `.env.local` files
- Use `"use client"` on a component that only fetches data
- Use inline styles — use Tailwind + CSS variables from theme.css
- Use `any` in TypeScript — prefer `unknown`
- Import from `@/lib/supabase/server` in a Client Component

ALWAYS:
- Use Server Components by default
- Add `revalidatePath()` after mutations in server actions
- Validate with Zod before database operations
- Use `@/` path alias for imports
- Check known-issues.md before debugging a new error
- Follow knowledge-hub skills for standard operations

## Tech Stack

- Next.js 14 (App Router) + TypeScript 5
- Supabase (PostgreSQL) with Row-Level Security
- Tailwind CSS + shadcn/ui
- Zod validation
- Resend (email service)
- jspdf + jspdf-autotable (PDF export)
- xlsx (Excel/CSV export)

## Knowledge Hub Integration

| Operation | Skill |
|-----------|-------|
| Adding a new database table + CRUD UI | `knowledge-hub/skills/add-entity-with-crud.md` |
| Adding a user role with RLS | `knowledge-hub/skills/add-role-with-rls.md` |
| Debugging an error | First check `knowledge-hub/troubleshooting/known-issues.md` |

Reference docs:
- Stack conventions: `knowledge-hub/reference/stack-conventions.md`
- Supabase patterns: `knowledge-hub/reference/supabase-patterns.md`
- Anti-patterns: `knowledge-hub/reference/anti-patterns.md`

All paths relative to `~/Documents/Projects/experimentation/`.

## Database

### Tables

| Table | Purpose | RLS Pattern |
|-------|---------|-------------|
| applications | Student admission applications | Two-tier: anon INSERT, auth full access |
| required_documents | Document requirements (INE, certificate) | Public SELECT active, auth manage |
| application_documents | Uploaded docs per application | Anon INSERT, auth SELECT/UPDATE |
| communications | Email/note threads per application | Auth only |

### Roles

| Role | Access | RLS Notes |
|------|--------|-----------|
| Anonymous | Submit applications and upload documents | INSERT only on applications + documents |
| Authenticated (Admin) | Full access to all tables | All operations on all tables |

## Routes

```
app/
├── (site)/
│   ├── page.tsx              # Homepage (Hero, Stats, Programs, etc.)
│   ├── carreras/             # Program catalog
│   ├── carreras/[slug]/      # Program detail (curriculum, profiles)
│   ├── inscripcion/          # Enrollment form (public)
│   ├── noticias/             # News listing
│   ├── contacto/             # Contact form
│   └── preguntas-frecuentes/ # FAQ
├── admin/
│   ├── login/                # Admin auth
│   └── (dashboard)/
│       ├── page.tsx           # Dashboard overview (stats)
│       ├── aplicaciones/      # Application list with filters
│       ├── aplicaciones/[id]/ # Application detail (docs, comms, status)
│       ├── noticias/          # News CMS (create, edit, publish)
│       └── fechas/            # Important dates management
```

## Key Features

- **Enrollment form**: Multi-step with document uploads to Supabase Storage
- **Application management**: Status workflow (nueva → en_revisión → aceptada/rechazada)
- **Document tracking**: Per-application checklist with approval states
- **Communications**: Email via Resend + internal notes
- **Export**: CSV, XLSX, PDF per application
- **News CMS**: Create/publish articles, email blast to filtered applicants
- **6 academic programs**: Full curriculum data in `src/data/programs.ts`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
RESEND_API_KEY=
```

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
```

## Auto-Maintenance

During development on this project:
1. When solving a non-trivial error, append to `~/Documents/Projects/experimentation/knowledge-hub/troubleshooting/known-issues.md`
2. When discovering a reusable pattern, add to the appropriate `knowledge-hub/reference/` doc
3. When a skill has gaps, update the skill file directly
