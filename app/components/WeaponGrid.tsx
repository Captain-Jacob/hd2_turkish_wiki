"use client";

import { useEffect, useMemo, useState } from "react";

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
  { key: "damage", label: "Hasar" },
  { key: "fire_rate", label: "Atış Hızı" },
  { key: "recoil", label: "Geri Tepme" },
  { key: "ergo", label: "Ergonomi" },
  { key: "capacity", label: "Şarjör Kapasitesi" },
  { key: "reload", label: "Doldurma Süresi" },
  { key: "penetration", label: "Delicilik" },
];

function formatStat(key: keyof WeaponStats, value: any) {
  if (value == null) return "—";
  if (key === "fire_rate") return `${value}`; // RPM yazmak istersen: `${value} RPM`
  if (key === "reload") return `${value}`;
  return String(value);
}

export default function WeaponGrid({ items }: { items: Item[] }) {
  const [vs, setVs] = useState<string[]>([]);

  // Arama / Tag filtreleri
  const [q, setQ] = useState("");
  const [tagQ, setTagQ] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagMode, setTagMode] = useState<"OR" | "AND">("OR");

  // Filtre değişince yumuşak animasyon tetikle
  const [animateKey, setAnimateKey] = useState(0);
  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [q, tagQ, selectedTags, tagMode]);

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

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const it of items) for (const t of it.tags ?? []) set.add(String(t));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "tr"));
  }, [items]);

  const visibleTags = useMemo(() => {
    const s = tagQ.trim().toLowerCase();
    if (!s) return allTags;
    return allTags.filter((t) => t.toLowerCase().includes(s));
  }, [allTags, tagQ]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const exists = prev.includes(tag);
      if (exists) return prev.filter((x) => x !== tag);
      return [tag, ...prev]; // seçileni üste taşı
    });
  }

  const filteredItems = useMemo(() => {
    const s = q.trim().toLowerCase();

    return items.filter((it) => {
      const title = (it.title ?? "").toLowerCase();
      const summary = (it.summary ?? "").toLowerCase();
      const tagsLower = (it.tags ?? []).map((t) => String(t).toLowerCase());

      const metinUyar =
        !s ||
        title.includes(s) ||
        summary.includes(s) ||
        tagsLower.some((t) => t.includes(s));

      let tagUyar = true;
      if (selectedTags.length > 0) {
        const tags = (it.tags ?? []).map((t) => String(t));
        tagUyar =
          tagMode === "OR"
            ? selectedTags.some((t) => tags.includes(t))
            : selectedTags.every((t) => tags.includes(t));
      }

      return metinUyar && tagUyar;
    });
  }, [items, q, selectedTags, tagMode]);

  const sortedVisibleTags = useMemo(() => {
    const selectedSet = new Set(selectedTags);
    return [...visibleTags].sort((a, b) => {
      const aSel = selectedSet.has(a);
      const bSel = selectedSet.has(b);
      if (aSel !== bSel) return aSel ? -1 : 1;
      return a.localeCompare(b, "tr");
    });
  }, [visibleTags, selectedTags]);

  return (
    <div
      style={{
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",          // ✅ ortala
        padding: "0 16px",         // ✅ kenar boşluğu
      }}
    >
      {/* küçük CSS animasyonları */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px) scale(.99); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fade-up { animation: fadeUp .22s ease-out both; }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* LEFT: FILTERS + GRID */}
        <div style={{ display: "grid", gap: 12 }}>
          {/* FİLTRELER */}
          <div
            className="card"
            style={{
              padding: 12,
              display: "grid",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Silah adı / açıklama / etiket ara..."
                style={{
                  width: 360,
                  maxWidth: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  color: "inherit",
                  outline: "none",
                }}
              />

              <button
                onClick={() => setQ("")}
                style={{
                  border: "1px solid rgba(255,255,255,.16)",
                  background: "rgba(255,255,255,.04)",
                  color: "inherit",
                  borderRadius: 10,
                  padding: "8px 10px",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
                title="Aramayı temizle"
              >
                Temizle
              </button>

              <div style={{ marginLeft: "auto", color: "var(--muted)", fontSize: 13 }}>
                Gösterilen: <b>{filteredItems.length}</b> / {items.length}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <input
                value={tagQ}
                onChange={(e) => setTagQ(e.target.value)}
                placeholder="Etiket ara... (örn: Primary, Medium Penetration)"
                style={{
                  width: 360,
                  maxWidth: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  color: "inherit",
                  outline: "none",
                }}
              />

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>Etiket Modu:</span>

                <button
                  onClick={() => setTagMode("OR")}
                  style={{
                    border: "1px solid rgba(255,255,255,.16)",
                    background: tagMode === "OR" ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.04)",
                    color: "inherit",
                    borderRadius: 999,
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                  title="Seçili etiketlerden herhangi biri"
                >
                  Herhangi biri
                </button>

                <button
                  onClick={() => setTagMode("AND")}
                  style={{
                    border: "1px solid rgba(255,255,255,.16)",
                    background: tagMode === "AND" ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.04)",
                    color: "inherit",
                    borderRadius: 999,
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                  title="Seçili etiketlerin hepsi"
                >
                  Hepsi
                </button>
              </div>

              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  style={{
                    border: "1px solid rgba(255,255,255,.16)",
                    background: "rgba(255,255,255,.04)",
                    color: "inherit",
                    borderRadius: 10,
                    padding: "8px 10px",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                  title="Seçili etiketleri temizle"
                >
                  Etiketleri temizle
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {sortedVisibleTags.slice(0, 40).map((t) => {
                const active = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    style={{
                      fontSize: 12,
                      padding: "6px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,.12)",
                      background: active ? "rgba(120,255,255,.18)" : "rgba(255,255,255,.04)",
                      color: active ? "white" : "var(--muted)",
                      cursor: "pointer",
                      fontWeight: 800,
                      transition: "transform .15s ease, background .15s ease, border-color .15s ease",
                      transform: active ? "scale(1.02)" : "scale(1)",
                    }}
                    title={t}
                  >
                    {t}
                    {active ? " ✓" : ""}
                  </button>
                );
              })}
              {sortedVisibleTags.length > 40 ? (
                <span style={{ color: "var(--muted)", fontSize: 12 }}>
                  +{sortedVisibleTags.length - 40} daha… (etiket aramasıyla daralt)
                </span>
              ) : null}
            </div>
          </div>

          {/* GRID */}
          <div
            key={animateKey} // ✅ filtre değişince yumuşak giriş
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {filteredItems.map((it) => {
              const active = vs.includes(it.slug);
              const img = it.image;

              return (
                <div
                  key={it.slug}
                  className="card weapon-card"
                  data-active={active ? "true" : "false"}
                  style={{
                    padding: 12,
                    transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease",
                    transform: active ? "scale(1.01)" : "scale(1)",
                    boxShadow: active ? "0 0 0 1px rgba(255,204,51,.18), 0 18px 30px rgba(0,0,0,.35)" : undefined,
                    borderColor: active ? "rgba(255,204,51,.25)" : undefined,
                  }}
                >
                  {/* IMAGE */}
                  <div
                    className="card-figure"
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "rgba(255,255,255,.02)",
                      border: "1px solid rgba(255,255,255,.06)",
                      transition: "border-color .18s ease, transform .18s ease",
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
                          transition: "transform .18s ease",
                          transform: active ? "scale(1.02)" : "scale(1)",
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
                        Görsel yok
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
                        transition: "transform .15s ease, background .15s ease",
                        transform: active ? "scale(1.04)" : "scale(1)",
                      }}
                      title="Kıyaslamaya ekle"
                    >
                      Kıyas{active ? " ✓" : ""}
                    </button>
                  </div>

                  {/* TITLE + SUMMARY */}
                  <div className="card-body">
                  <a
                    href={`/${it.category}/${it.slug}`}
                    style={{ textDecoration: "none", display: "block", marginTop: 10 }}
                  >
                    <div className="card-title">{it.title}</div>
                    {it.summary ? (
                      <div className="card-summary">
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
                          className="card-tag"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  </div>
                </div>
              );
            })}
          </div>
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
            <div style={{ fontWeight: 900 }}>Kıyaslama</div>
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
              Temizle
            </button>
          </div>

          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
            Kartların sağ üstündeki <b>Kıyas</b> ile seç. (Maksimum 4)
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
                <div style={{ color: "var(--muted)", fontSize: 12 }}>Özellik</div>
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
                        {formatStat(row.key, w.stats?.[row.key])}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}