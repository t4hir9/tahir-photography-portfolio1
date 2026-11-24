# Portfolio Redesign v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the deconstructed-frame Hero + separate Film/Tech sections with a kinetic-type Remotion hero + unified project grid.

**Architecture:** New HeroV2 (Remotion type composition) + UnifiedGrid (mixed film/tech cards). Retain FilmCard, TechCard, Footer, and all supporting components. Remove deprecated hero components.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, CSS Modules, Remotion Player (inline composition), Shiki, local fonts (WOFF2).

**Spec:** docs/superpowers/specs/2026-11-23-portfolio-redesign-v2-design.md

---

## Global Constraints

- All design tokens in `src/styles/tokens.css` as CSS custom properties
- CSS Modules only — no Tailwind, no styled-components
- Fluid typography/spacing via `clamp()`
- `prefers-reduced-motion` respected everywhere
- WCAG AA contrast (signal red on void = 5.2:1)
- Local fonts only (9 WOFF2 files in `/public/fonts/`)
- Next.js 15 App Router with Viewport export
- Remotion Player lazy-loaded client-side only
- Git commits atomic and descriptive

---

## Review Focus

1. **Remotion SSR** — Player must only mount client-side; composition must render statically for reduced-motion
2. **Type composition performance** — 60fps staggered reveal, no layout shift
3. **Background frame opacity** — Fixed position, 3% opacity, no scroll jank
4. **Unified grid order** — Film cards (5) first, then Tech cards (5), responsive columns
5. **Asset cleanup** — Deprecated hero components removed, no dead code

---

## Task 1: Extend Design Tokens

**Files:**
- Modify: `src/styles/tokens.css`
- Test: `src/styles/tokens.test.ts`

**Interfaces:**
- Produces: New CSS custom properties consumed by all subsequent tasks

- [ ] **Step 1: Write failing token tests**

```typescript
// Add to tokens.test.ts expectedTokens array:
"--text-hero",
"--leading-tight",
"--space-hero",
"--ease-spring",
"--duration-slow",
"--stagger-delay",
"--radius-md",
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --testPathPattern="tokens" --no-coverage`
Expected: FAIL — new tokens not in tokens.css

- [ ] **Step 3: Extend tokens.css**

Add all tokens from spec Section 3 to `:root` block in `src/styles/tokens.css`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --testPathPattern="tokens" --no-coverage`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/styles/tokens.css src/styles/tokens.test.ts
git commit -m "feat: extend design tokens for v2 hero (type scale, motion, space)"
```

---

## Task 2: Create TypeComposition (Remotion Inline)

**Files:**
- Create: `src/components/hero-v2/TypeComposition.tsx`
- Create: `src/components/hero-v2/TypeComposition.module.css`
- Create: `src/components/hero-v2/types.ts`
- Test: `src/components/hero-v2/TypeComposition.test.tsx`

**Interfaces:**
- Consumes: `--text-hero`, `--accent`, `--text-primary`, `--ease-spring`, `--stagger-delay`, `--duration-slow` from tokens
- Produces: `TypeCompositionProps { progress: number, reducedMotion: boolean }`

- [ ] **Step 1: Write failing test**

```typescript
// TypeComposition.test.tsx
import { render, screen } from "@testing-library/react";
import { TypeComposition } from "./TypeComposition";

describe("TypeComposition", () => {
  it("renders two lines of text", () => {
    render(<TypeComposition progress={1} reducedMotion={false} />);
    expect(screen.getByText("FRAME BY FRAME.")).toBeInTheDocument();
    expect(screen.getByText("LINE BY LINE.")).toBeInTheDocument();
  });

  it("applies reducedMotion class when true", () => {
    const { container } = render(<TypeComposition progress={1} reducedMotion={true} />);
    expect(container.firstChild).toHaveClass("reduced-motion");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --testPathPattern="TypeComposition" --no-coverage`
Expected: FAIL — component doesn't exist

- [ ] **Step 3: Implement TypeComposition.tsx**

