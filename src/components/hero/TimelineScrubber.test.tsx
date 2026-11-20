import { render, screen, fireEvent, act } from "@testing-library/react";
import { TimelineScrubber } from "./TimelineScrubber";

describe("TimelineScrubber", () => {
  const defaultProps = {
    progress: 0.5,
    onScrub: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the scrubber input", () => {
    render(<TimelineScrubber {...defaultProps} />);
    const container = screen.getByRole("slider", { name: "Timeline scrubber" });
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("aria-valuenow", "0.5");
    expect(container).toHaveAttribute("aria-valuemin", "0");
    expect(container).toHaveAttribute("aria-valuemax", "1");
  });

  it("calls onScrub when value changes", () => {
    render(<TimelineScrubber {...defaultProps} />);
    const input = screen.getByRole("slider").querySelector("input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    act(() => {
      fireEvent.change(input, { target: { value: "0.75" } });
    });
    expect(defaultProps.onScrub).toHaveBeenCalledWith(0.75);
  });

  it("clamps progress to 0-1 range", () => {
    render(<TimelineScrubber {...defaultProps} />);
    const input = screen.getByRole("slider").querySelector("input") as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: "1.5" } });
    });
    expect(defaultProps.onScrub).toHaveBeenCalledWith(1);
    act(() => {
      fireEvent.change(input, { target: { value: "-0.5" } });
    });
    expect(defaultProps.onScrub).toHaveBeenCalledWith(0);
  });

  it("supports keyboard navigation", () => {
    render(<TimelineScrubber {...defaultProps} />);
    const input = screen.getByRole("slider").querySelector("input") as HTMLInputElement;

    act(() => {
      fireEvent.keyDown(input, { key: "ArrowRight" });
    });
    expect(defaultProps.onScrub).toHaveBeenCalledWith(0.51);

    act(() => {
      fireEvent.keyDown(input, { key: "ArrowLeft" });
    });
    expect(defaultProps.onScrub).toHaveBeenCalledWith(0.5);

    act(() => {
      fireEvent.keyDown(input, { key: "Home" });
    });
    expect(defaultProps.onScrub).toHaveBeenCalledWith(0);

    act(() => {
      fireEvent.keyDown(input, { key: "End" });
    });
    expect(defaultProps.onScrub).toHaveBeenCalledWith(1);
  });

  it("respects disabled prop on input element", () => {
    render(<TimelineScrubber {...defaultProps} disabled={true} />);
    const input = screen.getByRole("slider").querySelector("input") as HTMLInputElement;
    expect(input).toBeDisabled();
    act(() => {
      fireEvent.change(input, { target: { value: "0.8" } });
    });
    expect(defaultProps.onScrub).not.toHaveBeenCalled();
  });

  it("accepts custom ariaLabel", () => {
    render(<TimelineScrubber {...defaultProps} ariaLabel="Custom scrubber" />);
    const container = screen.getByRole("slider", { name: "Custom scrubber" });
    expect(container).toBeInTheDocument();
  });

  it("calls onScrubStart and onScrubEnd on mouse interactions", () => {
    const onScrubStart = jest.fn();
    const onScrubEnd = jest.fn();
    render(<TimelineScrubber {...defaultProps} onScrubStart={onScrubStart} onScrubEnd={onScrubEnd} />);
    const input = screen.getByRole("slider").querySelector("input") as HTMLInputElement;

    act(() => {
      fireEvent.mouseDown(input);
    });
    expect(onScrubStart).toHaveBeenCalled();

    act(() => {
      fireEvent.mouseUp(input);
    });
    expect(onScrubEnd).toHaveBeenCalled();
  });
});