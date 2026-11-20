"use client";

import { FilmSectionProps } from "./types";
import { FilmCard } from "./FilmCard";
import { filmProjects } from "@/lib/film-data";
import styles from "./FilmSection.module.css";

export function FilmSection({ projects = filmProjects, className = "" }: FilmSectionProps) {
  return (
    <section className={`${styles.section} ${className}`} id="film" aria-labelledby="film-heading">
      <header className={styles.header}>
        <h2 id="film-heading" className={styles.sectionTitle}>
          Film
        </h2>
        <p className={styles.sectionDescription}>
          DaVinci Resolve color grading & editorial work. Hover cards to scrub through before/after grades.
        </p>
      </header>

      <div className={styles.grid} role="list" aria-label="Film projects">
        {projects.map((project) => (
          <div key={project.id} className={styles.gridItem} role="listitem">
            <FilmCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}