import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "HD2 Türkçe Wiki",
  description: "Helldivers 2 Türkçe wiki: silahlar, düşmanlar, stratagemler, build önerileri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <div className="container">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}