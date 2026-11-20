import { render, screen, fireEvent, act } from "@testing-library/react";
import { TechCard } from "../TechCard";
import { techProjects } from "@/lib/tech-data";

const mockProject = techProjects[0];

describe("TechCard", () => {
  it("renders commit header with hash and message", () => {
    render(<TechCard project={mockProject} />);
    expect(screen.getByText("a1b2c3d")).toBeInTheDocument();
    expect(screen.getByText("Add iris transition component with configurable radius and easing")).toBeInTheDocument();
  });

  it("renders commit date", () => {
    render(<TechCard project={mockProject} />);
    expect(screen.getByText("2024-11-15")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<TechCard project={mockProject} />);
    expect(screen.getByText("Remotion")).toBeInTheDocument();
    expect(screen.getByText("Transitions")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Spring Physics")).toBeInTheDocument();
  });

  it("renders GitHub link", () => {
    render(<TechCard project={mockProject} />);
    const githubLink = screen.getByRole("link", { name: /View on GitHub/ });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", mockProject.githubUrl);
  });

  it("shows diff preview toggle", () => {
    render(<TechCard project={mockProject} />);
    const toggle = screen.getByRole("button", { name: /Show diff/ });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("expands diff on hover", () => {
    render(<TechCard project={mockProject} />);
    const card = screen.getByRole("region", { name: /Add iris transition/ });

    act(() => {
      fireEvent.mouseEnter(card);
    });

    const toggle = screen.getByRole("button", { name: /Show diff/ });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const diffContent = screen.getByTestId("diff-content");
    expect(diffContent).toBeInTheDocument();
  });

  it("renders LiveDemo component", () => {
    render(<TechCard project={mockProject} />);
    // LiveDemo loads asynchronously - check for loading text or container
    const loadingText = screen.getByText(/Loading Remotion Player/);
    expect(loadingText).toBeInTheDocument();
  });

  it("has correct ARIA labels on card", () => {
    render(<TechCard project={mockProject} />);
    const card = screen.getByRole("region", { name: /Add iris transition/ });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabIndex", "0");
  });

  it("supports keyboard toggle when focused", () => {
    render(<TechCard project={mockProject} />);
    const card = screen.getByRole("region", { name: /Add iris transition/ });
    card.focus();

    const toggle = screen.getByRole("button", { name: /Show diff/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    act(() => {
      fireEvent.keyDown(card, { key: " " });
    });

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses diff on Escape key", () => {
    render(<TechCard project={mockProject} />);
    const card = screen.getByRole("region", { name: /Add iris transition/ });
    card.focus();

    // First expand
    act(() => {
      fireEvent.keyDown(card, { key: " " });
    });

    const toggle = screen.getByRole("button", { name: /Show diff/ });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    // Then collapse with Escape
    act(() => {
      fireEvent.keyDown(card, { key: "Escape" });
    });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});