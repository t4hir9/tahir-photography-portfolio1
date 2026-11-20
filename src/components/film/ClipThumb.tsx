"use client";

import { ClipThumbProps } from "./types";
import styles from "./ClipThumb.module.css";

export function ClipThumb({ beforeSrc, afterSrc, progress = 0, className = "" }: ClipThumbProps) {
  const splitPercent = Math.max(0, Math.min(100, progress * 100));

  return (
    <div
      className={`${styles.clipThumb} ${className}`}
      role="img"
      aria-label={`Before/after grade comparison at ${Math.round(progress * 100)}%`}
      style={{ "--split": `${splitPercent}%` } as React.CSSProperties}
    >
      {/* Before image (left side) */}
      <div className={styles.beforeLayer} aria-hidden="true">
        <img
          src={beforeSrc}
          alt=""
          loading="lazy"
          width={640}
          height={360}
        />
        <div className={styles.gradeLabel}>Before Grade</div>
      </div>

      {/* After image (right side) - revealed by clip-path */}
      <div className={styles.afterLayer} aria-hidden="true">
        <img
          src={afterSrc}
          alt=""
          loading="lazy"
          width={640}
          height={360}
        />
        <div className={styles.gradeLabel}>After Grade</div>
      </div>

      {/* Center divider line */}
      <div className={styles.divider} style={{ left: `calc(${splitPercent}% - 1px)` }} aria-hidden="true" />
    </div>
  );
}