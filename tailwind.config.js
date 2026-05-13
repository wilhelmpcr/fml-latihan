/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oranye: "#FF5C00", 
        "dark-main": "#0F0F0F", // Ganti nama agar lebih spesifik
        "dark-card": "#1A1A1A",
        "teks-samping": "#9CA3AF",
        garis: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
