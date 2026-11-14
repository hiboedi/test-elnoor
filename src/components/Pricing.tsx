"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BookingModal from "@/src/components/BookingModal";

export interface DepartureItem {
  id: string;
  packageId: string;
  departureDate: string;
  returnDate: string;
  durationDays: number;
  priceQuad: number;
  priceTriple: number;
  priceDouble: number;
  quotaTotal: number;
  quotaAvailable: number;
  status: string;
  // Alias opsional jika BookingModal masih membaca nama field lama
  availableSeats?: number;
  totalSeats?: number;
}

export interface PackageItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  hotelMakkah: string;
  hotelMadinah: string;
  airline: string;
  imageUrl: string | null;
  includes: string[];
  excludes: string[];
  isActive: boolean;
  departures: DepartureItem[];
}

function formatRupiah(amount?: number | null) {
  const numericAmount = Number(amount);
  if (!numericAmount || numericAmount <= 0) {
    return "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

function formatDepartureDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Pricing() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [mounted, setMounted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function fetchPackages() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_DATA || "http://localhost:3000/api";
        const res = await fetch(`${baseUrl}/packages`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const normalizedData: PackageItem[] = json.data.map((pkg: any) => ({
            ...pkg,
            departures: (pkg.departures || []).map((dep: any) => ({
              ...dep,
              availableSeats: dep.quotaAvailable,
              totalSeats: dep.quotaTotal,
            })),
          }));

          setPackages(normalizedData);
        }
      } catch (error) {
        console.error("Gagal memuat data paket dari API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) => {
    if (!pkg.isActive) return false;
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "HAJI") {
      return (
        pkg.category === "HAJI_PLUS" ||
        pkg.category === "HAJI_KHUSUS" ||
        pkg.category === "HAJI_FURODA"
      );
    }
    return pkg.category === selectedCategory;
  });

  const handleOpenModal = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <section
      id="packages"
      className="scroll-mt-24 py-16 px-4 overflow-hidden bg-slate-50/70 dark:bg-gray-950/50"
    >
      {/* Section Title */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Pilihan Paket Umrah &amp; Haji Terpercaya
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          PT El Noor Mutsa Maria (PPIU: 9120004492234002) menyediakan pilihan
          paket ibadah resmi dengan rincian fasilitas, jadwal keberangkatan, dan
          transparansi biaya.
        </p>
      </div>

      {/* Filter Tabs Kategori */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { id: "ALL", label: "Semua Paket" },
            { id: "UMRAH_PROMO", label: "Umrah Promo" },
            { id: "UMRAH_REGULER", label: "Umrah Reguler" },
            { id: "UMRAH_VIP", label: "Umrah VIP" },
            { id: "UMRAH_PLUS", label: "Umrah Plus" },
            { id: "HAJI", label: "Haji Plus & Furoda" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-[#1BC033] text-white shadow-md shadow-green-600/20"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#1BC033]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tombol Panah Geser Kiri & Kanan */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            aria-label="Paket Sebelumnya"
            className="packages-prev w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white hover:bg-[#1BC033] hover:border-[#1BC033] hover:text-white shadow-sm transition-all cursor-pointer disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Paket Selanjutnya"
            className="packages-next w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white hover:bg-[#1BC033] hover:border-[#1BC033] hover:text-white shadow-sm transition-all cursor-pointer disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Package Cards Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 py-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[520px] rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 animate-pulse p-6 space-y-4"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-lg" />
                <div className="h-32 w-full bg-gray-100 dark:bg-gray-800/60 rounded-2xl mt-6" />
              </div>
            ))}
          </div>
        ) : mounted && filteredPackages.length > 0 ? (
          <Swiper
            key={`${selectedCategory}-${filteredPackages.length}`}
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={filteredPackages.length === 1}
            navigation={{
              prevEl: ".packages-prev",
              nextEl: ".packages-next",
            }}
            pagination={{
              clickable: true,
              el: ".packages-pagination",
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="!px-2 !pt-2 !pb-14"
          >
            {filteredPackages.map((pkg) => {
              const nextDeparture = pkg.departures?.[0];

              return (
                <SwiperSlide key={pkg.id} className="!h-auto flex">
                  <div
                    style={{
                      boxShadow:
                        "0 20px 40px -12px rgba(15, 23, 42, 0.16), 0 4px 16px -4px rgba(15, 23, 42, 0.08)",
                    }}
                    className="w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-gray-800 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Bagian Atas Kartu */}
                    <div>
                      {/* Cover Image */}
                      <div className="relative w-full h-52 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        {pkg.imageUrl ? (
                          <Image
                            src={pkg.imageUrl}
                            alt={pkg.title}
                            fill
                            unoptimized={Boolean(
                              pkg.imageUrl.includes("localhost") ||
                              pkg.imageUrl.startsWith("data:")
                            )}
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            Tidak ada gambar
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#1BC033]/15 text-[#16a32b] dark:text-[#1BC033]">
                            {pkg.category.replace(/_/g, " ")}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 min-h-[40px]">
                          {pkg.description}
                        </p>

                        <hr className="my-4 border-gray-100 dark:border-gray-800" />

                        {/* Flight & Hotels Info */}
                        <div className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-[#1BC033] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span className="truncate">{pkg.airline}</span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-[#1BC033] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="truncate">
                              {pkg.hotelMakkah} / {pkg.hotelMadinah}
                            </span>
                          </div>

                          {nextDeparture && (
                            <div className="flex items-center gap-2.5">
                              <svg className="w-4 h-4 text-[#1BC033] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>
                                {formatDepartureDate(nextDeparture.departureDate)} (
                                {nextDeparture.durationDays} Hari)
                              </span>
                            </div>
                          )}
                        </div>

                        <hr className="my-4 border-gray-100 dark:border-gray-800" />

                        {/* Includes & Excludes */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                              Include:
                            </div>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside">
                              {(pkg.includes || []).map((inc, idx) => (
                                <li key={idx} className="truncate" title={inc}>
                                  {inc}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="font-bold text-rose-600 dark:text-rose-400 mb-2">
                              Exclude:
                            </div>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside">
                              {(pkg.excludes || []).map((exc, idx) => (
                                <li key={idx} className="truncate" title={exc}>
                                  {exc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bagian Bawah Kartu (Harga, Kuota & Tombol Aksi) */}
                    <div className="px-6 pb-6 pt-2">
                      <hr className="mb-4 border-gray-100 dark:border-gray-800" />

                      {nextDeparture ? (
                        <>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Quad (4 Org):</span>
                              <span
                                className={
                                  Number(nextDeparture.priceQuad) > 0
                                    ? "font-bold text-[#16a32b] dark:text-[#1BC033]"
                                    : "font-semibold text-gray-400 dark:text-gray-500"
                                }
                              >
                                {formatRupiah(nextDeparture.priceQuad)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Triple (3 Org):</span>
                              <span
                                className={
                                  Number(nextDeparture.priceTriple) > 0
                                    ? "font-bold text-gray-900 dark:text-white"
                                    : "font-semibold text-gray-400 dark:text-gray-500"
                                }
                              >
                                {formatRupiah(nextDeparture.priceTriple)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Double (2 Org):</span>
                              <span
                                className={
                                  Number(nextDeparture.priceDouble) > 0
                                    ? "font-bold text-gray-900 dark:text-white"
                                    : "font-semibold text-gray-400 dark:text-gray-500"
                                }
                              >
                                {formatRupiah(nextDeparture.priceDouble)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Sisa Kuota:</span>
                            <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold text-gray-800 dark:text-gray-200">
                              {nextDeparture.quotaAvailable} / {nextDeparture.quotaTotal} Seat
                            </span>
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-center text-gray-500 py-3">
                          Jadwal keberangkatan segera dibuka
                        </p>
                      )}

                      {/* Tombol Pesan Paket Ini / Buka Modal */}
                      <button
                        type="button"
                        onClick={() => handleOpenModal(pkg)}
                        className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#1BC033] hover:bg-[#16a32b] text-white font-semibold text-sm shadow-md transition-all duration-300 cursor-pointer"
                        style={{ color: "#ffffff", backgroundColor: "#1BC033" }}
                      >
                        <span style={{ color: "#ffffff" }} className="text-white font-semibold text-sm">
                          Pesan Paket Ini
                        </span>
                        <svg
                          className="w-4 h-4 text-white"
                          style={{ color: "#ffffff" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Belum ada paket tersedia untuk kategori ini.
            </p>
        </div>
        )}

        <div className="packages-pagination flex justify-center gap-2 mt-6 [&_.swiper-pagination-bullet-active]:!bg-[#1BC033]" />
      </div>

      {/* Render Booking Modal */}
      {selectedPackage && (
        <BookingModal
          pkg={selectedPackage as any}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}