Inline Remotion-style composition (no @remotion/player import needed — pure React with CSS animations driven by `progress` prop):
- Split copy into characters
- Each character: `opacity: 0 → 1`, `transform: translateY(20px) → 0`, `color: signal → paper`
- Stagger: `delay = index * staggerDelay`
- Spring easing via `--ease-spring`
- Reduced motion: instant reveal, no stagger

CSS Module handles animations via `@keyframes` and `animation-delay` calculated inline.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --testPathPattern="TypeComposition" --no-coverage`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/hero-v2/
git commit -m "feat: add TypeComposition kinetic type component"
```

---

## Task 3: Create HeroV2 Orchestrator

**Files:**
- Create: `src/components/hero-v2/HeroV2.tsx`
- Create: `src/components/hero-v2/HeroV2.module.css`
- Create: `src/components/hero-v2/ScrollIndicator.tsx`
- Create: `src/components/hero-v2/ScrollIndicator.module.css`
- Test: `src/components/hero-v2/HeroV2.test.tsx`

**Interfaces:**
- Consumes: `TypeComposition`, design tokens
- Produces: HeroV2 component for page.tsx

- [ ] **Step 1: Write failing test**

```typescript
// HeroV2.test.tsx
import { render, screen } from "@testing-library/react";
import { HeroV2 } from "./HeroV2";

describe("HeroV2", () => {
  it("renders hero with type composition", () => {
    render(<HeroV2 />);
    expect(screen.getByText("FRAME BY FRAME.")).toBeInTheDocument();
    expect(screen.getByText("LINE BY LINE.")).toBeInTheDocument();
  });

  it("renders background frame", () => {
    render(<HeroV2 />);
    const bg = screen.getByAltText(/grade still/i);
    expect(bg).toBeInTheDocument();
  });

  it("renders scroll indicator", () => {
    render(<HeroV2 />);
    expect(screen.getByTestId("scroll-indicator")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --testPathPattern="HeroV2" --no-coverage`
Expected: FAIL

- [ ] **Step 3: Implement HeroV2.tsx**

Structure:
```tsx
<section className={styles.hero} aria-label="Hero">
  <div className={styles.backgroundFrameWrapper}>
    <Image src="/images/hero-bg.webp" alt="Grade still from tip-8" fill className={styles.backgroundFrame} priority />
  </div>
  <div className={styles.content}>
    <TypeComposition progress={1} reducedMotion={reducedMotion} />
    <ScrollIndicator />
  </div>
</section>
```

- Fixed background frame (opacity 0.03, `object-fit: cover`, `z-index: 0`)
- Content centered, `z-index: 1`
- `prefers-reduced-motion` detected via hook
- ScrollIndicator: animated chevron (CSS keyframes), `aria-hidden`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --testPathPattern="HeroV2" --no-coverage`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/hero-v2/
git commit -m "feat: add HeroV2 orchestrator with background frame and scroll indicator"
```

---

## Task 4: Create UnifiedGrid

**Files:**
- Create: `src/components/unified-grid/UnifiedGrid.tsx`
- Create: `src/components/unified-grid/UnifiedGrid.module.css`
- Create: `src/components/unified-grid/types.ts`
- Test: `src/components/unified-grid/UnifiedGrid.test.tsx`

**Interfaces:**
- Consumes: `FilmCard`, `TechCard`, `filmProjects`, `techProjects` from `@/lib/film-data` and `@/lib/tech-data`
- Produces: UnifiedGrid component

- [ ] **Step 1: Write failing test**

```typescript
// UnifiedGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { UnifiedGrid } from "./UnifiedGrid";

describe("UnifiedGrid", () => {
  it("renders 10 cards (5 film + 5 tech)", () => {
    render(<UnifiedGrid />);
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(10);
  });

  it("orders film cards before tech cards", () => {
    render(<UnifiedGrid />);
    const cards = screen.getAllByRole("listitem");
    // First 5 should be film (have grade scrub), next 5 tech (have diff)
    expect(cards[0]).toHaveTextContent(/tip-8|tip-7|tip-6|tip-4|dele/);
  });

  it("has responsive grid classes", () => {
    const { container } = render(<UnifiedGrid />);
    expect(container.firstChild).toHaveClass("grid");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --testPathPattern="UnifiedGrid" --no-coverage`
