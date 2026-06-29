// ============================================================
// PRD v1 — Landing Page Dasar (Minimum Viable)
// Versi    : 1.0.0
// Tanggal  : 2026-06-29
// Deskripsi: Landing page CRM minimum yang fungsional:
//            - Navbar sederhana (logo + CTA)
//            - Hero section (judul + deskripsi + 1 CTA)
//            - Features section (3 fitur dalam card)
//            - Footer sederhana (copyright)
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPageV1() {
  const navigate = useNavigate();

  // ─── Data Fitur (3 Fitur Dasar) ──────────────────────────
  const features = [
    {
      id: "f1",
      icon: "👥",
      title: "Kelola Pelanggan",
      desc: "Simpan data pelanggan, riwayat pesanan, dan preferensi menu dalam satu tempat yang mudah diakses.",
    },
    {
      id: "f2",
      icon: "📦",
      title: "Manajemen Pesanan",
      desc: "Catat dan pantau setiap pesanan dari input hingga pengiriman dengan sistem yang terstruktur.",
    },
    {
      id: "f3",
      icon: "📊",
      title: "Laporan Bisnis",
      desc: "Lihat ringkasan penjualan, pelanggan aktif, dan performa bisnis dalam dashboard sederhana.",
    },
  ];

  // ─── Styles Inline (PRD v1 tidak pakai Tailwind kompleks) ─
  const styles = {
    // Navbar
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 40px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    logo: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#0A3D40",
      letterSpacing: "-0.5px",
    },
    navCta: {
      padding: "10px 24px",
      backgroundColor: "#0A3D40",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
    },

    // Hero
    hero: {
      textAlign: "center",
      padding: "80px 40px",
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid #e5e7eb",
    },
    heroBadge: {
      display: "inline-block",
      padding: "6px 16px",
      backgroundColor: "#e6f0f0",
      color: "#0A3D40",
      borderRadius: "99px",
      fontSize: "13px",
      fontWeight: "600",
      marginBottom: "24px",
    },
    heroTitle: {
      fontSize: "48px",
      fontWeight: "800",
      color: "#0f172a",
      lineHeight: "1.2",
      marginBottom: "20px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    heroHighlight: {
      color: "#0A3D40",
    },
    heroDesc: {
      fontSize: "18px",
      color: "#64748b",
      maxWidth: "600px",
      margin: "0 auto 36px",
      lineHeight: "1.7",
    },
    heroCta: {
      padding: "16px 40px",
      backgroundColor: "#0A3D40",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
    },

    // Features
    featuresSection: {
      padding: "80px 40px",
      backgroundColor: "#ffffff",
    },
    sectionLabel: {
      textAlign: "center",
      fontSize: "13px",
      fontWeight: "700",
      color: "#0A3D40",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "12px",
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "36px",
      fontWeight: "800",
      color: "#0f172a",
      marginBottom: "48px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "24px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    featureCard: {
      padding: "32px 24px",
      backgroundColor: "#f8fafc",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      textAlign: "center",
    },
    featureIcon: {
      fontSize: "40px",
      marginBottom: "16px",
    },
    featureTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "10px",
    },
    featureDesc: {
      fontSize: "14px",
      color: "#64748b",
      lineHeight: "1.6",
    },

    // Footer
    footer: {
      textAlign: "center",
      padding: "32px 40px",
      backgroundColor: "#0f172a",
      color: "#94a3b8",
      fontSize: "14px",
    },
    footerLogo: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "8px",
    },
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* ─── NAVBAR ──────────────────────────────────────────── */}
      <nav id="navbar-v1" style={styles.navbar}>
        <div style={styles.logo}>🍽️ NusaCater CRM</div>
        <button
          id="nav-cta-v1"
          style={styles.navCta}
          onClick={() => navigate("/login")}
        >
          Masuk Sekarang
        </button>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section id="hero-v1" style={styles.hero}>
        <div style={styles.heroBadge}>✨ Software CRM Katering #1 Indonesia</div>
        <h1 style={styles.heroTitle}>
          Kelola Bisnis Katering<br />
          <span style={styles.heroHighlight}>Lebih Mudah & Profesional</span>
        </h1>
        <p style={styles.heroDesc}>
          NusaCater CRM membantu Anda mengelola pelanggan, pesanan, dan laporan
          bisnis katering dalam satu platform yang sederhana dan powerful.
        </p>
        <button
          id="hero-cta-v1"
          style={styles.heroCta}
          onClick={() => navigate("/register")}
        >
          Coba Gratis Sekarang →
        </button>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────── */}
      <section id="features-v1" style={styles.featuresSection}>
        <p style={styles.sectionLabel}>Fitur Utama</p>
        <h2 style={styles.sectionTitle}>Semua yang Anda Butuhkan</h2>
        <div style={styles.featuresGrid}>
          {features.map((f) => (
            <div id={f.id} key={f.id} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer id="footer-v1" style={styles.footer}>
        <div style={styles.footerLogo}>🍽️ NusaCater CRM</div>
        <p>© 2026 NusaCater CRM. Hak cipta dilindungi undang-undang.</p>
      </footer>

    </div>
  );
}
