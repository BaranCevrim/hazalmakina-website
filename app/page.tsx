// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import AutoCarousel from "@/components/AutoCarousel";

// ------- FS yardımcıları (server component) -------
function listPublic(subdir: string, exts: RegExp) {
  const dir = path.join(process.cwd(), "public", subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => exts.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/${subdir}/${encodeURIComponent(f)}`);
}
const listImages = (subdir: string) =>
  listPublic(subdir, /\.(png|jpe?g|webp|gif)$/i);
const listVideos = (subdir: string) => listPublic(subdir, /\.(mp4|webm|mov)$/i);

function findFirstExisting(names: string[]) {
  for (const n of names) {
    const p = path.join(process.cwd(), "public", n);
    if (fs.existsSync(p)) return n;
  }
  return names[0];
}

// ------- içerik -------
type Machine = { title: string; desc: string; src: string };
const WHATSAPP = "https://wa.me/905555014546";

const MACHINES: Machine[] = [
  {
    title: "Dikey Torna (Schiess)",
    desc: "Büyük çaplı iş parçalarında yüksek rijitlik ve hassasiyet.",
    src: "/Makina/1.jpeg",
  },
  {
    title: "Yatay Torna (TOS)",
    desc: "Farklı çap/boy parçalar için çok yönlü talaşlı imalat.",
    src: "/Makina/2.jpeg",
  },
  {
    title: "Matkap / Freze",
    desc: "Delik açma, kanal ve yüzey işleme operasyonları.",
    src: "/Makina/WhatsApp%20Image%202025-09-29%20at%2020.43.45%20(7).jpeg",
  },
];

// Kartvizit (public/KARTVIZIT içindeki ilk görseli al)
const CARD = listImages("KARTVIZIT")[0] ?? null;

export default function Page() {
  // İmalatlar
  const bigFolder = findFirstExisting([
    "buyuk islenmis parclar",
    "buyuk islenmis parcalar",
  ]);
  const smallFolder = "daha kucuk malzemeler";
  const IMALATLAR = [...listImages(bigFolder), ...listImages(smallFolder)];

  // Videolar
  const CLIPS = listVideos("VIDEO").map((src) => ({ src }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* styled-jsx YOK; normal <style> ile global keyframe */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes hm-slide {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          `,
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90rem 40rem at 60% -10%, rgba(255,255,255,.06), transparent), radial-gradient(60rem 40rem at -10% 110%, rgba(59,130,246,.08), transparent)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 px-3 py-1 text-xs dark:border-white/10">
            <span className="size-2 rounded-full bg-emerald-500" />
            Zamanında Teslim • Seri Üretim • Prototip
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Hazal Makina
          </h1>
          <p className="mt-3 max-w-2xl text-base/7 text-foreground/80 sm:text-lg/8">
            Profesyonel Torna &amp; CNC İşleme • Prototip ve Seri Üretim •
            Kaynak &amp; Montaj • Ölçü kontrol ve raporlama.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/iletisim"
              className="rounded-lg border border-foreground px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background"
            >
              Teklif Al →
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              className="rounded-lg border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:border-white/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <h2 className="text-2xl font-bold">Hizmetler</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Torna & Freze",
              desc:
                "Çelik, döküm, alüminyum ve paslanmaz malzemelerde hassas talaşlı imalat.",
            },
            {
              title: "CNC İşleme",
              desc:
                "Prototipten seri üretime ölçeklenebilir, tutarlı toleranslar ve temiz yüzeyler.",
            },
            {
              title: "Kaynak & Montaj",
              desc:
                "MIG/MAG/TIG kaynak; sonrasında montaj ve işlevsel kontroller.",
            },
            {
              title: "Özel Parça Üretimi",
              desc:
                "Yedek parça, özel aparat ve fikstür imalatı; tersine mühendislik.",
            },
            {
              title: "Ölçüm & Raporlama",
              desc: "Kritik ölçülerde kontrol, gerektiğinde rapor.",
            },
            {
              title: "Lojistik & Paketleme",
              desc: "Emniyetli paketleme ve sevkiyat organizasyonu.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-black/10 p-5 dark:border-white/10"
            >
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAKİNE PARKURU */}
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Makine Parkurumuz</h2>
          <Link
            href="/iletisim"
            className="text-sm text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            Kapasite bilgisi iste →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MACHINES.map((m) => (
            <figure
              key={m.title}
              className="group overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={m.src}
                  alt={m.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover transition group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="p-4">
                <div className="font-medium">{m.title}</div>
                <p className="mt-1 text-sm text-foreground/70">{m.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* İMALATLAR – oklarla hızlı geçiş, hover'da duraklatma */}
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">İmalatlar</h2>
          <span className="text-sm text-foreground/60">
            {IMALATLAR.length} görsel • oklarla gezin
          </span>
        </div>

        <div className="mt-6">
          <AutoCarousel images={IMALATLAR} height={420} autoMs={3000} />
        </div>
      </section>

      {/* KARTVİZİT – önizleme + indirme */}
{CARD && (
  <>
    {/* Mobil/Tablet için sayfa içi */}
    <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14 lg:hidden">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold">Kartvizit</h2>
        <span className="text-sm text-foreground/60">JPEG • indirilebilir</span>
      </div>

      <div className="mt-6 grid gap-6">
        {/* Görsel */}
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <div className="relative aspect-[86/54]">
            <Image
              src={CARD}
              alt="Hazal Makina kartvizit"
              fill
              sizes="(max-width:1024px) 100vw, 900px"
              className="object-contain bg-background"
              priority
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex flex-col gap-3">
          <a
            href={CARD}
            download="Hazal-Makina-Kartvizit.jpeg"
            className="rounded-lg border border-foreground px-4 py-2 text-center text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            İndir (JPEG)
          </a>
          <a
            href={CARD}
            target="_blank"
            className="rounded-lg border border-black/10 bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90 dark:border-white/10"
          >
            Yeni Sekmede Aç
          </a>
        </div>
      </div>
    </section>

    {/* Masaüstü için sağ altta sabit mini panel */}
    <aside className="hidden lg:block fixed right-6 bottom-6 z-40">
      <div className="rounded-2xl border border-black/10 bg-background/90 backdrop-blur-md shadow-xl dark:border-white/10">
        {/* Görsel */}
        <div className="relative w-[300px] h-[180px]">
          <Image
            src={CARD}
            alt="Hazal Makina kartvizit"
            fill
            sizes="300px"
            className="object-contain rounded-t-2xl"
            priority
          />
        </div>

        {/* Butonlar */}
        <div className="flex gap-2 p-3">
          <a
            href={CARD}
            download="Hazal-Makina-Kartvizit.jpeg"
            className="flex-1 rounded-lg border border-foreground px-3 py-2 text-center text-xs font-semibold transition hover:bg-foreground hover:text-background"
          >
            İndir
          </a>
          <a
            href={CARD}
            target="_blank"
            className="flex-1 rounded-lg border border-black/10 bg-black px-3 py-2 text-center text-xs font-semibold text-white transition hover:opacity-90 dark:border-white/10"
          >
            Aç
          </a>
        </div>
      </div>
    </aside>
  </>
)}

      {/* VİDEOLAR – ilk 8 + “Tümünü Göster” */}
      {CLIPS.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">Kısa Videolar</h2>
            <span className="text-sm text-foreground/60">
              {CLIPS.length} adet • alfabetik sıralı
            </span>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CLIPS.slice(0, 8).map((c) => (
              <div
                key={c.src}
                className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
              >
                <video
                  className="h-full w-full"
                  src={c.src}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            ))}
          </div>

          {CLIPS.length > 8 && (
            <details className="mt-6">
              <summary className="w-fit cursor-pointer select-none rounded-lg border border-foreground px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background">
                Tümünü Göster ↓
              </summary>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {CLIPS.slice(8).map((c) => (
                  <div
                    key={c.src}
                    className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
                  >
                    <video
                      className="h-full w-full"
                      src={c.src}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                ))}
              </div>
            </details>
          )}
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-black/10 p-7 sm:p-10 dark:border-white/10">
          <h3 className="text-xl font-bold sm:text-2xl">Projenizi konuşalım</h3>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70">
            Teknik çizim, numune veya ölçü paylaşın; aynı gün içinde geri
            dönelim. Prototipten seri üretime kadar yanınızdayız.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className="rounded-lg border border-foreground px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background"
            >
              Teklif Al →
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              className="rounded-lg border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:border-white/10"
            >
              WhatsApp’tan Yaz
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}