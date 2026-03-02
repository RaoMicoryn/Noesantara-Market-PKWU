import React from "react";
import Icon from "./Icon";
import { fmtPrice } from "../utils/helpers";

const styles = `
.cart-drawer { position: fixed; right: 0; top: 0; bottom: 0; width: 420px; max-width: 100vw; background: var(--cream); z-index: 201; display: flex; flex-direction: column; }
.drawer-header { padding: 24px; border-bottom: 1px solid var(--sand); display: flex; align-items: center; justify-content: space-between; }
.drawer-title  { font-family: var(--font-display); font-size: 22px; font-weight: 700; }
.drawer-close  { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--sand); background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--charcoal); transition: all 0.2s; }
.drawer-close:hover { background: var(--sand); }
.drawer-body { flex: 1; overflow-y: auto; padding: 16px 24px; }
.cart-item { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--sand); animation: fadeIn 0.3s ease; }
.cart-item-img  { font-size: 36px; width: 72px; height: 72px; background: var(--surface); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif; }
.cart-item-info { flex: 1; }
.cart-item-name  { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
.cart-item-price { color: var(--amber-dark); font-weight: 700; font-size: 15px; }
.qty-ctrl { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
.qty-btn  { width: 28px; height: 28px; border-radius: 8px; border: 1.5px solid var(--sand); background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--charcoal); transition: all 0.2s; }
.qty-btn:hover { background: var(--sand); }
.qty-num  { font-weight: 600; font-size: 15px; min-width: 24px; text-align: center; }
.remove-btn { color: var(--terracotta); background: none; border: none; cursor: pointer; padding: 4px; border-radius: 6px; transition: all 0.2s; }
.remove-btn:hover { background: rgba(196,97,74,0.1); }
.drawer-footer { padding: 20px 24px; border-top: 1px solid var(--sand); background: var(--warm-white); }
.cart-summary-row { display: flex; justify-content: space-between; font-size: 14px; color: var(--warm-gray); margin-bottom: 8px; }
.cart-total-row   { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: var(--charcoal); margin: 16px 0; padding-top: 12px; border-top: 1px solid var(--sand); }
.checkout-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); color: white; border: none; border-radius: 14px; font-family: var(--font-body); font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.25s; display: flex; align-items: center; justify-content: center; gap: 8px; }
.checkout-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(212,149,106,0.4); }
.empty-cart      { text-align: center; padding: 60px 20px; color: var(--warm-gray); }
.empty-cart-icon { font-size: 64px; margin-bottom: 16px; opacity: 0.4; }
.progress-bar-bg   { background: var(--sand); border-radius: 8px; height: 6px; margin-bottom: 12px; }
.progress-bar-fill { background: var(--amber); border-radius: 8px; height: 100%; transition: width 0.5s; }
`;

const FREE_SHIPPING_MIN = 200000;

/**
 * CartDrawer — slide-in cart panel
 */
export default function CartDrawer({ cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = cartTotal >= FREE_SHIPPING_MIN ? 0 : 15000;
  const progress  = Math.min(100, (cartTotal / FREE_SHIPPING_MIN) * 100);

  return (
    <>
      <style>{styles}</style>
      <div className="overlay" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }} onClick={onClose} />
      <div className="cart-drawer slide-in">
        <div className="drawer-header">
          <div className="drawer-title">Keranjang 🛒</div>
          <button className="drawer-close" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Keranjang Kosong</div>
              <div style={{ fontSize: 14 }}>Tambahkan produk favoritmu!</div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">{item.image}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{fmtPrice(item.price)}</div>
                  <div className="qty-ctrl">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}><Icon name="minus" size={14} /></button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}><Icon name="plus" size={14} /></button>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}><Icon name="trash" size={16} /></button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: "var(--amber-dark)", fontSize: 15, flexShrink: 0 }}>
                  {fmtPrice(item.price * item.qty)}
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span><span>{fmtPrice(cartTotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Ongkir</span><span>{shipping === 0 ? "Gratis 🎉" : fmtPrice(shipping)}</span>
            </div>
            {cartTotal < FREE_SHIPPING_MIN && (
              <div style={{ fontSize: 12, color: "var(--warm-gray)", marginBottom: 8 }}>
                Tambah {fmtPrice(FREE_SHIPPING_MIN - cartTotal)} lagi untuk gratis ongkir!
              </div>
            )}
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="cart-total-row">
              <span>Total</span>
              <span style={{ color: "var(--amber-dark)" }}>{fmtPrice(cartTotal + shipping)}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Checkout Sekarang <Icon name="arrow" size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
