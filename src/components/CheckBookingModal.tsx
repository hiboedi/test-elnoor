"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, CreditCard, CheckCircle2, Clock, AlertCircle, X } from "lucide-react";

interface CheckBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Fungsi helper untuk memformat string input menjadi format ribuan (misal: 40000 -> 40.000)
function formatInputRupiah(value: string) {
  const numberString = value.replace(/[^,\d]/g, "").toString();
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  return split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
}

export default function CheckBookingModal({ isOpen, onClose }: CheckBookingModalProps) {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  // State untuk form upload cicilan lanjutan
  const [showInstallmentForm, setShowInstallmentForm] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(""); // Nilai berformat titik (untuk tampilan input)
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setData(null);
    setShowInstallmentForm(false);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_DATA || "http://localhost:3000/api";
      const res = await fetch(`${apiBaseUrl}/bookings/track?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phone)}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message || "Data tidak ditemukan. Periksa kembali kode & nomor HP.");
      } else {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error tracking booking:", err);
      setError("Gagal terhubung ke server. Pastikan koneksi internet stabil.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageCompression = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, "") + ".jpg",
                { type: "image/jpeg", lastModified: Date.now() }
              );
              setPaymentProof(compressedFile);
              setPreviewUrl(URL.createObjectURL(compressedFile));
            }
          },
          "image/jpeg",
          0.7
        );
      };
    };
  };

  // Handler saat nominal diketik di input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputRupiah(e.target.value);
    setDisplayAmount(formatted);
  };

  const handleSubmitInstallment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.bookingId) return;

    // Bersihkan titik ribuan sebelum dikirim ke backend (misal: "40.000" jadi "40000")
    const rawAmount = displayAmount.replace(/\./g, "");

    setIsSubmitting(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_DATA || "http://localhost:3000/api";
      const formData = new FormData();
      formData.append("bookingId", data.bookingId);
      formData.append("amount", rawAmount);
      formData.append("paymentType", "CICILAN");
      if (paymentProof) {
        formData.append("paymentProof", paymentProof);
      }

      const res = await fetch(`${apiBaseUrl}/bookings/track`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message || "Gagal mengirim bukti pembayaran.");
      } else {
        setSuccessMessage(json.message);
        setShowInstallmentForm(false);
        setDisplayAmount("");
        setPaymentProof(null);
        setPreviewUrl(null);
        handleSearch(new Event("submit") as any);
      }
    } catch (err) {
      console.error("Error submitting installment:", err);
      setError("Gagal terhubung ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setCode("");
    setPhone("");
    setData(null);
    setError(null);
    setShowInstallmentForm(false);
    setDisplayAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-auto flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="bg-[#1BC033] px-6 py-4 flex items-center justify-between text-white flex-shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold !text-white" style={{ color: "#ffffff" }}>
              Portal Cek Status &amp; Pelunasan Jamaah
            </h3>
            <p className="text-xs text-white/90">
              Lacak riwayat pembayaran dan lunasi tagihan umrah Anda dengan mudah
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetModal}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer !text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Form Pencarian */}
          <form onSubmit={handleSearch} className="bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-slate-200 dark:border-gray-700 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  Kode Pembayaran / Kode Booking *
                </label>
                <input
                  type="text"
                  required
                  placeholder="PAY-"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white uppercase focus:outline-none focus:border-[#1BC033]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  4 Digit Terakhir No. HP / WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  placeholder=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#1BC033", color: "#ffffff" }}
              className="w-full py-2.5 rounded-xl bg-[#1BC033] hover:bg-[#16a32b] !text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Mencari Data...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Lacak Status Pendaftaran
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* HASIL PENCARIAN DATA JAMAAH */}
          {data && (
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-gray-800">
              
              {/* Status Banner */}
              <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                    Nama Jamaah: {data.jamaahName}
                  </span>
                  <h4 className="text-sm font-bold">{data.packageTitle}</h4>
                </div>
                <div className="text-right">
                  {data.isApproved ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi (ACC)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5" /> Menunggu ACC DP
                    </span>
                  )}
                </div>
              </div>

              {/* Ringkasan Keuangan */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-2xl border border-slate-200 dark:border-gray-700">
                  <div className="text-[10px] text-gray-400 font-semibold uppercase">Total Tagihan</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white mt-0.5">
                    {formatRupiah(data.totalAmount)}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-2xl border border-slate-200 dark:border-gray-700">
                  <div className="text-[10px] text-gray-400 font-semibold uppercase">Sudah Dibayar</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">
                    {formatRupiah(data.paidAmount)}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-2xl border border-slate-200 dark:border-gray-700">
                  <div className="text-[10px] text-gray-400 font-semibold uppercase">Sisa Tagihan</div>
                  <div className="text-xs sm:text-sm font-bold text-rose-600 mt-0.5">
                    {formatRupiah(data.remainingAmount)}
                  </div>
                </div>
              </div>

              {/* Tombol Bayar Cicilan */}
              {data.isApproved && data.remainingAmount > 0 && !data.hasPendingPayment && (
                <div>
                  {!showInstallmentForm ? (
                    <button
                      type="button"
                      onClick={() => setShowInstallmentForm(true)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" /> Bayar Cicilan / Pelunasan Lanjutan
                    </button>
                  ) : (
                    <form onSubmit={handleSubmitInstallment} className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 p-4 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800">Form Pembayaran Lanjutan</span>
                        <button type="button" onClick={() => setShowInstallmentForm(false)} className="text-xs text-gray-500 hover:text-gray-700">Batal</button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Nominal Transfer (Rp)</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 1.000.000"
                          value={displayAmount}
                          onChange={handleAmountChange}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs text-gray-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Upload Bukti Transfer (JPEG) *</label>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          required
                          onChange={handleImageCompression}
                          className="w-full px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-xs text-gray-900"
                        />
                      </div>

                      {previewUrl && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-emerald-300">
                          <Image src={previewUrl} alt="Preview" fill unoptimized className="object-cover" />
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? "Mengirim..." : "Kirim Bukti Cicilan"}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {data.hasPendingPayment && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 text-center font-medium">
                  ⏳ Anda memiliki bukti pembayaran yang sedang menunggu verifikasi admin.
                </div>
              )}

              {/* Riwayat Pembayaran */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300">Riwayat Transaksi</h5>
                <div className="border border-slate-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-gray-300">
                    <thead className="bg-slate-50 dark:bg-gray-800 text-[10px] uppercase font-semibold text-gray-500">
                      <tr>
                        <th className="p-3">Kode Bayar</th>
                        <th className="p-3">Jenis</th>
                        <th className="p-3">Nominal</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                      {data.payments.map((p: any) => (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-mono font-bold">{p.paymentCode}</td>
                          <td className="p-3">{p.paymentType}</td>
                          <td className="p-3 font-semibold">{formatRupiah(p.amount)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                              p.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Modal */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-gray-800 border-t border-slate-100 dark:border-gray-800 flex justify-end flex-shrink-0">
          <button
            type="button"
            onClick={handleResetModal}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:bg-slate-300 cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}