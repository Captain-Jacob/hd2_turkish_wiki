"use client";

import { useMemo, useState } from "react";
import type { DocIndexItem } from "@/lib/content";

export default function SearchBox({ items }: { items: DocIndexItem[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items.slice(0, 12);

    return items
      .filter((it) => {
        const hay = `${it.title} ${it.summary ?? ""} ${it.tags.join(" ")}`.toLowerCase();
        return hay.includes(s);
      })
      .slice(0, 18);
  }, [q, items]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ara: Liberator, Charger, Eagle Airstrike…"
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid var(--border)",
          background: "rgba(255,255,255,0.04)",
          color: "var(--text)",
          outline: "none",
        }}
      />

      <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
        {filtered.map((it) => (
          <a
            key={`${it.category}/${it.slug}`}
            href={`/${it.category}/${it.slug}`}
            className="card"
            style={{ padding: "10px 12px" }}
          >
            <div style={{ fontWeight: 700 }}>{it.title}</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              {it.summary ?? `${it.category} / ${it.slug}`}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}