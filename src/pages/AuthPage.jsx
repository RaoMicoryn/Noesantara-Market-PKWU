import React, { useState } from "react";

const styles = `
.auth-wrapper { max-width: 440px; margin: 0 auto; }
.auth-header  { text-align: center; margin-bottom: 36px; }
.auth-title   { font-family: var(--font-display); font-size: 36px; font-weight: 700; margin-bottom: 8px; }
.auth-sub     { color: var(--warm-gray); font-size: 15px; }
.auth-card    { background: var(--card-bg); border: 1px solid var(--sand); border-radius: 24px; padding: 36px; box-shadow: 0 8px 32px var(--shadow); }
.form-group   { margin-bottom: 20px; }
.form-label   { display: block; font-size: 14px; font-weight: 500; color: var(--charcoal); margin-bottom: 8px; }
.form-input   { width: 100%; padding: 12px 16px; border: 1.5px solid var(--sand); border-radius: 12px; background: var(--warm-white); font-family: var(--font-body); font-size: 15px; color: var(--charcoal); outline: none; transition: all 0.2s; }
.form-input:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(212,149,106,0.15); }
.form-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, var(--amber-dark), var(--amber)); color: white; border: none; border-radius: 12px; font-family: var(--font-body); font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.25s; margin-top: 8px; }
.form-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(212,149,106,0.35); }
.auth-divider { text-align: center; margin: 20px 0; color: var(--warm-gray); font-size: 14px; position: relative; }
.auth-divider::before { content: ''; position: absolute; left: 0; top: 50%; right: 0; height: 1px; background: var(--sand); }
.auth-divider span { position: relative; background: var(--card-bg); padding: 0 12px; }
.auth-switch  { text-align: center; margin-top: 20px; font-size: 14px; color: var(--warm-gray); }
.auth-switch button { background: none; border: none; color: var(--amber-dark); font-weight: 600; cursor: pointer; font-size: 14px; font-family: var(--font-body); }
.social-btn { width: 100%; padding: 12px; border: 1.5px solid var(--sand); border-radius: 12px; background: white; font-family: var(--font-body); font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 12px; }
.social-btn:hover { border-color: var(--amber-light); background: var(--warm-white); }
.forgot-link { font-size: 13px; color: var(--amber-dark); cursor: pointer; font-weight: 500; float: right; margin-bottom: 16px; }
`;

/**
 * AuthPage — login and register forms
 */
export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = () => {
    if (form.email && form.password) {
      onLogin({ name: form.name || "Guest User", email: form.email });
    }
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <>
      <style>{styles}</style>
      <div className="page fade-in">
        <div className="auth-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">{mode === "login" ? "Selamat Datang 👋" : "Bergabung Sekarang ✨"}</h1>
            <p className="auth-sub">{mode === "login" ? "Masuk ke akun Anda" : "Buat akun gratis sekarang"}</p>
          </div>

          <div className="auth-card">
            <button className="social-btn">🔵 Lanjutkan dengan Google</button>
            <button className="social-btn">⚫ Lanjutkan dengan Apple</button>
            <div className="auth-divider"><span>atau dengan email</span></div>

            {mode === "register" && (
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input className="form-input" placeholder="Nama kamu" value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="email@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={(e) => set("password", e.target.value)} />
            </div>
            {mode === "login" && <span className="forgot-link">Lupa password?</span>}

            <button className="form-btn" onClick={handleSubmit}>
              {mode === "login" ? "Masuk Sekarang" : "Daftar Gratis"}
            </button>

            <div className="auth-switch">
              {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
              <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
                {mode === "login" ? "Daftar disini" : "Masuk disini"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
