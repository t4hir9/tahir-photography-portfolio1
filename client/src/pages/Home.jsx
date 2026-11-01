import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Code2, ExternalLink, Film, Layers3, MapPin, Radio, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const GITHUB_BASE = "https://raw.githubusercontent.com/t4hir9/tahir-photography-portfolio1/main/client/public";
const TECH_PROJECTS_DRAFT_KEY = "tahir-tech-projects-draft";
const portraitUrl = `${GITHUB_BASE}/photos/1.jpg`;
const experience = [
  { role: "Founder & Creative Director", company: "4T9 Media", date: "2025 — NOW", note: "Leading client projects from first brief through production, editing, and delivery." },
  { role: "Media Specialist", company: "Reels by Kantiyok", date: "PART-TIME", note: "Collaborating on commercial productions and social-first brand campaigns." },
  { role: "Freelance Media Specialist", company: "Independent", date: "2020 — NOW", note: "Producing photography, video, editing, and event coverage for clients." },
  { role: "Web Development Intern", company: "Greenware Technologies LLC", date: "INTERNSHIP", note: "Practical work across website creation, responsive design, and development workflows." },
];
const skills = [
  { title: "Creative production", items: "Photography · Videography · Editing · Color grading · Visual storytelling" },
  { title: "Web development", items: "JavaScript · React · Next.js · Django · WordPress · Responsive design" },
  { title: "IT & security", items: "IT support · Troubleshooting · Networking · Security awareness · System auditing" },
  { title: "Creative tools", items: "DaVinci Resolve · Premiere Pro · After Effects · Lightroom · Photoshop" },
];
const disciplines = [
  { label: "01 / CREATIVE", title: <>Stories you<br />can <em>feel.</em></>, description: "Photography, video, and post-production for brands, events, and people worth paying attention to.", href: "/portfolio?filter=photo", action: "See creative work", icon: Film, className: "creative-track" },
  { label: "02 / TECHNOLOGY", title: <>Tools that<br />make <em>sense.</em></>, description: "Web experiences, practical IT support, and growing cybersecurity expertise grounded in real projects.", href: "#tech-builds", action: "Explore tech builds", icon: Radio, className: "technology-track" },
];

