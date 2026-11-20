# Task 3 Report: Deconstructed-Frame Hero Component

## Overview
Successfully implemented a deconstructed-frame Hero component with three synchronized layers (video, Remotion overlay, code) controlled by a unified timeline scrubber. All 21 tests pass and production build succeeds.

---

## Components Created (9 files)

### 1. `src/components/hero/types.ts`
TypeScript interfaces for all Hero sub-components:
- `HeroProps` - Root component props
- `TimelineScrubberProps` - Scrubber with progress (0-1), onScrub callback, disabled, ariaLabel
- `LayerStackProps` - progress, videoDuration, totalFrames, fps
- `VideoLayerProps` - progress, duration, sources (mp4/webm)
- `OverlayLayerProps` - progress, totalFrames, fps, composition (React component)
- `CodeLayerProps` - progress, code, language, activeLineRanges
- `HeroMetaProps` - logoSrc, logoAlt, tagline

### 2. `src/components/hero/TimelineScrubber.tsx` + `.module.css`
- ForwardRef range input with native HTML5 slider
- Visual playhead (red accent color), styled track
- Keyboard navigation: ←/→ step 0.01, Home/End jump to 0/1
- Reduced-motion support: `matchMedia('(prefers-reduced-motion: reduce)')` listener adds `.reducedMotion` class
- In reduced-motion: hides playhead, disables transitions
- ARIA: role="slider", aria-valuemin/max/now, aria-label

### 3. `src/components/hero/VideoLayer.tsx`
- HTML5 `<video>` with dual source (H.264 `.mp4`, VP9 `.webm`)
- RAF-based sync loop: `currentTime = progress * duration`
- 100ms threshold to avoid jitter
- Muted, playsinline, preload="metadata"
- Cleanup on unmount (cancels RAF)

### 4. `src/components/hero/OverlayLayer.tsx`
- `@remotion/player` Player component
- Dynamic frame calculation: `frame = Math.floor(progress * totalFrames)`
- Accepts composition as prop (React component)
- Fallback handling for missing composition

### 5. `src/components/hero/CodeLayer.tsx`
- Shiki `codeToHtml` with `github-dark` theme
- Line transformer for active line highlighting
- `activeLineRanges`: maps progress ranges to line numbers
- Escape HTML utility for safe rendering
- Language: TypeScript (tsx)

### 6. `src/components/hero/LayerStack.tsx`
- Stacks 3 layers with z-index: 1 (video), 2 (overlay), 3 (code)
- Inline `HeroOverlayComposition` (Remotion-style animated graphics):
  - Animated grid background
  - Frame counter display
  - Progress bar
  - Rotating/scaling accent circles
- Dynamic import for `@/tip08-motion-graphics` with fallback
- Uses Function constructor for optional import (avoids build error if missing)
- Video sources: `/videos/tip-8.mp4`, `/videos/tip-8.webm`
- Code content with `activeLineRanges` mapping 5 progress segments

### 7. `src/components/hero/HeroMeta.tsx`
- Next.js `<Image>` for logo (ESLint compliant)
- Tagline text
- Animated scroll indicator (bouncing chevron)
- Reduced-motion: disables bounce animation via CSS

### 8. `src/components/hero/Hero.tsx`
- Orchestrates: `LayerStack`, `TimelineScrubber`, `HeroMeta`
- State: `progress` (0-1)
- Keyboard shortcuts:
  - Space: play/pause (auto-advance with RAF)
  - ←/→: step 0.01
  - Home/End: jump to 0/1
- Auto-play loops at end
- Passes props: `videoDuration={138}`, `totalFrames={4140}`, `fps={30}`

### 9. `src/components/hero/index.ts`
- Barrel export for all Hero components

---

## Tests (21 passing)

### `TimelineScrubber.test.tsx` (7 tests)
- Renders with correct ARIA attributes
- Calls onScrub on input change
- Keyboard: ArrowRight/Left step, Home/End jump
- Disabled state prevents interaction
- Reduced-motion class toggling (media query)
- Forward ref attachment

### `LayerStack.test.tsx` (5 tests)
- VideoLayer renders with correct props (progress, duration)
- OverlayLayer renders with correct props (progress, frames, fps)
- CodeLayer renders with correct props (progress)
- Layers update when progress changes
- Correct stacking order - three layers coexist

### `reduced-motion.test.tsx` (7 tests)
- LayerStack renders without animation styles when prefers-reduced-motion
- TimelineScrubber hides playhead in reduced motion
- TimelineScrubber disables transitions in reduced motion
- HeroMeta disables scroll indicator animation
- CodeLayer renders without transition styles
- VideoLayer respects reduced motion (no RAF sync issues)
- OverlayLayer renders without animated elements

### `Hero.test.tsx` (2 tests)
- Hero renders all sub-components
- Keyboard shortcuts work (space, arrows, home/end)

---

## Configuration

### `jest.config.ts`
- ESM support with `ts-jest` (useESM: true)
- `moduleNameMapper`:
  - `@/tip08-motion-graphics/(.*)` → `__mocks__/tip08-motion-graphics/$1`
  - `@/(.*)` → `src/$1`
  - `shiki` → `__mocks__/shiki.ts`
- `transformIgnorePatterns`: `/node_modules/(?!(shiki)/)`
- `extensionsToTreatAsEsm`: [".ts", ".tsx"]

### Mocks
- `src/__mocks__/shiki.ts`: Mocks `codeToHtml`, `createHighlighter`, `createJavaScriptRegexEngine`
- `src/__mocks__/tip08-motion-graphics/src/Tip08MotionGraphics.tsx`: Mock Remotion composition

---

## Build Status
- ✅ `npm run build` - Production build succeeds
- ✅ `npm run lint` - No ESLint errors
- ✅ `npm test` - All 21 tests pass

---

## Known Concerns / Limitations

### 1. Remotion Player in Dev Server
The dev server shows "Remotion Studio" startup because `@remotion/player` is imported. This is expected behavior - the player initializes on client-side. Production build works correctly.

### 2. Dynamic Import for tip08-motion-graphics
Uses `Function('return import(...)')()` pattern to gracefully handle missing module. Falls back to inline `HeroOverlayComposition`. This is a temporary solution until Task 5 creates the actual Remotion composition.

### 3. Video Assets Required
Hero expects `/public/videos/tip-8.mp4` and `/public/videos/tip-8.webm` (from Task 2). Without these, video layer shows empty player.

### 4. Reduced-Motion Implementation
Handled via:
- CSS `@media (prefers-reduced-motion: reduce)` in module files
- JS `matchMedia` listener in TimelineScrubber adding `.reducedMotion` class
- All animated transitions respect this

### 5. Shiki Highlighting
Active line ranges mapped to progress segments:
- Lines 1-3: 0-0.15 (imports)
- Lines 5-12: 0.15-0.4 (Hero component start)
- Lines 14-16: 0.4-0.6 (LayerStack usage)
- Lines 18-20: 0.6-0.85 (TimelineScrubber usage)
- Line 22: 0.85-1 (HeroMeta usage)

---

## Files Modified
- `src/app/page.tsx` - Added `<Hero />` import and usage
- `jest.config.ts` - Added moduleNameMapper for mocks
- `src/__mocks__/shiki.ts` - Shiki mock
- `src/__mocks__/tip08-motion-graphics/src/Tip08MotionGraphics.tsx` - Remotion mock

---

## Next Steps (Task 4+)
- Task 4: Content sections (About, Work, Contact)
- Task 5: Tech Section with full `tip08-motion-graphics` Remotion composition
- Visual verification in browser once dev server stable