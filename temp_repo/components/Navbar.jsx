"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Touch handlers for drag to close
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setDragY(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const deltaY = Math.max(0, currentY - startY); // Only allow downward drag
    setDragY(deltaY);
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;

    setIsDragging(false);

    // Close if dragged down more than 100px
    if (dragY > 100) {
      setIsMenuOpen(false);
    }

    setDragY(0);
  };

  const navLinks = [
    { href: "#work", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 border-b z-50 py-6 border-neutral-200/80 dark:border-neutral-200/20 transition-[background,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md "
            : "bg-transparent"
        }`}
      >
        <div className="px-2 sm:px-3 lg:px-4 w-full mx-auto">
          <div className="flex justify-between items-center">
            <Logo />

            <div className="flex items-center gap-6">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8 text-sm font-light">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden relative w-6 h-6 flex flex-col items-center justify-center z-[60]"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col items-center justify-center gap-[7px] transition-all duration-300 ease-in-out">
                  <span
                    className={`w-[24px] h-[2px] bg-black dark:bg-white transition-transform duration-300 ease-in-out origin-center ${
                      isMenuOpen ? "rotate-45 translate-y-[5px]" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-[24px] h-[2px] bg-black dark:bg-white transition-transform duration-300 ease-in-out origin-center ${
                      isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Sheet Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[55] transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Bottom Sheet */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700 rounded-t-3xl shadow-2xl ${
            !isDragging ? "transition-transform duration-500 ease-out" : ""
          }`}
          style={{
            transform: isDragging
              ? `translateY(${dragY}px)`
              : isMenuOpen
              ? "translateY(0)"
              : "translateY(100%)",
          }}
        >
          {/* Drag Handle */}
          <div
            className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-500 rounded-full" />
          </div>

          {/* Sheet Content */}
          <div className="px-6 pb-8 pt-4">
            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block text-2xl font-light py-4 text-neutral-800 dark:text-white hover:text-black dark:hover:text-neutral-300 transition-all duration-300 border-b border-neutral-100 dark:border-neutral-800 last:border-0 ${
                    isMenuOpen ? "animate-slide-up" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100 + 200}ms`,
                    animationFillMode: "backwards",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
