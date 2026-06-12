import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!dataForm.name || !dataForm.username || !dataForm.email || !dataForm.password) {
      setError("Semua field wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      // 1. Cek apakah email atau username sudah terdaftar
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("email, username")
        .or(`email.eq.${dataForm.email},username.eq.${dataForm.username}`)
        .maybeSingle();

      if (checkError) {
        throw new Error(checkError.message);
      }

      if (existingUser) {
        if (existingUser.email.toLowerCase() === dataForm.email.toLowerCase()) {
          setError("Email sudah terdaftar!");
        } else {
          setError("Username sudah terdaftar!");
        }
        setLoading(false);
        return;
      }

      // 2. Masukkan ke tabel users
      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            name: dataForm.name,
            username: dataForm.username.trim(),
            email: dataForm.email.trim().toLowerCase(),
            password: dataForm.password,
            role: "user",
            loyalty: "Bronze",
            orders: 0,
          },
        ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      setSuccess("Registrasi berhasil! Mengalihkan...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <p className="text-center text-[11px] text-gray-500 mb-8 leading-relaxed max-w-[280px] mx-auto">
        Silakan lengkapi formulir pendaftaran untuk membuat akun NusaCater baru Anda.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 mb-5 p-4 text-sm font-light text-red-400 rounded-xl flex items-center">
          <BsFillExclamationDiamondFill className="text-red-500 me-2 text-lg flex-shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 mb-5 p-4 text-sm font-light text-emerald-400 rounded-xl flex items-center">
          <ImSpinner2 className="me-2 animate-spin text-emerald-500" />
          {success}
        </div>
      )}

      {loading && !success && (
        <div className="bg-white/5 border border-white/10 mb-5 p-4 text-sm text-gray-300 rounded-xl flex items-center">
          <ImSpinner2 className="me-2 animate-spin text-[#FF5C00]" />
          Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nama Lengkap */}
        <div className="relative group">
          <label className="absolute left-4 -top-2.5 px-1 bg-dark-card text-[11px] font-semibold text-[#FF5C00] z-10">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            value={dataForm.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-5 py-4 bg-transparent border border-white/20 rounded-2xl text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
          />
        </div>

        {/* Input Username */}
        <div className="relative group">
          <label className="absolute left-4 -top-2.5 px-1 bg-dark-card text-[11px] font-semibold text-[#FF5C00] z-10">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="johndoe123"
            className="w-full px-5 py-4 bg-transparent border border-white/20 rounded-2xl text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
          />
        </div>

        {/* Input Email */}
        <div className="relative group">
          <label className="absolute left-4 -top-2.5 px-1 bg-dark-card text-[11px] font-semibold text-[#FF5C00] z-10">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            className="w-full px-5 py-4 bg-transparent border border-white/20 rounded-2xl text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
          />
        </div>

        {/* Input Password */}
        <div className="relative group">
          <label className="absolute left-4 -top-2.5 px-1 bg-dark-card text-[11px] font-semibold text-[#FF5C00] z-10">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-5 py-4 bg-transparent border border-white/20 rounded-2xl text-white placeholder-white/20 outline-none focus:border-[#FF5C00] transition-all"
          />
        </div>

        {/* Tombol Register Gradient */}
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-[#FF8C00] to-[#FF4500] hover:brightness-110 text-white font-bold py-4 px-4 rounded-2xl transition duration-300 shadow-[0_10px_20px_rgba(255,92,0,0.2)] active:scale-95 cursor-pointer"
        >
          Daftar Sekarang
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-gray-600">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-[#FF5C00] font-bold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}

