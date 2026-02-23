// app/components/SearchBox.tsx
"use client";

import { useMemo, useState } from "react";

type Item = {
  category: string;
  slug: string;
  title: string;
  summary?: string;
  tags: string[];
};

export default function SearchBox({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;

    return items.filter((it) => {
      const hay =
        `${it.title} ${it.summary ?? ""} ${it.tags?.join(" ") ?? ""} ${it.slug} ${it.category}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, items]);

  return (
    <div className="card" style={{ padding: 14 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ara: Liberator, Charger, Eagle Airstrike..."
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.04)",
          color: "inherit",
          outline: "none",
        }}
      />

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {results.map((it) => (
          <a
            key={`${it.category}/${it.slug}`}
            className="card"
            href={`/${it.category}/${it.slug}`} // ✅ undefined fix
            style={{ display: "block", padding: 14, textDecoration: "none" }}
          >
            <div style={{ fontWeight: 900 }}>{it.title}</div>
            {it.summary ? (
              <div style={{ color: "var(--muted)", marginTop: 4 }}>{it.summary}</div>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}