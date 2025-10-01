// app/hakkimizda/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Hazal Makina",
  description: "Hazal Makina – şirket profili, vizyon, kalite yaklaşımı",
};

export default function HakkimizdaPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-bold">Hakkımızda</h1>
      <p className="mt-4 max-w-3xl text-foreground/80">
        Hazal Makina; torna, freze ve CNC işleme alanlarında prototipten seri üretime
        uzanan çözümler sunar. Amacımız; <strong>zamanında teslim</strong>,{" "}
        <strong>tekrarlanabilir kalite</strong> ve <strong>uygun maliyet</strong> dengesini
        koruyarak uzun soluklu iş ortaklıkları kurmaktır.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-xl font-semibold">Yetkinlikler</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/80">
            <li>Torna & freze – çelik, döküm, paslanmaz, alüminyum</li>
            <li>CNC işleme – prototip & seri üretim</li>
            <li>Kaynak & montaj – MIG/MAG/TIG</li>
            <li>Ölçüm, tolerans kontrolü ve raporlama</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-xl font-semibold">Kalite Yaklaşımı</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/80">
            <li>İş emri ve revizyon yönetimi</li>
            <li>İlk parça onayı (FAI) ve ara kontroller</li>
            <li>Son kontrol ve paketleme prosedürleri</li>
            <li>İzlenebilirlik için proje dosyalaması</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 p-6 text-sm text-foreground/80 dark:border-white/10">
        <h2 className="text-lg font-semibold">Referanslar & Sertifikalar</h2>
        <p className="mt-2">
          Müşteri isimleri ve sertifikalar (varsa ISO vb.) burada listelenecek. İstersen
          PDF/ görsel ekleyelim.
        </p>
      </div>
    </div>
  );
}