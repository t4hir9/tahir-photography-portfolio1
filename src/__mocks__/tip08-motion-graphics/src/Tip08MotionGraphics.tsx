import React from "react";

interface Tip08MotionGraphicsProps {
  durationInFrames: number;
  fps: number;
}

export default function Tip08MotionGraphics({ durationInFrames, fps }: Tip08MotionGraphicsProps) {
  return (
    <div data-testid="remotion-composition" data-frames={durationInFrames} data-fps={fps}>
      Mock Remotion Composition
    </div>
  );
}

export { Tip08MotionGraphics };