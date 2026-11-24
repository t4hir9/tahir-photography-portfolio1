"use client";

import Link from "next/link";
import { FooterProps } from "./types";
import styles from "./Footer.module.css";

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#film", label: "Film" },
    { href: "#tech", label: "Tech" },
    { href: "#pricing", label: "Pricing" },
  ];

  const socialLinks = [
    { href: "https://github.com", label: "GitHub", ariaLabel: "GitHub profile" },
    { href: "https://linkedin.com", label: "LinkedIn", ariaLabel: "LinkedIn profile" },
    { href: "https://twitter.com", label: "Twitter", ariaLabel: "Twitter profile" },
    { href: "https://instagram.com", label: "Instagram", ariaLabel: "Instagram profile" },
  ];

  return (
    <footer className={`${styles.footer} ${className}`} role="contentinfo">
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Footer navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.social} aria-label="Social links">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={styles.socialLink}
              aria-label={social.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">{social.label}</span>
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <a
            href="mailto:hello@example.com"
            className={styles.emailLink}
          >
            Let&apos;s work together →
          </a>
        </div>

        <p className={styles.copyright}>
          © {currentYear} 4T9. Built with Next.js & Remotion.
        </p>
      </div>
    </footer>
  );
}