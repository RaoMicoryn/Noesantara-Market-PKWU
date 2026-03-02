import React from "react";
import Icon from "./Icon";
import { fmtPrice } from "../utils/helpers";

const styles = `
.modal { position: fixed; inset: 0; z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-box { background: var(--cream); border-radius: 24px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; animation: slideUp 0.4s ease; position: relative; isolation: isolate; }
.modal-grid { display: grid; grid-template-columns: 1fr 1fr; }
.modal-img  { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--sand), var(--surface)); min-height: 360px; border-radius: 24px 0 0 24px; overflow: hidden; position: relative; }
.modal-img-emoji { font-size: 120px; line-height: 1; display: block; filter: drop-shadow(0 8px 24px rgba(124,84,56,0.2)); user-select: none; font-family: "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif; }
.modal-info { padding: 40px; }
.modal-cat  { font-size: 12px; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin-bottom: 8px; }
.modal-name { font-family: var(--font-display); font-size: 30px; font-weight: 700; line-height: 1.2; margin-bottom: 12px; }
.modal-price { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--amber-dark); margin-bottom: 16px; }
.modal-orig  { font-size: 14px; color: var(--light-gray); text-decoration: line-through; margin-top: -12px; margin-bottom: 12px; }
.modal-desc  { font-size: 15px; color: var(--warm-gray); line-height: 1.7; margin-bottom: 24px; }
.modal-tags  { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.modal-tag   { font-size: 13px; background: var(--sand); color: var(--warm-gray); padding: 4px 12px; border-radius: 6px; font-weight: 500; }
.modal-actions { display: flex; gap: 12px; }
.btn-add-large  { flex: 1; padding: 14px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); color: white; border: none; border-radius: 14px; font-family: var(--font-body); font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-add-large:hover { filter: brightness(1.08); }
.btn-wish-large { width: 52px; height: 52px; border-radius: 14px; border: 1.5px solid var(--sand); background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--terracotta); transition: all 0.2s; }
.btn-wish-large:hover { background: var(--sand); }
.modal-close-btn { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; border-radius: 50%; background: white; border: 1px solid var(--sand); cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px var(--shadow); z-index: 1; }
@media (max-width: 700px) {
  .modal-grid { grid-template-columns: 1fr; }
  .modal-img  { min-height: 200px; border-radius: 24px 24px 0 0; }
  .modal-img-emoji { font-size: 80px; }
  .modal-info { padding: 24px; }
  .modal-name { font-size: 22px; }
}
`;

/**
 * ProductModal — full detail overlay for a single product
 */
export default function ProductModal({ product, isWishlisted, onAddToCart, onToggleWishlist, onClose }) {
  if (!product) return null;
  return (
    <>
      <style>{styles}</style>
      <div className="modal">
        <div className="overlay" style={{ zIndex: 299 }} onClick={onClose} />
        <div className="modal-box">
          <button className="modal-close-btn" onClick={onClose}><Icon name="close" size={16} /></button>
          <div className="modal-grid">
            <div className="modal-img">
              <span className="modal-img-emoji">{product.image}</span>
            </div>
            <div className="modal-info">
              <div className="modal-cat">{product.category}</div>
              <h2 className="modal-name">{product.name}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, color: "#F5A623" }}>
                {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={15} />)}
                <span style={{ fontSize: 13, color: "var(--warm-gray)" }}>{product.rating} · {product.reviews} ulasan</span>
              </div>
              <div className="modal-price">{fmtPrice(product.price)}</div>
              {product.originalPrice && <div className="modal-orig">{fmtPrice(product.originalPrice)}</div>}
              <p className="modal-desc">{product.desc}</p>
              <div className="modal-tags">
                {product.tags.map((t) => <span key={t} className="modal-tag">{t}</span>)}
              </div>
              <div className="modal-actions">
                <button className="btn-add-large" onClick={() => { onAddToCart(product); onClose(); }}>
                  Tambah ke Keranjang
                </button>
                <button className={`btn-wish-large ${isWishlisted ? "active" : ""}`} onClick={() => onToggleWishlist(product.id)}>
                  <Icon name={isWishlisted ? "heartFill" : "heart"} size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
