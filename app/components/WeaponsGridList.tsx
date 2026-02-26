"use client";

import { Item } from "./weaponTypes";

export default function WeaponsGridList({
  items,
  filteredItems,
  vs,
  onToggleVS,
  q,
  setQ,
  tagQ,
  setTagQ,
  tagMode,
  setTagMode,
  selectedTags,
  onClearTags,
  sortedVisibleTags,
  onToggleTag,
  animateKey,
}: {
  items: Item[];
  filteredItems: Item[];

  vs: string[];
  onToggleVS: (slug: string) => void;

  q: string;
  setQ: (v: string) => void;

  tagQ: string;
  setTagQ: (v: string) => void;

  tagMode: "OR" | "AND";
  setTagMode: (v: "OR" | "AND") => void;

  selectedTags: string[];
  onClearTags: () => void;

  sortedVisibleTags: string[];
  onToggleTag: (tag: string) => void;

  animateKey: number;
}) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* küçük CSS animasyonları */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px) scale(.99); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fade-up { animation: fadeUp .22s ease-out both; }
      `}</style>

      {/* FİLTRELER */}
      <div className="card" style={{ padding: 12, display: "grid", gap: 10 }}>
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
            placeholder="Etiket ara..."
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
              onClick={onClearTags}
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
                onClick={() => onToggleTag(t)}
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
              +{sortedVisibleTags.length - 40} daha…
            </span>
          ) : null}
        </div>
      </div>

      {/* GRID */}
      <div
        key={animateKey}
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
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "rgba(255,255,255,.02)",
                  border: "1px solid rgba(255,255,255,.06)",
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
                  onClick={() => onToggleVS(it.slug)}
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
              <a
                href={`/${it.category}/${it.slug}`}
                style={{ textDecoration: "none", display: "block", marginTop: 10 }}
              >
                <div style={{ fontWeight: 950, fontSize: 16 }}>{it.title}</div>
                {it.summary ? (
                  <div style={{ color: "var(--muted)", marginTop: 6, fontSize: 13 }}>{it.summary}</div>
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
                        background: "rgba(255,255,255,.04)",
                        color: "var(--muted)",
                        fontWeight: 800,
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
    </div>
  );
}