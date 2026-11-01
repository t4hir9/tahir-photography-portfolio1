import { Link, useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const updated = "1 November 2026";

const policies = {
  "/privacy": {
    title: "Privacy policy",
    intro: "This notice explains what happens when you browse this portfolio or contact Tahir Adamu / 4T9 Media.",
    sections: [
      ["Who is responsible", <>This portfolio is operated by Tahir Adamu under the 4T9 Media name in Abuja, Nigeria. Contact <a href="mailto:abdultahir779@gmail.com">abdultahir779@gmail.com</a> or <a href="tel:+2348148630882">+234 814 863 0882</a> for privacy questions.</>],
      ["Information this site handles", "The site has no account, newsletter, advertising tracker, analytics service, checkout, or server-side contact form. If you fill in the contact form, it creates a message in your own email application; the site does not transmit or retain the draft. If you send that email, your email provider and the recipient mailbox process the information in it. Do not include sensitive information you do not need to share."],
      ["Technical requests and external services", "The site’s hosting and security providers may process ordinary request details, such as IP address, browser, and requested page, to deliver and protect the website. Portfolio photographs and videos load from GitHub's raw content service, which receives the connection details needed to deliver them. Google Fonts is optional and loads only if you choose it in the preference banner. The site does not use analytics or advertising SDKs. Social links open services such as Instagram or LinkedIn only when you choose to follow them."],
      ["Browser storage", "The site stores your font preference in local browser storage so the banner does not reappear every visit. This is a preference only; it is not used to track you. The site does not set advertising or analytics cookies. See the Cookie Policy for details."],
      ["Admin project drafts", "The hosted-project editor at /admin saves project names, public links, short descriptions, and technology tags in local browser storage on the device you use. Those drafts stay on that device and are not sent to the site. Downloading the JSON file creates a local download that you choose whether to publish. Avoid entering confidential client details or personal information in project descriptions. Remove items in the editor or clear this site's browser storage to erase the draft."],
      ["How long information is kept", "A contact email is retained in the recipient's email account only as long as it is useful for responding, managing a project, or meeting legal obligations. Retention by your email provider is governed by that provider. This portfolio itself has no contact-message database."],
      ["Your choices and rights", "Where applicable, rights under the Nigeria Data Protection Act 2023 include the right to be informed and to request access, correction, or erasure of personal data, and to object to or withdraw consent for processing based on consent. You can choose system fonts, withdraw optional font loading by changing your cookie preferences, and ask to access, correct, or delete personal information held in project correspondence. Some information may need to be kept where a legal obligation or active dispute requires it. To make a request, email the address above with “Privacy request” in the subject."],
      ["Children", "This portfolio is intended for a general audience and does not knowingly collect children's personal information. If you are contacting us about a person under 18, a parent or legal guardian should make the inquiry and provide any required permission before sharing the child's personal details or images. Media uploaded through the authorized admin tool (if enabled) may be sent to Cloudinary for storage and to the portfolio service for listing. Only upload content you are entitled to share, and obtain any required permission from the people shown. Contact us to request deletion if a child's information was sent inadvertently."],
      ["Changes", "This notice may be updated when the site or its data practices change. The date at the top shows the latest revision."],
    ],
  },
  "/terms": {
    title: "Terms of service",
    intro: "These terms cover use of this portfolio website. A separately agreed project quote or contract governs any commissioned work.",
    sections: [
      ["About the operator", "This portfolio is operated by Tahir Adamu under the 4T9 Media name, based in Abuja, Nigeria. Contact: abdultahir779@gmail.com or +234 814 863 0882."],
      ["Using the website", "You may browse and share links to this site for personal or business evaluation. Do not interfere with its operation, attempt unauthorized access, or use its content in a misleading or unlawful way."],
      ["Portfolio content and permissions", "Photographs, video, writing, marks, and other portfolio materials may be owned by Tahir Adamu, 4T9 Media, a client, or another rights holder. A portfolio display does not grant permission to copy, publish, edit, or commercially use that work. Ask for written permission before reuse. If a project is commissioned, deliverables, usage rights, fees, and any exclusions will be stated in the project agreement."],
      ["Font licenses", <>The site offers DM Sans, Manrope, and DM Mono through Google Fonts only after you opt in. <a href="https://developers.google.com/fonts/" target="_blank" rel="noreferrer">Google states that its font collection is released under open-source licenses</a>; each font remains subject to its own license. If you decline, the site uses system fonts.</>],
      ["Enquiries and project quotes", "There is no checkout or online purchase on this site. Services are discussed individually. Before accepting a project, you will receive a written quote or agreement that states the scope, deliverables, fees, applicable taxes or expenses, payment schedule, and cancellation or rescheduling terms. No fee is due merely for browsing or sending an enquiry."],
      ["External links and availability", "Links and media services operated by third parties are provided for convenience or to display portfolio work. Their availability and privacy practices are controlled by those providers. The site is provided as available; nothing here limits rights or remedies that cannot lawfully be excluded."],
      ["Complaints and governing rights", <>Please raise a concern first by emailing <a href="mailto:abdultahir779@gmail.com">abdultahir779@gmail.com</a>. These terms are subject to applicable Nigerian law, including mandatory consumer protections under the Federal Competition and Consumer Protection Act 2018. They do not remove any statutory rights.</>],
    ],
  },
  "/refunds": {
    title: "Refund policy",
    intro: "This portfolio does not sell products, take deposits, or accept payments online. There are no checkout fees or hidden charges on this website.",
    sections: [
      ["Before booking", "Project prices, expenses, taxes where applicable, deposit requirements, and payment dates are provided in a written quote or agreement before you accept a booking. Ask questions about any item before confirming."],
      ["Changes and cancellations", "For a booked project, the written agreement will explain how to reschedule or cancel and how any refund or reasonable cancellation charge is calculated based on work completed, costs already committed, and applicable consumer law. Contact us promptly if plans change. No blanket no-refund term is imposed by this website."],
      ["If a project is disputed", <>Email <a href="mailto:abdultahir779@gmail.com">abdultahir779@gmail.com</a> with the project name and what resolution you are seeking. We will review the agreed scope and payment record with you. This policy does not limit consumer rights or remedies under applicable law.</>],
    ],
  },
  "/cookies": {
    title: "Cookie policy",
    intro: "This website does not use advertising or analytics cookies.",
    sections: [
      ["Browser storage", "Local browser storage remembers your font preference and, if you use /admin, stores your hosted-project draft (names, public URLs, descriptions, and technology tags) on that device. This storage is not used for tracking. Project drafts are not sent to the site; clearing the site's browser storage removes them. The font preference is necessary to remember your choice."],
      ["Optional Google Fonts", "If you choose “Allow Google Fonts,” your browser requests font files from Google. Google may receive connection information such as your IP address and browser details. If you choose “Use system fonts,” the site does not load Google Fonts. You can change this choice at any time using Cookie settings in the footer."],
      ["Gallery media", "Portfolio images and videos are served from GitHub's raw content service to make the gallery available. Requests for this content go directly from your browser to GitHub. This is necessary to show the selected portfolio and is not an analytics or advertising tracker."],
      ["Manage your choice", <>Use the <button type="button" className="inline-policy-button" onClick={() => window.dispatchEvent(new Event("tahir:cookie-settings"))}>Cookie settings</button> control in the footer to change your font preference. For questions, email <a href="mailto:abdultahir779@gmail.com">abdultahir779@gmail.com</a>.</>],
    ],
  },
};

export default function PolicyPage() {
  const [location] = useLocation();
  const policy = policies[location] || policies["/privacy"];
  return <div className="portfolio-site policy-site">
    <SEO title={`${policy.title} — Tahir Adamu`} description={policy.intro} path={location} />
    <Navigation />
    <main id="main-content" className="policy-main page-section">
      <p className="eyebrow"><span className="availability-dot" /> 4T9 MEDIA / WEBSITE INFORMATION</p>
      <h1>{policy.title}</h1>
      <p className="policy-updated">Last updated {updated}</p>
      <p className="policy-intro">{policy.intro}</p>
      <div className="policy-sections">{policy.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}</div>
      <nav className="policy-related" aria-label="Legal policies">
        {Object.entries(policies).map(([href, item]) => <Link key={href} href={href}>{item.title}</Link>)}
      </nav>
    </main>
    <Footer />
  </div>;
}
