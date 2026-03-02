import React from "react";
import Icon from "../components/Icon";

const styles = `
.profile-card { background: var(--card-bg); border: 1px solid var(--sand); border-radius: 20px; overflow: hidden; margin-bottom: 20px; }
.profile-cover { height: 120px; background: linear-gradient(135deg, var(--bark), var(--amber)); }
.profile-body  { padding: 20px 28px 28px; display: flex; gap: 20px; align-items: flex-end; margin-top: -40px; }
.profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: var(--amber-light); border: 4px solid var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0; }
.profile-meta h2 { font-family: var(--font-display); font-size: 22px; font-weight: 700; }
.profile-meta p  { color: var(--warm-gray); font-size: 14px; }
.settings-section { background: var(--card-bg); border: 1px solid var(--sand); border-radius: 20px; padding: 28px; margin-bottom: 20px; }
.settings-section h3 { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 20px; }
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 14px; font-weight: 500; color: var(--charcoal); margin-bottom: 8px; }
.form-input { width: 100%; padding: 12px 16px; border: 1.5px solid var(--sand); border-radius: 12px; background: var(--warm-white); font-family: var(--font-body); font-size: 15px; color: var(--charcoal); outline: none; transition: all 0.2s; }
.form-input:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(212,149,106,0.15); }
.form-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); color: white; border: none; border-radius: 12px; font-family: var(--font-body); font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.25s; }
.form-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(212,149,106,0.35); }
.page-back { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--warm-gray); display: flex; }

/* Success */
.success-page { max-width: 560px; margin: 60px auto; text-align: center; }
.success-icon  { font-size: 80px; margin-bottom: 24px; animation: pulse 1s ease 3; }
.success-title { font-family: var(--font-display); font-size: 36px; font-weight: 700; margin-bottom: 12px; }
.success-sub   { color: var(--warm-gray); font-size: 16px; line-height: 1.6; margin-bottom: 32px; }
.order-id-box  { background: var(--surface); border: 1px solid var(--sand); border-radius: 12px; padding: 16px; margin-bottom: 32px; font-size: 14px; color: var(--warm-gray); }
.order-id-box strong { display: block; font-size: 22px; color: var(--amber-dark); font-family: var(--font-display); margin-top: 4px; }
.success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
`;

/** ProfilePage */
export function ProfilePage({ user, onNavigate }) {
  return (
    <>
      <style>{styles}</style>
      <div className="page fade-in" style={{ maxWidth: 700 }}>
        <div className="page-back">
          <button className="back-btn" onClick={() => onNavigate("shop")}><Icon name="back" size={20} /></button>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>Profil Saya</h1>
        </div>

        <div className="profile-card">
          <div className="profile-cover" />
          <div className="profile-body">
            <div className="profile-avatar">👤</div>
            <div className="profile-meta">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>📦 Pesanan Saya</h3>
          <div style={{ color: "var(--warm-gray)", textAlign: "center", padding: "20px 0", fontSize: 14 }}>
            Belum ada pesanan.{" "}
            <span style={{ color: "var(--amber-dark)", cursor: "pointer", fontWeight: 600 }} onClick={() => onNavigate("shop")}>Mulai belanja!</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>⚙️ Pengaturan Akun</h3>
          <div className="form-group"><label className="form-label">Nama Lengkap</label><input className="form-input" defaultValue={user.name} /></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue={user.email} /></div>
          <div className="form-group"><label className="form-label">No. HP</label><input className="form-input" placeholder="+62 812 3456 7890" /></div>
          <button className="form-btn">Simpan Perubahan</button>
        </div>
      </div>
    </>
  );
}

/** SuccessPage */
export function SuccessPage({ onNavigate, orderId }) {
  return (
    <>
      <style>{styles}</style>
      <div className="page fade-in">
        <div className="success-page">
          <div className="success-icon">🎉</div>
          <h1 className="success-title">Pesanan Berhasil!</h1>
          <p className="success-sub">Terima kasih telah berbelanja di Nusantara Market. Pesanan kamu sedang kami proses dan akan segera dikirim.</p>
          <div className="order-id-box">
            ID Pesanan <strong>{orderId}</strong>
          </div>
          <div className="success-actions">
            <button className="btn-primary" style={{ borderRadius: 50, padding: "14px 28px" }} onClick={() => onNavigate("shop")}>Lanjut Belanja</button>
            <button
              style={{ padding: "14px 28px", borderRadius: 50, border: "1.5px solid var(--sand)", background: "none", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
              onClick={() => onNavigate("profile")}
            >
              Lihat Pesanan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
