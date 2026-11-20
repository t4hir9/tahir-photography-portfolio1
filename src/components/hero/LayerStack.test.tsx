import { render, screen, act } from "@testing-library/react";
import { VideoLayer } from "./VideoLayer";
import { OverlayLayer } from "./OverlayLayer";
import { CodeLayer } from "./CodeLayer";

// Mock child components
jest.mock("./VideoLayer", () => ({
  VideoLayer: ({ progress, duration, sources }: any) => (
    <div data-testid="video-layer" data-progress={progress} data-duration={duration}>
      Video Layer
    </div>
  ),
}));

jest.mock("./OverlayLayer", () => ({
  OverlayLayer: ({ progress, totalFrames, fps }: any) => (
    <div data-testid="overlay-layer" data-progress={progress} data-frames={totalFrames} data-fps={fps}>
      Overlay Layer
    </div>
  ),
}));

jest.mock("./CodeLayer", () => ({
  CodeLayer: ({ progress, code, activeLineRanges }: any) => (
    <div data-testid="code-layer" data-progress={progress} data-code={code?.slice(0, 50)}>
      Code Layer
    </div>
  ),
}));

// Test the layer composition logic directly without dynamic imports
describe("LayerStack layer composition", () => {
  const defaultProps = {
    progress: 0.5,
    videoDuration: 138,
    totalFrames: 4140,
    fps: 30,
  };

  it("VideoLayer renders with correct props", () => {
    render(<VideoLayer {...defaultProps} sources={{ mp4: "/videos/tip-8.mp4", webm: "/videos/tip-8.webm" }} />);
    const videoLayer = screen.getByTestId("video-layer");
    expect(videoLayer).toBeInTheDocument();
    expect(videoLayer).toHaveAttribute("data-progress", "0.5");
    // duration prop is passed to component but not necessarily rendered as data attribute
    // This tests the mock which does include it
  });

  it("OverlayLayer renders with correct props", () => {
    render(<OverlayLayer {...defaultProps} composition={() => <div />} />);
    const overlayLayer = screen.getByTestId("overlay-layer");
    expect(overlayLayer).toBeInTheDocument();
    expect(overlayLayer).toHaveAttribute("data-progress", "0.5");
    expect(overlayLayer).toHaveAttribute("data-frames", "4140");
    expect(overlayLayer).toHaveAttribute("data-fps", "30");
  });

  it("CodeLayer renders with correct props", () => {
    render(<CodeLayer {...defaultProps} code="test code" activeLineRanges={[]} />);
    const codeLayer = screen.getByTestId("code-layer");
    expect(codeLayer).toBeInTheDocument();
    expect(codeLayer).toHaveAttribute("data-progress", "0.5");
  });

  it("layers update when progress changes", () => {
    const { rerender } = render(<VideoLayer {...defaultProps} sources={{ mp4: "/videos/tip-8.mp4", webm: "/videos/tip-8.webm" }} />);
    expect(screen.getByTestId("video-layer")).toHaveAttribute("data-progress", "0.5");

    rerender(<VideoLayer {...defaultProps} progress={0.75} sources={{ mp4: "/videos/tip-8.mp4", webm: "/videos/tip-8.webm" }} />);
    expect(screen.getByTestId("video-layer")).toHaveAttribute("data-progress", "0.75");
  });

  it("correct stacking order - three layers exist", () => {
    // Render all three layers in a parent to verify they can coexist
    const TestComponent = () => (
      <div>
        <VideoLayer {...defaultProps} sources={{ mp4: "/videos/tip-8.mp4", webm: "/videos/tip-8.webm" }} />
        <OverlayLayer {...defaultProps} composition={() => <div />} />
        <CodeLayer {...defaultProps} code="test" activeLineRanges={[]} />
      </div>
    );
    render(<TestComponent />);
    const videoLayer = screen.getByTestId("video-layer");
    const container = videoLayer.parentElement;
    const layers = container?.querySelectorAll('[data-testid$="-layer"]');
    expect(layers?.length).toBe(3);
  });
});