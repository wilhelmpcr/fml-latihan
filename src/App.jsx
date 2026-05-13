import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

// ✅ React Lazy - semua halaman di-lazy load
const Dashboard   = React.lazy(() => import("./pages/Dashboard"));
const Orders      = React.lazy(() => import("./pages/Orders"));
const Customers   = React.lazy(() => import("./pages/Customers"));
const Products    = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const NotFound    = React.lazy(() => import("./pages/NotFound"));
const MainLayout  = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout  = React.lazy(() => import("./layouts/AuthLayout"));
const Login       = React.lazy(() => import("./pages/auth/Login"));
const Register    = React.lazy(() => import("./pages/auth/Register"));
const Forgot      = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  const errorImg = "/img/error.png";

  return (
    // ✅ Suspense membungkus semua Routes — fallback ditampilkan saat halaman belum siap
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ===== Main Layout (halaman utama dengan Sidebar + Header) ===== */}
        <Route element={<MainLayout />}>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/orders"    element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products"  element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Error Pages */}
          <Route path="/error-400" element={
            <NotFound code="400" message="Bad Request: Permintaan tidak valid." image={errorImg} />
          }/>
          <Route path="/error-401" element={
            <NotFound code="401" message="Unauthorized: Silakan login terlebih dahulu." image={errorImg} />
          }/>
          <Route path="/error-403" element={
            <NotFound code="403" message="Forbidden: Anda tidak memiliki izin akses." image={errorImg} />
          }/>
          <Route path="*" element={
            <NotFound code="404" message="Oops! Halaman yang Anda cari tidak ditemukan." image={errorImg} />
          }/>
        </Route>

        {/* ===== Auth Layout (Login / Register / Forgot) ===== */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;
