import { notFound } from "next/navigation";
import { getDoc, type Category } from "@/lib/content";

function isCategory(x: string): x is Category {
  return ["weapons", "enemies", "stratagems", "builds"].includes(x);
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  // ✅ Next yeni sürüm: params Promise -> await şart
  const { category: catRaw, slug } = await params;

  if (!isCategory(catRaw)) return notFound();
  const category = catRaw as Category;

  const { frontmatter, contentHtml } = await getDoc(category, slug);

  return (
    <div style={{ padding: 18, maxWidth: 980, margin: "0 auto" }}>
      <a href={`/${category}`} style={{ color: "var(--muted)", textDecoration: "none" }}>
        ← Geri
      </a>

      <h1 style={{ fontSize: 34, fontWeight: 950, marginTop: 10 }}>{frontmatter.title}</h1>

      {frontmatter.summary ? (
        <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 16 }}>
          {frontmatter.summary}
        </div>
      ) : null}

      {frontmatter.image ? (
        <div
          style={{
            marginTop: 16,
            borderRadius: 18,
            overflow: "hidden",
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <img
             src={frontmatter.image}
            alt={frontmatter.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{
              width: "100%",
              maxHeight: 420,          // 🔥 ASIL FIX
              objectFit: "contain",
              display: "block",
              margin: "0 auto",}}
          />
        </div>
      ) : null}

      <div style={{ marginTop: 18, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}