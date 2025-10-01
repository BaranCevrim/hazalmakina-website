// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hazal Makina",
  description: "Torna, CNC işleme, prototip ve seri üretim",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
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
              {/* Logo: responsive container (40px -> 48px) */}
              <div className="relative h-10 w-[120px] sm:h-12 sm:w-[140px]">
                <Image
                  src="/logo.jpeg"           // public/logo.jpeg
                  alt="Hazal Makina"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 120px, 140px"
                />
              </div>
              <span className="hidden font-bold tracking-tight sm:inline">
                Hazal Makina
              </span>
            </Link>

            {/* Menü */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline underline-offset-4">
                Anasayfa
              </Link>
              <Link href="/hakkimizda" className="hover:underline underline-offset-4">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="hover:underline underline-offset-4">
                İletişim
              </Link>
              {/* Kurumsal kimlik sayfasını açınca aktifleştir
              <Link href="/kurumsal-kimlik" className="hover:underline underline-offset-4">
                Kurumsal Kimlik
              </Link> */}
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t border-black/10 py-8 text-center text-xs text-foreground/60 dark:border-white/10">
          © {new Date().getFullYear()} Hazal Makina • Tüm hakları saklıdır.
        </footer>
      </body>
    </html>
  );
}