import React from "react";
import ProductCard from "../components/ProductCard";
import Icon from "../components/Icon";
import { PRODUCTS } from "../data/products";

const styles = `
.wishlist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
.page-back { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--warm-gray); display: flex; align-items: center; }
.page-back h1 { font-family: var(--font-display); font-size: 28px; font-weight: 700; }
.empty-wish { text-align: center; padding: 80px 20px; color: var(--warm-gray); }
`;

/**
 * WishlistPage — saved / favourite products
 */
export default function WishlistPage({ wishlist, onAddToCart, onToggleWishlist, onNavigate }) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <style>{styles}</style>
      <div className="page fade-in">
        <div className="page-back">
          <button className="back-btn" onClick={() => onNavigate("shop")}><Icon name="back" size={20} /></button>
          <h1>Wishlist Saya ❤️</h1>
        </div>

        {items.length === 0 ? (
          <div className="empty-wish">
            <div style={{ fontSize: 72, marginBottom: 20 }}>💝</div>
            <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 8 }}>Wishlist Masih Kosong</div>
            <div style={{ fontSize: 14, marginBottom: 24 }}>Simpan produk favorit kamu di sini</div>
            <button className="btn-primary" style={{ borderRadius: 50, padding: "14px 28px" }} onClick={() => onNavigate("shop")}>Mulai Belanja</button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={true}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
