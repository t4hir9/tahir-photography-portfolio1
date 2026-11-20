"use client";

import { TimelineHeaderProps } from "./types";
import styles from "./TimelineHeader.module.css";

export function TimelineHeader({ timecode, tracks = "V1 · V2 · A1", className = "" }: TimelineHeaderProps) {
  return (
    <header className={`${styles.header} ${className}`} role="region" aria-label="Timeline header">
      <div className={styles.tracks} aria-hidden="true">
        <span>{tracks}</span>
      </div>
      <time className={styles.timecode} dateTime={timecode.replace(/:/g, "-")}>
        {timecode}
      </time>
    </header>
  );
}