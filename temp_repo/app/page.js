"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Simulate content loading
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar scrollToSection={scrollToSection} />
      <div className="min-h-screen bg-neutral-50 dark:bg-black overflow-x-hidden">
        <main
          className={`relative z-10 px-2 sm:px-3 lg:px-4 pt-10 w-full transition-opacity duration-1500 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeroSection scrollToSection={scrollToSection} />
          <WorkSection />
          <AboutSection />
          <CertificationsSection />
          <ContactSection />
        </main>
      </div>
      <Footer />
    </>
  );
}
