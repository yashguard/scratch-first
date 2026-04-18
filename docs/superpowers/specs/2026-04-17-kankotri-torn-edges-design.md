# Kankotri Torn-Edge Section Dividers

**Date:** 2026-04-17  
**Status:** Approved

## Goal

Replace the existing thin `OrnamentalDivider` instances between page sections with bold, filled, organic torn-paper edges that give the wedding site a realistic kankotri (Indian wedding invitation card) feel. The effect matches the reference screenshot: a cream-colored torn shape (~100px deep) overlaps the section above it, creating a layered paper illusion.

## Visual Description

- Each section break shows a full-width cream SVG shape whose top edge is smooth and whose bottom (or top, when flipped) edge is highly irregular — like paper that has been torn by hand.
- The tear is ~80–120px tall (bold option).
- The tear overlaps the section above via `margin-top: -60px` so it bleeds through, not just sits on top.
- Color: cream (`hsl(var(--cream))`) for all tears — consistent throughout the page.
- No two adjacent tears look the same; the component cycles through 6–8 distinct hardcoded SVG paths.

## Component: `TornEdge`

**File:** `src/components/wedding/TornEdge.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flip` | `boolean` | `false` | Flips SVG vertically — tear points upward instead of downward |
| `color` | `string` | `hsl(var(--cream))` | Fill color of the torn shape |
| `index` | `number` | `0` | Selects which of the 6–8 path variants to use |

**Implementation notes:**
- Renders a full-bleed `<svg>` with `preserveAspectRatio="none"` and `viewBox="0 0 1440 120"`.
- The SVG contains a closed filled `<path>` — bottom edge is smooth (at y=120), top edge is the irregular torn line.
- `className="w-full"` with fixed `height: 100px` in CSS.
- Wrapped in a `<div>` with `style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}` for the overlap effect.
- When `flip={true}`, the wrapping div uses `transform: scaleY(-1)` and `marginBottom: '-60px'` instead.
- No framer-motion animation — the tear should appear immediately as part of layout, not animate in.

**Path variants:** 6–8 unique irregular paths, each one a closed shape. Example structure:
```
M0,60 C80,20 160,90 240,45 C320,10 400,80 480,55 ... L1440,55 L1440,120 L0,120 Z
```
Each path uses cubic bezier curves (`C`) with irregular control points to simulate organic tearing.

## Page Integration (`Index.tsx`)

Replace every `<OrnamentalDivider ... />` with `<TornEdge index={n} />`:

| Position | Component | `flip` | `index` |
|----------|-----------|--------|---------|
| After HeroSection | `<TornEdge index={0} />` | false | 0 |
| After ScratchReveal | `<TornEdge index={1} />` | false | 1 |
| After CountdownTimer | `<TornEdge index={2} />` | false | 2 |
| After CoupleCarousel | `<TornEdge index={3} />` | false | 3 |
| After VenueSection | `<TornEdge index={4} />` | false | 4 |
| After Timeline | `<TornEdge index={5} />` | false | 5 |
| After RSVPForm+CalendarButton | `<TornEdge index={6} />` | false | 6 |
| After ThankYou | `<TornEdge index={7} />` | false | 7 |

The `ContactFooter` does not get a torn edge below it (it's the last element).

## What Is NOT Changed

- `OrnamentalDivider.tsx` — kept as-is, just no longer used in `Index.tsx`
- All section components (`HeroSection`, `CountdownTimer`, etc.) — no changes to backgrounds or layout
- CSS variables — no new variables needed; uses existing `--cream`
- `FloatingParticles` and `MusicPlayer` — untouched

## Out of Scope

- Animated tears (e.g., "ripping" entrance animation)
- Burgundy-colored tears
- Per-section unique colors
- Tears inside section content
