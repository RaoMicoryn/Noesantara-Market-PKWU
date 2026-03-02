import React from "react";
import Icon from "./Icon";
import { fmtPrice, getBadgeClass } from "../utils/helpers";

const styles = `
.product-card { background: var(--card-bg); border: 1px solid var(--sand); border-radius: 20px; overflow: hidden; cursor: pointer; transition: all 0.3s cubic-bezier(.22,1,.36,1); position: relative; }
.product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px var(--shadow); border-color: var(--amber-light); }
.product-img { display: flex; align-items: center; justify-content: center; height: 180px; background: linear-gradient(135deg, var(--sand) 0%, var(--surface) 100%); position: relative; overflow: hidden; }
.product-img-emoji { font-size: 64px; line-height: 1; display: block; user-select: none; font-family: "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif; filter: drop-shadow(0 4px 12px rgba(124,84,56,0.15)); }
.product-badge { position: absolute; top: 12px; left: 12px; padding: 4px 10px; border-radius: 50px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
.badge-bestseller { background: var(--amber); color: white; }
.badge-new        { background: var(--forest); color: white; }
.badge-sale       { background: var(--terracotta); color: white; }
.badge-hot        { background: #E85D04; color: white; }
.badge-toprated   { background: var(--bark); color: white; }
.product-wish { position: absolute; top: 12px; right: 12px; width: 36px; height: 36px; border-radius: 50%; background: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px var(--shadow); transition: all 0.2s; color: var(--light-gray); }
.product-wish:hover, .product-wish.active { color: var(--terracotta); transform: scale(1.1); }
.product-info { padding: 16px; }
.product-cat  { font-size: 12px; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 0.8px; font-weight: 500; margin-bottom: 6px; }
.product-name { font-family: var(--font-display); font-size: 17px; font-weight: 600; color: var(--charcoal); margin-bottom: 8px; line-height: 1.3; }
.product-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.product-tag  { font-size: 11px; background: var(--sand); color: var(--warm-gray); padding: 3px 8px; border-radius: 4px; font-weight: 500; }
.product-rating { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
.stars { display: flex; color: #F5A623; }
.rating-text { font-size: 13px; color: var(--warm-gray); }
.product-bottom { display: flex; align-items: center; justify-content: space-between; }
.product-price  { display: flex; align-items: baseline; gap: 8px; }
.price-main     { font-size: 20px; font-weight: 700; color: var(--bark); font-family: var(--font-display); }
.price-original { font-size: 14px; color: var(--light-gray); text-decoration: line-through; }
.add-cart-btn   { width: 36px; height: 36px; border-radius: 50%; background: var(--amber); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; transition: all 0.2s; flex-shrink: 0; }
.add-cart-btn:hover { background: var(--amber-dark); transform: scale(1.1); }
`;

/**
 * ProductCard — individual product tile for the grid
 */
export default function ProductCard({ product, isWishlisted, onAddToCart, onToggleWishlist, onClick }) {
  return (
    <>
      <style>{styles}</style>
      <div className="product-card">
        <div className="product-img" onClick={onClick}>
          <span className="product-img-emoji">{product.image}</span>
          {product.badge && (
            <span className={`product-badge ${getBadgeClass(product.badge)}`}>{product.badge}</span>
          )}
          <button
            className={`product-wish ${isWishlisted ? "active" : ""}`}
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          >
            <Icon name={isWishlisted ? "heartFill" : "heart"} size={16} />
          </button>
        </div>

        <div className="product-info" onClick={onClick}>
          <div className="product-cat">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-tags">
            {product.tags.map((t) => <span key={t} className="product-tag">{t}</span>)}
          </div>
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={13} />)}
            </div>
            <span className="rating-text">{product.rating} ({product.reviews})</span>
          </div>
          <div className="product-bottom">
            <div className="product-price">
              <span className="price-main">{fmtPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="price-original">{fmtPrice(product.originalPrice)}</span>
              )}
            </div>
            <button
              className="add-cart-btn"
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            >
              <Icon name="plus" size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
