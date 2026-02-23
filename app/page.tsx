import { CATEGORIES, listDocs } from "../lib/content";

export default function HomePage() {
  const items = listDocs();

  return (
    <div style={{ display: "grid", gap: 32 }}>

      {/* ================= HEADER ================= */}
      <div>
        <h1 style={{ marginBottom: 6 }}>Helldivers 2 Türkçe Wiki</h1>
        <div style={{ color: "var(--muted)" }}>
          Silahlar, düşmanlar, stratagemler ve build önerileri.
          İçerikler <code>content/</code> klasöründen otomatik yüklenir.
        </div>
      </div>

      {/* ================= SON EKLENENLER ================= */}
      <div style={{ display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Son Eklenenler</h2>

        {items.length === 0 ? (
          <div style={{ color: "var(--muted)" }}>Henüz içerik yok.</div>
        ) : (
          items.slice(0, 6).map((it) => (
            <a
              key={`${it.category}-${it.slug}`}
              href={`/${it.category}/${it.slug}`}
              className="card"
              style={{ padding: 14, textDecoration: "none", color: "inherit" }}
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

      {/* ================= KATEGORİLER ================= */}
      <div style={{ display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Kategoriler</h2>

        {CATEGORIES.map((cat) => (
          <a
            key={cat.key}
            href={`/${cat.key}`}
            className="card"
            style={{ padding: 16, textDecoration: "none", color: "inherit" }}
          >
            <div style={{ fontWeight: 900 }}>{cat.label}</div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>
              İçeriği listele
            </div>
          </a>
        ))}
      </div>

      {/* ================= MOD KURULUM VİDEOSU ================= */}
      <div style={{ marginTop: 20 }} className="card">
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 20 }}>
            Mod Kurulumu (Video)
          </div>

          <div
            style={{
              color: "var(--muted)",
              marginTop: 6,
              fontSize: 14,
            }}
          >
            Aşağıdaki videoda adım adım mod kurulumu anlatılmaktadır.
          </div>

          <div
            style={{
              marginTop: 16,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.10)",
              background: "rgba(0,0,0,.25)",
            }}
          >
            <video
              src="/setup.mp4"
              controls
              preload="metadata"
              style={{
                width: "100%",
                maxHeight: 500,
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}