# Mascota "Pauraques" — Integration Plan

**Status:** Blocked on assets (images pending).
**Owner:** Alfredo
**Created:** 2026-04-22

## Goal

Surface the institutional mascot ("Pauraques") on the public site as part of the brand identity story. The mascot is described as "un elemento fundamental de identificación para docentes y estudiantes," tied to university identity and values.

## Assets needed (provide before implementation)

1. **Primary mascot illustration** — PNG or SVG, transparent background, ideally rendered at ≥1200px on the long edge. Used as the hero image of the section.
2. *(Optional)* **Secondary pose/variant** — for visual richness on larger screens or as a decorative element.
3. *(Optional)* **Short etymology blurb** — one sentence on what a "pauraque" is (the bird) and why it was chosen, if we want to extend the copy beyond what's in `docs/mision-vision-valores.md`.

Drop files into `src/assets/mascota/` (create the folder). Suggested names: `pauraques-primary.png`, `pauraques-secondary.png`.

## Recommended placement

**Homepage, new section between `Valores` and `Testimonials`.**

Rationale: the mascot is explicitly linked to "los valores y principios" of the institution, so it sits naturally right after the Values block and before external validation (testimonials).

## Section design

Two-column layout on desktop, stacked on mobile:

- **Left column:** mascot image (full-bleed within column, no frame — let the illustration breathe).
- **Right column:**
  - Kicker: `NUESTRA IDENTIDAD` (small, uppercase, primary color)
  - Heading: `Pauraques`
  - Subheading/tagline: `Nuestra mascota, símbolo de identidad`
  - Body: the copy from `docs/mision-vision-valores.md`:
    > "La mascota de la institución es un elemento fundamental de identificación para docentes y estudiantes. Su imagen va ligada directamente tanto a la identidad de la universidad, como a los valores y principios de la misma."
  - *(Optional)* a small chip/badge noting it's a native nocturnal bird of the region, if user provides the etymology blurb.

Background: `bg-muted` to contrast with the `bg-background` of the Valores section above it (alternating rhythm matches the rest of the homepage).

## Files to create/modify

1. **Create** `src/components/sections/Mascota.tsx`
   - Server Component (no interactivity needed).
   - Imports `next/image` and the asset from `@/assets/mascota/pauraques-primary.png`.
   - Uses `SectionHeading` only if we want a centered title variant — otherwise, inline heading inside the two-column layout.
   - Tailwind responsive: `grid grid-cols-1 md:grid-cols-2 gap-10 items-center`.

2. **Modify** `src/app/(site)/page.tsx`
   - Import `Mascota` alongside the other section imports.
   - Insert `<Mascota />` between `<Valores />` and `<Testimonials />`.

## Copy (final, ready to paste)

```
Kicker:   Nuestra Identidad
Heading:  Pauraques
Lead:     Nuestra mascota, símbolo de identidad institucional.
Body:     La mascota de la institución es un elemento fundamental de
          identificación para docentes y estudiantes. Su imagen va ligada
          directamente tanto a la identidad de la universidad, como a los
          valores y principios de la misma.
```

## Accessibility & performance

- `alt` text on the image: `"Pauraques, mascota de la Universidad Frontera Norte"`.
- Use `priority={false}` — section is below the fold.
- If the asset is an SVG, inline via `next/image` with `unoptimized` or import as a React component for sharper rendering.
- Ensure the section respects the existing `section` padding rhythm: `py-16 md:py-24`.

## Out of scope (for now)

- No dedicated `/mascota` page. If the user later wants deeper lore, spin it off as `app/(site)/mascota/page.tsx` with extended story, gallery, and usage guidelines.
- No mascot-themed decorative elements on other pages (Hero, Footer, etc.) until the brand feels cohesive with the single section.

## Acceptance checklist

- [ ] Assets provided and placed in `src/assets/mascota/`.
- [ ] `Mascota.tsx` renders correctly at mobile (375px), tablet (768px), and desktop (1280px).
- [ ] Image has proper `alt` text and loads lazily.
- [ ] Section sits between Valores and Testimonials on the homepage.
- [ ] No layout shift; image uses `width`/`height` or fill with aspect-ratio container.
- [ ] Type check passes (`npx tsc --noEmit`).
