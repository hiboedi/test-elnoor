"use client";

import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { PackageItem } from "@/src/components/Pricing";
import PaymentProofModal from "@/src/components/PaymentProofModal";

interface BookingModalProps {
  pkg: PackageItem;
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

function formatDepartureDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BookingModal({ pkg, isOpen, onClose }: BookingModalProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [selectedDepartureId, setSelectedDepartureId] = useState<string>(
    pkg.departures?.[0]?.id || ""
  );
  const [roomType, setRoomType] = useState<"QUAD" | "TRIPLE" | "DOUBLE">("QUAD");

  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    gender: "MALE",
    namaAyah: "",
    nomerHp: "",
  });

  const [birthDate, setBirthDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedDepartureId(pkg.departures?.[0]?.id || "");
      setIsPaymentModalOpen(false);
    }
  }, [pkg, isOpen]);

  const activeDeparture =
    pkg.departures?.find((d) => d.id === selectedDepartureId) || pkg.departures?.[0];

  const availableRoomOptions = useMemo(() => {
    if (!activeDeparture) return [];

    const options: { value: "QUAD" | "TRIPLE" | "DOUBLE"; label: string; price: number }[] = [];

    if (Number(activeDeparture.priceQuad) > 0) {
      options.push({
        value: "QUAD",
        label: `Quad (4 Org) - ${formatRupiah(Number(activeDeparture.priceQuad))}`,
        price: Number(activeDeparture.priceQuad),
      });
    }
    if (Number(activeDeparture.priceTriple) > 0) {
      options.push({
        value: "TRIPLE",
        label: `Triple (3 Org) - ${formatRupiah(Number(activeDeparture.priceTriple))}`,
        price: Number(activeDeparture.priceTriple),
      });
    }
    if (Number(activeDeparture.priceDouble) > 0) {
      options.push({
        value: "DOUBLE",
        label: `Double (2 Org) - ${formatRupiah(Number(activeDeparture.priceDouble))}`,
        price: Number(activeDeparture.priceDouble),
      });
    }

    return options;
  }, [activeDeparture]);

  useEffect(() => {
    if (availableRoomOptions.length > 0) {
      const isCurrentValid = availableRoomOptions.some((opt) => opt.value === roomType);
      if (!isCurrentValid) {
        setRoomType(availableRoomOptions[0].value);
      }
    }
  }, [availableRoomOptions, roomType]);

  if (!isOpen) return null;

  const selectedRoomPrice =
    availableRoomOptions.find((opt) => opt.value === roomType)?.price || 0;

  const sanitizeInput = (value: string) => {
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/[<>]/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
  };

  const handleCloseAll = () => {
    setIsPaymentModalOpen(false);
    onClose();
  };

  return (
    <>
      {/* MODAL 1: FORMULIR BIODATA JAMAAH */}
      {!isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-auto">
            {/* Modal Header */}
            <div className="bg-[#1BC033] px-5 py-3.5 flex items-center justify-between text-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Formulir Pendaftaran Jamaah
                </h3>
                <p className="text-xs text-white/90 truncate max-w-xs sm:max-w-md">
                  {pkg.title}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseAll}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsPaymentModalOpen(true);
                }}
                className="lg:col-span-7 p-5 sm:p-6 space-y-3"
              >
                <div className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white border-b pb-1.5 mb-2">
                  1. Isi Data Diri Calon Jamaah dengan Benar (Aman &amp; Terverifikasi)
                </div>

                {/* Pilihan Jadwal & Tipe Kamar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Jadwal Keberangkatan *
                    </label>
                    <select
                      value={selectedDepartureId}
                      onChange={(e) => setSelectedDepartureId(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                    >
                      {(pkg.departures || []).map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {formatDepartureDate(dep.departureDate)} ({dep.durationDays} Hari) - Sisa {dep.quotaAvailable} Seat
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Pilihan Tipe Kamar *
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) =>
                        setRoomType(e.target.value as "QUAD" | "TRIPLE" | "DOUBLE")
                      }
                      disabled={availableRoomOptions.length === 0}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033] disabled:opacity-50"
                    >
                      {availableRoomOptions.length > 0 ? (
                        availableRoomOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      ) : (
                        <option value="">Harga kamar belum tersedia</option>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nama Lengkap (Sesuai KTP/Paspor) *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName ?? ""}
                    onChange={handleChange}
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
                      minLength={16}
                      maxLength={16}
                      value={formData.nik ?? ""}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Jenis Kelamin *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender ?? "MALE"}
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
                      value={formData.namaAyah ?? ""}
                      onChange={handleChange}
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
                      value={formData.nomerHp ?? ""}
                      onChange={handleChange}
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
                    onClick={handleCloseAll}
                    className="w-1/3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !activeDeparture ||
                      activeDeparture.quotaAvailable <= 0 ||
                      availableRoomOptions.length === 0
                    }
                    className="w-2/3 py-2.5 rounded-xl bg-[#1BC033] hover:bg-[#16a32b] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    Lanjutkan Pembayaran DP
                  </button>
                </div>
              </form>

              {/* Sidebar Kanan */}
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
                      <span className="font-semibold truncate max-w-[130px]">
                        {pkg.hotelMakkah}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jadwal:</span>
                      <span className="font-semibold">
                        {activeDeparture
                          ? formatDepartureDate(activeDeparture.departureDate)
                          : "Segera"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tipe Kamar:</span>
                      <span className="font-semibold">
                        {availableRoomOptions.length > 0 ? roomType : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-1 mt-0.5">
                      <span className="text-gray-400 font-medium">Total Harga Paket:</span>
                      <span className="font-bold text-[#16a32b] dark:text-[#1BC033]">
                        {selectedRoomPrice > 0 ? formatRupiah(selectedRoomPrice) : "-"}
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
                    <li>
                      Klik <strong className="text-gray-800 dark:text-gray-200">Lanjutkan</strong> untuk upload bukti DP.
                    </li>
                    <li>
                      Bayar <strong className="text-emerald-600 font-bold">DP Rp 5.000.000</strong> ke VA Resmi Travel.
                    </li>
                    <li>Upload foto bukti transfer JPEG, admin meninjau &amp; ACC pembayaran.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: KONFIRMASI & UPLOAD BUKTI PEMBAYARAN DP (TERPISAH) */}
      {activeDeparture && (
        <PaymentProofModal
          isOpen={isPaymentModalOpen}
          onClose={handleCloseAll}
          onBack={() => setIsPaymentModalOpen(false)}
          pkg={pkg}
          activeDeparture={activeDeparture}
          roomType={roomType}
          selectedRoomPrice={selectedRoomPrice}
          formData={{ ...formData, birthDate }}
        />
      )}
    </>
  );
}