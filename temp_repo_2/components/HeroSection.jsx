import React from "react";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const HeroSection = ({ scrollToSection }) => {
  return (
    <section
      id="home"
      className="pt-15 pb-60 px-2 sm:px-3 lg:px-4 scroll-mt-15 bg-[url('/websitebackground.png')] bg-flex bg-right bg-no-repeat bg-cover"
      style={{
        backgroundImage: `
        linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
          url('/websitebackground.png')
        `,
        }}
      >


        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200/50 dark:border-green-800/50 rounded-full text-xs font-medium text-green-700 dark:text-green-400 mb-12 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full animate-pulse" />
          Available for new projects
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-neutral-100 dark:text-neutral-100 leading-[0.9] mb-8 tracking-tight animate-cinematic-slide">
          <span className="inline-block animate-floating">Front-End Developer</span>
          <br />
          <span className="text-neutral-400 dark:text-neutral-400 italic font-thin">
            &
          </span>{" "}
          <span className="inline-block animate-floating" style={{ animationDelay: "0.2s" }}>Media Expert</span>
        </h1>

        <div className="max-w-2xl mb-16">
          <p className="text-xl md:text-2xl text-neutral-300 dark:text-neutral-300 leading-relaxed font-light mb-8">
            React developer and Next.js specialist with 6+ years building modern web applications and Web3 interfaces. Senior frontend developer delivering high-performance, responsive applications. Also a professional video editor and cinematographer creating cinematic visuals for brands across Nigeria and beyond.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/projects"
            className="accent-button"
            aria-label="View my selected work portfolio"
          >
            <span>View All Projects</span>
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/TahirCV.pdf"
            download
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white text-sm font-medium rounded-lg hover:bg-white hover:text-black hover:shadow-xl hover:shadow-white/30 hover:-translate-y-1 transition-all duration-300"
            aria-label="Download my resume"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </Link>
        </div>
    </section>
  );
};

export default HeroSection;