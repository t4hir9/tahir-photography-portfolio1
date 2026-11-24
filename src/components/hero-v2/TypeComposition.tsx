"use client";

import { useMemo } from "react";
import { TypeCompositionProps } from "./types";
import styles from "./TypeComposition.module.css";

const LINES = ["FRAME BY FRAME.", "LINE BY LINE."];

export function TypeComposition({ progress, reducedMotion }: TypeCompositionProps) {
  const chars = useMemo(() => {
    const result: { char: string; lineIndex: number; charIndex: number; delay: number }[] = [];
    LINES.forEach((line, lineIndex) => {
      [...line].forEach((char, charIndex) => {
        result.push({
          char: char === " " ? " " : char,
          lineIndex,
          charIndex,
          delay: (lineIndex * line.length + charIndex) * 40, // stagger-delay = 40ms
        });
      });
    });
    return result;
  }, []);

  const totalDelay = chars[chars.length - 1].delay;
  const animationDuration = 800; // duration-slow = 800ms

  return (
    <div
      className={`${styles.container} ${reducedMotion ? styles.reducedMotion : ""}`}
      role="heading"
      aria-level={1}
      aria-label="Frame by frame, line by line"
    >
      {LINES.map((line, lineIndex) => (
        <div key={lineIndex} className={styles.line}>
          {chars
            .filter((c) => c.lineIndex === lineIndex)
            .map((c) => (
              <span
                key={`${c.lineIndex}-${c.charIndex}`}
                className={styles.char}
                style={{
                  "--delay": `${reducedMotion ? 0 : c.delay}ms`,
                  "--duration": `${animationDuration}ms`,
                } as React.CSSProperties}
              >
                {c.char}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
}