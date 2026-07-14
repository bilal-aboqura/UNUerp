# UNU ERP Design System

## Creative direction

**Concept: The Connected Ledger**

UNU should feel like the operational surface a leadership team can trust when finance, sales, inventory, people, and delivery all need to agree. The physical scene is a regional operations leader reviewing live decisions in a bright meeting room while the underlying system remains calm, exact, and always current.

The brand voice is **precise, grounded, and kinetic**. It avoids the visual language of both dense legacy ERP and decorative AI-SaaS spectacle.

## Color system

The system uses a committed dark operational canvas in the homepage hero and analytics story, then moves into crisp off-white working surfaces. Blue carries authority, cyan identifies action and live connections, violet provides controlled depth, and teal is reserved for healthy status.

| Token | Value | Role |
|---|---:|---|
| `--night` | `#07111f` | Immersive hero and high-authority background |
| `--night-raised` | `#0c1a2d` | Product previews and dark controls |
| `--blue` | `#243f7c` | Brand authority, headings, navigation state |
| `--cyan` | `#49c7f5` | Primary action and live data |
| `--cyan-deep` | `#1683ad` | Links, labels, chart strokes |
| `--violet` | `#7668e8` | Secondary data depth |
| `--teal` | `#35c6b0` | Connected and healthy state |
| `--ink` | `#101b2d` | Primary text on light surfaces |
| `--muted` | `#526078` | Supporting text on light surfaces |
| `--surface-cool` | `#f4f7fb` | Working surface |
| `--surface-blue` | `#eaf2fa` | Related operational content |
| `--line` | `#cbd5e2` | Structural rules and fields |

Cyan always means action, connection, or live state. It is not used as decoration across whole sections.

## Typography

- **Sora** is retained as the English display face because it is already part of the UNU identity and gives enterprise statements compact authority.
- **Manrope** is retained for English body and interface copy.
- **IBM Plex Sans Arabic** is loaded through `next/font` for a first-class Arabic hierarchy with appropriate weight and line height.
- Display headings use responsive `clamp()` sizing, a maximum of 89.6px, line height near 1.02–1.08, and never track tighter than `-0.04em`.
- Prose is capped near 64–70 characters and uses `text-wrap: pretty`; headings use `text-wrap: balance`.

All fonts are loaded through the Next.js font pipeline to prevent external CSS font blocking and reduce layout shift.

## Layout principles

1. **One dominant idea per fold.** Major sections lead with one statement and one meaningful visual or workflow.
2. **Structure before decoration.** Rules, tonal changes, and spatial grouping carry hierarchy; shadows are limited to interactive controls and product previews.
3. **Connected sequences over card grids.** Capabilities, products, principles, and FAQ content use editorial rows and operational flows.
4. **Controlled geometry.** Content surfaces stop at 16px radius; pill geometry belongs to buttons, tags, and compact controls.
5. **Logical properties first.** Spacing and positioning use inline/block properties so English and Arabic share the same implementation safely.

## Homepage hero

The homepage hero is an immersive, centered operating-system composition rather than a split text-and-dashboard template. A central control console emerges below the headline, with finance, sales, inventory, and people nodes connected through data paths. The visualization uses HTML, CSS, and lightweight SVG so it stays sharp, responsive, and meaningful without adding a large image or animation library.

On mobile, the console becomes the dominant cropped focus view and only the two highest-value satellite states remain. The headline and primary call to action remain visible before the product surface begins.

## Motion system

- One staggered hero entrance sequence for badge, statement, explanation, actions, and trust signals.
- Product-console rise, chart-line draw, status pulse, data-path flow, and restrained depth drift.
- Intersection Observer enhances section arrival while content remains visible by default.
- Desktop pointer movement adds a very small console perspective shift and is disabled on touch devices.
- Navigation blur and density respond to scroll position.
- Menus, buttons, accordions, and rows use the shared exponential easing curve.
- `prefers-reduced-motion: reduce` removes all non-essential animation and preserves every visible state.

## Components

- `Page`, `Header`, `Footer`
- `NavLinks`, `MobileMenu`, `LocaleSwitch`
- `HomePage`
- `CommandCenter`, `DetailVisual`, `PageVisual`
- `PageHero`
- `ContactForm`
- `ArabicProducts`, `EnglishProducts`

## Accessibility rules

- One visible `h1` per route and semantic section hierarchy.
- Skip link, keyboard-visible focus, `aria-current`, localized navigation labels, and status announcements.
- Mobile menu locks body scroll, moves focus into the menu, closes with Escape, and returns focus to the trigger.
- Controls maintain practical 44–48px targets.
- Light/dark text pairs are selected for WCAG AA body contrast.
- No information relies only on color; live states include text and shape.

## Responsive rules

- Primary breakpoints: 900px for navigation/layout recomposition and 640px for mobile focus views.
- Tested widths: 320, 360, 375, 390, 430, 768, 1024, 1280, and 1440px.
- Desktop sticky storytelling becomes normal document flow on tablet/mobile.
- Product rows, detail pages, forms, and page heroes become single-column compositions.
- Decorative connectors are removed on mobile; core product information remains.
- All pages use `overflow-x: clip` as a final containment guard while tests verify no layout element creates horizontal overflow.

## Do not use

- Gradient text
- Decorative glass surfaces as a default
- Unverified metrics, awards, testimonials, or customer names
- Warm cream/sand backgrounds
- Repeated icon-card grids
- Colored side stripes
- More than 16px radius on content surfaces
- Border-plus-wide-shadow “ghost cards”
- Motion that gates content visibility or ignores reduced-motion preferences