function SectionLabel({ number, children }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/tech-projects.json")
      .then((response) => response.ok ? response.json() : [])
      .then((items) => {
        let visibleItems = Array.isArray(items) ? items : [];
        try {
          const draft = JSON.parse(localStorage.getItem(TECH_PROJECTS_DRAFT_KEY) || "null");
          if (Array.isArray(draft)) visibleItems = draft;
        } catch { /* Fall back to the published project list. */ }
        setProjects(visibleItems);
      })
      .catch(() => setProjects([]));
  }, []);

  return (
    <div className="portfolio-site">
      <SEO title="Abdullahi Tahir Adamu — Media & Technology Specialist" description="Meet Tahir Adamu, an Abuja-based media and technology specialist working across creative production, web development, IT support, and cybersecurity." path="/" type="profile" />
      <Navigation />
      <main id="main-content">
        <section className="intro-section" id="top">
          <div className="intro-backdrop" aria-hidden="true">
            <video autoPlay loop muted playsInline preload="metadata" poster={portraitUrl}>
              <source src={`${GITHUB_BASE}/videos/Reel.MP4`} type="video/mp4" />
            </video>
            <div className="intro-backdrop-shade" />
          </div>
          <div className="intro-copy">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <p className="eyebrow"><span className="availability-dot" /> MEDIA & TECHNOLOGY SPECIALIST <span className="eyebrow-divider">/</span> ABUJA, NIGERIA</p>
              <h1>Ideas made<br /><span>visible.</span> Systems<br />made useful.</h1>
              <p className="intro-summary">I’m Tahir, a creative producer and technology specialist. I make visual stories for people and brands, and build digital tools that help ideas move forward.</p>
              <div className="intro-actions">
                <Link href="/portfolio" className="action-primary">Explore my work <ArrowRight size={17} /></Link>
                <a className="action-text" href="/CV UPDATED.pdf" target="_blank" rel="noreferrer">View my CV <ArrowDownRight size={17} /></a>
              </div>
            </motion.div>
          </div>
          <motion.div className="intro-visual" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.15 }}>
            <img src={portraitUrl} alt="A photograph from Tahir Adamu's creative portfolio" fetchPriority="high" />
            <div className="visual-caption"><span>4T9 MEDIA</span><span>CREATIVE WORK, 2025</span></div>
            <div className="visual-index">01 / 04</div>
          </motion.div>
          <a href="#disciplines" className="scroll-cue" aria-label="Scroll to selected work"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="discipline-section page-section" id="disciplines">
          <div className="section-heading"><SectionLabel number="01">WHAT I DO</SectionLabel><p className="section-intro">Two disciplines, one point of view: making thoughtful work that connects with people.</p></div>
          <div className="discipline-grid">
            {disciplines.map((discipline) => {
              const Icon = discipline.icon;
              return <a key={discipline.label} href={discipline.href} className={`discipline-item ${discipline.className}`}>
                <div className="discipline-topline"><span>{discipline.label}</span><Icon size={19} /></div>
                <h2>{discipline.title}</h2><p>{discipline.description}</p>
                <span className="discipline-link">{discipline.action} <ArrowRight size={16} /></span>
                {discipline.className === "creative-track" ? <div className="discipline-photo" style={{ backgroundImage: `url("${GITHUB_BASE}/photos/10.jpg")` }} /> : <div className="code-motif" aria-hidden="true"><span>&lt;build /&gt;</span><span>0101&nbsp; 1100&nbsp; 0011</span><span>{"{ ideas: useful }"}</span></div>}
              </a>;
            })}
          </div>
        </section>

        <section className="projects-section page-section" id="tech-builds">
          <div className="section-heading section-heading-row">
            <div><SectionLabel number="02">TECH BUILDS</SectionLabel><h2 className="display-heading">Useful things,<br />made real.</h2></div>
            <a href="mailto:abdultahir779@gmail.com?subject=Technology%20project" className="action-text projects-all">Have a project in mind? <ArrowRight size={17} /></a>
          </div>
          <div className="project-list">
            {projects.length ? projects.map((project, index) => <article className="project-row tech-project-row" key={project.name}>
              <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="project-icon"><Code2 size={21} strokeWidth={1.6} /></div>
              <div className="project-copy"><p className="project-type">{project.type || "Technology project"}</p><h3>{project.name}</h3><p>{project.description}</p></div>
              <div className="project-tags">{(project.stack || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
              {project.url ? <a className="project-arrow-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ExternalLink size={18} /></a> : <ArrowDownRight className="project-arrow" size={20} />}
            </article>) : <article className="project-row tech-project-empty"><span className="project-number">01</span><div className="project-icon"><Layers3 size={21} strokeWidth={1.6} /></div><div className="project-copy"><p className="project-type">WEB DEVELOPMENT</p><h3>Girau School Portal</h3><p>A Django school management portal for student and teacher records, results, and assessment workflows.</p></div><div className="project-tags"><span>Django</span><span>Python</span><span>Education</span></div><ArrowDownRight className="project-arrow" size={20} /></article>}
          </div>
          <p className="project-note">To add or update hosted project links, open <a href="/admin">Admin</a>. Download the updated JSON there and redeploy it to publish for everyone.</p>
        </section>

        <section className="projects-section page-section media-work-section" id="selected-work">
          <div className="section-heading section-heading-row"><div><SectionLabel number="03">SELECTED CREATIVE WORK</SectionLabel><h2 className="display-heading">Frames with<br />feeling.</h2></div><Link href="/portfolio" className="action-text projects-all">Explore photo & video <ArrowRight size={17} /></Link></div>
          <div className="creative-preview-grid"><Link href="/portfolio?filter=photo" className="creative-preview"><img src={`${GITHUB_BASE}/photos/10.jpg`} alt="Portrait photography from Tahir's portfolio" loading="lazy" /><span>PHOTOGRAPHY <ArrowDownRight size={17} /></span></Link><Link href="/portfolio?filter=video" className="creative-preview creative-preview-secondary"><img src={`${GITHUB_BASE}/photos/1.jpg`} alt="" loading="lazy" /><span>VIDEO PRODUCTION <ArrowDownRight size={17} /></span></Link></div>
        </section>

        <section className="about-band" id="about"><div className="about-band-inner"><div><SectionLabel number="04">A BIT ABOUT ME</SectionLabel><h2>Curious by nature.<br /><em>Useful by design.</em></h2></div><div className="about-band-copy"><p>I have a Computer Science background and hands-on experience in creative production and web development. I enjoy the whole process: finding the story, shaping the details, and making the final thing work in the real world.</p><p>Right now I’m building deeper skills in IT support, networking, and cybersecurity through practical work and structured training.</p><Link href="/about" className="action-text">More about me <ArrowRight size={17} /></Link></div></div></section>

        <section className="experience-section page-section" id="experience"><div className="section-heading"><SectionLabel number="05">EXPERIENCE</SectionLabel><p className="section-intro">Good work comes from showing up, staying curious, and seeing a project through.</p></div><div className="experience-list">{experience.map((item) => <article className="experience-row" key={item.role}><span className="experience-date">{item.date}</span><div><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p className="experience-note">{item.note}</p></div><ArrowDownRight size={18} /></article>)}</div></section>

        <section className="skills-section page-section" id="skills"><div className="section-heading"><SectionLabel number="06">TOOLS & SKILLS</SectionLabel><p className="section-intro">A growing toolkit for making, building, and keeping things running.</p></div><div className="skills-grid">{skills.map((skill) => <div className="skill-item" key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></div>)}</div><div className="training-line"><ShieldCheck size={19} /><p><strong>Training & simulations</strong> <span>Cisco Introduction to Cybersecurity · Mastercard Cybersecurity · Datacom Software Development · British Airways Data Science</span></p></div></section>

        <section className="contact-band" id="contact"><div><SectionLabel number="07">HAVE SOMETHING IN MIND?</SectionLabel><h2>Let’s make it<br /><em>happen.</em></h2></div><div className="contact-details"><a href="mailto:abdultahir779@gmail.com">abdultahir779@gmail.com <ExternalLink size={17} /></a><a href="tel:+2348148630882">+234 814 863 0882 <ExternalLink size={17} /></a><p><MapPin size={16} /> Abuja, Nigeria · Available for the right project</p></div></section>
      </main>
      <Footer />
    </div>
  );
}
