"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LiveDemoProps } from "./types";
import styles from "./LiveDemo.module.css";

// Lazy load Remotion Player only when needed
let Player: React.ComponentType<any> | null = null;

async function loadPlayer() {
  if (Player) return Player;
  if (typeof window === "undefined") return null;

  try {
    const mod = await import("@remotion/player");
    Player = mod.Player;
    return Player;
  } catch {
    return null;
  }
}

// Simple inline compositions for live demos
const demoCompositions: Record<string, React.ComponentType<{ progress: number }>> = {
  IrisTransitionDemo: ({ progress }) => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, var(--accent), var(--color-paper), var(--accent))",
          clipPath: `circle(${progress * 100}px at center)`,
          transform: `rotate(${progress * 360}deg)`,
        }}
      />
    </div>
  ),
  AnimatedSubtitlesDemo: ({ progress }) => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--text-primary)" }}>
        <span style={{ color: "var(--accent)" }}>Animated</span> Subtitles
      </div>
      <div
        style={{
          width: "80%",
          height: "4px",
          background: "var(--border-subtle)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: "var(--accent)",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  ),
  LowerThirdDemo: ({ progress }) => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "var(--space-lg)" }}>
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          background: "rgba(10, 10, 10, 0.9)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "8px",
          padding: "var(--space-md)",
          transform: `translateY(${20 * (1 - progress)}px)`,
          opacity: progress,
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--accent)" }}>John Doe</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-secondary)", marginTop: "var(--space-xs)" }}>Senior Motion Designer</div>
      </div>
    </div>
  ),
  SupportingGraphicsDemo: ({ progress }) => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-xl)" }}>
      {/* Progress Ring */}
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeDasharray="314"
          strokeDashoffset={314 * (1 - progress)}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      {/* Bar Chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-sm)", height: "120px" }}>
        {[0.3, 0.6, 0.9, 0.5, 0.8].map((h, i) => (
          <div
            key={i}
            style={{
              width: "30px",
              height: `${h * progress * 100}%`,
              background: "var(--accent)",
              borderRadius: "4px 4px 0 0",
              transition: "height 0.1s linear",
            }}
          />
        ))}
      </div>
    </div>
  ),
  OpeningSequenceDemo: ({ progress }) => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "150px",
          height: "150px",
          background: "var(--accent)",
          borderRadius: "50%",
          transform: `scale(${progress}) rotate(${progress * 720}deg)`,
          opacity: progress,
          transition: "transform 0.1s linear, opacity 0.1s linear",
        }}
      />
    </div>
  ),
};

export function LiveDemo({ compositionName, className = "" }: LiveDemoProps) {
  const [PlayerComponent, setPlayerComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const Composition = demoCompositions[compositionName];

  useEffect(() => {
    let mounted = true;
    loadPlayer().then((player) => {
      if (mounted) {
        setPlayerComponent(player);
        setIsLoaded(true);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Render frame using requestAnimationFrame for smooth animation
  useEffect(() => {
    if (!Composition || !containerRef.current) return;

    let rafId: number;
    const renderFrame = () => {
      frameRef.current = (frameRef.current + 1) % 180; // Loop every 180 frames (6s @ 30fps)
      const progress = frameRef.current / 180;

      // Re-render the composition with new progress
      // Using a simple approach - update a key to force re-render
      containerRef.current!.dataset.frame = String(frameRef.current);
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafId);
  }, [Composition]);

  if (!Composition) {
    return (
      <div className={`${styles.container} ${className}`} role="region" aria-label="Live demo not available">
        <div className={styles.placeholder}>
          <div className={styles.icon}>⚙️</div>
          <p>Demo: {compositionName}</p>
          <p className={styles.note}>Composition not found</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`${styles.container} ${className}`} role="region" aria-label="Loading live demo">
        <div className={styles.loading}>
          <div className={styles.spinner} aria-hidden="true" />
          <p>Loading Remotion Player…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${className}`} role="alert">
        <p className={styles.error}>Failed to load demo: {error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      role="region"
      aria-label={`Live demo: ${compositionName}`}
      style={{ "--demo-progress": frameRef.current / 180 } as React.CSSProperties}
    >
      <div className={styles.playerWrapper} data-testid="live-demo">
        <Composition progress={frameRef.current / 180} />
      </div>
      <div className={styles.badge}>LIVE</div>
    </div>
  );
}