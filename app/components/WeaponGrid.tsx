"use client";

import { useMemo, useState } from "react";

type Category = "weapons" | "enemies" | "stratagems" | "builds";

type WeaponStats = {
  fire_rate?: number;
  recoil?: number;
  ergo?: number;
  capacity?: number;
  reload?: number;
  damage?: number;
  penetration?: string;
};

type Item = {
  category: Category;
  slug: string;
  title: string;
  summary?: string;
  tags: string[];
  image?: string;
  stats?: WeaponStats;
};

const STAT_ROWS: { key: keyof WeaponStats; label: string }[] = [
  { key: "damage", label: "Damage" },
  { key: "fire_rate", label: "Fire Rate" },
  { key: "recoil", label: "Recoil" },
  { key: "ergo", label: "Ergonomics" },
  { key: "capacity", label: "Capacity" },
  { key: "reload", label: "Reload" },
  { key: "penetration", label: "Penetration" },
];

export default function WeaponGrid({ items }: { items: Item[] }) {
  const [vs, setVs] = useState<string[]>([]);

  const selected = useMemo(() => {
    const map = new Map(items.map((i) => [i.slug, i]));
    return vs.map((s) => map.get(s)).filter(Boolean) as Item[];
  }, [vs, items]);

  function toggleVS(slug: string) {
    setVs((prev) => {
      if (prev.includes(slug)) return prev.filter((x) => x !== slug);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, slug];
    });
  }

  function clearAll() {
    setVs([]);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
      {/* LEFT: GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((it) => {
          const active = vs.includes(it.slug);
          const img = it.image;

          return (
            <div key={it.slug} className="card" style={{ padding: 12 }}>
              {/* SQUARE IMAGE BOX */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={it.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      padding: 10,
                      filter: "drop-shadow(0 10px 18px rgba(0,0,0,.35))",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--muted)",
                      fontSize: 13,
                    }}
                  >
                    No image
                  </div>
                )}

                <button
                  onClick={() => toggleVS(it.slug)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 50,
                    border: "1px solid rgba(255,255,255,.18)",
                    background: active ? "rgba(120,255,255,.18)" : "rgba(0,0,0,.35)",
                    color: "white",
                    borderRadius: 999,
                    padding: "6px 10px",
                    fontWeight: 900,
                    letterSpacing: 0.3,
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                  }}
                  title="VS kıyasına ekle"
                >
                  VS{active ? " ✓" : ""}
                </button>
              </div>

              {/* TITLE + SUMMARY */}
              <a
                href={`/${it.category}/${it.slug}`}   // ✅ artık hardcode değil
                style={{ textDecoration: "none", display: "block", marginTop: 10 }}
              >
                <div style={{ fontWeight: 900, fontSize: 15 }}>{it.title}</div>
                {it.summary ? (
                  <div style={{ color: "var(--muted)", marginTop: 4, fontSize: 13 }}>
                    {it.summary}
                  </div>
                ) : null}
              </a>

              {/* TAGS */}
              {it.tags?.length ? (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                  {it.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,.12)",
                        color: "var(--muted)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* RIGHT: COMPARE PANEL */}
      <div
        className="card"
        style={{
          position: "sticky",
          top: 16,
          height: "fit-content",
          padding: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>VS Compare</div>
          <button
            onClick={clearAll}
            style={{
              border: "1px solid rgba(255,255,255,.16)",
              background: "rgba(255,255,255,.04)",
              color: "inherit",
              borderRadius: 10,
              padding: "6px 10px",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Clear
          </button>
        </div>

        <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
          Kartların sağ üstündeki <b>VS</b> ile seç. (Max 4)
        </div>

        {selected.length === 0 ? (
          <div style={{ marginTop: 14, color: "var(--muted)" }}>Henüz seçim yok.</div>
        ) : (
          <div style={{ marginTop: 14, overflowX: "auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `140px repeat(${selected.length}, 1fr)`,
                gap: 8,
              }}
            >
              <div style={{ color: "var(--muted)", fontSize: 12 }}>Stat</div>
              {selected.map((w) => (
                <div key={w.slug} style={{ fontWeight: 900, fontSize: 12 }}>
                  {w.title}
                </div>
              ))}
            </div>

            <div style={{ height: 10 }} />

            <div style={{ display: "grid", gap: 8 }}>
              {STAT_ROWS.map((row) => (
                <div
                  key={row.key as string}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `140px repeat(${selected.length}, 1fr)`,
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>{row.label}</div>
                  {selected.map((w) => (
                    <div key={w.slug + String(row.key)} style={{ fontSize: 13 }}>
                      {w.stats?.[row.key] ?? "—"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}