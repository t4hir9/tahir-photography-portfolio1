import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const links = [
  { href: "/#selected-work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/portfolio", label: "Gallery" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, []);

  return <>
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`site-nav ${location === "/" ? "nav-home" : ""} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled py-3" : "py-5"}`} aria-label="Main navigation">
      <div className="site-nav-inner container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="brand-mark">
          <img className="brand-logo" src="/favicon.png" alt="" />
          <span className="brand-name"><span>TAHIR ADAMU</span><small>MEDIA · TECHNOLOGY</small></span>
        </a>
        <div className="desktop-links hidden md:flex items-center">
          {links.map((link) => <a key={link.href} href={link.href} className={`nav-link ${location === "/" && hash === link.href.slice(1) ? "nav-link-active" : ""}`}>{link.label}</a>)}
          <a href="/#contact" className="nav-contact">Let’s talk <ArrowUpRight size={15} /></a>
        </div>
        <button type="button" className="nav-menu-button md:hidden" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-site-menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.nav>
    <AnimatePresence>
      {isOpen && <motion.nav id="mobile-site-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mobile-menu ${location === "/" ? "nav-home" : ""} fixed inset-0 z-40 pt-24 px-6 md:hidden`} aria-label="Mobile navigation">
        <div className="flex flex-col">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="mobile-menu-link">{link.label}</a>)}
          <a href="/#contact" onClick={() => setIsOpen(false)} className="mobile-contact">Let’s talk <ArrowUpRight size={17} /></a>
        </div>
      </motion.nav>}
    </AnimatePresence>
  </>;
}
