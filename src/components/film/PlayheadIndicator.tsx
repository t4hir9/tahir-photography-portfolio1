"use client";

import { PlayheadIndicatorProps } from "./types";
import styles from "./PlayheadIndicator.module.css";

export function PlayheadIndicator({ progress = 0, className = "" }: PlayheadIndicatorProps) {
  const position = Math.max(0, Math.min(100, progress * 100));

  return (
    <div
      className={`${styles.playhead} ${className}`}
      role="slider"
      aria-label={`Timeline playhead at ${Math.round(progress * 100)}%`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      style={{ "--progress": `${position}%` } as React.CSSProperties}
      aria-hidden="true"
      data-testid="playhead"
    >
      <div className={styles.triangle} aria-hidden="true" />
      <div className={styles.line} aria-hidden="true" />
    </div>
  );
}