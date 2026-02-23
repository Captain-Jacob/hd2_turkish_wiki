import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Category = "weapons" | "enemies" | "stratagems" | "builds";

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "weapons", label: "Silahlar" },
  { key: "enemies", label: "Düşmanlar" },
  { key: "stratagems", label: "Stratagemler" },
  { key: "builds", label: "Build Önerileri" },
];

export type DocFrontmatter = {
  title: string;
  summary?: string;
  tags?: string[];
  updated?: string;
};

export type DocIndexItem = {
  category: Category;
  slug: string;
  title: string;
  summary?: string;
  tags: string[];
  updated?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

export function listDocs(category?: Category): DocIndexItem[] {
  const cats = category ? [category] : (CATEGORIES.map((c) => c.key) as Category[]);
  const items: DocIndexItem[] = [];

  for (const cat of cats) {
    const catDir = path.join(CONTENT_DIR, cat);
    const files = safeReadDir(catDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(catDir, file), "utf8");
      const { data } = matter(raw);
      const fm = data as Partial<DocFrontmatter>;

      items.push({
        category: cat,
        slug,
        title: fm.title ?? slug,
        summary: fm.summary,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        updated: fm.updated,
      });
    }
  }

  items.sort((a, b) => {
    const da = a.updated ? new Date(a.updated).getTime() : 0;
    const db = b.updated ? new Date(b.updated).getTime() : 0;
    if (da !== db) return db - da;
    return a.title.localeCompare(b.title, "tr");
  });

  return items;
}

export async function getDoc(category: Category, slug: string) {
  // ✅ Build sırasında undefined gelirse direkt net hata verir
  if (!category || !slug) {
    throw new Error(`getDoc() missing params -> category="${String(category)}" slug="${String(slug)}"`);
  }

  const fullPath = path.join(CONTENT_DIR, category, `${slug}.md`);

  // ✅ Dosya yolu yanlışsa net söyler
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing content file: ${fullPath}`);
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    frontmatter: data as DocFrontmatter,
    contentHtml,
  };
}