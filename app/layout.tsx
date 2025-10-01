// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const BASE_URL = "https://hazalmakina-website.vercel.app"; // kendi domainin olduğunda değiştir

export const metadata: Metadata = {
  title: "Hazal Makina | Darıca Kocaeli Tornacı • Dikey Torna & CNC İmalat",
  description:
    "Hazal Makina – Darıca (Kocaeli) tornacı. Dikey torna, CNC işleme, prototip ve seri üretim hizmetleri. Hızlı teklif ve kaliteli işçilik.",
  keywords: [
    "Darıca tornacı",
    "Kocaeli tornacı",
    "dikey torna",
    "CNC işleme",
    "metal işleme",
    "torna atölyesi",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Hazal Makina | Darıca Kocaeli Tornacı",
    description:
      "Darıca ve çevresinde dikey torna, CNC işleme ve imalat çözümleri.",
    url: BASE_URL,
    siteName: "Hazal Makina",
    images: [{ url: "/logo.png", width: 800, height: 600, alt: "Hazal Makina" }],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazal Makina | Darıca Kocaeli Tornacı",
    description:
      "Dikey torna, CNC işleme, prototip ve seri üretim – Darıca / Kocaeli.",
    images: ["/logo.png"],
  },
  // Google Search Console doğrulama KODUNU buraya gir:
  verification: { google: "GOOGLE_SITE_VERIFICATION_KODU" },
  icons: { icon: "/favicon.ico" },
  themeColor: "#ffffff",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // -- JSON-LD (LocalBusiness) --
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hazal Makina",
    image: `${BASE_URL}/logo.png`,
    url: BASE_URL,
    telephone: "+90 5xx xxx xx xx", // GERÇEK numaranı yaz
    address: {
      "@type": "PostalAddress",
      streetAddress: "… Mah. … Cad. No:…", // GERÇEK adres
      addressLocality: "Darıca",
      addressRegion: "Kocaeli",
      postalCode: "41xxx",
      addressCountry: "TR",
    },
    areaServed: ["Darıca", "Gebze", "Kocaeli", "İstanbul Anadolu"],
    sameAs: [], // varsa sosyal linkler/WhatsApp
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" }
    ],
    priceRange: "$$",
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* JSON-LD (yerel SEO için çok güçlü sinyal) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-site text-foreground antialiased">
        {/* NAVBAR */}
        <header
          className="sticky top-0 z-50 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10"
          role="banner"
        >
          <nav
            className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3"
            aria-label="Ana gezinme"
          >
            {/* Marka */}
            <Link href="/" className="flex items-center gap-2" aria-label="Hazal Makina anasayfa">
              <div className="relative h-10 w-[120px] sm:h-12 sm:w-[140px]">
                <Image
                  src="/logo.jpeg"
                  alt="Hazal Makina"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 120px, 140px"
                />
              </div>
              <span className="hidden font-bold tracking-tight sm:inline">Hazal Makina</span>
            </Link>

            {/* Menü */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline underline-offset-4">Anasayfa</Link>
              <Link href="/hakkimizda" className="hover:underline underline-offset-4">Hakkımızda</Link>
              <Link href="/iletisim" className="hover:underline underline-offset-4">İletişim</Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        {/* NAP (Name-Address-Phone) – yerel SEO için şart */}
        <footer className="border-t border-black/10 py-8 text-center text-xs text-foreground/60 dark:border-white/10">
          <div className="space-y-1">
            <div><strong>Hazal Makina</strong> • Darıca / Kocaeli</div>
            <div>Tel: +90 5xx xxx xx xx • E-posta: info@hazalmakina.com</div>
            <div>Adres: … Mah. … Cad. No:… Darıca, Kocaeli</div>
          </div>
          <div className="mt-3">© {new Date().getFullYear()} Hazal Makina • Tüm hakları saklıdır.</div>
        </footer>
      </body>
    </html>
  );
}