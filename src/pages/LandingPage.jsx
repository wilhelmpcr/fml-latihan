// ============================================================
// PRD v3 — Landing Page CRM (Full / Complete)
// Versi    : 3.0.0
// Tanggal  : 2026-06-27
// Deskripsi: Landing page CRM premium & komplit dengan:
//            - Hero animasi gradient + typing effect
//            - Feature showcase dengan animasi
//            - Testimonial dengan carousel smooth
//            - Pricing tiers 3 pilihan
//            - FAQ accordion interaktif
//            - CTA form demo/request
//            - Footer lengkap 4 kolom + sosial media
//            - Dark/Light mode toggle
//            - Scroll reveal animations
//            - Mobile-first responsive
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Helper: useInView hook ───────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── FadeIn Component ─────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(30px)", down: "translateY(-30px)", left: "translateX(-30px)", right: "translateX(30px)" };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : transforms[direction],
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: "", email: "", business: "" });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typing animation
  const phrases = ["Lebih Cerdas", "Lebih Efisien", "Lebih Menguntungkan", "Lebih Profesional"];
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    const currentPhrase = phrases[phraseIndex];

    const type = () => {
      if (!isDeleting) {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, 1500);
          return;
        }
      } else {
        setTypedText(currentPhrase.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          return;
        }
      }
      setTimeout(type, isDeleting ? 60 : 90);
    };

    const timer = setTimeout(type, 300);
    return () => clearTimeout(timer);
  }, [phraseIndex]);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  // ─── Data ─────────────────────────────────────────────
  const stats = [
    { id: "stat-customers", value: "1.200+", label: "Bisnis Katering", icon: "🏪" },
    { id: "stat-orders", value: "35.000+", label: "Pesanan Dikelola", icon: "📦" },
    { id: "stat-satisfaction", value: "98.5%", label: "Kepuasan Pengguna", icon: "⭐" },
    { id: "stat-cities", value: "150+", label: "Kota di Indonesia", icon: "🗺️" },
  ];

  const features = [
    { id: "f1", icon: "👥", title: "CRM Pelanggan 360°", desc: "Profil pelanggan lengkap, riwayat interaksi, preferensi menu, dan skor loyalitas otomatis.", color: "#0A3D40", bg: "#E6F0F0", tag: "Core" },
    { id: "f2", icon: "📦", title: "Order Management", desc: "Kelola pesanan dari input hingga pengiriman. Notifikasi otomatis ke tim dapur dan pelanggan.", color: "#FF8C00", bg: "#FFF3E0", tag: "Core" },
    { id: "f3", icon: "📊", title: "Analytics Dashboard", desc: "Insight real-time: revenue, top menu, pelanggan baru, dan forecast bisnis berbasis AI.", color: "#7C3AED", bg: "#EDE9FE", tag: "Analytics" },
    { id: "f4", icon: "🔔", title: "Notifikasi Cerdas", desc: "WhatsApp & Email otomatis untuk konfirmasi, reminder, dan follow-up pasca-pesanan.", color: "#059669", bg: "#D1FAE5", tag: "Automation" },
    { id: "f5", icon: "📅", title: "Jadwal Produksi", desc: "Kalender interaktif untuk jadwal masak, pengiriman, dan kapasitas tim harian.", color: "#DC2626", bg: "#FEE2E2", tag: "Planning" },
    { id: "f6", icon: "💳", title: "Manajemen Invoice", desc: "Buat dan kirim invoice profesional, lacak pembayaran, dan reminder otomatis jatuh tempo.", color: "#0891B2", bg: "#E0F2FE", tag: "Finance" },
    { id: "f7", icon: "🔒", title: "Keamanan Enterprise", desc: "Enkripsi AES-256, backup harian, 2FA, dan audit log lengkap untuk ketenangan pikiran.", color: "#1D4ED8", bg: "#DBEAFE", tag: "Security" },
    { id: "f8", icon: "🔗", title: "Integrasi Fleksibel", desc: "Terhubung dengan GoFood, GrabFood, Tokopedia, dan 30+ platform marketplace populer.", color: "#B45309", bg: "#FEF3C7", tag: "Integration" },
    { id: "f9", icon: "📱", title: "Mobile App", desc: "Akses dari mana saja dengan aplikasi iOS & Android yang lengkap dan offline-ready.", color: "#6D28D9", bg: "#EDE9FE", tag: "Mobile" },
  ];

  const testimonials = [
    { id: "t1", name: "Ibu Sari Dewi", role: "Owner Sari Catering, Bandung", avatar: "SD", text: "NusaCater CRM benar-benar mengubah cara kami mengelola pesanan. Revenue naik 40% hanya dalam 3 bulan pertama!", revenue: "+40% Revenue" },
    { id: "t2", name: "Pak Budi Santoso", role: "Manager Nusantara Catering, Jakarta", avatar: "BS", text: "Fitur analitiknya luar biasa. Kami bisa melihat pelanggan mana yang paling loyal dan memberikan penawaran khusus.", revenue: "-60% Waktu Admin" },
    { id: "t3", name: "Mbak Rina Wulandari", role: "Founder Dapur Rina, Surabaya", avatar: "RW", text: "Notifikasi WhatsApp otomatisnya membuat pelanggan kami merasa sangat diperhatikan. Rating kepuasan naik drastis!", revenue: "+85% Kepuasan" },
    { id: "t4", name: "Chef Ahmad Fauzi", role: "Head Chef Masak Enak Catering, Yogyakarta", avatar: "AF", text: "Jadwal produksi yang terintegrasi dengan sistem pesanan membuat tim dapur kami jauh lebih terorganisir.", revenue: "0 Pesanan Terlewat" },
  ];

  const pricingPlans = [
    {
      id: "plan-starter",
      tier: "Starter",
      price: "Gratis",
      period: "",
      tagline: "Sempurna untuk memulai",
      color: "#64748b",
      highlight: false,
      features: [
        "✓ Hingga 50 pelanggan",
        "✓ Hingga 100 pesanan/bulan",
        "✓ Dashboard dasar",
        "✓ Laporan sederhana",
        "✓ Email support",
        "✗ Notifikasi WhatsApp",
        "✗ Analytics lanjutan",
      ],
      cta: "Mulai Gratis",
    },
    {
      id: "plan-professional",
      tier: "Professional",
      price: "Rp 149.000",
      period: "/ bulan",
      tagline: "Untuk bisnis yang berkembang",
      color: "#FF8C00",
      highlight: true,
      badge: "🔥 Terpopuler",
      savings: "Hemat Rp 300.000/tahun",
      features: [
        "✓ Pelanggan tak terbatas",
        "✓ Pesanan tak terbatas",
        "✓ Notifikasi WhatsApp & Email",
        "✓ Analytics & laporan lengkap",
        "✓ Jadwal produksi",
        "✓ Manajemen invoice",
        "✓ Priority support 24/7",
      ],
      cta: "Coba 30 Hari Gratis",
    },
    {
      id: "plan-enterprise",
      tier: "Enterprise",
      price: "Rp 349.000",
      period: "/ bulan",
      tagline: "Untuk skala bisnis besar",
      color: "#0A3D40",
      highlight: false,
      features: [
        "✓ Semua fitur Professional",
        "✓ Multi-cabang & multi-tim",
        "✓ API integrasi custom",
        "✓ Dedicated account manager",
        "✓ Training onboarding tim",
        "✓ SLA 99.9% uptime",
        "✓ Data export lengkap",
      ],
      cta: "Hubungi Sales",
    },
  ];

  const faqs = [
    { id: "faq-1", q: "Apakah ada biaya setup atau kontrak jangka panjang?", a: "Tidak sama sekali! Anda bisa mulai gratis tanpa kartu kredit. Untuk paket berbayar, kami menggunakan sistem berlangganan bulanan tanpa kontrak minimal — bisa dibatalkan kapan saja." },
    { id: "faq-2", q: "Bagaimana cara migrasi data dari sistem lama?", a: "Tim onboarding kami siap membantu proses migrasi data dari spreadsheet, sistem lama, atau platform lain. Migrasi biasanya selesai dalam 1-2 hari kerja tanpa downtime." },
    { id: "faq-3", q: "Apakah bisa digunakan untuk bisnis katering dengan beberapa cabang?", a: "Tentu! Paket Enterprise mendukung manajemen multi-cabang dengan dashboard terpusat, laporan per-cabang, dan role management untuk setiap tim." },
    { id: "faq-4", q: "Apakah data saya aman di NusaCater CRM?", a: "Keamanan data adalah prioritas kami. Kami menggunakan enkripsi AES-256, backup otomatis setiap hari, infrastruktur cloud berstandar ISO 27001, dan 2FA wajib untuk akun admin." },
    { id: "faq-5", q: "Apakah ada aplikasi mobile untuk tim lapangan?", a: "Ya! Aplikasi mobile iOS dan Android tersedia untuk semua paket. Tim lapangan bisa update status pesanan, lihat jadwal, dan komunikasi real-time langsung dari smartphone." },
  ];

  // ─── Theme Colors ──────────────────────────────────────
  const theme = {
    bg: darkMode ? "#0f172a" : "#f8fafc",
    card: darkMode ? "#1e293b" : "#ffffff",
    cardBorder: darkMode ? "#334155" : "#e2e8f0",
    text: darkMode ? "#f1f5f9" : "#0f172a",
    textSecondary: darkMode ? "#94a3b8" : "#64748b",
    navBg: darkMode ? "rgba(15,23,42,0.97)" : "rgba(255,255,255,0.97)",
  };

  // ─── Scroll helper ────────────────────────────────────
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // ─── Demo Form Submit ──────────────────────────────────
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (demoForm.name && demoForm.email) {
      setDemoSubmitted(true);
    }
  };

  return (
    <div
      id="landing-v3"
      style={{
        minHeight: "100vh",
        fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
        backgroundColor: theme.bg,
        color: theme.text,
        overflowX: "hidden",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >

      {/* ===== NAVBAR ===== */}
      <nav
        id="navbar-v3"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: theme.navBg,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${theme.cardBorder}`,
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.1)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <div
          id="logo"
          onClick={() => navigate("/landing")}
          style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}
        >
          <div
            style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: "linear-gradient(135deg, #0A3D40 0%, #1a6b6e 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: "900", fontSize: "18px",
              boxShadow: "0 4px 12px rgba(10,61,64,0.3)",
            }}
          >N</div>
          <div>
            <div style={{ fontWeight: "900", fontSize: "1.1rem", color: darkMode ? "#fff" : "#0A3D40", lineHeight: 1 }}>
              NusaCater<span style={{ color: "#FF8C00" }}>CRM</span>
            </div>
            <div style={{ fontSize: "0.62rem", color: "#FF8C00", fontWeight: "600", letterSpacing: "0.06em" }}>
              PLATFORM CRM KATERING
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[{ label: "Fitur", id: "section-features" }, { label: "Harga", id: "section-pricing" }, { label: "Testimoni", id: "section-testimonials" }, { label: "FAQ", id: "section-faq" }].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none", border: "none",
                color: theme.textSecondary, fontWeight: "600", fontSize: "0.88rem",
                cursor: "pointer", transition: "color 0.2s", padding: "0.25rem 0",
              }}
              onMouseOver={(e) => e.target.style.color = "#FF8C00"}
              onMouseOut={(e) => e.target.style.color = theme.textSecondary}
            >
              {item.label}
            </button>
          ))}

          {/* Dark mode toggle */}
          <button
            id="btn-dark-mode"
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: darkMode ? "#334155" : "#f1f5f9",
              border: "none", borderRadius: "999px",
              padding: "0.4rem 0.8rem",
              cursor: "pointer", fontSize: "1rem",
              transition: "all 0.2s",
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            id="btn-login-v3"
            onClick={() => navigate("/login")}
            style={{
              background: "transparent",
              border: `1.5px solid ${darkMode ? "#475569" : "#0A3D40"}`,
              color: darkMode ? "#94a3b8" : "#0A3D40",
              padding: "0.45rem 1.25rem", borderRadius: "8px",
              fontWeight: "600", fontSize: "0.85rem", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.target.style.background = "#0A3D40"; e.target.style.color = "#fff"; e.target.style.borderColor = "#0A3D40"; }}
            onMouseOut={(e) => { e.target.style.background = "transparent"; e.target.style.color = darkMode ? "#94a3b8" : "#0A3D40"; e.target.style.borderColor = darkMode ? "#475569" : "#0A3D40"; }}
          >
            Masuk
          </button>

          <button
            id="btn-cta-nav"
            onClick={() => navigate("/register")}
            style={{
              background: "linear-gradient(135deg, #FF8C00, #e07b00)",
              border: "none", color: "#fff",
              padding: "0.5rem 1.4rem", borderRadius: "8px",
              fontWeight: "700", fontSize: "0.85rem", cursor: "pointer",
              boxShadow: "0 2px 10px rgba(255,140,0,0.35)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(255,140,0,0.45)"; }}
            onMouseOut={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 2px 10px rgba(255,140,0,0.35)"; }}
          >
            Coba Gratis →
          </button>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section
        id="section-hero"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          padding: "5rem 3rem",
          position: "relative",
          overflow: "hidden",
          background: darkMode
            ? "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
            : "linear-gradient(160deg, #f0faf9 0%, #fff7ed 40%, #f0f9ff 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", background: darkMode ? "rgba(255,140,0,0.05)" : "rgba(255,140,0,0.08)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "350px", height: "350px", borderRadius: "50%", background: darkMode ? "rgba(10,61,64,0.15)" : "rgba(10,61,64,0.06)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          {/* Left: Text */}
          <div>
            <FadeIn>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: darkMode ? "rgba(255,140,0,0.15)" : "#FFF3E0",
                  color: "#FF8C00", fontSize: "0.75rem", fontWeight: "700",
                  padding: "0.35rem 1rem", borderRadius: "999px",
                  letterSpacing: "0.08em", marginBottom: "1.5rem",
                  border: darkMode ? "1px solid rgba(255,140,0,0.3)" : "1px solid #FFD591",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF8C00", animation: "pulse 2s infinite" }} />
                Platform CRM #1 untuk Katering Indonesia
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                style={{
                  fontSize: "3.5rem", fontWeight: "900", lineHeight: "1.1",
                  color: darkMode ? "#f1f5f9" : "#0A3D40", marginBottom: "0.5rem",
                }}
              >
                Kelola Bisnis Katering
              </h1>
              <div style={{ height: "4.5rem", overflow: "hidden", marginBottom: "1.5rem" }}>
                <h1
                  style={{
                    fontSize: "3.5rem", fontWeight: "900", lineHeight: "1.2",
                    background: "linear-gradient(135deg, #FF8C00, #FFB347)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    minHeight: "4rem",
                  }}
                >
                  {typedText}<span style={{ animation: "blink 1s infinite", color: "#FF8C00", WebkitTextFillColor: "#FF8C00" }}>|</span>
                </h1>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                style={{
                  fontSize: "1.1rem", color: theme.textSecondary,
                  lineHeight: "1.75", marginBottom: "2.5rem", maxWidth: "480px",
                }}
              >
                Dari manajemen 360° pelanggan, pesanan real-time, hingga analitik bisnis berbasis AI — semuanya dalam satu platform yang dirancang khusus untuk bisnis katering Indonesia.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                <button
                  id="btn-hero-register"
                  onClick={() => navigate("/register")}
                  style={{
                    background: "linear-gradient(135deg, #FF8C00, #e07b00)",
                    color: "#fff", border: "none",
                    padding: "1rem 2.5rem", borderRadius: "12px",
                    fontWeight: "800", fontSize: "1rem", cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(255,140,0,0.4)",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 15px 35px rgba(255,140,0,0.5)"; }}
                  onMouseOut={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 25px rgba(255,140,0,0.4)"; }}
                >
                  🚀 Mulai Gratis 30 Hari
                </button>
                <button
                  id="btn-hero-demo"
                  onClick={() => scrollTo("section-demo")}
                  style={{
                    background: darkMode ? "#1e293b" : "#fff",
                    color: darkMode ? "#f1f5f9" : "#0A3D40",
                    border: `2px solid ${darkMode ? "#334155" : "#0A3D40"}`,
                    padding: "1rem 2.5rem", borderRadius: "12px",
                    fontWeight: "700", fontSize: "1rem", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = "#0A3D40"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0A3D40"; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = darkMode ? "#1e293b" : "#fff"; e.currentTarget.style.color = darkMode ? "#f1f5f9" : "#0A3D40"; e.currentTarget.style.borderColor = darkMode ? "#334155" : "#0A3D40"; }}
                >
                  Minta Demo Gratis
                </button>
              </div>
              <p style={{ color: theme.textSecondary, fontSize: "0.8rem" }}>
                ✓ Gratis 30 hari &nbsp;·&nbsp; ✓ Tanpa kartu kredit &nbsp;·&nbsp; ✓ Setup 5 menit &nbsp;·&nbsp; ✓ Cancel kapan saja
              </p>
            </FadeIn>
          </div>

          {/* Right: Dashboard Preview Card */}
          <FadeIn delay={0.2} direction="left">
            <div
              style={{
                background: darkMode ? "#1e293b" : "#fff",
                borderRadius: "20px",
                padding: "1.5rem",
                boxShadow: darkMode ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.12)",
                border: `1px solid ${theme.cardBorder}`,
              }}
            >
              {/* Mini dashboard mockup */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${theme.cardBorder}` }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
                <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: theme.textSecondary, fontWeight: "600" }}>Dashboard NusaCater CRM</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                {[
                  { label: "Total Pesanan", value: "1,284", trend: "+12%", color: "#0A3D40" },
                  { label: "Revenue Bulan Ini", value: "Rp 48,5Jt", trend: "+18%", color: "#059669" },
                  { label: "Pelanggan Baru", value: "127", trend: "+8%", color: "#FF8C00" },
                  { label: "Rating Kepuasan", value: "4.9/5", trend: "+0.2", color: "#7C3AED" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: darkMode ? "#0f172a" : "#f8fafc",
                      borderRadius: "12px",
                      padding: "0.9rem",
                      border: `1px solid ${theme.cardBorder}`,
                    }}
                  >
                    <div style={{ fontSize: "0.7rem", color: theme.textSecondary, marginBottom: "0.4rem" }}>{item.label}</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "800", color: darkMode ? "#f1f5f9" : "#0A3D40" }}>{item.value}</div>
                    <div style={{ fontSize: "0.7rem", fontWeight: "700", color: item.color }}>▲ {item.trend}</div>
                  </div>
                ))}
              </div>

              {/* Mini chart bars */}
              <div style={{ background: darkMode ? "#0f172a" : "#f8fafc", borderRadius: "12px", padding: "0.9rem", border: `1px solid ${theme.cardBorder}` }}>
                <div style={{ fontSize: "0.7rem", color: theme.textSecondary, marginBottom: "0.75rem", fontWeight: "600" }}>📊 Pesanan Minggu Ini</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
                  {[35, 55, 40, 70, 65, 80, 45].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: i === 5 ? "#FF8C00" : (darkMode ? "#334155" : "#e2e8f0"), transition: "all 0.3s" }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                    <span key={d} style={{ fontSize: "0.6rem", color: theme.textSecondary }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section
        id="section-stats"
        style={{
          background: "linear-gradient(135deg, #0A3D40 0%, #0d5255 100%)",
          padding: "3.5rem 3rem",
        }}
      >
        <FadeIn>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
            {stats.map((s) => (
              <div key={s.id} id={s.id}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#FF8C00", marginBottom: "0.3rem" }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", fontWeight: "500" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section
        id="section-features"
        style={{
          padding: "6rem 3rem",
          background: darkMode ? "#0f172a" : "#fff",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ color: "#FF8C00", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                ✦ Fitur Lengkap
              </span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: darkMode ? "#f1f5f9" : "#0A3D40", margin: "0.75rem 0 1rem" }}>
                Semua yang Dibutuhkan Bisnis Katering
              </h2>
              <p style={{ color: theme.textSecondary, maxWidth: "520px", margin: "0 auto", lineHeight: "1.7" }}>
                Dirancang khusus untuk industri katering Indonesia dengan pemahaman mendalam tentang kebutuhan operasional harian Anda
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {features.map((f, i) => (
              <FadeIn key={f.id} delay={i * 0.05}>
                <div
                  id={f.id}
                  style={{
                    background: theme.card,
                    border: `1px solid ${theme.cardBorder}`,
                    borderRadius: "20px",
                    padding: "1.75rem",
                    transition: "all 0.3s ease",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = darkMode ? "0 20px 40px rgba(0,0,0,0.3)" : "0 20px 40px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = f.color + "50";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = theme.cardBorder;
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                      {f.icon}
                    </div>
                    <span style={{ background: f.bg, color: f.color, fontSize: "0.65rem", fontWeight: "700", padding: "0.2rem 0.6rem", borderRadius: "999px", letterSpacing: "0.05em" }}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: darkMode ? "#f1f5f9" : "#0A3D40", marginBottom: "0.6rem" }}>
                    {f.title}
                  </h3>
                  <p style={{ color: theme.textSecondary, lineHeight: "1.6", fontSize: "0.88rem" }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section
        id="section-testimonials"
        style={{
          padding: "6rem 3rem",
          background: darkMode ? "#1e293b" : "linear-gradient(160deg, #f0faf9, #fff7ed)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ color: "#FF8C00", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                ✦ Testimoni
              </span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: darkMode ? "#f1f5f9" : "#0A3D40", margin: "0.75rem 0 1rem" }}>
                Cerita Sukses Pengguna Kami
              </h2>
            </div>
          </FadeIn>

          <div style={{ position: "relative" }}>
            <div
              style={{
                background: theme.card,
                borderRadius: "24px",
                padding: "3rem",
                boxShadow: darkMode ? "0 20px 60px rgba(0,0,0,0.3)" : "0 20px 60px rgba(0,0,0,0.08)",
                border: `1px solid ${theme.cardBorder}`,
                marginBottom: "1.5rem",
                minHeight: "260px",
                transition: "all 0.4s ease",
              }}
            >
              {/* Result badge */}
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  background: "#FFF3E0", color: "#FF8C00",
                  fontSize: "0.75rem", fontWeight: "800",
                  padding: "0.35rem 0.9rem", borderRadius: "999px",
                  marginBottom: "1.5rem", border: "1px solid #FFD591",
                }}
              >
                📈 {testimonials[activeTestimonial].revenue}
              </div>

              <p style={{ color: darkMode ? "#cbd5e1" : "#374151", fontSize: "1.1rem", lineHeight: "1.8", fontStyle: "italic", marginBottom: "2rem" }}>
                "{testimonials[activeTestimonial].text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #0A3D40, #1a6b6e)",
                    color: "#fff", display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: "800", fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <div style={{ fontWeight: "800", color: darkMode ? "#f1f5f9" : "#0A3D40", fontSize: "1rem" }}>
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div style={{ color: theme.textSecondary, fontSize: "0.85rem" }}>
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
                <div style={{ marginLeft: "auto", color: "#FF8C00", fontSize: "1.1rem" }}>⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <button
                id="btn-prev-testi"
                onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
                style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: theme.text }}
              >
                ←
              </button>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    id={`dot-testi-${i}`}
                    onClick={() => setActiveTestimonial(i)}
                    style={{
                      width: i === activeTestimonial ? "28px" : "8px",
                      height: "8px", borderRadius: "999px",
                      background: i === activeTestimonial ? "#FF8C00" : theme.cardBorder,
                      border: "none", cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
              <button
                id="btn-next-testi"
                onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)}
                style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: theme.text }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section
        id="section-pricing"
        style={{
          padding: "6rem 3rem",
          background: darkMode ? "#0f172a" : "#f8fafc",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ color: "#FF8C00", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                ✦ Harga Transparan
              </span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: darkMode ? "#f1f5f9" : "#0A3D40", margin: "0.75rem 0 1rem" }}>
                Investasi yang Sepadan
              </h2>
              <p style={{ color: theme.textSecondary }}>
                Mulai gratis, upgrade sesuai pertumbuhan bisnis. Tanpa biaya tersembunyi.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", alignItems: "center" }}>
            {pricingPlans.map((plan, i) => (
              <FadeIn key={plan.id} delay={i * 0.1}>
                <div
                  id={plan.id}
                  style={{
                    background: plan.highlight ? "#0A3D40" : theme.card,
                    border: plan.highlight ? "2px solid #FF8C00" : `1px solid ${theme.cardBorder}`,
                    borderRadius: "24px",
                    padding: plan.highlight ? "2.5rem" : "2rem",
                    position: "relative",
                    transform: plan.highlight ? "scale(1.04)" : "scale(1)",
                    boxShadow: plan.highlight ? "0 20px 60px rgba(10,61,64,0.3)" : "none",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => { if (!plan.highlight) { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)"; } }}
                  onMouseOut={(e) => { if (!plan.highlight) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; } }}
                >
                  {plan.badge && (
                    <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "#FF8C00", color: "#fff", fontSize: "0.72rem", fontWeight: "800", padding: "0.3rem 1.1rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                      {plan.badge}
                    </div>
                  )}

                  <div style={{ marginBottom: "0.5rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: "700", color: plan.highlight ? "#FF8C00" : theme.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                      {plan.tier}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: plan.highlight ? "rgba(255,255,255,0.6)" : theme.textSecondary, marginBottom: "1.25rem" }}>
                      {plan.tagline}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "2.5rem", fontWeight: "900", color: plan.highlight ? "#fff" : (darkMode ? "#f1f5f9" : "#0A3D40") }}>
                        {plan.price}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: plan.highlight ? "rgba(255,255,255,0.5)" : theme.textSecondary }}>
                        {plan.period}
                      </span>
                    </div>
                    {plan.savings && (
                      <div style={{ fontSize: "0.75rem", color: "#059669", fontWeight: "700", background: "#D1FAE5", padding: "0.2rem 0.6rem", borderRadius: "999px", display: "inline-block", marginBottom: "1.5rem" }}>
                        💰 {plan.savings}
                      </div>
                    )}
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {plan.features.map((feat, j) => (
                      <li key={j} style={{ fontSize: "0.88rem", color: feat.startsWith("✗") ? (plan.highlight ? "rgba(255,255,255,0.3)" : theme.textSecondary) : (plan.highlight ? "rgba(255,255,255,0.9)" : (darkMode ? "#cbd5e1" : "#374151")), opacity: feat.startsWith("✗") ? 0.6 : 1 }}>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    id={`btn-${plan.id}`}
                    onClick={() => navigate("/register")}
                    style={{
                      width: "100%",
                      background: plan.highlight ? "#FF8C00" : (darkMode ? "#334155" : "#0A3D40"),
                      color: "#fff", border: "none",
                      padding: "0.9rem", borderRadius: "12px",
                      fontWeight: "800", fontSize: "0.9rem", cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: plan.highlight ? "0 4px 15px rgba(255,140,0,0.4)" : "none",
                    }}
                    onMouseOver={(e) => { e.target.style.opacity = "0.9"; e.target.style.transform = "translateY(-1px)"; }}
                    onMouseOut={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section
        id="section-faq"
        style={{
          padding: "6rem 3rem",
          background: darkMode ? "#1e293b" : "#fff",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ color: "#FF8C00", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                ✦ FAQ
              </span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: darkMode ? "#f1f5f9" : "#0A3D40", margin: "0.75rem 0 1rem" }}>
                Pertanyaan yang Sering Ditanya
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => (
              <FadeIn key={faq.id} delay={i * 0.05}>
                <div
                  id={faq.id}
                  style={{
                    background: theme.card,
                    border: `1px solid ${openFaq === i ? "#FF8C00" : theme.cardBorder}`,
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    boxShadow: openFaq === i ? "0 4px 20px rgba(255,140,0,0.1)" : "none",
                  }}
                >
                  <button
                    id={`faq-btn-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      padding: "1.25rem 1.5rem",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <span style={{ fontWeight: "700", fontSize: "0.95rem", color: darkMode ? "#f1f5f9" : "#0A3D40", paddingRight: "1rem" }}>
                      {faq.q}
                    </span>
                    <span
                      style={{
                        fontSize: "1.25rem", color: "#FF8C00", flexShrink: 0,
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 1.5rem 1.25rem", borderTop: `1px solid ${theme.cardBorder}` }}>
                      <p style={{ color: theme.textSecondary, lineHeight: "1.7", fontSize: "0.9rem", margin: "1rem 0 0" }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEMO FORM SECTION ===== */}
      <section
        id="section-demo"
        style={{
          padding: "6rem 3rem",
          background: "linear-gradient(135deg, #0A3D40 0%, #0d5255 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(255,140,0,0.06)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span style={{ color: "#FF8C00", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              ✦ Minta Demo
            </span>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "900", color: "#fff", margin: "0.75rem 0 1rem" }}>
              Lihat NusaCater CRM Beraksi
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2.5rem", lineHeight: "1.7" }}>
              Tim kami akan menghubungi Anda dalam 24 jam untuk sesi demo personal gratis selama 30 menit.
            </p>
          </FadeIn>

          {demoSubmitted ? (
            <FadeIn>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  padding: "3rem",
                  border: "1px solid rgba(255,255,255,0.15)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{ color: "#FF8C00", fontWeight: "800", fontSize: "1.3rem", marginBottom: "0.75rem" }}>
                  Terima kasih, {demoForm.name}!
                </h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                  Tim kami akan menghubungi Anda di <strong style={{ color: "#FF8C00" }}>{demoForm.email}</strong> dalam waktu 24 jam.
                </p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.1}>
              <form
                id="form-demo"
                onSubmit={handleDemoSubmit}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  padding: "2.5rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  { id: "input-name", placeholder: "Nama lengkap Anda *", key: "name", type: "text" },
                  { id: "input-email", placeholder: "Email bisnis Anda *", key: "email", type: "email" },
                  { id: "input-business", placeholder: "Nama bisnis katering", key: "business", type: "text" },
                ].map((field) => (
                  <input
                    key={field.id}
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.placeholder.includes("*")}
                    value={demoForm[field.key]}
                    onChange={(e) => setDemoForm({ ...demoForm, [field.key]: e.target.value })}
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "10px",
                      padding: "0.9rem 1.25rem",
                      color: "#fff",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#FF8C00"; e.target.style.background = "rgba(255,255,255,0.18)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "rgba(255,255,255,0.12)"; }}
                  />
                ))}

                <button
                  id="btn-submit-demo"
                  type="submit"
                  style={{
                    background: "#FF8C00",
                    color: "#fff", border: "none",
                    padding: "1rem", borderRadius: "12px",
                    fontWeight: "800", fontSize: "1rem",
                    cursor: "pointer", marginTop: "0.5rem",
                    boxShadow: "0 4px 15px rgba(255,140,0,0.4)",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 25px rgba(255,140,0,0.5)"; }}
                  onMouseOut={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(255,140,0,0.4)"; }}
                >
                  🚀 Minta Demo Sekarang — Gratis!
                </button>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textAlign: "center" }}>
                  Kami tidak akan pernah membagikan data Anda kepada pihak ketiga.
                </p>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        id="footer-v3"
        style={{
          background: darkMode ? "#020617" : "#0A3D40",
          padding: "4rem 3rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#FF8C00", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "900", fontSize: "16px" }}>N</div>
                <span style={{ color: "#fff", fontWeight: "800", fontSize: "1.1rem" }}>
                  NusaCater<span style={{ color: "#FF8C00" }}>CRM</span>
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.87rem", lineHeight: "1.75", maxWidth: "280px", marginBottom: "1.5rem" }}>
                Platform CRM terdepan untuk bisnis katering Indonesia. Kelola lebih cerdas, tumbuh lebih cepat bersama ribuan bisnis yang sudah bergabung.
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {["📘", "🐦", "📸", "💼"].map((icon, i) => (
                  <div
                    key={i}
                    style={{
                      width: "36px", height: "36px", borderRadius: "8px",
                      background: "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", fontSize: "1rem",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "#FF8C00"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Produk", links: ["Fitur CRM", "Harga & Paket", "Integrasi API", "Mobile App", "Update & Changelog"] },
              { title: "Perusahaan", links: ["Tentang Kami", "Blog & Tips", "Karir", "Press Kit", "Kontak Sales"] },
              { title: "Dukungan", links: ["Dokumentasi", "Tutorial Video", "FAQ", "Status Server", "Kebijakan Privasi"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "1.25rem", fontSize: "0.9rem" }}>{col.title}</h4>
                {col.links.map((link) => (
                  <div key={link} style={{ marginBottom: "0.65rem" }}>
                    <a
                      href="#"
                      style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseOver={(e) => e.target.style.color = "#FF8C00"}
                      onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.55)"}
                    >
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
              © 2026 NusaCater CRM. All rights reserved. Dibuat dengan ❤️ untuk bisnis katering Indonesia.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Syarat & Ketentuan", "Kebijakan Privasi", "Cookie Policy"].map((link) => (
                <a key={link} href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", textDecoration: "none" }}
                  onMouseOver={(e) => e.target.style.color = "#FF8C00"}
                  onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        input::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>
    </div>
  );
}
