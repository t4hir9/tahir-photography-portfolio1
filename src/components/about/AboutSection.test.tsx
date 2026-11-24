import { render, screen } from "@testing-library/react";
import { AboutSection } from "./AboutSection";

describe("AboutSection", () => {
  it("renders section with correct heading", () => {
    render(<AboutSection />);
    const heading = screen.getByRole("heading", { name: "About", level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("renders bio text content", () => {
    render(<AboutSection />);
    expect(screen.getByText(/filmmaker and creative technologist/i)).toBeInTheDocument();
    expect(screen.getByText(/DaVinci Resolve/i)).toBeInTheDocument();
    expect(screen.getByText(/Remotion/i)).toBeInTheDocument();
  });

  it("renders two image wrappers with captions", () => {
    render(<AboutSection />);
    const figures = screen.getAllByRole("figure");
    expect(figures).toHaveLength(2);
    expect(screen.getByText("In the grading suite")).toBeInTheDocument();
    expect(screen.getByText("On set")).toBeInTheDocument();
  });

  it("has correct aria labels and structure", () => {
    render(<AboutSection />);
    const section = screen.getByRole("region", { name: /about/i });
    expect(section).toBeInTheDocument();
    const imageList = screen.getByRole("list", { name: /about photos/i });
    expect(imageList).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutSection className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});