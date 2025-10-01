import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İletişim | Hazal Makina",
  description: "Teklif, numune, teknik çizim paylaşımı ve iletişim kanalları",
};

const PHONE = "+90 555 501 45 46";
const EMAIL = "kenan_kostu@hotmail.com";
const WHATSAPP = "https://wa.me/905555014546";
const ADDRESS = "Piri Reis Mh Akan Sk. No:9 Darica/KOCAELI";

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      {/* Başlık */}
      <h1 className="text-3xl font-bold">İletişim</h1>
      <p className="mt-3 max-w-3xl text-foreground/80">
        Teknik çizim, ölçüler veya numune paylaşın; aynı gün dönüş yapalım.
      </p>

      {/* Grid Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Sol Kolon - İletişim Kartları */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 text-sm">
            <div className="font-semibold">Telefon</div>
            <Link
              href={`tel:${PHONE.replace(/\s+/g, "")}`}
              className="text-foreground/80 hover:underline"
            >
              {PHONE}
            </Link>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 text-sm">
            <div className="font-semibold">E-posta</div>
            <Link
              href={`mailto:${EMAIL}`}
              className="text-foreground/80 hover:underline"
            >
              {EMAIL}
            </Link>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 text-sm">
            <div className="font-semibold">WhatsApp</div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/80 hover:underline"
            >
              Hemen yazın →
            </a>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 text-sm">
            <div className="font-semibold">Adres</div>
            <div className="mt-1 text-foreground/80">{ADDRESS}</div>
          </div>
        </div>

        {/* Sağ Kolon - Google Form Embed */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfLLJfwSaLYfgmYCGxzAHBYcb4w3Ds6cvfSkdAdaXFvAJi8Zg/viewform?embedded=true"
              width="100%"
              height="720"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Yükleniyor…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}