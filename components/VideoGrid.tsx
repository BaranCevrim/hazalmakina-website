"use client";

import { useState } from "react";

type Clip = { src: string; poster?: string };

export default function VideosGrid({
  clips,
  initial = 8,
}: {
  clips: Clip[];
  initial?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? clips : clips.slice(0, initial);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((c) => (
          <div
            key={c.src}
            className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
          >
            <video
              className="h-full w-full"
              src={c.src}
              poster={c.poster}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        ))}
      </div>

      {clips.length > initial && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            className="rounded-lg border border-foreground px-4 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition"
          >
            {showAll ? "Daha Az Göster ↑" : "Tümünü Göster ↓"}
          </button>
        </div>
      )}
    </div>
  );
}