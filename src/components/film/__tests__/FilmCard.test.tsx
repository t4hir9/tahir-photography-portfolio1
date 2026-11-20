import { render, screen, fireEvent, act } from "@testing-library/react";
import { FilmCard } from "../FilmCard";
import { filmProjects } from "@/lib/film-data";

const mockProject = filmProjects[0];

describe("FilmCard", () => {
  it("renders timeline header with track labels and timecode", () => {
    render(<FilmCard project={mockProject} />);
    expect(screen.getByText("V1 · V2 · A1")).toBeInTheDocument();
    expect(screen.getByText("01:23:14:12")).toBeInTheDocument();
  });

  it("renders project title and description", () => {
    render(<FilmCard project={mockProject} />);
    expect(screen.getByText("Tip 8 — Color Grading Workflow")).toBeInTheDocument();
    expect(screen.getByText(/Complete DaVinci Resolve color grading/)).toBeInTheDocument();
  });

  it("renders meta information (duration, role)", () => {
    render(<FilmCard project={mockProject} />);
    expect(screen.getByText("2m 18s")).toBeInTheDocument();
    expect(screen.getByText("Colorist / Editor")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<FilmCard project={mockProject} />);
    expect(screen.getByText("Color Grading")).toBeInTheDocument();
    expect(screen.getByText("DaVinci Resolve")).toBeInTheDocument();
    expect(screen.getByText("Node Structure")).toBeInTheDocument();
    expect(screen.getByText("Power Grades")).toBeInTheDocument();
  });

  it("shows before/after clip thumb with both images", () => {
    render(<FilmCard project={mockProject} />);
    const container = screen.getByTestId("thumb-container");
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute("src", mockProject.beforeGradeSrc);
    expect(images[1]).toHaveAttribute("src", mockProject.afterGradeSrc);
  });

  it("shows playhead indicator", () => {
    render(<FilmCard project={mockProject} />);
    const playhead = screen.getByTestId("playhead");
    expect(playhead).toBeInTheDocument();
  });

  it("has thumb container with test id", () => {
    render(<FilmCard project={mockProject} />);
    const thumbContainer = screen.getByTestId("thumb-container");
    expect(thumbContainer).toBeInTheDocument();
  });

  it("has correct ARIA labels on card", () => {
    render(<FilmCard project={mockProject} />);
    const card = screen.getByRole("region", { name: /Tip 8 — Color Grading Workflow/ });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabIndex", "0");
  });

  it("supports keyboard navigation when focused", () => {
    render(<FilmCard project={mockProject} />);
    const card = screen.getByRole("region", { name: /Tip 8/ });
    card.focus();

    act(() => {
      fireEvent.keyDown(card, { key: "ArrowRight" });
    });

    const playhead = screen.getByTestId("playhead");
    expect(playhead).toBeInTheDocument();
  });

  it("renders grade labels", () => {
    render(<FilmCard project={mockProject} />);
    expect(screen.getByText("Before Grade")).toBeInTheDocument();
    expect(screen.getByText("After Grade")).toBeInTheDocument();
  });
});