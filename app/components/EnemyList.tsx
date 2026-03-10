"use client";

import { useState } from "react";
import type { DocItem } from "@/lib/content";

interface EnemyListProps {
  items: DocItem[];
}

const TOP_GROUPS = ["All", "Bots", "Bugs", "Squids"];
const BOT_SUBGROUPS = ["All", "Automatons", "Cyborgs"];

export default function EnemyList({ items }: EnemyListProps) {
  const [group, setGroup] = useState<typeof TOP_GROUPS[number]>("All");
  const [botType, setBotType] = useState<typeof BOT_SUBGROUPS[number]>("All");

  const filtered = items.filter((it) => {
    if (group !== "All") {
      const seg = it.slug.split("/")[0];
      if (seg !== group) return false;
    }
    if (group === "Bots" && botType !== "All") {
      const sub = it.slug.split("/")[1];
      if (!sub) return false;
      // slug segment names are capitalized in filesystem, but our slug uses folder names exactly
      // expect "Automatons" or "Cyborgs"
      return sub === botType;
    }
    return true;
  });

  return (
    <>
      {/* top-level group buttons */}
      <div style={{ marginBottom: 12 }}>
        {TOP_GROUPS.map((g) => (
          <button
            key={g}
            onClick={() => {
              setGroup(g as any);
              setBotType("All");
            }}
            style={{
              marginRight: 8,
              padding: "6px 14px",
              fontWeight: group === g ? 700 : 500,
              cursor: "pointer",
              borderRadius: 6,
              border: group === g ? "2px solid var(--accent)" : "1px solid rgba(255,255,255,.3)",
              background: group === g ? "var(--accent)" : "transparent",
              color: group === g ? "#000" : "#fff",
              transition: "background .2s, border .2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = group === g ? "var(--accent-dark)" : "rgba(255,255,255,.1)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = group === g ? "var(--accent)" : "transparent";
            }}
          >
            {g}
          </button>
        ))}
      </div>

      {/* sub-filter when Bots selected */}
      {group === "Bots" && (
        <div style={{ marginBottom: 12 }}>
          {BOT_SUBGROUPS.map((b) => (
            <button
              key={b}
              onClick={() => setBotType(b as any)}
              style={{
                marginRight: 8,
                padding: "6px 14px",
                fontWeight: botType === b ? 700 : 500,
                cursor: "pointer",
                borderRadius: 6,
                border: botType === b ? "2px solid var(--accent)" : "1px solid rgba(255,255,255,.3)",
                background: botType === b ? "var(--accent)" : "transparent",
                color: botType === b ? "#000" : "#fff",
                transition: "background .2s, border .2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = botType === b ? "var(--accent-dark)" : "rgba(255,255,255,.1)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = botType === b ? "var(--accent)" : "transparent";
              }}
            >
              {b}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {filtered.map((it) => (
          <a
            key={it.slug}
            href={`/${it.category}/${it.slug}`}
            className="card"
            style={{ padding: 12, textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 14,
                overflow: "hidden",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                display: "grid",
                placeItems: "center",
              }}
            >
              {it.image ? (
                <img
                  src={it.image}
                  alt={it.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxHeight: 120,
                    padding: 4,
                  }}
                />
              ) : (
                <div style={{ color: "var(--muted)", fontSize: 13 }}>No image</div>
              )}
            </div>

            <div style={{ marginTop: 10, fontWeight: 900 }}>{it.title}</div>
            {it.summary ? <div style={{ marginTop: 6, color: "var(--muted)" }}>{it.summary}</div> : null}
          </a>
        ))}
      </div>
    </>
  );
}
