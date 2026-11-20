"use client";

import { TechSectionProps } from "./types";
import { TechCard } from "./TechCard";
import { techProjects } from "@/lib/tech-data";
import styles from "./TechSection.module.css";

export function TechSection({ projects = techProjects, className = "" }: TechSectionProps) {
  return (
    <section className={`${styles.section} ${className}`} id="tech" aria-labelledby="tech-heading">
      <header className={styles.header}>
        <h2 id="tech-heading" className={styles.sectionTitle}>
          Tech
        </h2>
        <p className={styles.sectionDescription}>
          Remotion motion graphics & creative coding. Hover cards to expand diff and play live demo.
        </p>
      </header>

      <div className={styles.grid} role="list" aria-label="Tech projects">
        {projects.map((project) => (
          <div key={project.id} className={styles.gridItem} role="listitem">
            <TechCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}