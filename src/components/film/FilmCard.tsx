"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FilmCardProps } from "./types";
import { TimelineHeader } from "./TimelineHeader";
import { ClipThumb } from "./ClipThumb";
import { PlayheadIndicator } from "./PlayheadIndicator";
import styles from "./FilmCard.module.css";

export function FilmCard({ project, className = "" }: FilmCardProps) {
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!thumbRef.current) return;
      const rect = thumbRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newProgress = Math.max(0, Math.min(1, x / rect.width));
      setProgress(newProgress);
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Reset progress on leave
    setProgress(0);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isHovering) return;
      const step = 0.05;
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setProgress((p) => Math.min(1, p + step));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setProgress((p) => Math.max(0, p - step));
          break;
        case "Home":
          e.preventDefault();
          setProgress(0);
          break;
        case "End":
          e.preventDefault();
          setProgress(1);
          break;
        default:
          return;
      }
    },
    [isHovering]
  );

  // Keyboard support when card is focused
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleFocusKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === card) {
        // Convert native KeyboardEvent to React-like event
        const reactEvent = {
          key: e.key,
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation(),
          nativeEvent: e,
          currentTarget: card,
          target: e.target as Element,
        } as unknown as React.KeyboardEvent<HTMLDivElement>;
        handleKeyDown(reactEvent);
      }
    };

    card.addEventListener("keydown", handleFocusKeyDown);
    return () => card.removeEventListener("keydown", handleFocusKeyDown);
  }, [handleKeyDown]);

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${className}`}
      tabIndex={0}
      role="region"
      aria-label={`${project.title} — ${project.timecode}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <TimelineHeader timecode={project.timecode} />

      <div ref={thumbRef} className={styles.thumbContainer} data-testid="thumb-container">
        <ClipThumb
          beforeSrc={project.beforeGradeSrc}
          afterSrc={project.afterGradeSrc}
          progress={progress}
        />
        <PlayheadIndicator progress={progress} />
      </div>

      <footer className={styles.footer}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.meta}>
          <span className={styles.duration}>{project.duration}</span>
          <span className={styles.role}>{project.role}</span>
        </div>
        <div className={styles.tags} aria-label="Tags">
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </footer>

      {/* Scrub hint */}
      {isHovering && (
        <div className={styles.scrubHint} aria-hidden="true">
          Scrub to compare grades
        </div>
      )}
    </article>
  );
}