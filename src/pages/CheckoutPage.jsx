import React, { useState } from "react";
import Icon from "../components/Icon";
import { fmtPrice } from "../utils/helpers";

const styles = `
.checkout-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; }
.co-section    { background: var(--card-bg); border: 1px solid var(--sand); border-radius: 20px; padding: 28px; margin-bottom: 20px; }
.co-section h3 { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
.step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--amber); color: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 14px; font-weight: 500; color: var(--charcoal); margin-bottom: 8px; }
.form-input { width: 100%; padding: 12px 16px; border: 1.5px solid var(--sand); border-radius: 12px; background: var(--warm-white); font-family: var(--font-body); font-size: 15px; color: var(--charcoal); outline: none; transition: all 0.2s; }
.form-input:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(212,149,106,0.15); }
.pay-methods { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 16px; }
.pay-method  { border: 2px solid var(--sand); border-radius: 10px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s; font-size: 13px; font-weight: 500; font-family: var(--font-body); background: none; }
.pay-method.selected { border-color: var(--amber); background: rgba(212,149,106,0.08); color: var(--amber-dark); }
.order-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--sand); }
.order-item-img { font-size: 28px; width: 56px; height: 56px; background: var(--surface); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.coupon-row { display: flex; gap: 10px; margin-top: 12px; }
.coupon-input { flex: 1; padding: 10px 14px; border: 1.5px solid var(--sand); border-radius: 10px; font-family: var(--font-body); font-size: 14px; outline: none; background: var(--warm-white); }
.coupon-input:focus { border-color: var(--amber); }
.coupon-btn { padding: 10px 18px; background: var(--amber); color: white; border: none; border-radius: 10px; font-family: var(--font-body); font-size: 14px; font-weight: 600; cursor: pointer; }
.summary-rows .row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 10px; }
.summary-rows .total { font-size: 18px; font-weight: 700; padding-top: 12px; border-top: 1px solid var(--sand); }
.place-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); color: white; border: none; border-radius: 14px; font-family: var(--font-body); font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.25s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; }
.place-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(212,149,106,0.4); }
.coupon-success { font-size: 13px; color: var(--forest); font-weight: 500; margin-top: 8px; }
.page-back { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--warm-gray); display: flex; }
@media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } .pay-methods { grid-template-columns: 1fr; } }
`;

/**
 * CheckoutPage — shipping, payment, and order summary
 */
export default function CheckoutPage({ cart, user, onPlaceOrder, onNavigate, showToast }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [coupon, setCoupon]         = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const shipping  = cartTotal > 200000 ? 0 : 15000;
  const grandTotal = cartTotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "HEMAT10") { setCouponApplied(true); showToast("🎉 Kupon berhasil! Diskon 10%"); }
    else showToast("Kode kupon tidak valid");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page fade-in">
        <div className="page-back">
          <button className="back-btn" onClick={() => onNavigate("shop")}><Icon name="back" size={20} /></button>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>Checkout</h1>
        </div>

        <div className="checkout-grid">
          {/* LEFT */}
          <div>
            {/* Shipping */}
            <div className="co-section">
              <h3><span className="step-num">1</span>Informasi Pengiriman</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Nama Depan</label><input className="form-input" placeholder="Budi" defaultValue={user?.name?.split(" ")[0]} /></div>
                <div className="form-group"><label className="form-label">Nama Belakang</label><input className="form-input" placeholder="Santoso" /></div>
              </div>
              <div className="form-group"><label className="form-label">Alamat Lengkap</label><input className="form-input" placeholder="Jl. Merdeka No.1" /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Kota</label><input className="form-input" placeholder="Jakarta" /></div>
                <div className="form-group"><label className="form-label">Kode Pos</label><input className="form-input" placeholder="10110" /></div>
              </div>
              <div className="form-group"><label className="form-label">No. HP</label><input className="form-input" placeholder="+62 812 3456 7890" defaultValue={""} /></div>
            </div>

            {/* Payment */}
            <div className="co-section">
              <h3><span className="step-num">2</span>Metode Pembayaran</h3>
              <div className="pay-methods">
                {[["card","💳 Kartu"],["transfer","🏦 Transfer"],["ewallet","📱 E-Wallet"]].map(([v,l]) => (
                  <button key={v} className={`pay-method ${paymentMethod===v?"selected":""}`} onClick={() => setPaymentMethod(v)}>{l}</button>
                ))}
              </div>
              {paymentMethod === "card" && (
                <>
                  <div className="form-group"><label className="form-label">Nomor Kartu</label><input className="form-input" placeholder="1234 5678 9012 3456" /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Kadaluarsa</label><input className="form-input" placeholder="MM/YY" /></div>
                    <div className="form-group"><label className="form-label">CVV</label><input className="form-input" placeholder="•••" /></div>
                  </div>
                </>
              )}
              {paymentMethod === "transfer" && (
                <div style={{ padding: 16, background: "var(--surface)", borderRadius: 12, fontSize: 14, color: "var(--warm-gray)" }}>
                  Transfer ke: <strong style={{ color: "var(--bark)" }}>BCA 1234567890 a/n Nusantara Market</strong>
                </div>
              )}
              {paymentMethod === "ewallet" && (
                <div className="pay-methods">
                  {["GoPay","OVO","Dana"].map((e) => <button key={e} className="pay-method">{e}</button>)}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Summary */}
          <div>
            <div className="co-section" style={{ position: "sticky", top: 80 }}>
              <h3>📋 Ringkasan Pesanan</h3>
              {cart.map((i) => (
                <div key={i.id} className="order-item">
                  <div className="order-item-img">{i.image}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{i.name}</div>
                    <div style={{ fontSize: 13, color: "var(--warm-gray)" }}>x{i.qty}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--amber-dark)", fontSize: 14 }}>{fmtPrice(i.price * i.qty)}</div>
                </div>
              ))}

              {/* Coupon */}
              <div className="coupon-row">
                <input className="coupon-input" placeholder="Kode kupon (HEMAT10)" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                <button className="coupon-btn" onClick={applyCoupon}>Pakai</button>
              </div>
              {couponApplied && <div className="coupon-success">✓ Kupon HEMAT10 aktif — diskon 10%!</div>}

              <div className="summary-rows" style={{ marginTop: 16 }}>
                <div className="row"><span>Subtotal</span><span>{fmtPrice(cartTotal)}</span></div>
                {discount > 0 && <div className="row" style={{ color: "var(--forest)" }}><span>Diskon 10%</span><span>-{fmtPrice(discount)}</span></div>}
                <div className="row"><span>Ongkir</span><span>{shipping === 0 ? "Gratis 🎉" : fmtPrice(shipping)}</span></div>
                <div className="row total"><span>Total</span><span style={{ color: "var(--amber-dark)" }}>{fmtPrice(grandTotal)}</span></div>
              </div>

              <button className="place-btn" onClick={onPlaceOrder}>
                <Icon name="check" size={18} /> Buat Pesanan
              </button>
              <div style={{ textAlign: "center", fontSize: 12, color: "var(--warm-gray)", marginTop: 12 }}>🔒 Pembayaran aman & terenkripsi</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
