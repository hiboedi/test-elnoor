"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PackageItem, formatDepartureDate, formatRupiah } from "@/src/data/mockPackages";

interface BookingModalProps {
  pkg: PackageItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ pkg, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "payment">("form");

  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    gender: "MALE",
    namaAyah: "",
    nomerHp: "",
  });

  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  if (!isOpen) return null;

  const nextDeparture = pkg.departures?.[0];

  const sanitizeInput = (value: string) => {
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/[<>]/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleImageCompression = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
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
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              setPaymentProof(compressedFile);
              setPreviewUrl(URL.createObjectURL(compressedFile));
            }
            setIsCompressing(false);
          },
          "image/jpeg",
          0.7
        );
      };
    };
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedBirthDate = birthDate ? birthDate.toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' }) : "-";

    const text = encodeURIComponent(
      `Assalamu'alaikum PT El Noor Mutsa Maria,\n\n` +
      `Saya telah mengisi formulir pendaftaran dan melakukan pembayaran *DP Rp 5.000.000*.\n\n` +
      `*Detail Paket:* ${pkg.title} (${pkg.category})\n` +
      `${nextDeparture ? `*Keberangkatan:* ${formatDepartureDate(nextDeparture.departureDate)}\n` : ""}` +
      `-----------------------------------\n` +
      `*Nama Lengkap:* ${formData.fullName}\n` +
      `*NIK:* ${formData.nik}\n` +
      `*Jenis Kelamin:* ${formData.gender === "MALE" ? "Laki-laki" : "Perempuan"}\n` +
      `*Nama Ayah Kandung:* ${formData.namaAyah}\n` +
      `*No. HP / WhatsApp:* ${formData.nomerHp}\n` +
      `*Tanggal Lahir:* ${formattedBirthDate}\n\n` +
      `${paymentProof ? `*(Bukti transfer DP telah disiapkan untuk dikirim)*` : ""}\n\n` +
      `Mohon verifikasi pembayaran dan data jamaah saya. Terima kasih.`
    );

    window.open(`https://wa.me/628970237237?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-auto">
        
        {/* Modal Header */}
        <div className="bg-[#1BC033] px-5 py-3.5 flex items-center justify-between text-white">
          <div>
            <h3 className="text-base sm:text-lg font-bold">
              {step === "form" ? "Formulir Pendaftaran Jamaah" : "Konfirmasi Pembayaran DP (Rp 5.000.000)"}
            </h3>
            <p className="text-xs text-white/90 truncate max-w-xs sm:max-w-md">{pkg.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer text-white"
          >
            ✕
          </button>
        </div>

        {/* Modal Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
          
          {step === "form" ? (
            <>
              {/* TAHAP 1: FORMULIR */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("payment");
                }}
                className="lg:col-span-7 p-5 sm:p-6 space-y-3"
              >
                <div className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white border-b pb-1.5 mb-2">
                  1. Isi Data Diri Calon Jamaah dengan Benar (Aman &amp; Terverifikasi)
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nama Lengkap (Sesuai KTP/Paspor) *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Contoh: Ahmad Budiman"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      NIK (16 Digit KTP) *
                    </label>
                    <input
                      type="text"
                      name="nik"
                      required
                      maxLength={16}
                      value={formData.nik}
                      onChange={handleChange}
                      placeholder="3204xxxxxxxxxxxx"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Jenis Kelamin *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                    >
                      <option value="MALE">Laki-laki</option>
                      <option value="FEMALE">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Nama Ayah Kandung *
                    </label>
                    <input
                      type="text"
                      name="namaAyah"
                      required
                      value={formData.namaAyah}
                      onChange={handleChange}
                      placeholder="Sesuai akta/KK"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Nomor HP / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="nomerHp"
                      required
                      value={formData.nomerHp}
                      onChange={handleChange}
                      placeholder="0812xxxxxxxx"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Tanggal Lahir *
                  </label>
                  <DatePicker
                    selected={birthDate}
                    onChange={(date: Date | null) => setBirthDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Pilih Tanggal Lahir"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                    wrapperClassName="w-full"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    required
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-[#1BC033] hover:bg-[#16a32b] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                  >
                    Lanjutkan Pembayaran DP
                  </button>
                </div>
              </form>

              {/* Sidebar Kanan (Kini Ditampilkan di Semua Ukuran Layar secara Responsive) */}
              <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-800/50 p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 flex flex-col justify-between space-y-3">
                <div className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Ringkasan Paket
                  </h4>
                  <h5 className="font-bold text-gray-900 dark:text-white text-xs">
                    {pkg.title}
                  </h5>
                  
                  <div className="space-y-1 text-[11px] text-gray-600 dark:text-gray-300 pt-1 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Maskapai:</span>
                      <span className="font-semibold">{pkg.airline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hotel Makkah:</span>
                      <span className="font-semibold truncate max-w-[130px]">{pkg.hotelMakkah}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jadwal:</span>
                      <span className="font-semibold">
                        {nextDeparture ? formatDepartureDate(nextDeparture.departureDate) : "Segera"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-1 mt-0.5">
                      <span className="text-gray-400 font-medium">Mulai Harga:</span>
                      <span className="font-bold text-[#16a32b] dark:text-[#1BC033]">
                        {nextDeparture ? formatRupiah(nextDeparture.priceQuad) : "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1 text-[11px]">
                  <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#1BC033]"></span>
                    <span>Cara Pendaftaran &amp; Pembayaran:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-0.5 text-gray-600 dark:text-gray-400 pl-0.5 leading-relaxed">
                    <li>Isi formulir dengan benar.</li>
                    <li>Klik <strong className="text-gray-800 dark:text-gray-200">Lanjutkan</strong> untuk upload bukti DP.</li>
                    <li>Bayar <strong className="text-emerald-600 font-bold">DP Rp 5.000.000</strong> ke VA Resmi Travel.</li>
                    <li>Upload foto bukti transfer JPEG, admin meninjau pembayaran.</li>
                  </ol>
                </div>
              </div>
            </>
          ) : (
            /* TAHAP 2: UPLOAD BUKTI PEMBAYARAN DP & KOMPRESI JPEG */
            <form onSubmit={handleSubmitPayment} className="lg:col-span-12 p-6 space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200">
                <strong>Informasi Pembayaran Virtual Account (VA):</strong><br />
                Silakan lakukan transfer <strong>DP Rp 5.000.000</strong> ke Rekening VA Resmi: <br />
                <span className="font-mono font-bold text-sm">VA MANDIRI: 8870800123456789</span> a.n. PT El Noor Mutsa Maria.
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Upload Bukti Transfer (Otomatis Kompres ke Format JPEG) *
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  required
                  onChange={handleImageCompression}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  *File gambar akan otomatis dikompres ke format JPEG ukuran ringan agar cepat terkirim.
                </p>
              </div>

              {isCompressing && (
                <p className="text-xs text-amber-600 animate-pulse">Sedang mengompres file gambar ke JPEG...</p>
              )}

              {previewUrl && !isCompressing && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Preview Kompresi JPEG:</p>
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                    <Image src={previewUrl} alt="Bukti Transfer" fill className="object-cover" />
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-1/3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={isCompressing || !paymentProof}
                  className="w-2/3 py-2.5 rounded-xl bg-[#1BC033] hover:bg-[#16a32b] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  Kirim Bukti &amp; Selesaikan via WhatsApp
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}