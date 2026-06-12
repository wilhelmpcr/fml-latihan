import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ username: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!dataForm.username || !dataForm.password) {
      setError("Username/email dan password wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      // Cari user berdasarkan username ATAU email, dan password yang cocok
      const { data: user, error: queryError } = await supabase
        .from("users")
        .select("*")
        .or(`email.eq.${dataForm.username},username.eq.${dataForm.username}`)
        .eq("password", dataForm.password)
        .maybeSingle();

      if (queryError) {
        throw new Error(queryError.message);
      }

      if (!user) {
        setError("Username/email atau password salah!");
        setLoading(false);
        return;
      }

      // Login sukses! Simpan ke localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat masuk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Teks Instruksi seperti di gambar */}
      <p className="text-center text-[11px] text-gray-500 mb-8 leading-relaxed max-w-[280px] mx-auto">
        Gunakan kredensial akun yang terdaftar untuk masuk.
        Hubungi administrator jika Anda mengalami kendala akses.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 mb-5 p-4 text-sm font-light text-red-400 rounded-xl flex items-center">
          <BsFillExclamationDiamondFill className="text-red-500 me-2 text-lg flex-shrink-0" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-white/5 border border-white/10 mb-5 p-4 text-sm text-gray-300 rounded-xl flex items-center">
          <ImSpinner2 className="me-2 animate-spin text-[#FF5C00]" />
          Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Username */}
        <div className="relative group">
          <label className="absolute left-4 -top-2.5 px-1 bg-dark-card text-[11px] font-semibold text-[#FF5C00] z-10">
            Username / Email
          </label>
          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="admin_resto"
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

        <p className="text-[10px] text-gray-600 text-center italic">
          Demo Admin: admin_resto / admin123
        </p>

        {/* Tombol Login Gradient */}
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-[#FF8C00] to-[#FF4500] hover:brightness-110 text-white font-bold py-4 px-4 rounded-2xl transition duration-300 shadow-[0_10px_20px_rgba(255,92,0,0.2)] active:scale-95 cursor-pointer"
        >
          Sign in
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-gray-600">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#FF5C00] font-bold hover:underline">
          Daftar
        </Link>
      </div>
    </div>
  );
}

