import { notFound } from "next/navigation";
import WeaponGrid from "../components/WeaponGrid";
import { CATEGORIES, listDocsFull, type Category } from "@/lib/content";

function isCategory(x: string): x is Category {
  return ["weapons", "enemies", "stratagems", "builds"].includes(x);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isCategory(category)) return notFound();

  const items = listDocsFull(category);

  if (category === "weapons") {
    return (
      <div style={{ padding: 18 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>
          {CATEGORIES.find((c) => c.key === category)?.label ?? category}
        </h1>

        <WeaponGrid items={items as any} />
      </div>
    );
  }

  return (
    <div style={{ padding: 18 }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>
        {CATEGORIES.find((c) => c.key === category)?.label ?? category}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((it) => (
          <a
            key={it.slug}
            href={`/${it.category}/${it.slug}`}
            className="card"
            style={{ padding: 12, textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
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
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: 10 }}
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
    </div>
  );
}