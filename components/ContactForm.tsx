// components/ContactForm.tsx
"use client";

import { useState } from "react";

type Props = {
  email: string; // hedef e-posta (ör. info@hazalmakina.com)
};

export default function ContactForm({ email }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Teklif Talebi");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyLines = [
      `İsim: ${name}`,
      `Telefon: ${phone}`,
      "",
      message,
    ].join("%0D%0A");
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${bodyLines}`;
    window.location.href = url;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 rounded-2xl border border-black/10 p-5 dark:border-white/10"
    >
      <div>
        <label className="block text-xs font-medium">Ad Soyad</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:ring dark:border-white/10"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Telefon</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:ring dark:border-white/10"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Konu</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:ring dark:border-white/10"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Mesaj</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-1 w-full rounded-lg border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:ring dark:border-white/10"
          required
        />
      </div>
      <button
        type="submit"
        className="rounded-lg border border-foreground px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background"
      >
        E-posta Gönder
      </button>
    </form>
  );
}