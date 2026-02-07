"use client";

import React from "react";
import Link from "next/link";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Logo() {
  return (
    <button
      onClick={() => scrollToSection("home")}
      className="group cursor-pointer relative"
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-thin text-neutral-500 dark:text-neutral-400 tracking-wide transition-all duration-300 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
          Abdullahi 
        </span>
        <span className="text-3xl font-extralight text-neutral-900 dark:text-neutral-100 tracking-tight transition-all duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
          Tahir
        </span>
        <span className="text-xl font-thin text-neutral-500 dark:text-neutral-400 tracking-wide transition-all duration-300 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
        Adamu
        </span>
      </div>
    </button>
  );
}
