# Kankotri Torn-Edge Section Dividers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace thin ornamental dividers between page sections with bold, full-bleed cream-colored torn-paper SVG shapes that overlap sections above them, giving a realistic kankotri (Indian wedding invitation) feel.

**Architecture:** A new `TornEdge` component renders a full-width filled SVG (~100px tall) with an irregular torn top edge. It sits between sections with `margin-top: -60px` so it visually bleeds into the section above. Eight distinct hardcoded SVG paths cycle through so no two adjacent tears look the same. `Index.tsx` replaces every `OrnamentalDivider` with `TornEdge`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, CSS custom properties (`--cream`), Vitest + @testing-library/react

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/wedding/TornEdge.tsx` | **Create** | Renders torn-paper SVG divider |
| `src/test/TornEdge.test.tsx` | **Create** | Component render + prop tests |
| `src/pages/Index.tsx` | **Modify** | Replace all `OrnamentalDivider` with `TornEdge` |

---

### Task 1: Create `TornEdge` component

**Files:**
- Create: `src/components/wedding/TornEdge.tsx`

- [ ] **Step 1: Create the file with all 8 path variants and the component**

```tsx
// src/components/wedding/TornEdge.tsx

const TORN_PATHS = [
  // Path 0
  "M0,120 L0,70 C60,30 120,85 200,50 C280,20 360,80 440,45 C520,15 600,75 680,55 C760,30 840,85 920,40 C1000,10 1080,70 1160,50 C1220,35 1300,80 1380,55 L1440,65 L1440,120 Z",
  // Path 1
  "M0,120 L0,55 C70,85 150,25 230,60 C310,90 390,20 470,55 C550,85 630,30 710,65 C790,95 870,15 950,50 C1030,80 1110,25 1190,60 C1270,90 1360,35 1440,70 L1440,120 Z",
  // Path 2
  "M0,120 L0,80 C90,45 170,95 260,50 C340,15 420,75 510,40 C590,10 670,70 750,45 C830,20 910,85 990,50 C1070,20 1150,75 1230,45 C1300,20 1370,60 1440,40 L1440,120 Z",
  // Path 3
  "M0,120 L0,45 C80,80 160,20 240,65 C320,100 400,30 480,70 C560,100 640,25 720,60 C800,90 880,20 960,55 C1040,85 1120,30 1200,65 C1280,95 1370,40 1440,75 L1440,120 Z",
  // Path 4
  "M0,120 L0,60 C50,20 130,80 210,35 C290,0 370,65 450,40 C530,15 610,80 690,50 C770,25 850,90 930,45 C1010,5 1090,70 1170,40 C1250,15 1340,70 1440,50 L1440,120 Z",
  // Path 5
  "M0,120 L0,75 C100,40 180,90 270,55 C350,25 430,85 510,50 C590,20 670,75 760,40 C840,10 920,70 1000,45 C1080,20 1160,80 1250,50 C1330,25 1390,65 1440,45 L1440,120 Z",
  // Path 6
  "M0,120 L0,50 C70,90 160,30 240,70 C320,100 400,25 480,60 C560,90 640,20 720,55 C800,85 880,25 960,60 C1040,90 1120,35 1200,70 C1280,100 1360,45 1440,80 L1440,120 Z",
  // Path 7
  "M0,120 L0,65 C80,30 160,85 240,45 C320,10 400,70 480,40 C560,15 640,75 720,50 C800,20 880,80 960,45 C1040,15 1120,70 1200,40 C1280,15 1360,65 1440,40 L1440,120 Z",
];

interface TornEdgeProps {
  index?: number;
  flip?: boolean;
  color?: string;
}

const TornEdge = ({
  index = 0,
  flip = false,
  color = "hsl(var(--cream))",
}: TornEdgeProps) => {
  const path = TORN_PATHS[index % TORN_PATHS.length];

  return (
    <div
      style={{
        marginTop: flip ? 0 : "-60px",
        marginBottom: flip ? "-60px" : 0,
        transform: flip ? "scaleY(-1)" : undefined,
        position: "relative",
        zIndex: 10,
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: "100px", display: "block" }}
        aria-hidden="true"
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  );
};

export default TornEdge;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd D:/wedding/scratch-first && npx tsc --noEmit
```

Expected: no errors

---

### Task 2: Write and pass tests for `TornEdge`

**Files:**
- Create: `src/test/TornEdge.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
// src/test/TornEdge.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TornEdge from "@/components/wedding/TornEdge";

