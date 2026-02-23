import { CATEGORIES, listDocs } from "@/lib/content";

export default function Sidebar() {
  const all = listDocs();

  return (
    <aside className="sidebar">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>HD2 Türkçe Wiki</div>
        <span className="kbd">Vercel</span>
      </div>

      <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 13 }}>
        İçerikler <b>content/</b> klasöründen geliyor.
      </div>

      <nav style={{ marginTop: 18, display: "grid", gap: 10 }}>
        <a className="card" href="/" style={{ fontWeight: 700 }}>
          Ana Sayfa
        </a>

        {CATEGORIES.map((c) => {
          const count = all.filter((x) => x.category === c.key).length;
          return (
            <a
              key={c.key}
              className="card"
              href={`/${c.key}`}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span style={{ fontWeight: 700 }}>{c.label}</span>
              <span style={{ color: "var(--muted)" }}>{count}</span>
            </a>
          );
        })}
      </nav>

      <div style={{ marginTop: 18, color: "var(--muted)", fontSize: 12 }}>
        Yeni sayfa eklemek:
        <br />
        <code>content/weapons/yeni-silah.md</code>
      </div>
    </aside>
  );
}