"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Impor data mockup dan fungsi helper dari file terpisah
import {
  mockPackagesData,
  PackageItem,
  formatRupiah,
  formatDepartureDate,
} from "@/src/data/mockPackages";
import BookingModal from "@/src/components/BookingModal";

export default function Pricing() {
  const [packages, setPackages] = useState<PackageItem[]>(mockPackagesData);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [mounted, setMounted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPackages = packages.filter((pkg) => {
    if (!pkg.isActive) return false;
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "HAJI") {
      return pkg.category === "HAJI_KHUSUS" || pkg.category === "HAJI_FURODA";
    }
    return pkg.category === selectedCategory;
  });

  const handleOpenModal = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <section id="packages" className="scroll-mt-24 py-16 px-4 overflow-hidden bg-gray-50/50 dark:bg-gray-950/50">
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
            { id: "UMRAH_REGULER", label: "Umrah Reguler" },
            { id: "UMRAH_VIP", label: "Umrah VVIP" },
            { id: "UMRAH_PLUS", label: "Umrah Plus" },
            { id: "HAJI", label: "Haji Khusus & Furoda" },
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
        {mounted && (
          <Swiper
            key={selectedCategory}
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
            className="!pb-12"
          >
            {filteredPackages.map((pkg) => {
              const nextDeparture = pkg.departures?.[0];

              return (
                <SwiperSlide key={pkg.id} className="!h-auto flex">
                  <div className="w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                    
                    {/* Bagian Atas Kartu */}
                    <div>
                      {/* Cover Image */}
                      <div className="relative w-full h-52 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <Image
                          src={
                            pkg.imageUrl ||
                            "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1000&auto=format&fit=crop"
                          }
                          alt={pkg.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#1BC033]/15 text-[#16a32b] dark:text-[#1BC033]">
                            {pkg.category}
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
                              {pkg.includes.map((inc, idx) => (
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
                              {pkg.excludes.map((exc, idx) => (
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
                              <span className="font-bold text-[#16a32b] dark:text-[#1BC033]">
                                {formatRupiah(nextDeparture.priceQuad)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Triple (3 Org):</span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatRupiah(nextDeparture.priceTriple)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Double (2 Org):</span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatRupiah(nextDeparture.priceDouble)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Sisa Kuota:</span>
                            <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold text-gray-800 dark:text-gray-200">
                              {nextDeparture.availableSeats} / {nextDeparture.totalSeats} Seat
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
        )}

        <div className="packages-pagination flex justify-center gap-2 mt-6 [&_.swiper-pagination-bullet-active]:!bg-[#1BC033]" />
      </div>

      {/* Render Booking Modal */}
      {selectedPackage && (
        <BookingModal
          pkg={selectedPackage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}