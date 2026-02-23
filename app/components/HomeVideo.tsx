export default function HomeVideo() {
  return (
    <section className="card" style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>Kurulum Videosu</div>
        <div style={{ color: "var(--muted)", fontSize: 12 }}>MP4 • repo içinden</div>
      </div>

      <div style={{ color: "var(--muted)", fontSize: 13 }}>
        Modu nasıl kurduğumuzu adım adım anlattığım video.
      </div>

      <video
        controls
        preload="metadata"
        playsInline
        style={{
          width: "100%",
          borderRadius: 14,
          border: "1px solid var(--border)",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        <source src="/setup.mp4" type="video/mp4" />
        Tarayıcın video etiketini desteklemiyor.
      </video>

      <div style={{ color: "var(--muted)", fontSize: 12 }}>
        Video yüklenmezse: <a href="/setup.mp4">dosyayı direkt aç</a>
      </div>
    </section>
  );
}