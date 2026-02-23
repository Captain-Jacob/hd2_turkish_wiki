"use client";

import { useMemo, useState } from "react";

type WeaponStats = {
  fire_rate?: number;
  recoil?: number;
  ergo?: number;
  capacity?: number;
  reload?: number;
  damage?: number;
  penetration?: string;
};

type WeaponItem = {
  category: string;
  slug: string;
  title: string;
  summary?: string;
  tags: string[];
  stats?: WeaponStats;
};

const STAT_ROWS: { key: keyof WeaponStats; label: string }[] = [
  { key: "damage", label: "Damage" },
  { key: "fire_rate", label: "Fire Rate" },
  { key: "recoil", label: "Recoil" },
  { key: "ergo", label: "Ergonomics" },
  { key: "capacity", label: "Capacity" },
  { key: "reload", label: "Reload Time" },
  { key: "penetration", label: "Penetration" },
];

export default function WeaponsCompare({ items, categoryKey }: { items: WeaponItem[]; categoryKey: string }) {
  const [vs, setVs] = useState<string[]>([]); // slug list

  const selected = useMemo(() => {
    const map = new Map(items.map((i) => [i.slug, i]));
    return vs.map((s) => map.get(s)).filter(Boolean) as WeaponItem[];
  }, [vs, items]);

  function toggle(slug: string) {
    setVs((prev) => {
      if (prev.includes(slug)) return prev.filter((x) => x !== slug);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, slug];
    });
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
      {/* left list */}
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((it) => {
          const active = vs.includes(it.slug);
          return (
            <div key={it.slug} className="card" style={{ position: "relative", padding: 14 }}>
              <button
                onClick={() => toggle(it.slug)}
                className="kbd"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  cursor: "pointer",
                  opacity: active ? 1 : 0.6,
                }}
                title="Kıyasla (VS)"
              >
                VS {active ? "✓" : ""}
              </button>

              <a href={`/${categoryKey}/${it.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ fontWeight: 900, fontSize: 16 }}>{it.title}</div>
                {it.summary ? <div style={{ color: "var(--muted)", marginTop: 4 }}>{it.summary}</div> : null}
              </a>

              {it.tags?.length ? (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                  {it.tags.map((t) => (
                    <span key={t} className="kbd">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* right compare */}
      <div className="card" style={{ position: "sticky", top: 16, height: "fit-content", padding: 14 }}>
        <div style={{ fontWeight: 900 }}>VS Compare</div>
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
                <div key={w.slug} style={{ fontWeight: 800, fontSize: 12 }}>
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