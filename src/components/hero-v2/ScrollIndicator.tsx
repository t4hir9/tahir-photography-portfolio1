"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollIndicator.module.css";

export function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.container} ${visible ? styles.visible : ""} ${reducedMotion ? styles.reducedMotion : ""}`}
      aria-hidden="true"
    >
      <div className={styles.mouse}>
        <div className={styles.wheel} />
      </div>
      <div className={styles.arrow} />
    </div>
  );
}