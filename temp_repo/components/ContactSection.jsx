import React from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => (
  <section id="contact" className="pb-40 scroll-mt-[150px]">
    <div className="max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 dark:text-neutral-100 mb-12 tracking-tight">
        Let&apos;s Work Together
      </h2>
      <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-16 max-w-3xl font-light">
        I&apos;m always excited to hear about new projects and opportunities. Whether you&apos;re a startup or an established company, let&apos;s create something exceptional together.
      </p>

      <div className="mb-16">
        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-6">Send a Message</h3>
        <ContactForm />
      </div>

      <div className="text-sm text-neutral-500 dark:text-neutral-400 font-light tracking-wide">
        Currently available for freelance projects and full-time opportunities
      </div>
    </div>
  </section>
);

export default ContactSection;
