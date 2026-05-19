import React, { useState } from "react";
import PagesHeader from "../components/PagesHeader";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";

export default function Components() {
  // State for forms
  const [form, setForm] = useState({
    username: "",
    notes: "",
    role: "",
  });

  // State for Modal & Toast
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const triggerToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
  };

  const selectOptions = [
    { value: "admin", label: "Administrator" },
    { value: "chef", label: "Chef" },
    { value: "customer", label: "Pelanggan" },
  ];

  const tableHeaders = ["No", "Nama Paket", "Kategori", "Harga", "Aksi"];
  const tableData = [
    { id: 1, name: "Nasi Box A", category: "Nasi Box", price: "Rp 35.000" },
    { id: 2, name: "Prasmanan Spesial", category: "Buffet", price: "Rp 120.000" },
    { id: 3, name: "Tumpeng Hias", category: "Tumpeng", price: "Rp 850.000" },
  ];

  return (
    <Container className="space-y-12">
      <PagesHeader title="UI Components Playground" />

      {/* 1. Basic Components */}
      <Card className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">
          1. Basic Components
        </h2>
        
        {/* Buttons Showcase */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button type="primary">Primary Button</Button>
            <Button type="secondary">Secondary Button</Button>
            <Button type="success">Success</Button>
            <Button type="warning">Warning</Button>
            <Button type="danger">Danger</Button>
            <Button type="primary" loading={true}>Loading</Button>
          </div>
        </div>

        {/* Badges Showcase */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge type="primary">Primary</Badge>
            <Badge type="secondary">Secondary</Badge>
            <Badge type="success">Active</Badge>
            <Badge type="warning">Pending</Badge>
            <Badge type="danger">Cancelled</Badge>
          </div>
        </div>

        {/* Avatars Showcase */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Avatars</h3>
          <div className="flex items-center gap-4">
            <Avatar name="Wilhelm S. Tamba" size="sm" />
            <Avatar name="Emily Johnson" size="md" />
            <Avatar src="https://dummyjson.com/icon/emilys/128" name="Emily" size="lg" />
          </div>
        </div>
      </Card>

      {/* 2. Layout Components */}
      <Card className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">
          2. Layout Components
        </h2>
        <p className="text-xs text-gray-400">
          Halaman ini dibungkus menggunakan komponen <code>&lt;Container&gt;</code>. Di bawah ini adalah visualisasi komponen <code>&lt;Footer&gt;</code>:
        </p>
        <Footer className="mt-4" />
      </Card>

      {/* 3. Data Display Components */}
      <Card className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">
          3. Data Display Components
        </h2>

        {/* Product Cards Grid */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Product Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductCard
              image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              title="Healthy Salmon Salad"
              category="Diet Menu"
              price="Rp 65.000"
              description="Fresh salmon served with organic green salad, cherry tomatoes, and honey mustard dressing."
              onActionClick={() => triggerToast("Membuka detail Salmon Salad", "info")}
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
              title="Pizza Meat Lovers"
              category="Western"
              price="Rp 95.000"
              description="Thick crust pizza topped with premium beef cuts, mozzarella cheese, and signature tomato sauce."
              onActionClick={() => triggerToast("Membuka detail Pizza", "info")}
            />
          </div>
        </div>

        {/* Tables */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Data Tables</h3>
          <Table headers={tableHeaders}>
            {tableData.map((item, idx) => (
              <tr key={item.id} className="bg-white/[0.02] hover:bg-white/[0.05] transition-all rounded-2xl">
                <td className="p-4 text-sm font-bold text-[#FF5C00] first:rounded-l-2xl">{idx + 1}</td>
                <td className="p-4 text-sm font-bold text-white">{item.name}</td>
                <td className="p-4 text-sm text-gray-400">{item.category}</td>
                <td className="p-4 text-sm font-semibold text-white">{item.price}</td>
                <td className="p-4 text-sm last:rounded-r-2xl">
                  <Button type="secondary" className="!py-1.5 !px-3 text-xs" onClick={() => triggerToast(`Aksi untuk ${item.name}`, "success")}>
                    Pilih
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>

      {/* 4. Form Components */}
      <Card className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">
          4. Form Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="Username"
            name="username"
            placeholder="Ketik username Anda..."
            value={form.username}
            onChange={handleInputChange}
          />
          <SelectField
            label="Pilih Jabatan"
            name="role"
            options={selectOptions}
            value={form.role}
            onChange={handleInputChange}
          />
          <TextArea
            label="Catatan Tambahan"
            name="notes"
            placeholder="Tulis catatan..."
            value={form.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-xs font-mono text-gray-400">
          State dataForm: {JSON.stringify(form)}
        </div>
      </Card>

      {/* 5. Feedback Components */}
      <Card className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">
          5. Feedback Components
        </h2>

        {/* Alerts */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Alerts</h3>
          <Alert type="success">Pendaftaran berhasil! Akun Anda telah disimpan di database lokal.</Alert>
          <Alert type="info">Akun demo default adalah <strong>emilys</strong> dengan kata sandi <strong>emilyspass</strong>.</Alert>
          <Alert type="warning">Pastikan data yang Anda masukkan sudah benar sebelum melakukan konfirmasi pembayaran.</Alert>
          <Alert type="danger">Kredensial yang Anda masukkan salah. Silakan coba kembali.</Alert>
        </div>

        {/* Modal & Toast Actions */}
        <div className="pt-4 flex gap-4">
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Buka Modal Dialog
          </Button>
          <Button type="secondary" onClick={() => triggerToast("Ini adalah pesan toast sukses!", "success")}>
            Tampilkan Toast Sukses
          </Button>
          <Button type="danger" onClick={() => triggerToast("Gagal memproses data!", "danger")}>
            Tampilkan Toast Error
          </Button>
        </div>
      </Card>

      {/* 6. Section Components */}
      <Card className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">
          6. Section Components
        </h2>
        <HeroSection onCtaClick={() => triggerToast("CTA Hero diklik!", "info")} />
        <FeatureSection />
      </Card>

      {/* Modal Demo */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Komponen Modal">
        <p className="mb-4">
          Ini adalah implementasi komponen dialog modal yang responsif. Tombol di bawah ini akan menutup modal dan menampilkan sebuah notifikasi toast baru.
        </p>
        <div className="flex justify-end gap-3">
          <Button type="secondary" onClick={() => setIsModalOpen(false)}>
            Tutup
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
              triggerToast("Aksi dari modal berhasil dijalankan!", "success");
            }}
          >
            Konfirmasi
          </Button>
        </div>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </Container>
  );
}
