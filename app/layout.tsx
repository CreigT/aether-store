import type { Metadata } from "next";
import "./globals.css";
import { store } from "@/lib/config";

export const metadata: Metadata = {
  title: `${store.name} — ${store.tagline}`,
  description: store.tagline,
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const css = `
    :root {
      --ink: ${store.colors.ink};
      --paper: ${store.colors.paper};
      --accent: ${store.colors.accent};
    }
  `;
  return (
    <html lang="en">
      <body>
        <style>{css}</style>
        <div className="wrap">
          <header className="top">
            <a className="brand" href="/">
              {store.name}
            </a>
            <nav className="nav">
              <a href="/catalog">Catalog</a>
              <a href="/pricing">Membership</a>
              <a href="/library">Library</a>
              <a href="/about">About</a>
            </nav>
          </header>
          {children}
          <footer className="footer">
            <div>
              © {new Date().getFullYear()} {store.name}. Owned by {store.ownerName}.
            </div>
            <div>
              <a href="/legal">Terms & privacy</a>
              {" · "}
              <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
