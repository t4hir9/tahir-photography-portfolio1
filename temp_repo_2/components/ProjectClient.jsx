"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const ProjectsClient = () => {
  const [imageErrors, setImageErrors] = useState({});
  const router = useRouter();

  const projects = [
    {
      title: "jaybash Customs - Car Customization & Drift School",
      description:
        "A state of the art website built for the one and only drift king. Users can customise their rides and book drift lessons.",
      year: "2025",
      role: "Frontend Developer",
      duration: "4 weeks",
      tech: ["Nextjs", "Tailwind CSS", "typescript"],
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
      images: ["/background2.JPG", "/background3.JPG", "/background.JPG","/photos/17.jpg","/photos/27.jpg","/photos/29.jpg","/photos/52.jpg","/photos/54.jpg","/photos/65.jpg","/photos/61.jpg"],
      fallbackIcon: "🎥",
      pictureUrl: "/photos",
      videoUrl:"/videos",
    },
  ];

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="mx-auto px-2 sm:px-3 lg:px-4 w-full pt-8 pb-20">
          {/* Header */}
          <header className="mb-16">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Home</span>
            </button>

            <div>
              <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 dark:text-neutral-100 mb-12 tracking-tight">
                All Projects
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-16 max-w-3xl font-light">
                A collection of projects that showcase my approach to solving
                complex problems through thoughtful design and eye-catching moments
              </p>
            </div>
          </header>

          {/* Projects Grid */}
          <div className="space-y-20">
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

          <h2 className="mt-4 text-center text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
            More Projects Coming Soon...
          </h2>

          {/* Footer CTA */}
          <div className="pt-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
                Interested in working together?
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-8">
                I&apos;m always open to discussing new opportunities and
                interesting projects.
              </p>
              <a
                href="mailto:abdultahir779@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200 font-medium"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer homepage={false} />
    </>
  );
};

export default ProjectsClient;