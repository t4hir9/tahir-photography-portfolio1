import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:abdultahir779@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return <div className="portfolio-site contact-page">
    <SEO title="Contact Tahir Adamu — Project Enquiries" description="Contact Abuja-based media and technology specialist Tahir Adamu about photography, video, web, and technology projects." path="/contact" />
    <Navigation />
    <main id="main-content" className="contact-main page-section">
      <div className="contact-heading"><p className="eyebrow"><span className="availability-dot" /> ABUJA, NIGERIA / AVAILABLE FOR SELECT PROJECTS</p><h1>Let’s make<br /><em>something matter.</em></h1><p>Tell me what you’re working on. I’d love to hear about the idea and see how I can help.</p></div>
      <div className="contact-layout">
        <div className="contact-info">
          <a href="mailto:abdultahir779@gmail.com"><Mail size={18} /><span><small>EMAIL</small>abdultahir779@gmail.com</span><ArrowUpRight size={16} /></a>
          <a href="tel:+2348148630882"><Phone size={18} /><span><small>PHONE</small>+234 814 863 0882</span><ArrowUpRight size={16} /></a>
          <div><MapPin size={18} /><span><small>BASED IN</small>Abuja, Nigeria</span></div>
          <p className="contact-response-note">For bookings, collaborations, and thoughtful ideas.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your name<input name="name" autoComplete="name" placeholder="How should I address you?" required /></label>
          <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Tell me about your project<textarea name="message" rows="5" placeholder="A few details about the idea, timing, or what you need…" required /></label>
          <label className="contact-consent"><input type="checkbox" name="privacyAcknowledged" required /><span>I understand this form opens my email app; the site does not send or store this draft. I have read the <Link href="/privacy">Privacy Policy</Link>.</span></label>
          <label className="contact-consent"><input type="checkbox" name="adultOrGuardian" required /><span>I am 18 or older, or I am a parent/legal guardian making this enquiry on behalf of someone under 18.</span></label>
          <button type="submit">Write your message <ArrowUpRight size={17} /></button>
          {sent && <p className="contact-form-note" role="status">Your email app should open with the message ready to send.</p>}
        </form>
      </div>
    </main>
    <Footer />
  </div>;
}