describe("TornEdge", () => {
  it("renders an svg element", () => {
    const { container } = render(<TornEdge />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
  });

  it("renders a filled path inside the svg", () => {
    const { container } = render(<TornEdge />);
    const path = container.querySelector("svg path");
    expect(path).not.toBeNull();
    expect(path?.getAttribute("fill")).toBe("hsl(var(--cream))");
  });

  it("uses a different path for each index", () => {
    const { container: c0 } = render(<TornEdge index={0} />);
    const { container: c1 } = render(<TornEdge index={1} />);
    const d0 = c0.querySelector("svg path")?.getAttribute("d");
    const d1 = c1.querySelector("svg path")?.getAttribute("d");
    expect(d0).not.toBe(d1);
  });

  it("cycles paths when index >= 8", () => {
    const { container: c0 } = render(<TornEdge index={0} />);
    const { container: c8 } = render(<TornEdge index={8} />);
    const d0 = c0.querySelector("svg path")?.getAttribute("d");
    const d8 = c8.querySelector("svg path")?.getAttribute("d");
    expect(d0).toBe(d8);
  });

  it("applies scaleY(-1) transform when flip is true", () => {
    const { container } = render(<TornEdge flip={true} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.transform).toBe("scaleY(-1)");
  });

  it("applies negative marginTop when flip is false", () => {
    const { container } = render(<TornEdge flip={false} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.marginTop).toBe("-60px");
  });

  it("applies negative marginBottom when flip is true", () => {
    const { container } = render(<TornEdge flip={true} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.marginBottom).toBe("-60px");
  });

  it("respects custom color prop", () => {
    const { container } = render(<TornEdge color="red" />);
    const path = container.querySelector("svg path");
    expect(path?.getAttribute("fill")).toBe("red");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail (component doesn't exist yet)**

```bash
cd D:/wedding/scratch-first && npx vitest run src/test/TornEdge.test.tsx
```

Expected: all tests FAIL with "Cannot find module" or similar (the component file doesn't exist yet at this point — if you're running tasks in order and Task 1 is done, they should PASS instead; that's fine)

- [ ] **Step 3: Run tests to verify they all pass**

```bash
cd D:/wedding/scratch-first && npx vitest run src/test/TornEdge.test.tsx
```

Expected: 8 tests PASS

- [ ] **Step 4: Commit**

```bash
cd D:/wedding/scratch-first && git add src/components/wedding/TornEdge.tsx src/test/TornEdge.test.tsx && git commit -m "feat: add TornEdge torn-paper SVG divider component"
```

---

### Task 3: Wire `TornEdge` into `Index.tsx`

**Files:**
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Replace the contents of `Index.tsx`**

Replace the entire file with:

```tsx
import HeroSection from '@/components/wedding/HeroSection';
import ScratchReveal from '@/components/wedding/ScratchReveal';
import CountdownTimer from '@/components/wedding/CountdownTimer';
import CoupleCarousel from '@/components/wedding/CoupleCarousel';
import VenueSection from '@/components/wedding/VenueSection';
import Timeline from '@/components/wedding/Timeline';
import RSVPForm from '@/components/wedding/RSVPForm';
import CalendarButton from '@/components/wedding/CalendarButton';
import ThankYou from '@/components/wedding/ThankYou';
import ContactFooter from '@/components/wedding/ContactFooter';
import TornEdge from '@/components/wedding/TornEdge';
import FloatingParticles from '@/components/wedding/FloatingParticles';
import MusicPlayer from '@/components/wedding/MusicPlayer';

const Index = () => {
  return (
    <>
      <FloatingParticles />
      <MusicPlayer />

      <main className="relative">
        <HeroSection />
        <TornEdge index={0} />

        <ScratchReveal />
        <TornEdge index={1} />

        <CountdownTimer />
        <TornEdge index={2} />

        <CoupleCarousel />
        <TornEdge index={3} />

        <VenueSection />
        <TornEdge index={4} />

        <Timeline />
        <TornEdge index={5} />

        <RSVPForm />
        <CalendarButton />
        <TornEdge index={6} />

        <ThankYou />
        <TornEdge index={7} />

        <ContactFooter />
      </main>
    </>
  );
};

export default Index;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd D:/wedding/scratch-first && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Run the full test suite**

```bash
cd D:/wedding/scratch-first && npx vitest run
```

Expected: all tests PASS

- [ ] **Step 4: Start dev server and visually verify**

```bash
cd D:/wedding/scratch-first && npm run dev
```

Open `http://localhost:8080` in a browser. Scroll through the page and verify:
- Each section break shows a cream torn-paper shape
- The tear visually overlaps the section above it (no gap, no flat line)
- Each tear looks different from the adjacent ones
- The page background and section colors show through correctly behind the tears

- [ ] **Step 5: Commit**

```bash
cd D:/wedding/scratch-first && git add src/pages/Index.tsx && git commit -m "feat: replace ornamental dividers with kankotri torn-edge section breaks"
```
