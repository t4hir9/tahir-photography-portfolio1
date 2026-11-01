import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [location] = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const links = [
        { href: "/#selected-work", label: "Work" },
        { href: "/#about", label: "About" },
        { href: "/#experience", label: "Experience" },
        { href: "/portfolio", label: "Gallery" },
    ];
    return (_jsxs(_Fragment, { children: [_jsx(motion.nav, { initial: { y: -100 }, animate: { y: 0 }, className: `site-nav ${location === "/" ? "nav-home" : ""} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled py-3" : "py-5"}`, children: _jsxs("div", { className: "site-nav-inner container mx-auto px-6 flex justify-between items-center", children: [_jsxs(Link, { href: "/", className: "brand-mark", children: [_jsx("img", { className: "brand-logo", src: "/favicon.png", alt: "4T9 Media" }), _jsxs("div", { className: "brand-name", children: [_jsx("span", { children: "TAHIR ADAMU" }), _jsx("small", { children: "MEDIA \u00B7 TECHNOLOGY" })] })] }), _jsxs("div", { className: "desktop-links hidden md:flex items-center", children: [links.map((link) => (_jsx(Link, { href: link.href, className: `nav-link ${location === link.href ? "nav-link-active" : ""}`, children: link.label }, link.href))), _jsxs(Link, { href: "/#contact", className: "nav-contact", children: ["Let\u2019s talk ", _jsx(ArrowUpRight, { size: 15 })] })] }), _jsx("button", { className: "nav-menu-button md:hidden", onClick: () => setIsOpen(!isOpen), "aria-label": isOpen ? "Close menu" : "Open menu", "aria-expanded": isOpen, children: isOpen ? _jsx(X, {}) : _jsx(Menu, {}) })] }) }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: `mobile-menu ${location === "/" ? "nav-home" : ""} fixed inset-0 z-40 pt-24 px-6 md:hidden`, children: _jsxs("div", { className: "flex flex-col", children: [links.map((link) => (_jsx(Link, { href: link.href, children: _jsx("div", { onClick: () => setIsOpen(false), className: "mobile-menu-link", children: link.label }) }, link.href))), _jsxs(Link, { href: "/#contact", onClick: () => setIsOpen(false), className: "mobile-contact", children: ["Let\u2019s talk ", _jsx(ArrowUpRight, { size: 17 })] })] }) })) })] }));
}
