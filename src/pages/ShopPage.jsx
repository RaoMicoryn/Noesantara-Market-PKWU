import React from "react";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/products";

const styles = `
.hero { background: linear-gradient(135deg, var(--bark) 0%, var(--amber-dark) 60%, var(--amber) 100%); border-radius: 24px; padding: 72px 56px; position: relative; overflow: hidden; margin-bottom: 48px; }
.hero::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E"); }
.hero-content { position:relative; z-index:1; max-width:560px; }
.hero-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.15); color:rgba(255,255,255,0.9); padding:6px 14px; border-radius:50px; font-size:13px; font-weight:500; margin-bottom:20px; }
.hero h1 { font-family:var(--font-display); font-size:52px; font-weight:700; color:white; line-height:1.15; margin-bottom:16px; }
.hero h1 em { font-style:italic; color:var(--amber-light); }
.hero p { color:rgba(255,255,255,0.8); font-size:16px; line-height:1.6; margin-bottom:32px; }
.hero-actions { display:flex; gap:12px; flex-wrap:wrap; }
.hero-deco { position:absolute; right:56px; top:50%; transform:translateY(-50%); font-size:120px; opacity:0.12; pointer-events:none; }
.stats { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:48px; }
.stat-card { background:var(--card-bg); border:1px solid var(--sand); border-radius:16px; padding:20px; text-align:center; }
.stat-num   { font-family:var(--font-display); font-size:28px; font-weight:700; color:var(--amber-dark); }
.stat-label { font-size:13px; color:var(--warm-gray); margin-top:4px; }
.features { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:48px; }
.feature-card { background:var(--card-bg); border:1px solid var(--sand); border-radius:16px; padding:20px; display:flex; gap:14px; align-items:flex-start; }
.feature-icon { width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,var(--amber-light),var(--amber)); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
.feature-text h4 { font-weight:600; font-size:14px; margin-bottom:4px; }
.feature-text p  { font-size:13px; color:var(--warm-gray); line-height:1.4; }
.cats { display:flex; gap:10px; margin-bottom:32px; flex-wrap:wrap; }
.cat-pill { padding:8px 20px; border-radius:50px; border:1.5px solid var(--sand); background:var(--card-bg); font-size:14px; font-weight:500; color:var(--warm-gray); cursor:pointer; transition:all 0.2s; font-family:var(--font-body); }
.cat-pill:hover  { border-color:var(--amber); color:var(--amber-dark); }
.cat-pill.active { background:var(--amber); border-color:var(--amber); color:white; }
.products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:24px; margin-bottom:48px; }
.empty-state { text-align:center; padding:60px 20px; color:var(--warm-gray); }
@media (max-width:900px) { .stats{grid-template-columns:repeat(2,1fr);} .features{grid-template-columns:repeat(2,1fr);} .hero{padding:48px 32px;} .hero h1{font-size:36px;} .hero-deco{display:none;} }
@media (max-width:600px) { .stats{grid-template-columns:1fr 1fr;} .features{grid-template-columns:1fr;} }
`;

const FEATURES = [
  { icon: "🚚", title: "Gratis Ongkir",    desc: "Pembelian di atas Rp200.000" },
  { icon: "🛡️", title: "Produk Terjamin",  desc: "100% asli dan berkualitas" },
  { icon: "🎁", title: "Kemasan Cantik",   desc: "Cocok untuk hadiah" },
  { icon: "🏷️", title: "Harga Terbaik",    desc: "Langsung dari pengrajin" },
];

const STATS = [["2.4K+","Produk Pilihan"],["12K+","Pelanggan Puas"],["98%","Rating Kepuasan"],["50+","Pengrajin Lokal"]];

/**
 * ShopPage — main product listing page
 */
export default function ShopPage({ products, activeCategory, onCategoryChange, onAddToCart, onToggleWishlist, wishlist, onProductClick, onNavigate }) {
  return (
    <>
      <style>{styles}</style>
      <div className="page fade-in">
        {/* Hero */}
        <div className="hero">
          <div className="hero-content">
            <div className="hero-tag">✨ Koleksi Baru Telah Hadir</div>
            <h1>Temukan Keindahan <em>Alami</em><br/>di Setiap Produk</h1>
            <p>Produk rumah tangga berkualitas tinggi dari pengrajin lokal terbaik Indonesia. Hangat, alami, dan penuh cerita.</p>
            <div className="hero-actions">
              <button className="btn-primary" style={{ borderRadius: 50, padding: "14px 32px" }} onClick={() => onCategoryChange("All")}>Belanja Sekarang</button>
              <button className="btn-outline" onClick={() => onNavigate("wishlist")}>❤️ Wishlist Saya</button>
            </div>
          </div>
          <div className="hero-deco">🏺</div>
        </div>

        {/* Stats */}
        <div className="stats">
          {STATS.map(([n, l]) => (
            <div className="stat-card" key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="features">
          {FEATURES.map(({ icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <div className="feature-text"><h4>{title}</h4><p>{desc}</p></div>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="section-header">
          <h2 className="section-title">Semua Produk</h2>
          <span style={{ color: "var(--warm-gray)", fontSize: 14 }}>{products.length} produk ditemukan</span>
        </div>

        <div className="cats">
          {CATEGORIES.map((c) => (
            <button key={c} className={`cat-pill ${activeCategory === c ? "active" : ""}`} onClick={() => onCategoryChange(c)}>{c}</button>
          ))}
        </div>

        <div className="products-grid">
          {products.map((p, i) => (
            <div key={p.id} className="fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
              <ProductCard
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onClick={() => onProductClick(p)}
              />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Produk tidak ditemukan</div>
            <div style={{ fontSize: 14, marginTop: 8 }}>Coba kata kunci yang berbeda</div>
          </div>
        )}
      </div>
    </>
  );
}
