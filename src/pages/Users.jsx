import React, { useState, useEffect } from "react";
import PageHeader from "../components/PagesHeader";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import { supabase } from "../lib/supabaseClient";
import { ImSpinner2 } from "react-icons/im";
import { FaUserPlus, FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
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
  const [userToDelete, setUserToDelete] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      showToast(err.message || "Gagal mengambil data user", "danger");
    } finaly: {
      setLoading(false);
    }
  };

  // Wait, notice standard JS syntax for try-catch-finally block is finally: no, it's finally {}, not finaly: {} !
  // I will make sure we write "finally" correctly!
  const fetchUsersProper = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      showToast(err.message || "Gagal mengambil data user", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersProper();
  }, []);

  const handleOpenAdd = () => {
    setForm({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "user",
      phone: "",
      loyalty: "Bronze",
      orders: 0
    });
    setFormError("");
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setForm({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      password: user.password || "",
      role: user.role || "user",
      phone: user.phone || "",
      loyalty: user.loyalty || "Bronze",
      orders: user.orders || 0
    });
    setFormError("");
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "orders" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.username || !form.email || !form.password) {
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
            email: form.email.trim().toLowerCase(),
            username: form.username.trim()
          }
        ]);
        if (insertError) throw insertError;

        showToast("User berhasil ditambahkan!");
      } else {
        // Cek duplikasi email / username jika diubah
        if (
          form.email.trim().toLowerCase() !== selectedUser.email.toLowerCase() ||
          form.username.trim() !== selectedUser.username
        ) {
          const { data: duplicate, error: checkError } = await supabase
            .from("users")
            .select("id")
            .or(`email.eq.${form.email.trim()},username.eq.${form.username.trim()}`)
            .neq("id", selectedUser.id)
            .maybeSingle();

          if (checkError) throw checkError;
          if (duplicate) {
            throw new Error("Username atau Email sudah digunakan oleh user lain!");
          }
        }

        const { error: updateError } = await supabase
          .from("users")
          .update({
            name: form.name,
            username: form.username.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
            role: form.role,
            phone: form.phone,
            loyalty: form.loyalty,
            orders: form.orders
          })
          .eq("id", selectedUser.id);

        if (updateError) throw updateError;

        // Update localStorage jika admin mengupdate infonya sendiri
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (currentUser && currentUser.id === selectedUser.id) {
          localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, ...form }));
        }

        showToast("User berhasil diperbarui!");
      }

      setIsModalOpen(false);
      fetchUsersProper();
    } catch (err) {
      setFormError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      const { error } = await supabase.from("users").delete().eq("id", userToDelete.id);
      if (error) throw error;

      showToast("User berhasil dihapus!");
      setIsDeleteOpen(false);
      
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (currentUser && currentUser.id === userToDelete.id) {
        localStorage.removeItem("currentUser");
        window.location.reload();
      } else {
        fetchUsersProper();
      }
    } catch (err) {
      showToast(err.message || "Gagal menghapus user", "danger");
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(query)) ||
      (u.email && u.email.toLowerCase().includes(query)) ||
      (u.username && u.username.toLowerCase().includes(query));

    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div id="users-container" className="p-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="User Management" breadcrumb="Admin / Users" />

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={fetchUsersProper}
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
            Tambah User
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1A1A1A]/50 border border-white/5 p-4 rounded-2xl">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Cari user berdasarkan nama, email, atau username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1A1A1A] border border-white/5 p-3 pr-10 text-white w-full rounded-xl outline-none focus:border-oranye/50 transition-all text-xs placeholder-white/20"
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#1A1A1A] border border-white/5 p-2.5 rounded-xl text-xs text-white outline-none focus:border-oranye/50 transition cursor-pointer"
          >
            <option value="all">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1A1A1A] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                <th className="p-4 font-bold">Name & Username</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Contact (Phone)</th>
                <th className="p-4 font-bold">Loyalty & Orders</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <ImSpinner2 className="animate-spin text-[#FF5C00] text-3xl" />
                      <span className="text-xs text-gray-500">Memuat data user...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-xs text-gray-500">
                    Tidak ada user yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                  >
                    <td className="p-4 text-sm font-bold text-gray-200 first:rounded-l-2xl">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[11px] text-[#FF5C00] font-mono mt-0.5">@{u.username}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      {u.email}
                    </td>
                    <td className="p-4 text-sm text-gray-400 font-medium">
                      {u.phone || "-"}
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                            u.loyalty === "Gold"
                              ? "bg-amber-500/10 text-amber-500"
                              : u.loyalty === "Silver"
                              ? "bg-slate-400/10 text-slate-400"
                              : "bg-orange-500/10 text-orange-400"
                          }`}
                        >
                          {u.loyalty || "Bronze"}
                        </span>
                        <span className="text-[11px] text-gray-500">({u.orders || 0}x pesanan)</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide ${
                          u.role === "admin"
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        }`}
                      >
                        {u.role === "admin" ? "ADMIN" : "USER"}
                      </span>
                    </td>
                    <td className="p-4 text-sm last:rounded-r-2xl text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-2 bg-white/5 hover:bg-[#FF5C00]/10 hover:text-[#FF5C00] rounded-xl text-gray-400 transition cursor-pointer"
                          title="Edit User"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(u)}
                          className="p-2 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl text-gray-400 transition cursor-pointer"
                          title="Delete User"
                        >
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === "add" ? "Tambah User Baru" : "Edit User"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {formError && (
            <div className="bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-400 rounded-xl flex items-center">
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
                placeholder="Nama Lengkap"
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
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
          </div>

          {/* Role & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-sm text-white outline-none focus:border-[#FF5C00] transition-all cursor-pointer"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">No. Telepon (Opsional)</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="08123456789"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
              />
            </div>
          </div>

          {/* Loyalty & Orders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Loyalty</label>
              <select
                name="loyalty"
                value={form.loyalty}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-[#1F1F1F] border border-white/10 rounded-xl text-sm text-white outline-none focus:border-[#FF5C00] transition-all cursor-pointer"
              >
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Total Orders (Opsional)</label>
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

          <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF8C00] to-[#FF5C00] hover:brightness-110 text-white rounded-xl text-xs font-bold transition shadow-[0_10px_20px_rgba(255,92,0,0.15)] disabled:opacity-50 cursor-pointer"
            >
              {formLoading && <ImSpinner2 className="animate-spin text-white text-xs" />}
              {modalType === "add" ? "Tambah" : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Konfirmasi Hapus"
      >
        <div className="space-y-6 mt-2">
          <p className="text-sm text-gray-300 leading-relaxed">
            Apakah Anda yakin ingin menghapus user{" "}
            <span className="text-[#FF5C00] font-bold">
              {userToDelete?.name} (@{userToDelete?.username})
            </span>
            ? Tindakan ini permanen dan tidak dapat dibatalkan.
          </p>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition cursor-pointer"
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
