import { CATEGORIES, getDoc, listDocs, type Category } from "@/lib/content";
import Markdown from "@/app/components/Markdown";

export async function generateStaticParams() {
  const all = listDocs();
  return all.map((it) => ({ category: it.category, slug: it.slug }));
}

export default async function DocPage({ params }: { params: { category: Category; slug: string } }) {
  const { category, slug } = params;
  const { frontmatter, contentHtml } = await getDoc(category, slug);

  const catLabel = CATEGORIES.find((c) => c.key === category)?.label ?? category;

  return (
    <article style={{ display: "grid", gap: 12 }}>
      <div style={{ color: "var(--muted)", fontSize: 13 }}>
        {catLabel} / {slug}
      </div>

      <h1 style={{ margin: 0 }}>{frontmatter.title}</h1>

      {frontmatter.summary && (
        <div className="card" style={{ color: "var(--muted)" }}>
          {frontmatter.summary}
        </div>
      )}

      <Markdown html={contentHtml} />
    </article>
  );
}