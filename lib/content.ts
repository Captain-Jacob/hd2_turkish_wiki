import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
export const listDocsWithStats = listDocsFull;

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
  image?: string;
  stats?: WeaponStats; // bazı kategorilerde olmayabilir, sorun değil
};

export type DocIndexItem = {
  category: Category;
  slug: string;
  title: string;
  summary?: string;
  tags: string[];
  updated?: string;
  image?: string; // ✅ liste kartlarında göstermek için
};

export type WeaponStats = {
  fire_rate?: number;
  recoil?: number;
  ergo?: number;
  capacity?: number;
  reload?: number;
  damage?: number;
  penetration?: string; // Light/Medium vs
};

export type DocItem = {
  category: Category;
  slug: string;
  title: string;
  summary?: string;
  tags: string[];
  updated?: string;
  image?: string;
  stats?: WeaponStats;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

/** content içinden ilk görsel URL'sini yakala: <img src="..."> veya ![](...) */
function extractFirstImageUrl(markdownOrHtml: string): string | undefined {
  // HTML: <img src="...">
  const htmlImg = markdownOrHtml.match(/<img[^>]*\s+src=["']([^"']+)["'][^>]*>/i);
  const url1 = htmlImg?.[1];

  // Markdown: ![alt](url)
  const mdImg = markdownOrHtml.match(/!\[[^\]]*\]\(([^)]+)\)/);
  const url2 = mdImg?.[1];

  const url = (url1 || url2)?.trim();
  if (!url) return undefined;

  // sadece http(s)
  if (!/^https?:\/\//i.test(url)) return undefined;

  return url;
}

/** Basit index listesi (image dahil) */
export function listDocs(category?: Category): DocIndexItem[] {
  const cats = category ? [category] : (CATEGORIES.map((c) => c.key) as Category[]);
  const items: DocIndexItem[] = [];

  for (const cat of cats) {
    const catDir = path.join(CONTENT_DIR, cat);
    const files = safeReadDir(catDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(catDir, file), "utf8");
      const { data, content } = matter(raw);

      const extractedImage = extractFirstImageUrl(content);
      const fm = data as Partial<DocFrontmatter>;

      items.push({
        category: cat,
        slug,
        title: fm.title ?? slug,
        summary: fm.summary,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        updated: fm.updated,
        image: fm.image ?? extractedImage,
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

/** Compare / grid için full liste (stats + image fallback içerikten) */
export function listDocsFull(category?: Category): DocItem[] {
  const cats = category ? [category] : (CATEGORIES.map((c) => c.key) as Category[]);
  const items: DocItem[] = [];

  for (const cat of cats) {
    const catDir = path.join(CONTENT_DIR, cat);
    const files = safeReadDir(catDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(catDir, file), "utf8");
      const { data, content } = matter(raw);

      const extractedImage = extractFirstImageUrl(content);

      items.push({
        category: cat,
        slug,
        title: (data.title ?? slug) as string,
        summary: (data.summary ?? "") as string,
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        image: (data.image ?? extractedImage ?? undefined) as string | undefined,
        stats: (data.stats ?? undefined) as WeaponStats | undefined,
        updated: (data.updated ?? undefined) as string | undefined,
      });
    }
  }

  return items;
}

export async function getDoc(category: Category, slug: string) {
  if (!category || !slug) {
    throw new Error(`getDoc() missing params -> category="${String(category)}" slug="${String(slug)}"`);
  }

  const fullPath = path.join(CONTENT_DIR, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing content file: ${fullPath}`);
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const extractedImage = extractFirstImageUrl(content);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const fm = data as DocFrontmatter;

  return {
    frontmatter: {
      ...fm,
      image: fm.image ?? extractedImage, // ✅ detay sayfada da görsel garanti
    } as DocFrontmatter,
    contentHtml,
  };
}