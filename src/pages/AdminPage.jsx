import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { fmtPrice } from "../utils/helpers";
import Icon from "../components/Icon";

// ── Admin credentials ─────────────────────────────────────
const ADMIN_ID       = "Admin";
const ADMIN_PASSWORD = "Admin@12345";

// ── Fake orders data ──────────────────────────────────────
const FAKE_ORDERS = [
  { id: "NM-00000001", customer: "Budi Santoso",  date: "2026-03-01", total: 304000, status: "Dikirim",   items: 2 },
  { id: "NM-00000002", customer: "Sari Dewi",     date: "2026-03-01", total: 129000, status: "Selesai",   items: 1 },
  { id: "NM-00000003", customer: "Andi Wijaya",   date: "2026-02-28", total: 498000, status: "Diproses",  items: 3 },
  { id: "NM-00000004", customer: "Rina Kusuma",   date: "2026-02-28", total: 210000, status: "Selesai",   items: 1 },
  { id: "NM-00000005", customer: "Doni Pratama",  date: "2026-02-27", total: 734000, status: "Dibatalkan",items: 4 },
  { id: "NM-00000006", customer: "Maya Putri",    date: "2026-02-27", total: 249000, status: "Dikirim",   items: 1 },
  { id: "NM-00000007", customer: "Hendra Susilo", date: "2026-02-26", total: 384000, status: "Selesai",   items: 2 },
];

const STATUS_COLOR = {
  "Dikirim":    { bg: "#EBF5FB", color: "#2471A3" },
  "Selesai":    { bg: "#EAFAF1", color: "#1E8449" },
  "Diproses":   { bg: "#FEF9E7", color: "#B7950B" },
  "Dibatalkan": { bg: "#FDEDEC", color: "#C0392B" },
};

