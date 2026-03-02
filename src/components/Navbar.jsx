import React, { useState } from "react";
import Icon from "./Icon";

const styles = `
.nav { position: sticky; top: 0; z-index: 100; background: var(--cream); border-bottom: 1px solid var(--sand); backdrop-filter: blur(12px); }
.nav-inner { max-width: 1280px; margin: auto; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; gap: 24px; }
.logo { font-family: var(--font-display); font-size: 24px; color: var(--bark); cursor: pointer; letter-spacing: -0.5px; user-select: none; }
.logo span { color: var(--amber); }
.nav-search { flex: 1; max-width: 380px; position: relative; }
.nav-search input { width: 100%; padding: 10px 16px 10px 40px; border: 1.5px solid var(--sand); border-radius: 50px; background: var(--warm-white); font-family: var(--font-body); font-size: 14px; color: var(--charcoal); outline: none; transition: all 0.2s; }
.nav-search input:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(212,149,106,0.15); }
.nav-search .s-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--warm-gray); pointer-events: none; display:flex; }
.nav-actions { display: flex; align-items: center; gap: 8px; }
.nav-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 50px; border: 1.5px solid transparent; cursor: pointer; font-family: var(--font-body); font-size: 14px; font-weight: 500; transition: all 0.2s; background: none; color: var(--charcoal); }
.nav-btn:hover { background: var(--sand); }
.nav-btn.cart-nav { background: var(--amber); color: white; position: relative; }
.nav-btn.cart-nav:hover { background: var(--amber-dark); }
.cart-badge { position: absolute; top: -6px; right: -6px; background: var(--terracotta); color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.cart-bounce { animation: bounceCart 0.5s ease; }
.user-rel { position: relative; }
.user-dropdown { position: absolute; right: 0; top: calc(100% + 8px); background: var(--cream); border: 1px solid var(--sand); border-radius: 14px; padding: 8px; min-width: 180px; box-shadow: 0 8px 24px var(--shadow); z-index: 150; animation: fadeIn 0.2s ease; }
.user-dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.15s; }
.user-dropdown-item:hover { background: var(--sand); }
.wish-dot { margin-left: 2px; background: var(--terracotta); color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; }
@media (max-width: 600px) { .nav-search { display: none; } }
`;

export default function Navbar({ onNavigate, onLogoClick, cartCount, wishlistCount, user, onCartOpen, search, onSearch, onLogout, cartBounce }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo" onClick={onLogoClick || (() => onNavigate("shop"))}>Nusantara<span>.</span>Market</div>

          <div className="nav-search">
            <span className="s-icon"><Icon name="search" size={16} /></span>
            <input
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => { onSearch(e.target.value); onNavigate("shop"); }}
            />
          </div>

          <div className="nav-actions">
            {/* Wishlist */}
            <button className="nav-btn" onClick={() => onNavigate("wishlist")}>
              <Icon name="heart" size={18} />
              {wishlistCount > 0 && <span className="wish-dot">{wishlistCount}</span>}
            </button>

            {/* User */}
            {user ? (
              <div className="user-rel">
                <button className="nav-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <span style={{ fontSize: 18 }}>👤</span>
                  {user.name.split(" ")[0]}
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-item" onClick={() => { onNavigate("profile"); setUserMenuOpen(false); }}>👤 Profil Saya</div>
                    <div className="user-dropdown-item" onClick={() => { onNavigate("wishlist"); setUserMenuOpen(false); }}>❤️ Wishlist</div>
                    <div className="user-dropdown-item" style={{ color: "var(--terracotta)" }} onClick={() => { onLogout(); setUserMenuOpen(false); }}>🚪 Keluar</div>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-btn" onClick={() => onNavigate("auth")}>
                <Icon name="user" size={18} /> Masuk
              </button>
            )}

            {/* Cart */}
            <button className={`nav-btn cart-nav ${cartBounce ? "cart-bounce" : ""}`} onClick={onCartOpen}>
              <Icon name="cart" size={18} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
