"use client";

import { useEffect, useState } from "react";
import { TypeComposition } from "./TypeComposition";
import { ScrollIndicator } from "./ScrollIndicator";
import styles from "./HeroV2.module.css";

export function HeroV2() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }
    const timer = setTimeout(() => setProgress(1), 100);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.backgroundFrame} aria-hidden="true" />
      <div className={styles.content}>
        <TypeComposition progress={progress} reducedMotion={reducedMotion} />
      </div>
      <ScrollIndicator />
    </section>
  );
}