Expected: FAIL

- [ ] **Step 3: Implement UnifiedGrid.tsx**

```tsx
export function UnifiedGrid() {
  const allProjects = [...filmProjects, ...techProjects]; // film first
  return (
    <section id="projects" aria-labelledby="projects-heading" className={styles.section}>
      <h2 id="projects-heading" className={styles.visuallyHidden}>Projects</h2>
      <ul className={styles.grid} role="list">
        {allProjects.map((project) => (
          <li key={project.id} className={styles.gridItem} role="listitem">
            {project.type === "film" ? (
              <FilmCard project={project} />
            ) : (
              <TechCard project={project} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

CSS Grid: 1 col mobile, 2 col tablet, 3 col desktop. Gap from `--gap`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --testPathPattern="UnifiedGrid" --no-coverage`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/unified-grid/
git commit -m "feat: add UnifiedGrid mixing film and tech projects"
```

---

## Task 5: Extract Hero Background Frame

**Files:**
- Modify: `scripts/optimize-assets.ts` (add hero-bg extraction)
- Create: `public/images/hero-bg.webp` (generated)

**Interfaces:**
- Consumes: tip-8 video/assets from Task 2
- Produces: Optimized WebP frame for hero background

- [ ] **Step 1: Add frame extraction to optimize-assets.ts**

Use ffmpeg to extract a representative frame from tip-8 (e.g., at 5s), resize to 1920w, output WebP quality 80.

- [ ] **Step 2: Run optimization script**

Run: `npm run optimize-assets`
Expected: `public/images/hero-bg.webp` created (~50KB)

- [ ] **Step 3: Commit**

```bash
git add scripts/optimize-assets.ts public/images/hero-bg.webp
git commit -m "feat: add hero background frame extraction"
```

---

## Task 6: Integrate into Page & Cleanup

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx` (verify viewport)
- Remove: `src/components/hero/` (entire directory)
- Remove: `src/components/film/FilmSection.tsx`, `FilmSection.module.css`
- Remove: `src/components/tech/TechSection.tsx`, `TechSection.module.css`
- Test: Update/remove affected tests

**Interfaces:**
- Consumes: `HeroV2`, `UnifiedGrid`, `Footer`
- Produces: Updated home page

- [ ] **Step 1: Update page.tsx**

```tsx
import { HeroV2 } from "@/components/hero-v2";
import { UnifiedGrid } from "@/components/unified-grid";
import { Footer } from "@/components/about/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroV2 />
        <UnifiedGrid />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Remove deprecated components**

Delete `src/components/hero/`, `src/components/film/FilmSection.*`, `src/components/tech/TechSection.*`

- [ ] **Step 3: Update tests**

Remove tests for deleted components. Ensure remaining tests pass.

- [ ] **Step 4: Run full test suite**

Run: `npm test -- --no-coverage`
Expected: All tests pass (47+ new, minus removed)

- [ ] **Step 5: Build verification**

Run: `npm run build`
Expected: Success, no warnings

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: integrate HeroV2 + UnifiedGrid, remove deprecated hero/sections"
```

---

## Task 7: Polish & Accessibility Audit

**Files:**
- Review: All new components for `prefers-reduced-motion`
- Review: Semantic HTML, ARIA, keyboard navigation
- Test: `npm test`, `npm run build`, `npm run lint`

- [ ] **Step 1: Verify reduced-motion**
  - TypeComposition: static reveal when `reducedMotion=true`
  - ScrollIndicator: animation disabled
  - Background frame: no parallax
  - Cards: existing reduced-motion respected

- [ ] **Step 2: Verify accessibility**
  - HeroV2: `section[aria-label]`, background `aria-hidden`
  - UnifiedGrid: `section[id]`, `ul[role=list]`, `li[role=listitem]`
  - All interactive elements: `focus-visible` styles

- [ ] **Step 3: Performance check**
  - Bundle size (First Load JS < 200KB)
  - No layout shift on hero load
  - Background frame loads with `priority`

- [ ] **Step 4: Final commit**

```bash
git commit -am "polish: accessibility audit, reduced-motion, performance"
```