const styles = `
/* ── Admin Login ── */
.admin-login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--charcoal); padding: 20px; }
.admin-login-box  { background: #1a1410; border: 1px solid rgba(212,149,106,0.2); border-radius: 24px; padding: 48px 40px; width: 100%; max-width: 420px; box-shadow: 0 24px 64px rgba(0,0,0,0.5); }
.admin-login-logo { text-align: center; margin-bottom: 32px; }
.admin-login-logo .shield-icon { width: 60px; height: 60px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.admin-login-logo h1 { font-family: var(--font-display); font-size: 26px; color: white; margin-bottom: 4px; }
.admin-login-logo p  { font-size: 13px; color: rgba(255,255,255,0.4); }
.admin-form-group  { margin-bottom: 18px; }
.admin-form-label  { display: block; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.6); margin-bottom: 8px; letter-spacing: 0.5px; text-transform: uppercase; }
.admin-form-input  { width: 100%; padding: 13px 16px; border: 1.5px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(255,255,255,0.05); font-family: var(--font-body); font-size: 15px; color: white; outline: none; transition: all 0.2s; }
.admin-form-input:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(212,149,106,0.15); }
.admin-form-input::placeholder { color: rgba(255,255,255,0.2); }
.admin-login-btn   { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); color: white; border: none; border-radius: 12px; font-family: var(--font-body); font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.25s; margin-top: 8px; }
.admin-login-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(212,149,106,0.3); }
.admin-error { background: rgba(196,97,74,0.15); border: 1px solid rgba(196,97,74,0.3); color: #e8907a; border-radius: 10px; padding: 12px 16px; font-size: 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

/* ── Admin Dashboard ── */
.admin-layout { display: flex; min-height: 100vh; background: #f7f3ef; }
.admin-sidebar { width: 240px; background: var(--charcoal); flex-shrink: 0; display: flex; flex-direction: column; }
.admin-sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.admin-sidebar-logo h2 { font-family: var(--font-display); font-size: 18px; color: white; }
.admin-sidebar-logo h2 span { color: var(--amber); }
.admin-sidebar-logo p  { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
.admin-nav { padding: 16px 12px; flex: 1; }
.admin-nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.5); transition: all 0.2s; margin-bottom: 4px; border: none; background: none; width: 100%; font-family: var(--font-body); }
.admin-nav-item:hover  { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
.admin-nav-item.active { background: rgba(212,149,106,0.15); color: var(--amber-light); }
.admin-nav-item.active .nav-dot { background: var(--amber); }
.nav-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.2); flex-shrink: 0; }
.admin-sidebar-footer { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08); }
.admin-logout-btn { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 10px; cursor: pointer; font-size: 14px; color: rgba(196,97,74,0.8); background: none; border: none; font-family: var(--font-body); width: 100%; transition: all 0.2s; }
.admin-logout-btn:hover { background: rgba(196,97,74,0.1); color: var(--terracotta); }

/* ── Main Content ── */
.admin-main { flex: 1; overflow-y: auto; }
.admin-topbar { background: white; border-bottom: 1px solid #e8ddd0; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; }
.admin-topbar h1 { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--charcoal); }
.admin-user-badge { display: flex; align-items: center; gap: 10px; background: var(--surface); border-radius: 50px; padding: 8px 16px 8px 8px; }
.admin-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); display: flex; align-items: center; justify-content: center; font-size: 14px; color: white; font-weight: 700; }
.admin-user-badge span { font-size: 13px; font-weight: 600; color: var(--charcoal); }
.admin-content { padding: 28px 32px; }

/* ── Stats Cards ── */
.admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px; }
.admin-stat-card { background: white; border-radius: 16px; padding: 22px; border: 1px solid #e8ddd0; position: relative; overflow: hidden; }
.admin-stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--amber-dark), var(--amber)); }
.admin-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px; }
.admin-stat-num  { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--charcoal); margin-bottom: 4px; }
.admin-stat-label { font-size: 13px; color: var(--warm-gray); }
.admin-stat-change { font-size: 12px; font-weight: 600; margin-top: 8px; }
.change-up   { color: var(--forest); }
.change-down { color: var(--terracotta); }

/* ── Sections ── */
.admin-section { background: white; border-radius: 16px; border: 1px solid #e8ddd0; margin-bottom: 24px; overflow: hidden; }
.admin-section-header { padding: 20px 24px; border-bottom: 1px solid #e8ddd0; display: flex; align-items: center; justify-content: space-between; }
.admin-section-title  { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--charcoal); }
.admin-section-body   { padding: 0; }

/* ── Table ── */
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th { padding: 12px 24px; text-align: left; font-size: 12px; font-weight: 600; color: var(--warm-gray); text-transform: uppercase; letter-spacing: 0.8px; background: #faf6f1; border-bottom: 1px solid #e8ddd0; }
.admin-table td { padding: 14px 24px; font-size: 14px; color: var(--charcoal); border-bottom: 1px solid #f0e8de; }
.admin-table tr:last-child td { border-bottom: none; }
.admin-table tr:hover td { background: #fdfaf7; }
.status-badge { display: inline-flex; padding: 4px 10px; border-radius: 50px; font-size: 12px; font-weight: 600; }
.product-thumb { width: 40px; height: 40px; background: var(--surface); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-family: "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif; }
.admin-action-btn { padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid; font-family: var(--font-body); transition: all 0.15s; }
.btn-edit   { border-color: var(--amber); color: var(--amber-dark); background: rgba(212,149,106,0.08); }
.btn-edit:hover   { background: rgba(212,149,106,0.18); }
.btn-delete { border-color: var(--terracotta); color: var(--terracotta); background: rgba(196,97,74,0.08); }
.btn-delete:hover { background: rgba(196,97,74,0.18); }

/* ── Search bar ── */
.admin-search { position: relative; }
.admin-search input { padding: 9px 14px 9px 36px; border: 1.5px solid #e8ddd0; border-radius: 10px; font-family: var(--font-body); font-size: 14px; outline: none; background: #faf6f1; color: var(--charcoal); transition: all 0.2s; }
.admin-search input:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(212,149,106,0.12); }
.admin-search .s-ic { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--warm-gray); display: flex; }

/* ── Add product btn ── */
.admin-add-btn { display: flex; align-items: center; gap: 8px; padding: 9px 18px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); color: white; border: none; border-radius: 10px; font-family: var(--font-body); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.admin-add-btn:hover { filter: brightness(1.08); }

/* ── Chart bars ── */
.chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 120px; padding: 16px 24px; }
.chart-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.chart-bar { width: 100%; border-radius: 6px 6px 0 0; background: linear-gradient(180deg, var(--amber), var(--amber-dark)); transition: height 0.5s ease; }
.chart-label { font-size: 11px; color: var(--warm-gray); }

/* ── Quick info ── */
.admin-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
.info-card { background: white; border-radius: 16px; border: 1px solid #e8ddd0; padding: 20px 24px; }
.info-card h3 { font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 16px; color: var(--charcoal); }
.info-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f0e8de; font-size: 14px; }
.info-row:last-child { border-bottom: none; }
.info-label { color: var(--warm-gray); }
.info-value { font-weight: 600; color: var(--charcoal); }

@media (max-width: 900px) { .admin-stats { grid-template-columns: 1fr 1fr; } .admin-info-grid { grid-template-columns: 1fr; } }
`;

