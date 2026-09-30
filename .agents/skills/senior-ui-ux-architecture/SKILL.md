---
name: senior-ui-ux-architecture
description: >-
  Senior UI/UX product design standards, interaction architecture, cognitive ergonomics, affordance honesty, and accessibility for digital platforms and portfolio systems. Use whenever auditing, designing, or refactoring user flows, component states, navigation, and usability.
---

# Senior UI/UX Architecture & Product Standards

## Principles of Master-Level Interaction Design

A Senior Product Designer's work is distinguished by **honesty of affordances, frictionless cognitive flow, and deep respect for the user's mental model**.

### 1. Radical Affordance Honesty
- **No False Promises**: Never render navigation arrows (`→`), hover lift, or `cursor: pointer` on elements that do not lead anywhere.
- **No Artificial Barriers**: Avoid fake loading screens, arbitrary progress freezes (e.g. freezing at 75%), or simulated delays that waste human attention.
- **Clear Status Communication**: If a piece of work is in progress, state it plainly and elegantly (`[ EN PROCESO ]` / `[ IN PROGRESS ]`) without deceiving the visitor into a dead end.

### 2. Spatial Stability & Scroll Integrity
- **Zero Scroll Hijacking**: Never fight the user's input devices. If an intro sequence or modal runs, lock the document cleanly; when released, restore native scrolling seamlessly without coordinate drift.
- **Anchored Layout**: Visual transitions must preserve spatial continuity. Elements that move between views (e.g. flying headlines, shared layout transitions) must measure exact target coordinates in the DOM, never rely on guessed offsets.
- **Scroll Memory & Back Navigation**: Respect browser history and back-button expectations.

### 3. Cognitive Ergonomics & Scannability
- **Hierarchy at a Glance**: A recruiter or client spends 15-30 seconds evaluating a portfolio. The masthead must immediately communicate who you are, what you design, where you operate, and how to reach out.
- **Predictable Navigation**:
  - Global brand link on the top-left returns home and scrolls smoothly to the top.
  - Section links (`Proyectos`, `Sobre mí`, `Contacto`) are always in fixed, reliable positions.
  - Language toggle switches without layout shifts or reloading.

### 4. Accessibility & Digital Privacy
- **Privacy by Design**: Never expose raw, un-obfuscated personal email addresses or phone numbers in plaintext HTML to protect the user from scrapers and spam farms. Use secure contact channels and validated contact forms.
- **Input Usability**: All input fields must retain native text selection cursors (`cursor: text`), clear placeholder examples, explicit labels, and distinct focus rings.
- **Contrast Ratios**: All informational text must pass WCAG AA standards (minimum 4.5:1 for body copy, 3:1 for large display). Muted metadata may use lower contrast only when purely supplemental.

### 5. Responsive Behavioral Parity
- **Desktop vs Mobile**: Do not simply shrink desktop layouts. Rethink column counts (12-col to 1-col), pad touch targets to at least 44x44px, and adjust monumental font clamps so text never breaks container boundaries.
