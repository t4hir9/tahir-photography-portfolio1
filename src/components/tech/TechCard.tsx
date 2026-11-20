"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { TechCardProps } from "./types";
import { CommitHeader } from "./CommitHeader";
import { DiffPreview } from "./DiffPreview";
import { LiveDemo } from "./LiveDemo";
import styles from "./TechCard.module.css";

export function TechCard({ project, className = "" }: TechCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDiffExpanded, setIsDiffExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isHovering && document.activeElement !== cardRef.current) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          setIsDiffExpanded((prev) => !prev);
          break;
        case "Escape":
          setIsDiffExpanded(false);
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
      className={`${styles.card} ${className} ${isHovering ? styles.hovered : ""}`}
      tabIndex={0}
      role="region"
      aria-label={`${project.message} — ${project.shortHash}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CommitHeader
        hash={project.shortHash}
        message={project.message}
        date={project.date}
      />

      <div className={styles.content}>
        <DiffPreview
          files={project.files}
          expanded={isDiffExpanded || isHovering}
          onToggle={() => setIsDiffExpanded((prev) => !prev)}
        />

        <LiveDemo compositionName={project.compositionName} />
      </div>

      <footer className={styles.footer}>
        <div className={styles.tags} aria-label="Tags">
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="View on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
      </footer>

      {/* Expand hint */}
      {isHovering && (
        <div className={styles.expandHint} aria-hidden="true">
          Press Space to expand diff
        </div>
      )}
    </article>
  );
}