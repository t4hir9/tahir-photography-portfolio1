import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowDownToLine, ArrowLeft, ExternalLink, Pencil, Plus, Trash2, X } from "lucide-react";
import { SEO } from "@/components/SEO";

const STORAGE_KEY = "tahir-tech-projects-draft";
const EMPTY_FORM = { name: "", url: "", description: "", stack: "" };

function stackValue(stack) {
  return Array.isArray(stack) ? stack.join(", ") : "";
}

function makeProject(form) {
  const parsedUrl = new URL(form.url.trim());
  if (parsedUrl.protocol !== "https:") throw new Error("Use a secure https:// project link.");
  return {
    name: form.name.trim(),
    type: "WEB DEVELOPMENT",
    description: form.description.trim(),
    stack: form.stack.split(",").map((item) => item.trim()).filter(Boolean),
    url: parsedUrl.toString(),
  };
}

export default function AdminProjects({ embedded = false }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    async function loadProjects() {
      try {
        const response = await fetch("/tech-projects.json");
        const published = response.ok ? await response.json() : [];
        let saved = null;
        try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { saved = null; }
        if (active) setProjects(Array.isArray(saved) ? saved : Array.isArray(published) ? published : []);
      } catch {
        if (active) setError("Could not load the published project list.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadProjects();
    return () => { active = false; };
  }, []);

  function saveProjects(next) {
    setProjects(next);
    setNotice("");
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("tahir:tech-projects-updated"));
    } catch {
      setError("Browser storage is unavailable. You can still download the current list.");
    }
  }

  function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const project = makeProject(form);
      if (!project.name || !project.description) throw new Error("Add a project name and a short description.");
      const next = [...projects];
      if (editingIndex >= 0) next[editingIndex] = project;
      else next.push(project);
      saveProjects(next);
      setForm(EMPTY_FORM);
      setEditingIndex(-1);
      setNotice(editingIndex >= 0 ? "Project updated in your browser draft." : "Project added to your browser draft.");
    } catch (validationError) {
      setError(validationError.message || "Enter a valid https project URL.");
    }
  }

  function editProject(project, index) {
    setForm({ name: project.name || "", url: project.url || "", description: project.description || "", stack: stackValue(project.stack) });
    setEditingIndex(index);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removeProject(index) {
    const project = projects[index];
    if (!window.confirm(`Remove “${project.name}” from your browser draft?`)) return;
    const next = projects.filter((_, itemIndex) => itemIndex !== index);
    saveProjects(next);
    if (editingIndex === index) { setForm(EMPTY_FORM); setEditingIndex(-1); }
    setNotice("Project removed from your browser draft.");
  }

  function downloadProjects() {
    const blob = new Blob([`${JSON.stringify(projects, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "tech-projects.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Downloaded. Replace client/public/tech-projects.json with this file, then redeploy to publish it for everyone.");
  }

  const MainContent = embedded ? "section" : "main";
  const content = <>
    {!embedded && <SEO title="Admin — Web Projects" description="Manage hosted web projects in Tahir Adamu's portfolio." path="/admin" />}
    {!embedded && <header className="admin-project-header"><div><span>TAHIR ADAMU</span><small>PORTFOLIO ADMIN</small></div><Link href="/"><ArrowLeft size={16} /> View website</Link></header>}
    <MainContent id={embedded ? "hosted-project-admin" : "main-content"} className="admin-project-main">
      <p className="admin-project-eyebrow">WEB DEVELOPMENT / PROJECT LINKS</p>
      <h1>Hosted projects</h1>
      <p className="admin-project-lead">Add the live link, a short overview, and the tools you used. Your draft saves in this browser.</p>
      <div className="admin-project-notice" role="note"><strong>How publishing works</strong><p>After editing, download the JSON file and replace <code>client/public/tech-projects.json</code> in your project. Redeploy the site to publish changes to all visitors. The admin page cannot write directly to the hosted site. Drafts stay in this browser, so do not enter private client information.</p></div>

      <section className="admin-project-editor" aria-labelledby="project-form-title">
        <div className="admin-project-section-heading"><h2 id="project-form-title">{editingIndex >= 0 ? "Edit project" : "Add a project"}</h2>{editingIndex >= 0 && <button type="button" className="admin-project-cancel" onClick={() => { setEditingIndex(-1); setForm(EMPTY_FORM); setError(""); }}>Cancel edit <X size={15} /></button>}</div>
        <form onSubmit={submit}>
          <label>Project name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Example: Studio booking platform" required maxLength={90} /></label>
          <label>Hosted project link<input type="url" inputMode="url" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} placeholder="https://your-project.com" required /></label>
          <label>Short description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What does it do? What problem does it solve?" rows={3} required maxLength={280} /></label>
          <label>Tools / technologies <span className="admin-field-hint">(comma separated)</span><input value={form.stack} onChange={(event) => setForm({ ...form, stack: event.target.value })} placeholder="React, Node.js, PostgreSQL" /></label>
          {error && <p className="admin-project-error" role="alert">{error}</p>}
          <button className="admin-project-submit" type="submit">{editingIndex >= 0 ? <Pencil size={16} /> : <Plus size={17} />}{editingIndex >= 0 ? "Save changes" : "Add project"}</button>
        </form>
      </section>

      <section className="admin-project-list-section" aria-labelledby="saved-projects-title">
        <div className="admin-project-list-heading"><div><p className="admin-project-eyebrow">{projects.length} {projects.length === 1 ? "PROJECT" : "PROJECTS"}</p><h2 id="saved-projects-title">Your list</h2></div><button type="button" className="admin-project-download" onClick={downloadProjects} disabled={loading}><ArrowDownToLine size={17} /> Download JSON</button></div>
        {loading ? <p className="admin-project-empty">Loading projects…</p> : projects.length === 0 ? <p className="admin-project-empty">No hosted projects yet. Add your first project above.</p> : <div className="admin-project-list">{projects.map((project, index) => <article className="admin-project-row" key={`${project.name}-${index}`}>
          <div className="admin-project-row-copy"><h3>{project.name || "Untitled project"}</h3>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">{project.url}<ExternalLink size={13} /></a> : <p className="admin-project-missing-link">Add a hosted link to publish this project.</p>}<p>{project.description}</p>{project.stack?.length > 0 && <div className="admin-project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>}</div>
          <div className="admin-project-row-actions"><button type="button" onClick={() => editProject(project, index)} aria-label={`Edit ${project.name}`}><Pencil size={16} /> Edit</button><button type="button" onClick={() => removeProject(index)} aria-label={`Remove ${project.name}`}><Trash2 size={16} /> Remove</button></div>
        </article>)}</div>}
        {notice && <p className="admin-project-success" role="status">{notice}</p>}
      </section>
    </MainContent>
  </>;
  return embedded ? <section className="admin-project-page admin-project-embedded">{content}</section> : <div className="admin-project-page">{content}</div>;
}
