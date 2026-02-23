import { CATEGORIES, listDocs } from "../lib/content";

export default function HomePage() {
  const items = listDocs();

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Başlık */}
      <div>
        <h1 style={{ marginBottom: 6 }}>Helldivers 2 Türkçe Wiki</h1>
        <div style={{ color: "var(--muted)" }}>
          Silahlar, düşmanlar, stratagemler ve build önerileri.
          İçerikler <code>content/</code> klasöründen otomatik yüklenir.
        </div>
      </div>

      {/* Son eklenen içerikler */}
      <div style={{ display: "grid", gap: 10 }}>
        <h2 style={{ margin: 0 }}>Son Eklenenler</h2>
        {items.length === 0 ? (
          <div style={{ color: "var(--muted)" }}>Henüz içerik yok.</div>
        ) : (
          items.slice(0, 6).map((it) => (
            <a
              key={`${it.category}-${it.slug}`}
              href={`/${it.category}/${it.slug}`}
              className="card"
              style={{ padding: 14, textDecoration: "none" }}
            >
              <div style={{ fontWeight: 800 }}>{it.title}</div>
              {it.summary ? (
                <div style={{ color: "var(--muted)", fontSize: 14 }}>
                  {it.summary}
                </div>
              ) : null}
            </a>
          ))
        )}
      </div>

      {/* Kategoriler */}
      <div style={{ display: "grid", gap: 10 }}>
        <h2 style={{ margin: 0 }}>Kategoriler</h2>

        {CATEGORIES.map((cat) => (
          <a
            key={cat.key}
            href={`/${cat.key}`}
            className="card"
            style={{ padding: 16, textDecoration: "none" }}
          >
            <div style={{ fontWeight: 900 }}>{cat.label}</div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>
              İçeriği listele
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}