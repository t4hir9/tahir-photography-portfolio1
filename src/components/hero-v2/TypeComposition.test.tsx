import { render, screen } from "@testing-library/react";
import { TypeComposition } from "./TypeComposition";

describe("TypeComposition", () => {
  it("renders two lines of text (split into character spans)", () => {
    render(<TypeComposition progress={1} reducedMotion={false} />);
    // "FRAME BY FRAME." = F:1, R:1, A:1, M:1, E:1, B:1, Y:1, F:1, R:1, A:1, M:1, E:1, .:1
    // "LINE BY LINE."   = L:1, I:1, N:1, E:1, B:1, Y:1, L:1, I:1, N:1, E:1, .:1
    const fSpans = screen.getAllByText("F");
    expect(fSpans.length).toBe(2);
    const rSpans = screen.getAllByText("R");
    expect(rSpans.length).toBe(2);
    const aSpans = screen.getAllByText("A");
    expect(aSpans.length).toBe(2);
    const mSpans = screen.getAllByText("M");
    expect(mSpans.length).toBe(2);
    const eSpans = screen.getAllByText("E");
    expect(eSpans.length).toBe(4); // 2 in line 1, 2 in line 2
    const bSpans = screen.getAllByText("B");
    expect(bSpans.length).toBe(2);
    const ySpans = screen.getAllByText("Y");
    expect(ySpans.length).toBe(2);
    const lSpans = screen.getAllByText("L");
    expect(lSpans.length).toBe(2);
    const iSpans = screen.getAllByText("I");
    expect(iSpans.length).toBe(2);
    const nSpans = screen.getAllByText("N");
    expect(nSpans.length).toBe(2);
    const dotSpans = screen.getAllByText(".");
    expect(dotSpans.length).toBe(2);
  });

  it("applies reducedMotion class when true", () => {
    const { container } = render(<TypeComposition progress={1} reducedMotion={true} />);
    const wrapper = container.querySelector('[role="heading"]');
    // CSS modules generate hashed class names, check for partial match
    expect(wrapper?.className).toMatch(/reducedMotion/);
  });

  it("has correct heading role and aria-label", () => {
    render(<TypeComposition progress={1} reducedMotion={false} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("aria-label", "Frame by frame, line by line");
  });

  it("renders all characters as spans", () => {
    render(<TypeComposition progress={1} reducedMotion={false} />);
    const spans = screen.getAllByText((content, element) => element.tagName === "SPAN");
    // 17 + 13 = 30 characters (including spaces as nbsp)
    expect(spans.length).toBeGreaterThan(25);
  });
});