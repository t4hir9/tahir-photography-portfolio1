"use client";

import Image from "next/image";
import { AboutSectionProps } from "./types";
import styles from "./AboutSection.module.css";

export function AboutSection({ className = "" }: AboutSectionProps) {
  return (
    <section className={`${styles.section} ${className}`} id="about" aria-labelledby="about-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="about-heading" className={styles.sectionTitle}>
            About
          </h2>
        </header>

        <div className={styles.content}>
          <div className={styles.bio}>
            <p>
              I&apos;m a filmmaker and creative technologist working at the intersection of
              color science and motion graphics. With a background in DaVinci Resolve
              color grading and a passion for code-driven animation, I build tools and
              workflows that bridge the gap between traditional post-production and
              modern web technologies.
            </p>
            <p>
              My film work focuses on narrative color grading — crafting emotional
              palettes that serve story, from day-for-night transformations to
              consistent cross-camera matching. On the tech side, I develop Remotion
              compositions for programmatic video generation, real-time motion graphics,
              and data-driven animations.
            </p>
            <p>
              When not grading or coding, you&apos;ll find me experimenting with film
              emulation LUTs, contributing to open-source video tools, or shooting
              analog photography.
            </p>
          </div>

          <div className={styles.images} role="list" aria-label="About photos">
            <figure className={styles.imageWrapper} data-testid="about-img-1">
              <Image
                src="/images/about-1.jpg"
                alt="Behind the scenes in grading suite"
                width={600}
                height={800}
                className={styles.image}
                loading="lazy"
              />
              <figcaption className={styles.caption}>In the grading suite</figcaption>
            </figure>
            <figure className={styles.imageWrapper} data-testid="about-img-2">
              <Image
                src="/images/about-2.jpg"
                alt="On set with camera equipment"
                width={600}
                height={800}
                className={styles.image}
                loading="lazy"
              />
              <figcaption className={styles.caption}>On set</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}