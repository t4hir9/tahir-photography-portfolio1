import { useEffect, useState } from "react";

const STORAGE_KEY = "tahir-site-preferences";
const FONT_URL = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap";

function loadGoogleFonts() {
  if (document.querySelector("#tahir-google-fonts")) return;
  const link = document.createElement("link");
  link.id = "tahir-google-fonts";
  link.rel = "stylesheet";
  link.href = FONT_URL;
  document.head.appendChild(link);
}

export default function CookieConsent() {
  const [choice, setChoice] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || ""; } catch { return ""; }
  });
  const [open, setOpen] = useState(!choice);

  useEffect(() => {
    if (choice === "google-fonts") loadGoogleFonts();
    else document.querySelector("#tahir-google-fonts")?.remove();
  }, [choice]);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("tahir:cookie-settings", reopen);
    return () => window.removeEventListener("tahir:cookie-settings", reopen);
  }, []);

  function save(value) {
    setChoice(value);
    setOpen(false);
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* Preference remains for this visit. */ }
  }

  if (!open) return null;
  return <aside className="consent-banner" aria-label="Privacy and font preferences" role="region">
    <div className="consent-copy"><strong>Privacy & display preferences</strong><p>This site has no advertising or analytics cookies. You can allow optional Google Fonts; gallery media is served by GitHub. Your choice is saved in this browser.</p><a href="/cookies">Cookie details</a></div>
    <div className="consent-actions"><button type="button" className="consent-secondary" onClick={() => save("system-fonts")}>Use system fonts</button><button type="button" className="consent-primary" onClick={() => save("google-fonts")}>Allow Google Fonts</button></div>
  </aside>;
}
