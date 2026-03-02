import React from "react";

const styles = `
.footer { background: var(--charcoal); color: rgba(255,255,255,0.7); padding: 48px 24px 24px; margin-top: 60px; }
.footer-inner { max-width: 1280px; margin: auto; }
.footer-grid  { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.footer-logo  { font-family: var(--font-display); font-size: 28px; color: white; margin-bottom: 12px; }
.footer-logo span { color: var(--amber-light); }
.footer-desc  { font-size: 14px; line-height: 1.7; margin-bottom: 20px; }
.footer-title { font-size: 13px; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-links li { font-size: 14px; cursor: pointer; transition: color 0.2s; }
.footer-links li:hover { color: var(--amber-light); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; font-size: 13px; flex-wrap: wrap; gap: 8px; }
.footer-socials { display: flex; gap: 12px; }
.social-icon { width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: background 0.2s; }
.social-icon:hover { background: var(--amber); }
@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; } }
@media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
`;

const LINKS = {
  Belanja:    ["Semua Produk", "Promo & Diskon", "Produk Baru", "Best Seller", "Flash Sale"],
  Layanan:    ["Cara Pemesanan", "Pembayaran", "Pengiriman", "Pengembalian", "Hubungi Kami"],
  Perusahaan: ["Tentang Kami", "Blog", "Karir", "Mitra Pengrajin", "Kebijakan Privasi"],
};

/**
 * Footer — site-wide footer with links and copyright
 */
export default function Footer({ onAdminAccess }) {
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Nusantara<span>.</span>Market</div>
              <p className="footer-desc">Platform belanja online untuk produk rumah tangga berkualitas dari pengrajin lokal terbaik Indonesia.</p>
              <div className="footer-socials">
                {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                  <div key={i} className="social-icon">{icon}</div>
                ))}
              </div>
            </div>
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <div className="footer-title">{title}</div>
                <ul className="footer-links">
                  {links.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2026 Nusantara Market. Semua hak dilindungi.</span>
            <span>🇮🇩 Dibuat dengan ❤️ di Indonesia</span>
            <span
              onClick={onAdminAccess}
              style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", cursor: "pointer", userSelect: "none", borderBottom: "1px dashed rgba(255,255,255,0.15)", paddingBottom: "1px", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "rgba(212,149,106,0.7)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}
              title="Admin Panel"
            >
              ⚙ Admin
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
