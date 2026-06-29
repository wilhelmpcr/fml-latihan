// ============================================================
// PRD v2 — Landing Page Intermediate
// Versi    : 2.0.0
// Tanggal  : 2026-06-29
// Deskripsi: Landing page CRM dengan fitur UX yang lebih kaya:
//            - Navbar sticky + mobile hamburger menu
//            - Hero dengan gradient background
//            - Stats counter (angka bisnis)
//            - Features section (6 fitur dengan icon)
//            - Testimonials section (3 review pelanggan)
//            - Pricing section (2 tier: Gratis + Premium)
//            - CTA section dengan form kontak sederhana
//            - Footer 2 kolom dengan link navigasi
//            - Animasi hover pada card
// ============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPageV2() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // ─── Data ─────────────────────────────────────────────────
  const stats = [
    { id: "s1", value: "1.200+", label: "Bisnis Katering", icon: "🏪" },
    { id: "s2", value: "35.000+", label: "Pesanan Dikelola", icon: "📦" },
    { id: "s3", value: "98%", label: "Kepuasan Pelanggan", icon: "⭐" },
    { id: "s4", value: "150+", label: "Kota di Indonesia", icon: "🗺️" },
  ];

  const features = [
    { id: "f1", icon: "👥", title: "CRM Pelanggan", desc: "Profil lengkap, riwayat pesanan, dan preferensi menu untuk setiap pelanggan.", color: "#0A3D40" },
    { id: "f2", icon: "📦", title: "Manajemen Pesanan", desc: "Pantau pesanan dari input hingga pengiriman dengan notifikasi real-time.", color: "#FF8C00" },
    { id: "f3", icon: "📊", title: "Analytics Dashboard", desc: "Laporan revenue, pelanggan aktif, dan insight bisnis yang mudah dipahami.", color: "#7C3AED" },
    { id: "f4", icon: "🔔", title: "Notifikasi Otomatis", desc: "Kirim konfirmasi dan reminder pesanan via WhatsApp & Email secara otomatis.", color: "#059669" },
    { id: "f5", icon: "📅", title: "Jadwal Produksi", desc: "Atur jadwal masak dan pengiriman tim dapur dengan kalender terintegrasi.", color: "#DC2626" },
    { id: "f6", icon: "💳", title: "Manajemen Invoice", desc: "Buat, kirim, dan lacak invoice profesional dengan reminder jatuh tempo.", color: "#0891B2" },
  ];

  const testimonials = [
    { id: "t1", name: "Ibu Sari Dewi", role: "Owner Sari Catering, Bandung", avatar: "SD", text: "NusaCater CRM benar-benar mengubah cara kami mengelola pesanan. Revenue naik 40% dalam 3 bulan!", stars: 5 },
    { id: "t2", name: "Pak Budi Santoso", role: "Manager Nusantara Catering, Jakarta", avatar: "BS", text: "Fitur analitiknya sangat membantu. Kami bisa melihat pelanggan paling loyal dan beri penawaran khusus.", stars: 5 },
    { id: "t3", name: "Mbak Rina Wulandari", role: "Founder Dapur Rina, Surabaya", avatar: "RW", text: "Notifikasi WhatsApp otomatis membuat pelanggan merasa sangat diperhatikan. Rating kami naik pesat!", stars: 5 },
  ];

  const pricing = [
    {
      id: "p-free",
      tier: "Starter",
      price: "Gratis",
      period: "",
      desc: "Untuk memulai bisnis katering Anda",
      color: "#64748b",
      highlight: false,
      features: ["50 pelanggan", "100 pesanan/bulan", "Dashboard dasar", "Laporan sederhana", "Email support"],
    },
    {
      id: "p-pro",
      tier: "Professional",
      price: activeTab === "monthly" ? "Rp 149.000" : "Rp 119.000",
      period: "/ bulan",
      desc: "Untuk bisnis katering yang sedang berkembang",
      color: "#FF8C00",
      highlight: true,
      badge: "Terpopuler",
      features: ["Pelanggan tak terbatas", "Pesanan tak terbatas", "Notifikasi WhatsApp & Email", "Analytics lengkap", "Jadwal produksi", "Invoice management", "Priority support 24/7"],
    },
  ];

  const navLinks = [
    { label: "Fitur", target: "features-v2" },
    { label: "Harga", target: "pricing-v2" },
    { label: "Testimoni", target: "testimonials-v2" },
    { label: "Kontak", target: "cta-v2" },
  ];

  // ─── CSS-in-JS Styles ──────────────────────────────────────
  const c = {
    teal: "#0A3D40",
    tealLight: "#e6f0f0",
    orange: "#FF8C00",
    dark: "#0f172a",
    gray: "#64748b",
    border: "#e2e8f0",
    bg: "#f8fafc",
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <nav
        id="navbar-v2"
        style={{
          position: "sticky", top: 0, zIndex: 200,
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? c.border : "transparent"}`,
          transition: "all 0.3s ease",
          padding: "0 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Logo */}
          <div style={{ fontSize: "20px", fontWeight: "800", color: c.teal }}>🍽️ NusaCater CRM</div>

          {/* Desktop nav links */}
          <div style={{ display: "flex", gap: "32px" }}>
            {navLinks.map((l) => (
              <button
                key={l.target}
                onClick={() => scrollTo(l.target)}
                style={{ background: "none", border: "none", fontSize: "14px", fontWeight: "600", color: c.gray, cursor: "pointer" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              id="nav-login-v2"
              onClick={() => navigate("/login")}
              style={{ padding: "9px 20px", border: `2px solid ${c.teal}`, borderRadius: "8px", background: "none", color: c.teal, fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
            >
              Masuk
            </button>
            <button
              id="nav-register-v2"
              onClick={() => navigate("/register")}
              style={{ padding: "9px 20px", backgroundColor: c.teal, border: "none", borderRadius: "8px", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section
        id="hero-v2"
        style={{
          background: `linear-gradient(135deg, #f0fafa 0%, #fff8f0 100%)`,
          padding: "100px 40px 80px",
          textAlign: "center",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", backgroundColor: c.tealLight, borderRadius: "99px", fontSize: "13px", fontWeight: "700", color: c.teal, marginBottom: "28px" }}>
            <span>⭐</span>
            <span>Software CRM Katering #1 Indonesia · Dipercaya 1.200+ Bisnis</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "56px", fontWeight: "800", color: c.dark, lineHeight: "1.15", marginBottom: "20px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Kelola Bisnis Katering<br />
            <span style={{ color: c.teal }}>Lebih Cerdas & Efisien</span>
          </h1>

          {/* Description */}
          <p style={{ fontSize: "18px", color: c.gray, lineHeight: "1.8", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
            Platform CRM khusus katering yang membantu Anda mengelola pelanggan, pesanan, dan analitik bisnis dalam satu dashboard yang intuitif.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              id="hero-cta-primary-v2"
              onClick={() => navigate("/register")}
              style={{ padding: "16px 40px", backgroundColor: c.teal, color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
            >
              Coba 30 Hari Gratis →
            </button>
            <button
              id="hero-cta-secondary-v2"
              onClick={() => scrollTo("features-v2")}
              style={{ padding: "16px 40px", backgroundColor: "#fff", color: c.teal, border: `2px solid ${c.teal}`, borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
            >
              Lihat Fitur Lengkap
            </button>
          </div>

          {/* Social proof */}
          <p style={{ marginTop: "24px", fontSize: "13px", color: c.gray }}>
            ✅ Tidak perlu kartu kredit &nbsp;·&nbsp; ✅ Setup 5 menit &nbsp;·&nbsp; ✅ Batalkan kapan saja
          </p>
        </div>
      </section>

      {/* ─── STATS ──────────────────────────────────────────── */}
      <section id="stats-v2" style={{ padding: "60px 40px", backgroundColor: c.teal }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
          {stats.map((s) => (
            <div key={s.id} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>{s.icon}</div>
              <div style={{ fontSize: "32px", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>{s.value}</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────────────── */}
      <section id="features-v2" style={{ padding: "100px 40px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "12px", fontWeight: "700", color: c.teal, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>FITUR UNGGULAN</p>
          <h2 style={{ textAlign: "center", fontSize: "40px", fontWeight: "800", color: c.dark, marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Semua yang Dibutuhkan<br />Bisnis Katering Modern
          </h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: c.gray, marginBottom: "60px" }}>
            Dari manajemen pelanggan hingga laporan keuangan, semuanya ada di satu platform.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {features.map((f) => (
              <div
                key={f.id}
                id={f.id}
                style={{
                  padding: "32px 28px",
                  border: `1px solid ${c.border}`,
                  borderRadius: "16px",
                  transition: "all 0.25s ease",
                  cursor: "default",
                  backgroundColor: "#fff",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = f.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = c.border; }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "12px", backgroundColor: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "16px" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: c.dark, marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: c.gray, lineHeight: "1.6" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────── */}
      <section id="testimonials-v2" style={{ padding: "100px 40px", backgroundColor: c.bg }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "12px", fontWeight: "700", color: c.teal, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>TESTIMONI</p>
          <h2 style={{ textAlign: "center", fontSize: "40px", fontWeight: "800", color: c.dark, marginBottom: "60px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Dipercaya Ribuan Bisnis Katering
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                id={t.id}
                style={{ padding: "28px 24px", backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${c.border}` }}
              >
                <div style={{ display: "flex", marginBottom: "16px" }}>
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i} style={{ color: "#f59e0b", fontSize: "16px" }}>⭐</span>
                  ))}
                </div>
                <p style={{ fontSize: "15px", color: "#374151", lineHeight: "1.7", marginBottom: "20px", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: c.teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: "700" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: c.dark }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: c.gray }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────────────── */}
      <section id="pricing-v2" style={{ padding: "100px 40px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", color: c.teal, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>HARGA</p>
          <h2 style={{ fontSize: "40px", fontWeight: "800", color: c.dark, marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Harga Transparan, Tidak Ada Biaya Tersembunyi
          </h2>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0", backgroundColor: c.bg, borderRadius: "10px", padding: "4px", marginBottom: "48px", border: `1px solid ${c.border}` }}>
            {["monthly", "yearly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 20px", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer",
                  backgroundColor: activeTab === tab ? "#fff" : "transparent",
                  color: activeTab === tab ? c.dark : c.gray,
                  boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {tab === "monthly" ? "Bulanan" : "Tahunan"} {tab === "yearly" && <span style={{ color: c.orange, marginLeft: "4px" }}>-20%</span>}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", maxWidth: "720px", margin: "0 auto" }}>
            {pricing.map((p) => (
              <div
                key={p.id}
                id={p.id}
                style={{
                  padding: "36px 28px",
                  borderRadius: "16px",
                  border: p.highlight ? `2px solid ${c.orange}` : `1px solid ${c.border}`,
                  position: "relative",
                  backgroundColor: p.highlight ? "#fff8f0" : "#fff",
                }}
              >
                {p.badge && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", backgroundColor: c.orange, color: "#fff", padding: "4px 16px", borderRadius: "99px", fontSize: "12px", fontWeight: "700" }}>
                    {p.badge}
                  </div>
                )}
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: p.color, marginBottom: "8px" }}>{p.tier}</h3>
                <p style={{ fontSize: "13px", color: c.gray, marginBottom: "20px" }}>{p.desc}</p>
                <div style={{ marginBottom: "28px" }}>
                  <span style={{ fontSize: "36px", fontWeight: "800", color: c.dark }}>{p.price}</span>
                  <span style={{ fontSize: "14px", color: c.gray }}>{p.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", textAlign: "left" }}>
                  {p.features.map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", marginBottom: "10px" }}>
                      <span style={{ color: "#10b981", fontWeight: "700" }}>✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  id={`${p.id}-cta`}
                  onClick={() => navigate("/register")}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer", border: "none",
                    backgroundColor: p.highlight ? c.orange : c.teal,
                    color: "#fff",
                  }}
                >
                  {p.highlight ? "Coba 30 Hari Gratis" : "Mulai Gratis"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA + FORM ─────────────────────────────────────── */}
      <section id="cta-v2" style={{ padding: "100px 40px", backgroundColor: c.teal, textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "40px", fontWeight: "800", color: "#fff", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Siap Mengembangkan Bisnis Katering Anda?
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", marginBottom: "40px", lineHeight: "1.7" }}>
            Bergabunglah dengan 1.200+ bisnis katering yang sudah memakai NusaCater CRM. Coba gratis 30 hari, tanpa kartu kredit.
          </p>

          {!submitted ? (
            <form id="cta-form-v2" onSubmit={handleSubmit} style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ flex: "1", minWidth: "200px", padding: "14px 20px", borderRadius: "10px", border: "none", fontSize: "15px", outline: "none" }}
              />
              <input
                type="email"
                placeholder="Email bisnis Anda"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ flex: "1", minWidth: "200px", padding: "14px 20px", borderRadius: "10px", border: "none", fontSize: "15px", outline: "none" }}
              />
              <button
                type="submit"
                id="cta-submit-v2"
                style={{ padding: "14px 32px", backgroundColor: c.orange, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}
              >
                Mulai Gratis →
              </button>
            </form>
          ) : (
            <div style={{ backgroundColor: "rgba(255,255,255,0.15)", padding: "24px 32px", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "600" }}>
              🎉 Terima kasih, {formData.name}! Tim kami akan menghubungi {formData.email} segera.
            </div>
          )}
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer id="footer-v2" style={{ backgroundColor: "#0f172a", padding: "60px 40px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            {/* Brand */}
            <div>
              <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", marginBottom: "16px" }}>🍽️ NusaCater CRM</div>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7", maxWidth: "280px" }}>
                Platform CRM terdepan untuk bisnis katering Indonesia. Kelola lebih cerdas, tumbuh lebih cepat.
              </p>
            </div>

            {/* Produk */}
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#94a3b8", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Produk</h4>
              {["Fitur", "Harga", "Demo", "Changelog"].map((l) => (
                <div key={l} style={{ marginBottom: "10px" }}>
                  <a href="#" style={{ fontSize: "14px", color: "#64748b", textDecoration: "none" }}>{l}</a>
                </div>
              ))}
            </div>

            {/* Perusahaan */}
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#94a3b8", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Perusahaan</h4>
              {["Tentang Kami", "Blog", "Karir", "Hubungi Kami"].map((l) => (
                <div key={l} style={{ marginBottom: "10px" }}>
                  <a href="#" style={{ fontSize: "14px", color: "#64748b", textDecoration: "none" }}>{l}</a>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "13px", color: "#64748b" }}>© 2026 NusaCater CRM. Hak cipta dilindungi undang-undang.</p>
            <p style={{ fontSize: "13px", color: "#64748b" }}>PRD v2 — Landing Page Intermediate</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
