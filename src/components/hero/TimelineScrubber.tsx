"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { TimelineScrubberProps } from "./types";
import styles from "./TimelineScrubber.module.css";

export const TimelineScrubber = forwardRef<HTMLInputElement, TimelineScrubberProps>(
  ({ progress, onScrub, disabled = false, ariaLabel = "Timeline scrubber", onScrubStart, onScrubEnd }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [reducedMotion, setReducedMotion] = useState(() => {
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
      return false;
    });

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener?.("change", handler);
      return () => mediaQuery.removeEventListener?.("change", handler);
    }, []);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = String(progress);
      }
    }, [progress]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newProgress = parseFloat(e.target.value);
      if (!Number.isNaN(newProgress)) {
        onScrub(Math.max(0, Math.min(1, newProgress)));
      }
    };

    const handleMouseDown = () => {
      onScrubStart?.();
    };

    const handleMouseUp = () => {
      onScrubEnd?.();
    };

    const handleTouchStart = () => {
      onScrubStart?.();
    };

    const handleTouchEnd = () => {
      onScrubEnd?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      const current = parseFloat(e.currentTarget.value) || 0;
      let newProgress = current;
      const step = 0.01;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newProgress = Math.min(1, current + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newProgress = Math.max(0, current - step);
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

      e.currentTarget.value = String(newProgress);
      onScrub(newProgress);
    };

    const handleBlur = () => {
      // Ensure value is clamped on blur
      if (inputRef.current) {
        const clamped = Math.max(0, Math.min(1, parseFloat(inputRef.current.value) || 0));
        inputRef.current.value = String(clamped);
      }
    };

    return (
      <div
        ref={containerRef}
        className={`${styles.scrubberContainer} ${reducedMotion ? styles.reducedMotion : ""}`}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={progress}
        tabIndex={0}
      >
        <input
          ref={(el) => {
            inputRef.current = el;
            if (ref && typeof ref === "function") ref(el);
            else if (ref && typeof ref === "object") ref.current = el;
          }}
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          disabled={disabled}
          className={styles.scrubberInput}
          aria-hidden="true"
        />
        <div className={styles.playhead} style={{ left: `${progress * 100}%` }} aria-hidden="true" data-testid="playhead" />
        <div className={styles.track} aria-hidden="true">
          <div className={styles.trackFilled} style={{ width: `${progress * 100}%` }} data-testid="track-filled" />
        </div>
      </div>
    );
  }
);

TimelineScrubber.displayName = "TimelineScrubber";