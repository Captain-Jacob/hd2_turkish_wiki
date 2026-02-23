import { CATEGORIES, listDocs, type Category } from "@/lib/content";

type PageProps = {
  params: {
    category: Category;
  };
};

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }));
}

export default function CategoryPage({ params }: PageProps) {
  const category = params.category;
  const catLabel = CATEGORIES.find((c) => c.key === category)?.label ?? category;

  const items = listDocs(category);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>{catLabel}</h1>
      <div style={{ color: "var(--muted)" }}>Toplam {items.length} sayfa.</div>

      <div style={{ display: "grid", gap: 10 }}>
        {items.map((it) => (
          <a key={it.slug} className="card" href={`/${category}/${it.slug}`}>
            <div style={{ fontWeight: 800 }}>{it.title}</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              {it.summary ?? "—"}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}