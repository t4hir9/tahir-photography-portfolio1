import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return <footer className="site-footer py-12">
    <div className="container mx-auto px-6">
      <div className="footer-main flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="footer-brand"><span>TAHIR ADAMU / 4T9 MEDIA</span><p>Creative work. Thoughtful technology. Abuja, Nigeria.</p><p>Operated by Tahir Adamu · <a href="mailto:abdultahir779@gmail.com">abdultahir779@gmail.com</a> · <a href="tel:+2348148630882">+234 814 863 0882</a></p></div>
        <div className="footer-socials flex gap-3">
          <a href="https://instagram.com/iamt4hir9" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)"><Instagram /></a>
          <a href="https://linkedin.com/in/iamt4hir9" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><Linkedin /></a>
          <a href="mailto:abdultahir779@gmail.com" aria-label="Email Tahir Adamu"><Mail /></a>
        </div>
      </div>
      <div className="footer-bottom mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /><span>Based in Abuja, Nigeria</span></div>
        <nav className="footer-links" aria-label="Legal and social links">
          <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refunds">Refunds</Link><Link href="/cookies">Cookies</Link>
          <button type="button" onClick={() => window.dispatchEvent(new Event("tahir:cookie-settings"))}>Cookie settings</button>
          <a href="mailto:abdultahir779@gmail.com?subject=Data%20deletion%20request">Delete my data</a>
          <a href="https://linkedin.com/in/iamt4hir9" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
          <span>© {new Date().getFullYear()} Tahir Adamu</span>
        </nav>
      </div>
    </div>
  </footer>;
}
