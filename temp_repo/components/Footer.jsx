"use client";

import { Github, Linkedin, Mail, Instagram, Twitter, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Footer({ homepage = true }) {
  // Precompute year on the server to avoid hydration mismatch
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:abdultahir779@gmail.com",
      icon: Mail,
      external: false,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/iamt4hir9",
      icon: Linkedin,
      external: true,
    },
    {
      name: "GitHub",
      href: "https://github.com/t4hir9",
      icon: Github,
      external: true,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/iamt4hir9",
      icon: Instagram,
      external: true,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/iamt4hir9",
      icon: Twitter,
      external: true,
    },
  ];

  return (
    <footer className="relative z-10 py-12 md:py-16 border-t border-neutral-200/80 dark:border-neutral-200/20 bg-white dark:bg-black">
      <div className="mx-auto px-2 sm:px-3 lg:px-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          {/* Left: Logo & Copyright */}
          <div className="flex flex-col items-start gap-4">
            {homepage ? (
              <Logo />
            ) : (
              <Link href="/" className="group cursor-pointer relative">
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
              </Link>
            )}
            <div 
              className="text-sm text-gray-500 dark:text-neutral-300 font-light"
              suppressHydrationWarning
            >
              © {currentYear} All rights reserved.
            </div>
          </div>

          {/* Right: Connect with Me Section */}
          <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
            {/* Mobile Dropdown */}
            <div className="md:hidden w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-neutral-900 dark:hover:border-white transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 w-full md:w-auto justify-between">
                    Connect with me
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <DropdownMenuItem key={link.name} asChild>
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors duration-200"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{link.name}</span>
                        </a>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex flex-col items-end gap-4">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 tracking-wide">
                Connect with me
              </h3>
              <div className="flex items-center gap-6">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-500 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative group flex items-center gap-2"
                      aria-label={`Connect via ${link.name}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
