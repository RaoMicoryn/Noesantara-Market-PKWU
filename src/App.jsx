import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";
import Toast from "./components/Toast";

import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import { ProfilePage, SuccessPage } from "./pages/ProfilePage";

import { useCart, useWishlist, useToast } from "./hooks/useStore";
import { PRODUCTS } from "./data/products";
import { generateOrderId } from "./utils/helpers";

import "./styles/global.css";

export default function App() {
  // ── Routing ──────────────────────────────────────────────
  const [page, setPage] = useState("shop");

  // ── Store hooks ───────────────────────────────────────────
  const { cart, addToCart, removeFromCart, updateQty, clearCart, cartCount } = useCart();
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const { toast, showToast } = useToast();

  // ── UI state ──────────────────────────────────────────────
  const [cartOpen, setCartOpen]               = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory]   = useState("All");
  const [search, setSearch]                   = useState("");
  const [user, setUser]                       = useState(null);
  const [cartBounce, setCartBounce]           = useState(false);
  const [orderId, setOrderId]                 = useState("");
  const [logoClickCount, setLogoClickCount]   = useState(0);

  // ── Derived ───────────────────────────────────────────────
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat    = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── Handlers ─────────────────────────────────────────────
  const handleAddToCart = (product) => {
    addToCart(product);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
    showToast(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleLogin  = (userData) => { setUser(userData); setPage("shop"); showToast("Selamat datang! Login berhasil."); };
  const handleLogout = () => { setUser(null); setPage("shop"); };

  const handleCheckout = () => {
    if (!user) { setPage("auth"); }
    else        { setPage("checkout"); }
    setCartOpen(false);
  };

  const handlePlaceOrder = () => {
    setOrderId(generateOrderId());
    setPage("success");
    clearCart();
  };

  // Klik logo 5x untuk akses admin (easter egg)
  const handleLogoClick = () => {
    const next = logoClickCount + 1;
    setLogoClickCount(next);
    if (next >= 5) { setPage("admin"); setLogoClickCount(0); }
  };

  const modalOpen = !!selectedProduct;

  // ── Jika halaman admin, render full screen tanpa layout ───
  if (page === "admin") {
    return <AdminPage onExitAdmin={() => setPage("shop")} />;
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      {/* Page content — blur saat product modal terbuka */}
      <div style={{
        filter: modalOpen ? "blur(6px)" : "none",
        transition: "filter 0.25s ease",
        willChange: "filter",
      }}>
        <Navbar
          onNavigate={setPage}
          onLogoClick={handleLogoClick}
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          user={user}
          onCartOpen={() => setCartOpen(true)}
          search={search}
          onSearch={setSearch}
          onLogout={handleLogout}
          cartBounce={cartBounce}
        />

        {page === "shop"     && <ShopPage products={filteredProducts} activeCategory={activeCategory} onCategoryChange={setActiveCategory} onAddToCart={handleAddToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} onProductClick={setSelectedProduct} onNavigate={setPage} />}
        {page === "auth"     && <AuthPage onLogin={handleLogin} />}
        {page === "wishlist" && <WishlistPage wishlist={wishlist} onAddToCart={handleAddToCart} onToggleWishlist={toggleWishlist} onNavigate={setPage} />}
        {page === "checkout" && <CheckoutPage cart={cart} user={user} onPlaceOrder={handlePlaceOrder} onNavigate={setPage} showToast={showToast} />}
        {page === "profile"  && user && <ProfilePage user={user} onNavigate={setPage} />}
        {page === "success"  && <SuccessPage onNavigate={setPage} orderId={orderId} />}

        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}

        <Footer onAdminAccess={() => setPage("admin")} />
      </div>

      {/* Product detail modal — di luar blur wrapper */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isWishlisted={isWishlisted(selectedProduct.id)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={toggleWishlist}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Toast notification */}
      <Toast message={toast} />
    </>
  );
}
