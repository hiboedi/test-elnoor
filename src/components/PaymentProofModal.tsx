"use client";

import { useState } from "react";
import Image from "next/image";
import { Norek } from "../data/datas";
import type { PackageItem, DepartureItem } from "@/src/components/Pricing";

export interface BookingFormPayload {
  fullName: string;
  nik: string;
  gender: string;
  namaAyah: string;
  nomerHp: string;
  birthDate: Date | null;
}

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  pkg: PackageItem;
  activeDeparture: DepartureItem;
  roomType: "QUAD" | "TRIPLE" | "DOUBLE";
  selectedRoomPrice: number;
  formData: BookingFormPayload;
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

export default function PaymentProofModal({
  isOpen,
  onClose,
  onBack,
  pkg,
  activeDeparture,
  roomType,
  selectedRoomPrice,
  formData,
}: PaymentProofModalProps) {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [submissionResult, setSubmissionResult] = useState<{
    bookingCode: string;
    paymentCode: string;
    whatsappUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleImageCompression = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setErrorMessage(null);

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
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );
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

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!activeDeparture) {
      setErrorMessage("Jadwal keberangkatan belum tersedia untuk paket ini.");
      return;
    }

    if (selectedRoomPrice <= 0) {
      setErrorMessage("Pilihan tipe kamar belum tersedia untuk jadwal ini.");
      return;
    }

    if (!paymentProof) {
      setErrorMessage("Mohon upload bukti transfer DP terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_DATA || "http://localhost:3000/api";

      const payload = new FormData();
      payload.append("departureId", activeDeparture.id);
      payload.append("roomType", roomType);
      payload.append("fullName", formData.fullName);
      payload.append("nik", formData.nik);
      payload.append("gender", formData.gender);
      payload.append("namaAyah", formData.namaAyah);
      payload.append("nomerHp", formData.nomerHp);
      payload.append(
        "birthDate",
        formData.birthDate ? formData.birthDate.toISOString() : ""
      );
      payload.append("paymentProof", paymentProof);

      // Mengirim ke endpoint pendaftaran DP awal (/api/bookings)
      const res = await fetch(`${apiBaseUrl}/bookings`, {
        method: "POST",
        body: payload,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrorMessage(json.message || "Gagal menyimpan data pendaftaran.");
        setIsSubmitting(false);
        return;
      }

      const paymentCode = json.data?.paymentCode || "-";
      const bookingCode = json.data?.bookingCode || paymentCode;

      const formattedBirthDate = formData.birthDate
        ? formData.birthDate.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "-";

      const text = encodeURIComponent(
        `Assalamu'alaikum PT El Noor Mutsa Maria,\n\n` +
          `Saya telah mengisi formulir pendaftaran dan mengunggah bukti transfer *DP Rp 5.000.000*.\n\n` +
          `*Kode Pembayaran:* ${paymentCode}\n` +
          `*Detail Paket:* ${pkg.title} (${pkg.category.replace(/_/g, " ")})\n` +
          `*Tipe Kamar:* ${roomType} (${formatRupiah(selectedRoomPrice)})\n` +
          `*Keberangkatan:* ${formatDepartureDate(activeDeparture.departureDate)}\n` +
          `-----------------------------------\n` +
          `*Nama Lengkap:* ${formData.fullName}\n` +
          `*NIK:* ${formData.nik}\n` +
          `*Jenis Kelamin:* ${formData.gender === "MALE" ? "Laki-laki" : "Perempuan"}\n` +
          `*Nama Ayah Kandung:* ${formData.namaAyah}\n` +
          `*No. HP / WhatsApp:* ${formData.nomerHp}\n` +
          `*Tanggal Lahir:* ${formattedBirthDate}\n\n` +
          `Mohon verifikasi (ACC) pembayaran dan data jamaah saya. Terima kasih.`
      );

      setSubmissionResult({
        bookingCode,
        paymentCode,
        whatsappUrl: `https://wa.me/6282127227727?text=${text}`,
      });
    } catch (error) {
      console.error("Error saat mengirim booking:", error);
      setErrorMessage("Gagal terhubung ke server. Pastikan koneksi internet stabil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(submissionResult.paymentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetAndClose = () => {
    setPaymentProof(null);
    setPreviewUrl(null);
    setSubmissionResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-auto">
        {/* Header */}
        <div className="bg-[#1BC033] px-5 py-3.5 flex items-center justify-between text-white">
          <div>
            <h3 className="text-base sm:text-lg font-bold !text-white" style={{ color: "#ffffff" }}>
              {submissionResult
                ? "Pendaftaran Berhasil Dikirim"
                : "Konfirmasi Pembayaran DP (Rp 5.000.000)"}
            </h3>
            <p className="text-xs !text-white/90 truncate max-w-xs sm:max-w-md" style={{ color: "rgba(255,255,255,0.9)" }}>
              {pkg.title} • {roomType} ({formatRupiah(selectedRoomPrice)})
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            style={{ color: "#ffffff" }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer !text-white"
          >
            ✕
          </button>
        </div>

        {/* TAMPILAN SETELAH SUKSES UPLOAD BUKTI TRANSFER */}
        {submissionResult ? (
          <div className="p-6 sm:p-8 text-center flex flex-col items-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-[#1BC033]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-2 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                Menunggu Verifikasi Admin
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center">
                Bukti Transfer Anda Telah Diterima
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed text-center">
                Tim admin kami sedang mengecek bukti pembayaran Anda. Konfirmasi ACC seat dan jadwal manasik akan dikirimkan ke nomor WhatsApp{" "}
                <strong className="text-gray-800 dark:text-gray-200">{formData.nomerHp}</strong>.
              </p>
            </div>

            {/* Kotak Kode Pembayaran */}
            <div className="w-full max-w-sm bg-slate-50 dark:bg-gray-800/70 border border-slate-200 dark:border-gray-700 rounded-2xl p-4 text-center space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center">
                Kode Pembayaran Anda
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-base sm:text-lg font-extrabold text-gray-900 dark:text-white">
                  {submissionResult.paymentCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 cursor-pointer"
                >
                  {copied ? "Tersalin!" : "Salin"}
                </button>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="w-full pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-1/3 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-center"
              >
                Tutup
              </button>
              <a
                href={submissionResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff", backgroundColor: "#1BC033" }}
                className="w-full sm:w-2/3 py-2.5 px-4 rounded-xl bg-[#1BC033] hover:bg-[#16a32b] !text-white text-xs sm:text-sm font-semibold shadow-md transition-all inline-flex items-center justify-center text-center"
              >
                <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                  Konfirmasi Cepat ke WhatsApp Admin
                </span>
              </a>
            </div>
          </div>
        ) : (
          /* FORM UPLOAD BUKTI TRANSFER */
          <form onSubmit={handleSubmitPayment} className="p-6 space-y-4 text-center">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 text-center leading-relaxed">
              <strong>Informasi Pembayaran Virtual Account (VA):</strong>
              <br />
              Silakan lakukan transfer <strong>DP Rp 5.000.000</strong> ke Rekening VA Resmi:{" "}
              <br />
              <span className="font-mono font-bold text-sm">
                VA MANDIRI: {Norek}
              </span>{" "}
              a.n. PT El Noor Mutsa Maria.
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 text-center">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5 text-center">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
                Upload Bukti Transfer (Otomatis Kompres ke Format JPEG) *
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                required
                onChange={handleImageCompression}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#1BC033]"
              />
              <p className="text-[10px] text-gray-400 text-center">
                *File gambar akan otomatis dikompres ke format JPEG ukuran ringan agar cepat terkirim.
              </p>
            </div>

            {isCompressing && (
              <p className="text-xs text-amber-600 animate-pulse text-center">
                Sedang mengompres file gambar ke JPEG...
              </p>
            )}

            {previewUrl && !isCompressing && (
              <div className="mt-3 flex flex-col items-center">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 text-center">
                  Preview Kompresi JPEG:
                </p>
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src={previewUrl}
                    alt="Bukti Transfer"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Tombol Aksi Form */}
            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onBack}
                className="w-1/3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 text-center"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isCompressing || isSubmitting || !paymentProof}
                style={{ color: "#ffffff", backgroundColor: "#1BC033" }}
                className="w-2/3 py-2.5 rounded-xl bg-[#1BC033] hover:bg-[#16a32b] !text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50 text-center"
              >
                <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                  {isSubmitting ? "Mengirim Bukti..." : "Kirim Bukti Pembayaran"}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}