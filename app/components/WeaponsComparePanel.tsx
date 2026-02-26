"use client";

import { useMemo } from "react";
import { Item, STAT_ROWS, formatStat } from "./weaponTypes";

function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [arr];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function WeaponsComparePanel({
  selected,
  onClear,
  onRemove,
}: {
  selected: Item[];
  onClear: () => void;
  onRemove?: (slug: string) => void;
}) {
  // ✅ GARANTİ: 2 üstte, kalanlar altta
  const colsPerRow = 2;

  // ✅ Kompakt / modern ölçüler
  const LABEL_COL = 108;
  const MIN_WEAPON_COL = 168;
  const GAP = 10;

  const groups = useMemo(() => chunk(selected, colsPerRow), [selected]);

  return (
    <div
      className="card"
      style={{
        position: "sticky",
        top: 16,
        height: "fit-content",
        padding: 20,    
        width: "100%",
        minWidth: 520,             
        maxWidth: 720,             
        overflow: "visible",        
        boxSizing: "border-box",
        transition: "all 220ms ease",
        boxShadow: "0 30px 60px rgba(0,0,0,.35)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 20,
      }}
    >
      <style jsx global>{`
        @keyframes vsPop {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes vsFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .vs-block {
          animation: vsPop 220ms ease both;
        }
        .vs-cell {
          animation: vsFade 180ms ease both;
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div style={{ fontWeight: 950, fontSize: 16 }}>Kıyaslama</div>

        <button
          onClick={onClear}
          style={{
            border: "1px solid rgba(255,255,255,.16)",
            background: "rgba(255,255,255,.04)",
            color: "inherit",
            borderRadius: 12,
            padding: "7px 12px",
            cursor: "pointer",
            fontWeight: 900,
          }}
        >
          Temizle
        </button>
      </div>

      <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
        Üstte silahlar, solda özellikler. (Maksimum 4) — <b>2</b> sütun/satır
      </div>

      {selected.length === 0 ? (
        <div style={{ marginTop: 14, color: "var(--muted)" }}>Henüz seçim yok.</div>
      ) : (
        <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
          {groups.map((grp, gi) => (
            <div
              key={gi}
              className="vs-block"
              style={{
                display: "grid",
                gap: 10,
                width: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                padding: 10,
                borderRadius: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Header row: Özellik + silah kartları */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `${LABEL_COL}px repeat(${grp.length}, minmax(${MIN_WEAPON_COL}px, 1fr))`,
                  gap: GAP,
                  alignItems: "start",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ color: "var(--muted)", fontSize: 12, paddingTop: 6 }}>Özellik</div>

                {grp.map((w, idx) => (
                  <div
                    key={w.slug}
                    className="vs-cell"
                    style={{
                      animationDelay: `${idx * 35}ms`,
                      display: "grid",
                      gap: 8,
                      padding: 10,
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 14px 28px rgba(0,0,0,.18)",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: "100%",
                        height: grp.length === 1 ? 56 : 46,
                        borderRadius: 14,
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {w.image ? (
                        <img
                          src={w.image}
                          alt={w.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "50% 52%",
                            display: "block",
                            transform: "scale(1.1)",
                            filter: "drop-shadow(0 10px 18px rgba(0,0,0,.35))",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            color: "var(--muted)",
                            fontSize: 12,
                          }}
                        >
                          Görsel yok
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div style={{ fontWeight: 950, fontSize: 12, lineHeight: 1.15 }}>{w.title}</div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <a className="kbd" href={`/${w.category}/${w.slug}`} style={{ textDecoration: "none" }}>
                        Sayfa →
                      </a>

                      {onRemove ? (
                        <button
                          className="kbd"
                          onClick={() => onRemove(w.slug)}
                          style={{
                            cursor: "pointer",
                            border: "none",
                            background: "rgba(255,255,255,.04)",
                            color: "inherit",
                          }}
                          title="Kıyaslamadan kaldır"
                        >
                          Kaldır ✕
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stat rows */}
              <div style={{ display: "grid", gap: 8 }}>
                {STAT_ROWS.map((row) => (
                  <div
                    key={String(row.key)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: `${LABEL_COL}px repeat(${grp.length}, minmax(${MIN_WEAPON_COL}px, 1fr))`,
                      gap: GAP,
                      alignItems: "center",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>{row.label}</div>

                    {grp.map((w, idx) => (
                      <div
                        key={w.slug + String(row.key)}
                        className="vs-cell"
                        style={{
                          animationDelay: `${idx * 25}ms`,
                          fontSize: 13,
                          padding: "7px 10px",
                          borderRadius: 12,
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          minHeight: 32,
                          display: "flex",
                          alignItems: "center",
                          boxSizing: "border-box",
                        }}
                      >
                        {formatStat(row.key, w.stats?.[row.key])}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Separator between groups */}
              {groups.length > 1 && gi < groups.length - 1 ? (
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginTop: 6 }} />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}