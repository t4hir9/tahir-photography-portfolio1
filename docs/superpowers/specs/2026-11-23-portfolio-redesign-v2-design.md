# Portfolio Redesign v2 — Design Specification

**Date:** 2026-11-23
**Status:** Approved for implementation

---

## 1. Concept: "Frame by Frame, Line by Line"

The hero is a **single Remotion composition** — kinetic typography that writes itself. Each character reveals with staggered timing, color shifts from signal red to paper white, subtle spring physics. Behind it: a fixed atmospheric grade still (tip-8, near-invisible at ~3% opacity). No video, no scrubber, no layers. Just code-driven type.

Scroll past the hero → unified project grid. Film projects first (5), then tech projects (5). Cards retain their hover interactions (grade scrub / diff + live demo). No section headers — tags imply category.

---

## 2. Hero Copy

```
FRAME BY FRAME.
LINE BY LINE.
```

Two lines. Uppercase. Space Grotesk 700. `--text-hero` scale.

---

## 3. Token System (Extended)

### Color
```css
--void: #0A0A0A;
--paper: #F2F2F2;
--signal: #E63946;
--muted: #6B6B6B;
--layer-1: #111111;
--layer-2: #1A1A1A;
--border: rgba(242,242,242,0.08);
--bg-primary: var(--void);
--bg-elevated: var(--layer-1);
--bg-overlay: var(--layer-2);
--text-primary: var(--paper);
--text-secondary: var(--muted);
--accent: var(--signal);
--focus-ring: var(--signal);
```

### Typography
```css
--font-display: "Space Grotesk", sans-serif;
--font-body: "DM Sans", sans-serif;
--font-mono: "JetBrains Mono", monospace;

--text-hero: clamp(4rem, 12vw, 14rem);
--text-h1: clamp(2.5rem, 5vw, 4rem);
--text-body: clamp(1rem, 1.5vw, 1.125rem);
--text-small: 0.875rem;

--leading-tight: 1.05;
--leading-body: 1.6;
```

### Space
```css
--space-hero: clamp(6rem, 15vh, 12rem);
--space-section: clamp(4rem, 10vw, 8rem);
--gap: clamp(1rem, 3vw, 2rem);
--container-max: 1200px;
--container-padding: clamp(1.5rem, 4vw, 3rem);
```

### Motion
```css
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--duration-fast: 200ms;
--duration-slow: 800ms;
--stagger-delay: 40ms;
```

### Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

---

## 4. Component Architecture

### New Components
| Component | Purpose |
|-----------|---------|
| `HeroV2` | Orchestrates Remotion composition + background frame + scroll indicator |
| `TypeComposition` | Remotion inline composition: staggered character reveal, color shift, spring |
| `UnifiedGrid` | Mixed film + tech cards (film first, then tech) |
| `ScrollIndicator` | Subtle animated chevron |

### Retained Components (unchanged)
- `FilmCard` — hover grade scrub
- `TechCard` — hover diff expand + live demo
- `Footer` — minimal, unchanged
- All supporting components (TimelineHeader, ClipThumb, PlayheadIndicator, CommitHeader, DiffPreview, LiveDemo)

### Removed Components
- `LayerStack`, `VideoLayer`, `OverlayLayer`, `CodeLayer`, `TimelineScrubber`, `HeroMeta`
- `FilmSection`, `TechSection` (replaced by UnifiedGrid)

---

## 5. Page Structure

```tsx
<main>
  <HeroV2 />                    // 100vh, Remotion type, fixed background frame
  <UnifiedGrid />               // Film (5) + Tech (5) cards, mixed
</main>
<Footer />
```

---

## 6. Responsive Behavior

| Breakpoint | Hero | Grid |
|------------|------|------|
| Mobile (< 640px) | `--text-hero` = 4rem, 2-line stack | 1 col |
| Tablet (640–1024px) | `--text-hero` = 8rem | 2 col |
| Desktop (> 1024px) | `--text-hero` = 14rem | 3 col |

---

## 7. Accessibility

- `prefers-reduced-motion` → TypeComposition renders static (no stagger, no spring)
- Background frame: `aria-hidden`, fixed position, opacity 0.03
- Scroll indicator: `aria-hidden`, decorative
- All cards: retain existing keyboard + ARIA support
- Semantic HTML: `<main>`, `<section>`, `<article>`, `<footer>`

---

## 8. Performance

- **Hero video eliminated** → saves ~86MB MP4 + 12MB WebM
- **Remotion composition** → ~2KB JS, runs on main thread
- **Background frame** → single optimized WebP (from existing tip-8 grade still)
- **Grid images** → existing optimized thumbnails reused

---

## 9. Assets Needed

| Asset | Source | Treatment |
|-------|--------|-----------|
| Grade still (background) | tip-8 project | Extract frame → optimize WebP @ 1920w, ~3% opacity overlay |

---

## 10. Implementation Order

1. **Tokens** — Extend `tokens.css` with new tokens
2. **TypeComposition** — New Remotion inline composition
3. **HeroV2** — Orchestrator + background + scroll indicator
4. **UnifiedGrid** — Mixed film + tech grid
5. **Page integration** — Replace Hero + FilmSection + TechSection
6. **Cleanup** — Remove deprecated hero components
7. **Tests** — Update/add tests for new components
8. **Build verification** — Production build, lint, test