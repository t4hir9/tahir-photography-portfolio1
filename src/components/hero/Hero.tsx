"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { LayerStack } from "./LayerStack";
import { TimelineScrubber } from "./TimelineScrubber";
import { HeroMeta } from "./HeroMeta";
import { HeroProps } from "./types";
import styles from "./Hero.module.css";

const VIDEO_DURATION = 138; // seconds
const TOTAL_FRAMES = 4140;
const FPS = 30;

export function Hero({ initialProgress = 0, onProgressChange }: HeroProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(progress);

  useEffect(() => {
    lastProgressRef.current = progress;
  }, [progress]);

  const handleScrub = useCallback((newProgress: number) => {
    const clamped = Math.max(0, Math.min(1, newProgress));
    setProgress(clamped);
    onProgressChange?.(clamped);
  }, [onProgressChange]);

  const handleScrubStart = useCallback(() => {
    setIsScrubbing(true);
  }, []);

  const handleScrubEnd = useCallback(() => {
    setIsScrubbing(false);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return;

    const step = 0.02;
    let newProgress = progress;

    switch (e.key) {
      case " ":
        e.preventDefault();
        newProgress = isScrubbing ? 0 : Math.min(1, progress + 0.1);
        break;
      case "ArrowRight":
        e.preventDefault();
        newProgress = Math.min(1, progress + step);
        break;
      case "ArrowLeft":
        e.preventDefault();
        newProgress = Math.max(0, progress - step);
        break;
      case "Home":
        e.preventDefault();
        newProgress = 0;
        break;
      case "End":
        e.preventDefault();
        newProgress = 1;
        break;
      default:
        return;
    }

    handleScrub(newProgress);
  }, [progress, isScrubbing, handleScrub]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className={styles.hero} role="region" aria-label="Deconstructed frame hero">
      <div className={styles.layerStackWrapper}>
        <LayerStack
          progress={progress}
          videoDuration={VIDEO_DURATION}
          totalFrames={TOTAL_FRAMES}
          fps={FPS}
        />
      </div>

      <div className={styles.controls}>
        <TimelineScrubber
          progress={progress}
          onScrub={handleScrub}
          onScrubStart={handleScrubStart}
          onScrubEnd={handleScrubEnd}
          ariaLabel="Scrub through deconstructed frame timeline"
        />
      </div>

      <HeroMeta
        logoSrc="/images/logo.svg"
        tagline="Deconstructed frames, unified timeline"
        scrollText="Scroll to explore"
      />
    </section>
  );
}