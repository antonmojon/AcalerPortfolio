---
name: design-taste-and-art-direction
description: >-
  Aesthetic judgment, editorial discernment, typographic discipline, Swiss design rigor, and artistic taste for high-end digital products, portfolios, and creative direction. Use whenever evaluating visual appeal, typography, composition, color harmony, and design quality.
---

# Design Taste & Art Direction

## Core Philosophy: The Editorial Swiss Discipline

True taste in digital design is the art of **subtraction, structural rigor, and uncompromising typographic hierarchy**. It rejects generic, formulaic templates in favor of principled, architectural craftsmanship.

### 1. The Anti-Generic Manifesto
- **Zero Clunky Cards**: Ban generic rounded boxes with `box-shadow: 0 10px 30px rgba(0,0,0,0.1)`. Structure content with hairlines (`1px solid var(--border-color)`), deliberate margins, and column alignment.
- **No Decorative Fluff**: Never add gradients, wavy dividers, or cartoonish illustrations just to "fill space". If an element has no structural or semantic purpose, remove it.
- **Negative Space is Architecture**: White space is not void; it is the tension that gives monumental typography its authority.

### 2. Typographic Rigor
- **Scale Contrast**: Create dramatic tension between monumental display headlines (e.g. *Special Gothic Expanded One* at 90-120px) and microscopic, crisp technical metadata (*Space Mono* at 10-12px).
- **Line Heights & Tracking**:
  - Monumental uppercase display: Tight line-height (`0.88` to `0.92`), negative tracking (`-0.01em` to `-0.02em`).
  - Editorial body copy: Generous line-height (`1.5` to `1.65`) with comfortable measure (60-75 characters per line).
  - Technical metadata: Open tracking (`0.06em` to `0.12em`), uppercase, tabular numerals (`font-variant-numeric: tabular-nums`).

### 3. Palette & Materiality
- **Monochrome Foundation**: Black, crisp off-whites, and architectural grays (`#111111`, `#FAFAFA`, `#E0E0E0`) provide the blueprint canvas.
- **Singular Intentional Accent**: Color is never casual. When an accent is deployed (e.g. electric red `#FD1843` or cyan `#02E7BC`), it functions as a laser marker, guiding focus to state changes, active links, or critical metadata.
- **Image Materiality**: Treat photography like printed editorial paper. Grayscale by default with controlled contrast (`contrast(1.04)`), revealing full spectrum only on deliberate interaction.

### 4. Architectural "Capa Zero" Blueprint Details
- **Drafting Guidelines**: Whisper-quiet background grids (48px multi-8pt grid at 3% opacity) and fixed margin guidelines (80px desktop) that ground the layout.
- **Registration Marks**: Fine corner marks (`┌ ┐ └ ┘`) and coordinate annotations (`FIG. 001`, `COORD: 40.4168° N`) that celebrate the technical drafting process.
- **Micro-Interactions**: Easing must feel physical and snappy, never linear. Always use custom cubic beziers (e.g. `cubic-bezier(0.16, 1, 0.3, 1)`) with durations between 250ms and 650ms.
