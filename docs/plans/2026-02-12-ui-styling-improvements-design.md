# UI & Styling Improvements — Design Document

**Date:** 2026-02-12
**Status:** Approved
**Approach:** A — Polish & Populate

## Overview

Improve the visual quality and "aliveness" of the UFN website while keeping its professional academic focus. The site currently has zero images (empty `/public/images/`), monotonous section rhythm, and functional-but-flat components. This design addresses spacing/rhythm, adds images throughout, and introduces two new sections (Testimonials + Campus Gallery).

**Tone:** Modern & approachable
**Color palette:** Keep existing dark blue (`--primary`) + golden yellow (`--secondary`), no changes
**Image strategy:** Mix of real campus photos + stock photography from Unsplash/Pexels

---

## 1. Hero Section — Background Image + Overlay

**File:** `src/components/sections/Hero.tsx`

- Add optional `backgroundImage` prop (string path)
- When provided: render Next.js `<Image>` with `fill` + `object-cover` + `priority`
- Apply dark blue overlay (`bg-primary/70`) on top of image
- Keep existing text, CTA, and SVG wave decoration
- When no image provided: fall back to current gradient behavior
- Home page uses campus/student hero image; sub-pages stay gradient-only

## 2. Spacing & Rhythm Improvements

**Files:** Multiple page files, `SectionHeading.tsx`

- **SectionHeading:** Widen the yellow underline from `w-16` to `w-20`, add `mb-3` instead of `mt-2` on subtitle for better spacing
- **Section backgrounds:** Add a subtle dot pattern or gradient variation to break the flat `bg-muted` / `bg-background` alternation on key sections
- **Intro text blocks:** Ensure `max-w-3xl mx-auto` on descriptive paragraphs across all pages
- **Visual separators:** Add subtle decorative elements (thin gradient lines or spacing increases) between major page sections

## 3. Program Cards — Add Image Area

**Files:** `src/components/ui/ProgramCard.tsx`, `src/types/index.ts`, `src/data/programs.ts`

- Add `image` field to `Program` type (optional string)
- Add image area at top of each card (~160px, `object-cover`, rounded top corners)
- Structure: Image → Icon + Badge → Title → Description → Duration → Link
- Add stock images per program in `/public/images/programs/`
- Subtle zoom-on-hover effect on the image

## 4. Feature Cards — Hover Polish

**File:** `src/app/(site)/page.tsx` (Why UFN section)

- Add `transition-all hover:-translate-y-1 hover:shadow-md` for lift effect
- Add a thin top border accent (`border-t-2 border-primary`) on each card
- Keep existing structure and content

## 5. New Section: Testimonials

**Files:** New `src/components/sections/Testimonials.tsx`, new `src/data/testimonials.ts`

- Location: After "Why UFN", before Social Feed on home page
- SectionHeading: "Lo que dicen nuestros estudiantes"
- 3-column responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card: quote text, circular student photo, name, program/year
- Background: `bg-background` (white) to contrast with adjacent sections
- Placeholder data with stock photos in `/public/images/testimonials/`

## 6. New Section: Campus Gallery

**Files:** New `src/components/sections/CampusGallery.tsx`

- Location: After Testimonials, before Social Feed on home page
- SectionHeading: "Vida en el Campus"
- CSS grid layout: 3 columns with varying row spans for visual interest
- 6-8 photos: campus exterior, classrooms, events, student life
- Next.js `<Image>` with hover overlay showing caption
- Images in `/public/images/campus/`
- Background: `bg-muted`

## 7. Header — Logo Image

**File:** `src/components/layout/Header.tsx`

- Add logo image next to text (or replace with image if logo file is provided)
- For now: add a styled graduation cap icon as visual mark before the text
- Use `w-8 h-8` icon in primary color

## 8. Footer — Dynamic Year

**File:** `src/components/layout/Footer.tsx`

- Change hardcoded `2025` to `{new Date().getFullYear()}`

---

## Image Assets Needed

All placeholder images use Unsplash/Pexels URLs via Next.js remote images (configured in `next.config.js`). They can be swapped for real campus photos later.

| Location | Count | Dimensions (approx) | Description |
|----------|-------|---------------------|-------------|
| Hero background | 1 | 1920x1080 | Campus or students in classroom |
| Program cards | 6 | 800x500 | Per-program representative images |
| Testimonials | 3-4 | 200x200 | Student portrait photos |
| Campus gallery | 6-8 | 800x600 | Campus life, events, facilities |

## Out of Scope

- Dark mode styling
- Animation library additions
- Color palette changes
- Admin dashboard UI changes
- Mobile app considerations
