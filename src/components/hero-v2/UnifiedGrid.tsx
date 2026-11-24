"use client";

import { FilmCard } from "@/components/film/FilmCard";
import { TechCard } from "@/components/tech/TechCard";
import { filmProjects } from "@/lib/film-data";
import { techProjects } from "@/lib/tech-data";
import styles from "./UnifiedGrid.module.css";

interface UnifiedGridProps {
  filmProjects?: typeof filmProjects;
  techProjects?: typeof techProjects;
  className?: string;
}

export function UnifiedGrid({
  filmProjects: films = filmProjects,
  techProjects: tech = techProjects,
  className = "",
}: UnifiedGridProps) {
  return (
    <section className={`${styles.section} ${className}`} id="work" aria-labelledby="work-heading">
      <header className={styles.header}>
        <h2 id="work-heading" className={styles.sectionTitle}>
          Selected Work
        </h2>
        <p className={styles.sectionDescription}>
          Film grading and motion graphics. Two crafts, one timeline.
        </p>
      </header>

      <div className={styles.gridWrapper}>
        {/* Film Section */}
        <div className={styles.category} id="film" aria-labelledby="film-heading">
          <header className={styles.categoryHeader}>
            <h3 id="film-heading" className={styles.categoryTitle}>
              Film
            </h3>
            <p className={styles.categoryDescription}>
              DaVinci Resolve color grading & editorial. Hover to scrub grades.
            </p>
          </header>
          <div className={styles.categoryGrid} role="list" aria-label="Film projects">
            {films.map((project) => (
              <div key={project.id} className={styles.gridItem} role="listitem">
                <FilmCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Tech Section */}
        <div className={styles.category} id="tech" aria-labelledby="tech-heading">
          <header className={styles.categoryHeader}>
            <h3 id="tech-heading" className={styles.categoryTitle}>
              Tech
            </h3>
            <p className={styles.categoryDescription}>
              Remotion motion graphics & creative coding. Hover to expand diff and play demo.
            </p>
          </header>
          <div className={styles.categoryGrid} role="list" aria-label="Tech projects">
            {tech.map((project) => (
              <div key={project.id} className={styles.gridItem} role="listitem">
                <TechCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}