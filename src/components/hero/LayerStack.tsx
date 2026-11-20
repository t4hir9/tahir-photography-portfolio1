"use client";

import { useState, useEffect, useMemo } from "react";
import { VideoLayer } from "./VideoLayer";
import { OverlayLayer } from "./OverlayLayer";
import { CodeLayer } from "./CodeLayer";
import { LayerStackProps } from "./types";
import styles from "./LayerStack.module.css";

// Simple inline Remotion-style composition for the Hero overlay
// The full tip08-motion-graphics integration will be in Task 5 (Tech Section)
interface OverlayCompositionProps {
  progress: number;
  totalFrames: number;
  fps: number;
}

const HeroOverlayComposition = ({ progress, totalFrames, fps }: OverlayCompositionProps) => {
  const frame = Math.floor(progress * totalFrames);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", pointerEvents: "none" }}>
      {/* Animated grid overlay - simulates motion graphics */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(230, 57, 70, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230, 57, 70, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${frame * 0.5}px, ${frame * 0.3}px)`,
          transition: "transform 0.05s linear",
        }}
      />

      {/* Time indicator */}
      <div
        style={{
          position: "absolute",
          top: "var(--space-lg)",
          right: "var(--space-lg)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-mono)",
          color: "var(--accent)",
          background: "rgba(10, 10, 10, 0.8)",
          padding: "var(--space-xs) var(--space-sm)",
          borderRadius: "4px",
          border: "1px solid var(--border-subtle)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        Frame: {frame} / {totalFrames}
      </div>

      {/* Progress indicator bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          background: "var(--accent)",
          width: `${progress * 100}%`,
          transition: "width 0.05s linear",
        }}
      />

      {/* Animated accent elements that respond to progress */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${progress * 360}deg) scale(${0.5 + progress * 0.5})`,
          width: "120px",
          height: "120px",
          border: "2px solid var(--accent)",
          borderRadius: "50%",
          opacity: 0.3,
          pointerEvents: "none",
          transition: "transform 0.05s linear, opacity 0.3s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${-progress * 180}deg) scale(${0.3 + progress * 0.7})`,
          width: "200px",
          height: "200px",
          border: "1px solid var(--accent)",
          borderStyle: "dashed",
          borderRadius: "50%",
          opacity: 0.15,
          pointerEvents: "none",
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
};

export function LayerStack({ progress, videoDuration, totalFrames, fps }: LayerStackProps) {
  const videoSources = {
    mp4: "/videos/tip-8.mp4",
    webm: "/videos/tip-8.webm",
  };

  const codeContent = `import { TimelineScrubber } from "./TimelineScrubber";
import { LayerStack } from "./LayerStack";
import { HeroMeta } from "./HeroMeta";

export function Hero() {
  const [progress, setProgress] = useState(0);

  return (
    <section className="hero">
      <LayerStack
        progress={progress}
        videoDuration={138}
        totalFrames={4140}
        fps={30}
      />
      <TimelineScrubber
        progress={progress}
        onScrub={setProgress}
      />
      <HeroMeta
        logoSrc="/images/logo.svg"
        tagline="Deconstructed frames, unified timeline"
      />
    </section>
  );
}`;

  const activeLineRanges = [
    { start: 1, end: 3, progressStart: 0, progressEnd: 0.15 },
    { start: 5, end: 12, progressStart: 0.15, progressEnd: 0.4 },
    { start: 14, end: 16, progressStart: 0.4, progressEnd: 0.6 },
    { start: 18, end: 20, progressStart: 0.6, progressEnd: 0.85 },
    { start: 22, end: 22, progressStart: 0.85, progressEnd: 1 },
  ];

  return (
    <div className={styles.layerStack} role="region" aria-label="Deconstructed hero layers">
      <div className={styles.layer} style={{ zIndex: 1 }}>
        <VideoLayer
          progress={progress}
          duration={videoDuration}
          sources={videoSources}
        />
      </div>
      <div className={styles.layer} style={{ zIndex: 2 }}>
        <OverlayLayer
          progress={progress}
          totalFrames={totalFrames}
          fps={fps}
          composition={HeroOverlayComposition}
        />
      </div>
      <div className={styles.layer} style={{ zIndex: 3 }}>
        <CodeLayer
          progress={progress}
          code={codeContent}
          language="tsx"
          activeLineRanges={activeLineRanges}
        />
      </div>
    </div>
  );
}