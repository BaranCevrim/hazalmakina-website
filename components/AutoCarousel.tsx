"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  height?: number;   // px
  autoMs?: number;   // otomatik geçiş süresi
};

export default function AutoCarousel({
  images,
  height = 420,
  autoMs = 3500,
}: Props) {
  // aynaları ayıkla + stabil referans
  const clean = useMemo(() => Array.from(new Set(images)), [images]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // autoplay
  useEffect(() => {
    if (paused || clean.length <= 1) return;
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => {
      setI((p) => (p + 1) % clean.length);
    }, autoMs);
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [paused, clean.length, autoMs]);

  const prev = () => setI((p) => (p - 1 + clean.length) % clean.length);
  const next = () => setI((p) => (p + 1) % clean.length);

  // klavye ile kontrol (← →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clean.length]);

  // swipe (basit)
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    startX.current = null;
  };

  return (
    <div
      className="relative select-none rounded-2xl border border-black/10 dark:border-white/10"
      style={{ height }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="İmalatlar görsel slaytı"
    >
      {/* Slaytlar */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            position: "relative",
          }}
        >
          {clean.map((src, idx) => (
            <div
              key={src}
              className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(${(idx - i) * 100}%)`,
              }}
              aria-hidden={idx !== i}
            >
              <Image
                src={src}
                alt={`imalat-${idx + 1}`}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 900px, 1000px"
                className="object-contain"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sol- Sağ oklar */}
      <button
        onClick={prev}
        aria-label="Önceki görsel"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 p-2 backdrop-blur hover:bg-white dark:border-white/20 dark:bg-black/50"
      >
        {/* ← */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Sonraki görsel"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 p-2 backdrop-blur hover:bg-white dark:border-white/20 dark:bg-black/50"
      >
        {/* → */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {/* Noktalar */}
      {clean.length > 1 && (
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {clean.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                idx === i ? "bg-foreground w-6" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}