import { listDocs, CATEGORIES } from "@/lib/content";
import SearchBox from "./components/SearchBox";
import HomeVideo from "./components/HomeVideo";

export default function HomePage() {
  const items = listDocs();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <h1 style={{ margin: 0, fontSize: 34 }}>Helldivers 2 Türkçe Wiki</h1>
      <div style={{ color: "var(--muted)" }}>
        Silahlar, düşmanlar, stratagemler ve build önerileri. İçerik eklemek için <code>content/</code> klasörüne .md at.
      </div>

      <SearchBox items={items} />

      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
        <h2 style={{ margin: "10px 0 0", fontSize: 18 }}>Kategoriler</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {CATEGORIES.map((c) => (
            <a key={c.key} className="card" href={`/${c.key}`}>
              <div style={{ fontWeight: 800 }}>{c.label}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>İçeriği listele</div>
            </a>
          ))}
        </div>
      </div>
      <HomeVideo />
    </div>
  );
}