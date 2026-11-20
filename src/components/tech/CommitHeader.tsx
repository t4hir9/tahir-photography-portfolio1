"use client";

import { CommitHeaderProps } from "./types";
import styles from "./CommitHeader.module.css";

export function CommitHeader({ hash, message, date, className = "" }: CommitHeaderProps) {
  return (
    <header className={`${styles.header} ${className}`} role="region" aria-label="Commit info">
      <div className={styles.hashRow}>
        <span className={styles.label}>commit</span>
        <code className={styles.hash}>{hash}</code>
        <time className={styles.date} dateTime={date}>
          {date}
        </time>
      </div>
      <p className={styles.message}>{message}</p>
    </header>
  );
}