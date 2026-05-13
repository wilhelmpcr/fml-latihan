import { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
        Lupa Password? 🔑
      </h2>
      <p className="text-center text-sm text-gray-400 mb-6">
        Masukkan email Anda untuk reset password
      </p>

      {sent ? (
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center text-sm text-green-700">
          ✅ Link reset password telah dikirim ke <b>{email}</b>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-300 transition placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-xl transition duration-300 shadow"
          >
            Kirim Link Reset
          </button>
        </form>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        <Link to="/login" className="text-hijau font-semibold hover:underline">
          ← Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
