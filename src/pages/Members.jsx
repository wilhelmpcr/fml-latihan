import React, { useState, useEffect } from "react";
import PageHeader from "../components/PagesHeader";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import { supabase } from "../lib/supabaseClient";
import { ImSpinner2 } from "react-icons/im";
import { 
  FaUserPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaSearch, 
  FaCrown, 
  FaGem, 
  FaAward, 
  FaPlus, 
  FaPhoneAlt, 
  FaEnvelope,
  FaArrowUp
} from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [selectedMember, setSelectedMember] = useState(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    loyalty: "Bronze",
    orders: 0
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Delete Confirm State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "user") // Halaman Member hanya menampilkan user dengan role 'user'
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      showToast(err.message || "Gagal mengambil data member", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenAdd = () => {
    setForm({
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      loyalty: "Bronze",
      orders: 0
    });
    setFormError("");
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setSelectedMember(member);
    setForm({
      name: member.name || "",
      username: member.username || "",
      email: member.email || "",
      password: "", // Kosongkan password saat edit, opsional diubah
      phone: member.phone || "",
      loyalty: member.loyalty || "Bronze",
      orders: member.orders || 0
    });
    setFormError("");
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleOpenDelete = (member) => {
    setMemberToDelete(member);
    setIsDeleteOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: name === "orders" ? parseInt(value) || 0 : value
      };
      
      // Auto-calculate loyalty berdasarkan jumlah orders
      if (name === "orders") {
        const orderCount = parseInt(value) || 0;
        if (orderCount >= 16) {
          updated.loyalty = "Gold";
        } else if (orderCount >= 6) {
          updated.loyalty = "Silver";
        } else {
          updated.loyalty = "Bronze";
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.username || !form.email || (modalType === "add" && !form.password)) {
      setFormError("Nama, Username, Email, dan Password wajib diisi!");
      return;
    }

    setFormLoading(true);
    try {
      if (modalType === "add") {
        // Cek duplikasi email / username
        const { data: duplicate, error: checkError } = await supabase
          .from("users")
          .select("id")
          .or(`email.eq.${form.email.trim()},username.eq.${form.username.trim()}`)
          .maybeSingle();

        if (checkError) throw checkError;
        if (duplicate) {
          throw new Error("Username atau Email sudah digunakan!");
        }

        const { error: insertError } = await supabase.from("users").insert([
          {
            ...form,
            role: "user", // Memastikan role selalu 'user' untuk halaman member
            email: form.email.trim().toLowerCase(),
            username: form.username.trim()
          }
        ]);
        if (insertError) throw insertError;

        showToast("Member baru berhasil ditambahkan!");
      } else {
        // Cek duplikasi email / username jika diubah
        if (
          form.email.trim().toLowerCase() !== selectedMember.email.toLowerCase() ||
          form.username.trim() !== selectedMember.username
        ) {
          const { data: duplicate, error: checkError } = await supabase
            .from("users")
            .select("id")
            .or(`email.eq.${form.email.trim()},username.eq.${form.username.trim()}`)
            .neq("id", selectedMember.id)
            .maybeSingle();

          if (checkError) throw checkError;
          if (duplicate) {
            throw new Error("Username atau Email sudah digunakan oleh user lain!");
          }
        }

        const updateData = {
          name: form.name,
          username: form.username.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone,
          loyalty: form.loyalty,
          orders: form.orders
        };

        // Update password hanya jika diisi
        if (form.password) {
          updateData.password = form.password;
        }

        const { error: updateError } = await supabase
          .from("users")
          .update(updateData)
          .eq("id", selectedMember.id);

        if (updateError) throw updateError;

        showToast("Data member berhasil diperbarui!");
      }

      setIsModalOpen(false);
      fetchMembers();
    } catch (err) {
      setFormError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!memberToDelete) return;
    try {
      const { error } = await supabase.from("users").delete().eq("id", memberToDelete.id);
      if (error) throw error;

      showToast("Member berhasil dihapus!");
      setIsDeleteOpen(false);
      fetchMembers();
    } catch (err) {
      showToast(err.message || "Gagal menghapus member", "danger");
    }
  };

  // Fitur Aksi Cepat: Simulasi Menambahkan +1 Order
  const handleIncrementOrder = async (member) => {
    const newOrders = (member.orders || 0) + 1;
    let newLoyalty = member.loyalty || "Bronze";

    // Hitung level loyalitas baru
    if (newOrders >= 16) {
      newLoyalty = "Gold";
    } else if (newOrders >= 6) {
      newLoyalty = "Silver";
    } else {
      newLoyalty = "Bronze";
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({
          orders: newOrders,
          loyalty: newLoyalty
        })
        .eq("id", member.id);

      if (error) throw error;

      // Update local state secara instan agar mulus
      setMembers((prev) =>
        prev.map((m) =>
          m.id === member.id ? { ...m, orders: newOrders, loyalty: newLoyalty } : m
        )
      );

      // Berikan Toast pemberitahuan yang atraktif
      if (newLoyalty !== member.loyalty) {
        showToast(
          `🎉 Selamat! ${member.name} naik tingkat ke level ${newLoyalty.toUpperCase()}!`,
          "info"
        );
      } else {
        showToast(`Pesanan berhasil ditambahkan untuk ${member.name} (+1 Order).`);
      }
    } catch (err) {
      showToast("Gagal memperbarui pesanan member", "danger");
    }
  };

  // Menghitung statistik member secara dinamis
  const stats = {
    total: members.length,
    gold: members.filter((m) => m.loyalty === "Gold").length,
    silver: members.filter((m) => m.loyalty === "Silver").length,
    bronze: members.filter((m) => m.loyalty === "Bronze" || !m.loyalty).length,
  };

  // Filter & Search & Sort
  const filteredAndSortedMembers = members
    .filter((m) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        (m.name && m.name.toLowerCase().includes(query)) ||
        (m.email && m.email.toLowerCase().includes(query)) ||
        (m.phone && m.phone.toLowerCase().includes(query)) ||
        (m.username && m.username.toLowerCase().includes(query));

      const matchesTier =
        tierFilter === "all" ||
        (tierFilter === "Bronze" && (!m.loyalty || m.loyalty === "Bronze")) ||
        m.loyalty === tierFilter;

      return matchesSearch && matchesTier;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
      if (sortBy === "most-orders") {
        return (b.orders || 0) - (a.orders || 0);
      }
      if (sortBy === "alphabetical") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return 0;
    });

  return (
    <div id="members-container" className="p-1 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Members & Loyalty" breadcrumb="Management / Members" />

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={fetchMembers}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/5 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:border-white/10 transition disabled:opacity-50 cursor-pointer"
          >
            <MdRefresh className={`text-lg ${loading ? "animate-spin text-[#FF5C00]" : ""}`} />
            Refresh
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-[#FF8C00] to-[#FF5C00] hover:brightness-110 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition duration-300 shadow-[0_10px_20px_rgba(255,92,0,0.15)] active:scale-95 cursor-pointer"
          >
            <FaUserPlus className="text-sm" />
            Tambah Member
          </button>
        </div>
      </div>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Member */}
        <div className="bg-[#1A1A1A]/50 border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
          <div className="absolute right-4 top-4 bg-orange-500/10 p-3 rounded-2xl text-[#FF5C00] text-lg">
            <FaUserPlus />
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Total Member</p>
          <p className="text-3xl font-bold text-white mt-2 group-hover:scale-105 transition-transform origin-left">{stats.total}</p>
        </div>

        {/* Gold Tier */}
        <div className="bg-[#1A1A1A]/50 border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
          <div className="absolute right-4 top-4 bg-amber-500/10 p-3 rounded-2xl text-amber-500 text-lg">
            <FaCrown />
          </div>
          <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Gold Tier</p>
          <p className="text-3xl font-bold text-white mt-2 group-hover:scale-105 transition-transform origin-left">{stats.gold}</p>
        </div>

        {/* Silver Tier */}
        <div className="bg-[#1A1A1A]/50 border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
          <div className="absolute right-4 top-4 bg-slate-400/10 p-3 rounded-2xl text-slate-400 text-lg">
            <FaGem />
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Silver Tier</p>
          <p className="text-3xl font-bold text-white mt-2 group-hover:scale-105 transition-transform origin-left">{stats.silver}</p>
        </div>

        {/* Bronze Tier */}
        <div className="bg-[#1A1A1A]/50 border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
          <div className="absolute right-4 top-4 bg-orange-500/10 p-3 rounded-2xl text-orange-400 text-lg">
            <FaAward />
          </div>
          <p className="text-[10px] text-orange-400 uppercase tracking-widest font-bold">Bronze Tier</p>
          <p className="text-3xl font-bold text-white mt-2 group-hover:scale-105 transition-transform origin-left">{stats.bronze}</p>
        </div>
      </div>

      {/* Pencarian & Filter */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-[#1A1A1A]/50 border border-white/5 p-4 rounded-2xl">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Cari member berdasarkan nama, email, username, telepon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1A1A1A] border border-white/5 p-3 pr-10 text-white w-full rounded-xl outline-none focus:border-[#FF5C00]/50 transition-all text-xs placeholder-white/20"
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
        </div>

        {/* Filter Tier & Sort */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">Tier:</span>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-[#1A1A1A] border border-white/5 p-2.5 rounded-xl text-xs text-white outline-none focus:border-[#FF5C00]/50 transition cursor-pointer"
            >
              <option value="all">Semua Tier</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">Urutan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1A1A1A] border border-white/5 p-2.5 rounded-xl text-xs text-white outline-none focus:border-[#FF5C00]/50 transition cursor-pointer"
            >
              <option value="latest">Terbaru Gabung</option>
              <option value="most-orders">Pesanan Terbanyak</option>
              <option value="alphabetical">Nama (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Kartu Member */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <ImSpinner2 className="animate-spin text-[#FF5C00] text-4xl" />
          <span className="text-sm text-gray-500 font-medium">Memuat data kartu member...</span>
        </div>
      ) : filteredAndSortedMembers.length === 0 ? (
        <div className="bg-[#1A1A1A]/30 border border-white/5 rounded-[32px] py-16 text-center text-xs text-gray-500 font-medium">
          Tidak ada data member yang sesuai filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedMembers.map((m) => {
            const loyalty = m.loyalty || "Bronze";
            const orders = m.orders || 0;

            // Konfigurasi visual berdasarkan tier loyalitas
            let cardGradient = "from-[#805A36] via-[#A67C52] to-[#CBA37B] border-[#A67C52]/20"; // Bronze
            let tierIcon = <FaAward className="text-orange-300" />;
            let badgeStyle = "bg-orange-500/20 text-orange-400 border-orange-500/30";
            let progressText = "";
            let progressPercent = 0;

            if (loyalty === "Gold") {
              cardGradient = "from-[#b8860b] via-[#DAA520] to-[#ffd700] border-[#ffd700]/30 shadow-[0_15px_30px_rgba(218,165,32,0.15)]";
              tierIcon = <FaCrown className="text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] animate-pulse" />;
              badgeStyle = "bg-yellow-500/25 text-yellow-300 border-yellow-500/40";
              progressText = "Gold Level (Max Tier) 👑";
              progressPercent = 100;
            } else if (loyalty === "Silver") {
              cardGradient = "from-[#636e72] via-[#b2bec3] to-[#dfe6e9] border-white/10 shadow-[0_15px_30px_rgba(178,190,195,0.1)]";
              tierIcon = <FaGem className="text-sky-200" />;
              badgeStyle = "bg-slate-400/20 text-slate-300 border-slate-400/30";
              progressText = `${16 - orders} orders lagi menuju Gold`;
              progressPercent = ((orders - 6) / 10) * 100; // Rentang Silver adalah 6 ke 15 (10 langkah)
              if (progressPercent < 0) progressPercent = 0;
              if (progressPercent > 100) progressPercent = 100;
            } else {
              // Bronze
              progressText = `${6 - orders} orders lagi menuju Silver`;
              progressPercent = (orders / 6) * 100; // Rentang Bronze adalah 0 ke 5 (6 langkah)
              if (progressPercent > 100) progressPercent = 100;
            }

            return (
              <div 
                key={m.id}
                className="bg-[#1A1A1A] border border-white/5 rounded-[32px] p-6 shadow-2xl flex flex-col justify-between hover:border-white/10 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Kartu Fisik Virtual (Glassmorphic) */}
                <div className={`relative h-44 rounded-2xl bg-gradient-to-br ${cardGradient} p-5 overflow-hidden flex flex-col justify-between border shadow-inner`}>
                  {/* Efek Kaca / Shine */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
                  <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                  
                  {/* Chip & Logo */}
                  <div className="relative z-10 flex justify-between items-start">
                    {/* Chip Keanggotaan */}
                    <div className="w-9 h-7 bg-gradient-to-br from-amber-400 to-amber-200 rounded-md border border-amber-600/30 relative overflow-hidden flex items-center justify-center shadow-inner">
                      <div className="grid grid-cols-3 gap-0.5 w-full h-full p-1 opacity-70">
                        <div className="border border-amber-800/20 rounded-[1px]"></div>
                        <div className="border border-amber-800/20 rounded-[1px]"></div>
                        <div className="border border-amber-800/20 rounded-[1px]"></div>
                        <div className="border border-amber-800/20 rounded-[1px]"></div>
                        <div className="border border-amber-800/20 rounded-[1px]"></div>
                        <div className="border border-amber-800/20 rounded-[1px]"></div>
                      </div>
                    </div>

                    {/* Logo & Icon Tier */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] tracking-[0.2em] font-black opacity-80 text-white font-mono">NUSACATER</span>
                      <div className="text-lg">{tierIcon}</div>
                    </div>
                  </div>

                  {/* Informasi Tengah: Code & Nama */}
                  <div className="relative z-10 mt-3">
                    <p className="text-[10px] text-white/60 tracking-widest font-mono">MEMBER NUMBER</p>
                    <p className="text-sm font-bold text-white font-mono tracking-wider mt-0.5">
                      NC-MEM-{m.username ? m.username.toUpperCase() : m.id.substring(0, 5).toUpperCase()}
                    </p>
                  </div>

                  {/* Informasi Bawah: Pemilik & Level */}
                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <p className="text-[9px] text-white/60 uppercase tracking-wider">Card Holder</p>
                      <p className="text-xs font-bold text-white tracking-wide truncate max-w-[150px]">{m.name}</p>
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black border uppercase tracking-wider ${badgeStyle}`}>
                        {loyalty} TIER
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Info Pesanan */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-400 font-medium">Transaksi: <strong className="text-gray-200 font-bold">{orders}x</strong> pesanan</span>
                    <span className="text-[10px] text-[#FF5C00] font-bold tracking-tight bg-[#FF5C00]/5 px-2 py-0.5 rounded-lg border border-[#FF5C00]/10">{progressText}</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                        loyalty === "Gold" 
                          ? "from-yellow-500 to-amber-500" 
                          : loyalty === "Silver" 
                          ? "from-slate-400 to-sky-300" 
                          : "from-orange-500 to-[#FF5C00]"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Kontak Detail */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[10px] text-gray-500" />
                    <span className="truncate">{m.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-[10px] text-gray-500" />
                    <span>{m.phone || "-"}</span>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2.5">
                  {/* Tambah Order Cepat */}
                  <button
                    onClick={() => handleIncrementOrder(m)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#FF5C00]/10 hover:bg-[#FF5C00]/20 text-[#FF5C00] text-[11px] font-bold py-2 px-3 rounded-xl transition cursor-pointer active:scale-95 border border-[#FF5C00]/10"
                    title="Tambah 1 Order Baru"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>Order</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(m)}
                      className="p-2 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl text-gray-400 transition cursor-pointer active:scale-95"
                      title="Edit Member"
                    >
                      <FaEdit className="text-xs" />
                    </button>
                    <button
                      onClick={() => handleOpenDelete(m)}
                      className="p-2 bg-white/5 hover:bg-red-500/15 hover:text-red-500 rounded-xl text-gray-400 transition cursor-pointer active:scale-95"
                      title="Hapus Member"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === "add" ? "Registrasi Member Baru" : "Edit Profil Member"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {formError && (
            <div className="bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-400 rounded-xl">
              {formError}
            </div>
          )}

          {/* Name & Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Masukkan Nama Lengkap"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                placeholder="username"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="email@domain.com"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">
                Password {modalType === "edit" && <span className="text-[10px] text-gray-500">(Opsional)</span>}
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                placeholder={modalType === "edit" ? "Biarkan kosong jika tidak diubah" : "••••••••"}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
          </div>

          {/* Phone & Orders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">No. Telepon (Opsional)</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Total Orders (Menghitung Otomatis Tier)</label>
              <input
                type="number"
                name="orders"
                value={form.orders}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
          </div>

          {/* Loyalty Tier (Disabled/Info Only karena di-handle secara otomatis) */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold">Loyalty Tier (Dihitung Otomatis)</label>
            <div className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-gray-300 font-bold flex items-center justify-between">
              <span>Tier Level: <strong className="text-[#FF5C00]">{form.loyalty.toUpperCase()}</strong></span>
              <span className="text-[10px] text-gray-500 font-medium">
                (Bronze: 0-5, Silver: 6-15, Gold: 16+)
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer active:scale-95"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF8C00] to-[#FF5C00] hover:brightness-110 text-white rounded-xl text-xs font-bold transition shadow-[0_10px_20px_rgba(255,92,0,0.15)] disabled:opacity-50 cursor-pointer active:scale-95"
            >
              {formLoading && <ImSpinner2 className="animate-spin text-white text-xs" />}
              {modalType === "add" ? "Daftarkan" : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Hapus Keanggotaan Member"
      >
        <div className="space-y-6 mt-2">
          <p className="text-sm text-gray-300 leading-relaxed">
            Apakah Anda yakin ingin menghapus member{" "}
            <span className="text-[#FF5C00] font-bold">
              {memberToDelete?.name} (NC-MEM-{memberToDelete?.username ? memberToDelete.username.toUpperCase() : ""})
            </span>
            ? Tindakan ini bersifat permanen, kartu member akan dinonaktifkan dan seluruh riwayat pesanan serta poin loyalitas akan dihapus.
          </p>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer active:scale-95"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition cursor-pointer active:scale-95"
            >
              Hapus Permanen
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Notifications */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
