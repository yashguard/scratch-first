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

  it("applies scaleY(-1) transform to svg when flip is true", () => {
    const { container } = render(<TornEdge flip={true} />);
    const svg = container.querySelector("svg") as HTMLElement;
    expect(svg.style.transform).toBe("scaleY(-1)");
  });

  it("applies negative marginTop to wrapper when flip is false", () => {
    const { container } = render(<TornEdge flip={false} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.marginTop).toBe("-60px");
  });

  it("applies negative marginBottom to wrapper when flip is true", () => {
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