// ── Admin Login Component ─────────────────────────────────
function AdminLogin({ onLogin }) {
  const [form, setForm]   = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!form.id || !form.password) { setError("ID dan Password wajib diisi."); return; }
    setLoading(true);
    setTimeout(() => {
      if (form.id === ADMIN_ID && form.password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError("ID atau Password salah. Akses ditolak.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="admin-login-wrap">
        <div className="admin-login-box fade-in">
          <div className="admin-login-logo">
            <div className="shield-icon">
              <Icon name="shield" size={28} />
            </div>
            <h1>Admin <span style={{ color: "var(--amber)" }}>Panel</span></h1>
            <p>Nusantara Market — Restricted Access</p>
          </div>

          {error && (
            <div className="admin-error">
              ⚠️ {error}
            </div>
          )}

          <div className="admin-form-group">
            <label className="admin-form-label">Admin ID</label>
            <input
              className="admin-form-input"
              placeholder="Masukkan Admin ID"
              value={form.id}
              onChange={(e) => { setForm(f => ({ ...f, id: e.target.value })); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <input
              className="admin-form-input"
              type="password"
              placeholder="••••••••••"
              value={form.password}
              onChange={(e) => { setForm(f => ({ ...f, password: e.target.value })); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button className="admin-login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Memverifikasi..." : "🔐 Masuk ke Panel Admin"}
          </button>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            Akses terbatas — hanya untuk administrator
          </div>
        </div>
      </div>
    </>
  );
}

// ── Admin Dashboard Component ─────────────────────────────
function AdminDashboard({ onLogout }) {
  const [activeMenu, setActiveMenu]     = useState("dashboard");
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch]   = useState("");

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = FAKE_ORDERS.filter(o =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const totalRevenue  = FAKE_ORDERS.filter(o => o.status === "Selesai").reduce((s, o) => s + o.total, 0);
  const totalOrders   = FAKE_ORDERS.length;
  const totalProducts = PRODUCTS.length;
  const totalCustomers = 12847;

  const CHART_DATA = [
    { label: "Sen", val: 65 }, { label: "Sel", val: 80 }, { label: "Rab", val: 55 },
    { label: "Kam", val: 90 }, { label: "Jum", val: 75 }, { label: "Sab", val: 100 }, { label: "Min", val: 70 },
  ];
  const maxVal = Math.max(...CHART_DATA.map(d => d.val));

  const NAV_ITEMS = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "products",  icon: "📦", label: "Produk" },
    { id: "orders",    icon: "🧾", label: "Pesanan" },
    { id: "customers", icon: "👥", label: "Pelanggan" },
    { id: "settings",  icon: "⚙️", label: "Pengaturan" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-logo">
            <h2>Nusantara<span>.</span>Admin</h2>
            <p>Control Panel</p>
          </div>
          <nav className="admin-nav">
            {NAV_ITEMS.map(({ id, icon, label }) => (
              <button
                key={id}
                className={`admin-nav-item ${activeMenu === id ? "active" : ""}`}
                onClick={() => setActiveMenu(id)}
              >
                <span className="nav-dot" />
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-footer">
            <button className="admin-logout-btn" onClick={onLogout}>
              🚪 Keluar dari Admin
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="admin-main">
          <div className="admin-topbar">
            <h1>
              {activeMenu === "dashboard" && "Dashboard"}
              {activeMenu === "products"  && "Manajemen Produk"}
              {activeMenu === "orders"    && "Manajemen Pesanan"}
              {activeMenu === "customers" && "Data Pelanggan"}
              {activeMenu === "settings"  && "Pengaturan"}
            </h1>
            <div className="admin-user-badge">
              <div className="admin-avatar">A</div>
              <span>Administrator</span>
            </div>
          </div>

          <div className="admin-content">

            {/* ── DASHBOARD ── */}
            {activeMenu === "dashboard" && (
              <>
                {/* Stats */}
                <div className="admin-stats">
                  {[
                    { icon: "💰", label: "Total Pendapatan", value: fmtPrice(totalRevenue), change: "+12.5%", up: true, bg: "#FEF6EE" },
                    { icon: "🧾", label: "Total Pesanan",    value: totalOrders,            change: "+8.2%",  up: true, bg: "#EAFAF1" },
                    { icon: "📦", label: "Total Produk",     value: totalProducts,           change: "+2",     up: true, bg: "#EBF5FB" },
                    { icon: "👥", label: "Total Pelanggan",  value: `${totalCustomers.toLocaleString("id-ID")}`, change: "+5.1%", up: true, bg: "#F5EEF8" },
                  ].map(({ icon, label, value, change, up, bg }) => (
                    <div className="admin-stat-card" key={label}>
                      <div className="admin-stat-icon" style={{ background: bg }}>{icon}</div>
                      <div className="admin-stat-num">{value}</div>
                      <div className="admin-stat-label">{label}</div>
                      <div className={`admin-stat-change ${up ? "change-up" : "change-down"}`}>
                        {up ? "▲" : "▼"} {change} minggu ini
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart + Info */}
                <div className="admin-info-grid">
                  <div className="admin-section">
                    <div className="admin-section-header">
                      <span className="admin-section-title">📈 Penjualan Minggu Ini</span>
                    </div>
                    <div className="chart-bars">
                      {CHART_DATA.map(({ label, val }) => (
                        <div className="chart-bar-wrap" key={label}>
                          <div className="chart-bar" style={{ height: `${(val / maxVal) * 100}%` }} />
                          <span className="chart-label">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="info-card">
                    <h3>📋 Ringkasan Toko</h3>
                    {[
                      ["Produk Aktif",    `${totalProducts} produk`],
                      ["Pesanan Pending", "3 pesanan"],
                      ["Stok Menipis",    "2 produk"],
                      ["Rating Rata-rata","4.7 / 5.0"],
                      ["Kupon Aktif",     "1 kupon"],
                    ].map(([label, val]) => (
                      <div className="info-row" key={label}>
                        <span className="info-label">{label}</span>
                        <span className="info-value">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent orders */}
                <div className="admin-section">
                  <div className="admin-section-header">
                    <span className="admin-section-title">🧾 Pesanan Terbaru</span>
                  </div>
                  <div className="admin-section-body">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID Pesanan</th><th>Pelanggan</th><th>Tanggal</th><th>Total</th><th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FAKE_ORDERS.slice(0, 5).map(o => (
                          <tr key={o.id}>
                            <td style={{ fontWeight: 600, color: "var(--amber-dark)" }}>{o.id}</td>
                            <td>{o.customer}</td>
                            <td style={{ color: "var(--warm-gray)" }}>{o.date}</td>
                            <td style={{ fontWeight: 600 }}>{fmtPrice(o.total)}</td>
                            <td>
                              <span className="status-badge" style={STATUS_COLOR[o.status]}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ── PRODUCTS ── */}
            {activeMenu === "products" && (
              <div className="admin-section">
                <div className="admin-section-header">
                  <span className="admin-section-title">📦 Daftar Produk ({filteredProducts.length})</span>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div className="admin-search">
                      <span className="s-ic"><Icon name="search" size={15} /></span>
                      <input placeholder="Cari produk..." value={productSearch} onChange={e => setProductSearch(e.target.value)} />
                    </div>
                    <button className="admin-add-btn"><Icon name="plus" size={16} /> Tambah Produk</button>
                  </div>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produk</th><th>Kategori</th><th>Harga</th><th>Rating</th><th>Badge</th><th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div className="product-thumb">{p.image}</div>
                            <span style={{ fontWeight: 600 }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--warm-gray)" }}>{p.category}</td>
                        <td style={{ fontWeight: 600 }}>{fmtPrice(p.price)}</td>
                        <td>⭐ {p.rating} ({p.reviews})</td>
                        <td>
                          {p.badge
                            ? <span className="status-badge" style={{ background: "rgba(212,149,106,0.15)", color: "var(--amber-dark)" }}>{p.badge}</span>
                            : <span style={{ color: "var(--light-gray)", fontSize: 13 }}>—</span>
                          }
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button className="admin-action-btn btn-edit">Edit</button>
                            <button className="admin-action-btn btn-delete">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeMenu === "orders" && (
              <div className="admin-section">
                <div className="admin-section-header">
                  <span className="admin-section-title">🧾 Semua Pesanan ({filteredOrders.length})</span>
                  <div className="admin-search">
                    <span className="s-ic"><Icon name="search" size={15} /></span>
                    <input placeholder="Cari ID atau nama..." value={orderSearch} onChange={e => setOrderSearch(e.target.value)} />
                  </div>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID Pesanan</th><th>Pelanggan</th><th>Tanggal</th><th>Item</th><th>Total</th><th>Status</th><th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(o => (
                      <tr key={o.id}>
                        <td style={{ fontWeight: 600, color: "var(--amber-dark)" }}>{o.id}</td>
                        <td>{o.customer}</td>
                        <td style={{ color: "var(--warm-gray)" }}>{o.date}</td>
                        <td>{o.items} item</td>
                        <td style={{ fontWeight: 600 }}>{fmtPrice(o.total)}</td>
                        <td>
                          <span className="status-badge" style={STATUS_COLOR[o.status]}>{o.status}</span>
                        </td>
                        <td>
                          <button className="admin-action-btn btn-edit">Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── CUSTOMERS ── */}
            {activeMenu === "customers" && (
              <div className="admin-section">
                <div className="admin-section-header">
                  <span className="admin-section-title">👥 Data Pelanggan</span>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr><th>Nama</th><th>Email</th><th>Total Pesanan</th><th>Total Belanja</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ["Budi Santoso",  "budi@email.com",  3, 812000,  "Aktif"],
                      ["Sari Dewi",     "sari@email.com",  1, 129000,  "Aktif"],
                      ["Andi Wijaya",   "andi@email.com",  2, 498000,  "Aktif"],
                      ["Rina Kusuma",   "rina@email.com",  1, 210000,  "Aktif"],
                      ["Doni Pratama",  "doni@email.com",  1, 734000,  "Nonaktif"],
                      ["Maya Putri",    "maya@email.com",  2, 498000,  "Aktif"],
                      ["Hendra Susilo", "hendra@email.com",2, 384000,  "Aktif"],
                    ].map(([name, email, orders, spent, status]) => (
                      <tr key={email}>
                        <td style={{ fontWeight: 600 }}>{name}</td>
                        <td style={{ color: "var(--warm-gray)" }}>{email}</td>
                        <td>{orders} pesanan</td>
                        <td style={{ fontWeight: 600 }}>{fmtPrice(spent)}</td>
                        <td>
                          <span className="status-badge" style={status === "Aktif" ? { background: "#EAFAF1", color: "#1E8449" } : { background: "#FDEDEC", color: "#C0392B" }}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeMenu === "settings" && (
              <div style={{ maxWidth: 600 }}>
                <div className="admin-section" style={{ marginBottom: 20 }}>
                  <div className="admin-section-header">
                    <span className="admin-section-title">🏪 Informasi Toko</span>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    {[["Nama Toko", "Nusantara Market"], ["Email Toko", "admin@nusantaramarket.id"], ["No. Telpon", "+62 21 1234 5678"], ["Alamat", "Jl. Merdeka No. 1, Jakarta"]].map(([label, val]) => (
                      <div className="admin-form-group" key={label} style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--warm-gray)", marginBottom: 6 }}>{label}</label>
                        <input defaultValue={val} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e8ddd0", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--charcoal)", outline: "none", background: "#faf6f1" }} />
                      </div>
                    ))}
                    <button className="admin-add-btn">Simpan Perubahan</button>
                  </div>
                </div>

                <div className="admin-section">
                  <div className="admin-section-header">
                    <span className="admin-section-title">🔐 Keamanan Admin</span>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    {["Password Lama", "Password Baru", "Konfirmasi Password"].map(label => (
                      <div className="admin-form-group" key={label} style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--warm-gray)", marginBottom: 6 }}>{label}</label>
                        <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e8ddd0", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--charcoal)", outline: "none", background: "#faf6f1" }} />
                      </div>
                    ))}
                    <button className="admin-add-btn">Update Password</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}

// ── Main Export ───────────────────────────────────────────
export default function AdminPage({ onExitAdmin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <AdminLogin onLogin={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <AdminDashboard onLogout={() => { setIsAuthenticated(false); onExitAdmin(); }} />
  );
}
