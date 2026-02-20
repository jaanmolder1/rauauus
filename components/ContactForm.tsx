"use client";

import { useState, FormEvent } from "react";

interface ContactFormProps {
  lang: "et" | "en";
}

const content = {
  et: {
    name: "Nimi",
    namePlaceholder: "Teie täisnimi",
    email: "E-post",
    emailPlaceholder: "teie@email.ee",
    phone: "Telefon",
    phonePlaceholder: "+372 XXXX XXXX",
    message: "Sõnum",
    messagePlaceholder:
      "Kirjeldage lühidalt oma huvi — millist korterit soovite näha, millised on teie eelistused...",
    submit: "Saada päring",
    submitting: "Saatmine...",
    success:
      "Täname teid. Võtame teiega ühendust 24 tunni jooksul, et kokku leppida privaatne tutvumiskäik.",
    privacy:
      "Teie andmeid kasutatakse ainult päringule vastamiseks. Turundusteated ei järgne.",
  },
  en: {
    name: "Name",
    namePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    phone: "Phone",
    phonePlaceholder: "+XXX XXXX XXXX",
    message: "Message",
    messagePlaceholder:
      "Briefly describe your interest — which apartment you would like to view, your preferences...",
    submit: "Send enquiry",
    submitting: "Sending...",
    success:
      "Thank you. We will be in touch within 24 hours to arrange a private viewing at your convenience.",
    privacy:
      "Your details will only be used to respond to your enquiry. No marketing communications will follow.",
  },
};

export default function ContactForm({ lang }: ContactFormProps) {
  const c = content[lang];
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate async — replace with actual form submission
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="py-16 px-8 bg-stone-50 border border-stone-200 text-center">
        <div className="divider-bronze w-16 mx-auto mb-8" />
        <p className="font-serif text-2xl font-light text-stone-800 mb-4">
          {lang === "et" ? "Päring saadetud" : "Enquiry sent"}
        </p>
        <p className="font-sans text-sm font-light text-stone-500 leading-relaxed max-w-md mx-auto">
          {c.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="label-eyebrow block mb-2"
          >
            {c.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={c.namePlaceholder}
            required
            className="w-full bg-white border border-stone-200 text-stone-800 font-sans text-sm placeholder-stone-400 px-4 py-3.5 focus:outline-none focus:border-bronze-light transition-colors duration-300"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="label-eyebrow block mb-2"
          >
            {c.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={c.emailPlaceholder}
            required
            className="w-full bg-white border border-stone-200 text-stone-800 font-sans text-sm placeholder-stone-400 px-4 py-3.5 focus:outline-none focus:border-bronze-light transition-colors duration-300"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="label-eyebrow block mb-2"
        >
          {c.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder={c.phonePlaceholder}
          className="w-full bg-white border border-stone-200 text-stone-800 font-sans text-sm placeholder-stone-400 px-4 py-3.5 focus:outline-none focus:border-bronze-light transition-colors duration-300"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="label-eyebrow block mb-2"
        >
          {c.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={c.messagePlaceholder}
          className="w-full bg-white border border-stone-200 text-stone-800 font-sans text-sm placeholder-stone-400 px-4 py-3.5 focus:outline-none focus:border-bronze-light transition-colors duration-300 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="font-sans text-xs tracking-widest uppercase bg-stone-950 text-stone-100 hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed px-10 py-4 transition-all duration-400"
        >
          {status === "submitting" ? c.submitting : c.submit}
        </button>
        <p className="font-sans text-xs text-stone-400 leading-relaxed max-w-xs">
          {c.privacy}
        </p>
      </div>
    </form>
  );
}
