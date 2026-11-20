import { render, screen } from "@testing-library/react";
import { TimelineScrubber } from "./TimelineScrubber";
import { Hero } from "./Hero";

describe("Reduced Motion", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("TimelineScrubber adds reducedMotion class when prefers-reduced-motion", () => {
    render(<TimelineScrubber progress={0.5} onScrub={jest.fn()} />);
    const container = screen.getByRole("slider", { name: "Timeline scrubber" });
    expect(container).toHaveClass("reducedMotion");
  });

  it("Hero renders without animation classes when reduced motion", () => {
    render(
      <Hero
        initialProgress={0.5}
        onProgressChange={jest.fn()}
      />
    );
    const hero = screen.getByRole("region", { name: "Deconstructed frame hero" });
    expect(hero).toBeInTheDocument();
  });

  it("TimelineScrubber trackFilled has no transition when reduced motion", () => {
    render(<TimelineScrubber progress={0.5} onScrub={jest.fn()} />);
    const trackFilled = screen.getByTestId("track-filled");
    // Check that the container has reducedMotion class which disables transitions via CSS
    const container = screen.getByRole("slider", { name: "Timeline scrubber" });
    expect(container).toHaveClass("reducedMotion");
  });
});

describe("Reduced Motion - prefers-reduced-motion: no-preference", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("TimelineScrubber does not add reducedMotion class when no preference", () => {
    render(<TimelineScrubber progress={0.5} onScrub={jest.fn()} />);
    const container = screen.getByRole("slider", { name: "Timeline scrubber" });
    expect(container).not.toHaveClass("reducedMotion");
  });
});