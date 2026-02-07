"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({ project, index, imageErrors, handleImageError }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (project.title === "Media samples" && project.images) {
      const interval = setInterval(() => {
        setFadeOut(true);
        const timer = setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
          setFadeOut(false);
        }, 300);
        return () => clearTimeout(timer);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [project.title, project.images]);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 animate-fade-in-up">
      {/* Image/Slideshow */}
      <div className="flex-1 project-card-hover">
        {project.title === "Media samples" && project.images ? (
          imageErrors[index] ? (
            <div className="w-full h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center text-5xl rounded-lg">
              {project.fallbackIcon}
            </div>
          ) : (
            <div className="w-full h-64 rounded-lg border-2 border-white/30 hover:border-white project-image-enhanced relative overflow-hidden" style={{ willChange: 'opacity' }}>
              <Image
                src={project.images[currentImageIndex]}
                alt={`Media sample ${currentImageIndex}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                onError={() => handleImageError(index)}
                loading="lazy"
                quality={75}
              />
            </div>
          )
        ) : (
          imageErrors[index] ? (
            <div className="w-full h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center text-5xl rounded-lg">
              {project.fallbackIcon}
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={256}
              className="w-full h-64 object-cover rounded-lg border-2 border-white/30 hover:border-white transition-all duration-300 project-image-enhanced"
              onError={() => handleImageError(index)}
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
              quality={80}
            />
          )
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-2">
          {project.title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.role}</span>
          <span>•</span>
          <span>{project.duration}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
        {project.title === "Media samples" ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={project.videoUrl}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:shadow-lg hover:shadow-white/40 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="View video samples"
            >
              <span>Video Samples</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href={project.pictureUrl}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:shadow-lg hover:shadow-white/40 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="View picture samples"
            >
              <span>Picture Samples</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        ) : (
          project.url && (
            <Link
              href={project.url}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:shadow-lg hover:shadow-white/40 hover:-translate-y-0.5 transition-all duration-200"
              aria-label={`View ${project.title}`}
            >
              <span>View Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectCard;