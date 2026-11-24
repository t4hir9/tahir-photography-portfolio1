"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ClipThumbProps } from "./types";
import styles from "./ClipThumb.module.css";

export function ClipThumb({ beforeSrc, afterSrc, progress = 0, className = "" }: ClipThumbProps) {
  const splitPercent = Math.max(0, Math.min(100, progress * 100));
  const [enlargedImage, setEnlargedImage] = useState<"before" | "after" | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setEnlargedImage(null);
  }, []);

  const openModal = useCallback((imageType: "before" | "after") => {
    setEnlargedImage(imageType);
  }, []);

  // Handle escape key and trap focus in modal
  useEffect(() => {
    if (!enlargedImage) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
      // Trap focus within modal
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          const first = focusableElements[0] as HTMLElement;
          const last = focusableElements[focusableElements.length - 1] as HTMLElement;
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus the close button
    setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector("button") as HTMLElement;
      closeBtn?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    };
  }, [enlargedImage, closeModal]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  // Determine which image is under the cursor for click-to-enlarge
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isAfterSide = x / rect.width > progress;
      openModal(isAfterSide ? "after" : "before");
    },
    [progress, openModal]
  );

  const imageSrc = enlargedImage === "before" ? beforeSrc : afterSrc;
  const imageAlt = enlargedImage === "before" ? "Before grade - full size" : "After grade - full size";

  return (
    <>
      <div
        className={`${styles.clipThumb} ${className}`}
        role="img"
        aria-label={`Before/after grade comparison at ${Math.round(progress * 100)}%. Click to enlarge.`}
        style={{ "--split": `${splitPercent}%` } as React.CSSProperties}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        tabIndex={0}
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

        {/* Click hint */}
        <div className={styles.clickHint} aria-hidden="true">
          Click to enlarge
        </div>
      </div>

      {/* Modal for enlarged image */}
      {enlargedImage && (
        <div
          ref={modalRef}
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`${enlargedImage === "before" ? "Before" : "After"} grade - enlarged view`}
          onClick={handleBackdropClick}
        >
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close enlarged view"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={imageSrc}
              alt={imageAlt}
              className={styles.modalImage}
            />
            <p className={styles.modalCaption}>
              {enlargedImage === "before" ? "Before Grade" : "After Grade"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}