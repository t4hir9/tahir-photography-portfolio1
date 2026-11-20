"use client";

import Image from "next/image";
import { HeroMetaProps } from "./types";
import styles from "./HeroMeta.module.css";

export function HeroMeta({ logoSrc, tagline, scrollText = "Scroll to explore" }: HeroMetaProps) {
  return (
    <div className={styles.metaContainer} role="contentinfo" aria-label="Hero metadata">
      <div className={styles.logoWrapper}>
        <Image
          src={logoSrc}
          alt=""
          className={styles.logo}
          width={200}
          height={60}
          priority
        />
      </div>
      <p className={styles.tagline}>{tagline}</p>
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>{scrollText}</span>
        <svg className={styles.scrollArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}