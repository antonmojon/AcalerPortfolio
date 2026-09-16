# Plan: Editorial Brutalism Case Study Page

## Context

Build a full-page case study web page from a Figma-style brief describing a refined brutalist editorial layout (Loop Studio / Night Shift reference). The project is a blank React + Vite + Tailwind v4 app. Texts and project name will be supplied by the user after implementation; for now we use thematic placeholder content. The user wants full interactivity: scroll-triggered fade-in/slide-up animations, hover effects, and section transitions.

---

## Approach

### Stance
Refined editorial brutalism: flat, high-contrast, razor-thin rules, extreme typographic scale, disciplined whitespace. No gradients, no rounded corners (0px radius throughout), no drop shadows — structure comes from layout and typography alone.

### Font Pairing
- **Display / Title**: Inter (700–900) — tight tracking (-3%), line-height 95%  
- **Body**: Inter (400) — 18px, line-height 150%, #1A1A1A  
- **Labels / Metadata**: Inter (500) uppercase, 14px, letter-spacing +5%  
Source: Google Fonts. Wire via `@import` in `src/index.css`.

### Palette
| Token | Value |
|---|---|
| Background | `#FAFAFA` |
| Foreground | `#1A1A1A` |
| Border | `#E0E0E0` |
| Muted surface | `#E5E5E5` |
| Accent | `#1A1A1A` (inverted button) |

---

## File Plan

### `src/index.css`
1. Add Google Fonts `@import` for Inter (weights 400, 500, 700, 900) **before** `@import 'tailwindcss'`
2. Add Tailwind v4 `@theme` block with design tokens (background, foreground, border, muted, font sizes for display/label/body)
3. Add global CSS: `font-family: 'Inter', sans-serif`, scrollbar hiding, scroll-behavior smooth

### `src/App.tsx`
Wire all section components in order. Add `useScrollReveal` hook inline or in a small utility.

### Components (all in `src/components/`)

#### `Navbar.tsx`
- Full-width, `padding: 0 80px`, 24px vertical padding
- Left: logo/wordmark (placeholder text)
- Right: nav links with `gap-8`, subtle underline hover transition
- Sticky with `position: sticky; top: 0; z-index: 50; background: #FAFAFA`
- Thin 1px bottom border on scroll (via `useState` + scroll listener)

#### `Hero.tsx`
- **Metadata row**: `VISUAL IDENTITY · 2022` in label style (14px, uppercase, +5% tracking), columns 1–2
- **Title**: `NIGHT SHIFT` in display style — Inter 900, ~130px, letter-spacing -3%, line-height 95%; fills container width, animates word-by-word stagger on load
- **Hero image**: Full 12-column width, 760px height, `#E5E5E5` placeholder background; Unsplash image overlaid with `object-fit: cover`

#### `EditorialContent.tsx`
- Two-column asymmetric grid: left 4 cols (metadata/team), right 8 cols
- Right column contains: 28px summary paragraph + three labeled text blocks (Overview, Challenge, Approach)
- Each text block reveals on scroll via Intersection Observer

#### `GalleryFeed.tsx`
- 10-column centered container, `gap: 120px` vertically
- Three image cards, 2:3 aspect ratio (e.g. 560×840), 0px border-radius
- Hover: subtle scale(1.02) + box-shadow transition on the image
- Each card staggered scroll reveal

#### `QuoteBlock.tsx`
- Centered, max-width 900px
- Quote in 48px Medium with leading quotation mark treatment
- Attribution: 48px avatar circle + name, right-aligned
- Scroll reveal on entry

#### `NextProject.tsx`
- Full-width section, `padding: 80px`
- Label: `NEXT PROJECT` in metadata style
- Massive project name (`BLACKLINE`) in display style — hover inverts background (white → black, text → white) with CSS transition
- Cursor: arrow + custom `→`

#### `Footer.tsx`
- 1px top border `#E0E0E0`
- 12-column layout: left copyright, right social links + colophon
- Padding: 40px 80px

---

## Animation System

Custom `useScrollReveal` hook using `IntersectionObserver`:
```ts
// triggers CSS class 'revealed' when element enters viewport
// default: fade-up (opacity 0→1, translateY 24px→0)
// stagger: child elements animate with 80ms delay increments
```

CSS classes in `index.css`:
```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.revealed { opacity: 1; transform: translateY(0); }
.reveal-stagger > * { /* nth-child delay increments */ }
```

Hero title: word-split animation on mount (no observer needed, triggers immediately).

---

## Critical Files to Modify
- `src/index.css` — fonts, tokens, global CSS, animation classes
- `src/App.tsx` — import and render all section components
- `src/components/Navbar.tsx` — new file
- `src/components/Hero.tsx` — new file
- `src/components/EditorialContent.tsx` — new file
- `src/components/GalleryFeed.tsx` — new file
- `src/components/QuoteBlock.tsx` — new file
- `src/components/NextProject.tsx` — new file
- `src/components/Footer.tsx` — new file

---

## Unsplash Images (placeholders)
- Hero: wide dark editorial photo (studio/architecture)
- Gallery card 1: vertical portrait/texture
- Gallery card 2: vertical product/typography
- Gallery card 3: vertical dark atmospheric

---

## Verification
1. Check the preview panel: scroll through all 6 sections
2. Verify scroll animations trigger correctly at each section
3. Test hover states: nav links, gallery cards, next project block
4. Confirm no build errors (Vite hot reload)
5. Check responsive behavior at ~1000px breakpoint (grid collapses, text scales)

---

## Notes for When Texts Arrive
All hardcoded strings (title, body copy, names, project name in NextProject) are isolated in each component's JSX — easy single-file replacements. The user will provide: project name, metadata tags, summary text, three editorial text blocks, quote, attribution name, and next project name.
