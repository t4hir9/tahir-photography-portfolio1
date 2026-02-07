"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

const WorkSection = () => {
  const [imageErrors, setImageErrors] = useState({});

  const projects = [
    {
      title: "Jaybash Customs Website",
      description:
        "A state-of-the-art website for car customization and drift school. Users can customize their rides and book drift lessons with a modern, responsive interface.",
      year: "2025",
      role: "Frontend Developer",
      duration: "4 weeks",
      tech: ["TypeScript", "Tailwind CSS", "Next.js"],
      image: "/jaybashcustoms.png",
      fallbackIcon: "💱",
      url: "https://jaybash-customs.vercel.app",
    },
    {
      title: "Media samples",
      description:
        "A collection of media projects including photography and videography samples showcasing my skills and creativity.",
      year: "2020 - Present",
      role: "Media Expert",
      duration: "Ongoing",
      tech: ["Photoshop", "Premiere Pro", "After Effects", "DaVinci Resolve"],
      images: Array.from({ length: 65 }, (_, i) => `/photos/${i + 1}.jpg`),
      fallbackIcon: "🎥",
      pictureUrl: "/photos",
      videoUrl:"/videos",
    },
  ];

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section id="work" className="pb-40 scroll-mt-[150px]">
      <div className="mb-16">
        <h2 className="section-title-cinematic mb-4">
          Projects
        </h2>
        <div className="cinematic-divider mb-8"></div>

        <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-16 max-w-3xl font-light animate-fade-in-up">
          Recent projects that showcase thoughtful design and clean implementation. Each project represents a blend of creative problem-solving and technical excellence tailored to deliver results.
        </p>
      </div>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            imageErrors={imageErrors}
            handleImageError={handleImageError}
          />
        ))}
      </div>

      <div className="pt-16 text-center">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100 hover:gap-3 transition-all duration-200 font-medium"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default WorkSection;
