# Portfolio Antonio Calero — Capa Zero: Design & Architecture Directives

## 1. Aesthetic Identity & Taste (Swiss Editorial Brutalism)
- **Zero Generic Boxes**: Strictly ban generic rounded cards (`rounded-xl`, `rounded-2xl`) and drop shadows. Structure content through hairlines (`1px solid var(--border-color)`), deliberate whitespace, and asymmetric 12-column grids.
- **Architectural Blueprint ("Capa Zero")**:
  - The portfolio embodies "Layer 0" — the structural, technical foundation of interaction design.
  - Celebrate technical drafting details: 48px drafting background grid, vertical margin guidelines (80px), fine corner registration marks (`┌ ┐ └ ┘`), figure indexing (`FIG. 001`), and coordinate annotations in Space Mono.
- **Typographic Authority**:
  - Monumental uppercase display: *Special Gothic Expanded One* (`0.88` line-height, `-0.01em` tracking).
  - Editorial body: *Inter* (`1.5` - `1.65` line-height, comfortable 60-75ch measure).
  - Technical metadata: *Space Mono* (uppercase, tabular numbers, `0.06em` - `0.12em` tracking).

## 2. Senior UI/UX & Product Standards
- **Radical Affordance Honesty**:
  - Never render hover arrows `→`, underline lifts, or `cursor: pointer` on non-clickable elements.
  - Projects without published case studies (003, 004, 005) must remain static with `cursor: default` and an honest status badge (`[ PRÓXIMAMENTE ]` / `[ COMING SOON ]`). No broken links to dead-end screens.
- **Scroll & Spatial Stability**:
  - Never allow background scroll leakage during modals or intro animations.
  - When elements transition across screens, calculate exact subpixel bounding boxes in the DOM.
- **Privacy & Data Protection**:
  - Never display Antonio Calero's personal email or phone number in plaintext HTML to protect against web scrapers and spam. Always direct through the contact form or external social channels.

## 3. Workflow Protocol
- Proceed **strictly one step at a time** ("de uno en uno"). Never lump multiple large refactors together without asking.
- Maintain production-ready code with zero build warnings or runtime console errors.
