"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen lg:min-h-[105vh] w-full flex items-center justify-center overflow-hidden pt-32 pb-32"
    >
      {/* Full Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />

      {/* Konten Utama Tengah */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
        {/* Badge Legalitas */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-gray-200 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#1BC033] animate-pulse" />
          <span>PT El Noor Mutsa Maria • PPIU: 9120004492234002</span>
        </div>

        {/* Headline Utama */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Kami Mudahkan Langkah Anda Menuju
        </h1>

        {/* Highlight Box Putih */}
        <div className="inline-block bg-white text-[#16a32b] px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-2xl shadow-2xl transform -rotate-1 my-2 sm:my-3">
          <span className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wide">
            Baitullah Al-Haram
          </span>
        </div>

        {/* Deskripsi */}
        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-normal">
          Menghadirkan layanan perjalanan ibadah Umrah &amp; Haji Khusus yang
          amanah, nyaman, dan sesuai sunnah — mulai dari pengurusan dokumen
          hingga kepulangan Anda ke Tanah Air dengan penuh keberkahan.
        </p>

        {/* Tombol CTA Utama */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#packages"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1BC033] hover:bg-[#16a32b] !text-white font-bold text-sm sm:text-base shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105"
          >
            <span>Pilih Paket Ibadah</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          <Link
            href="/#support"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 !text-white font-semibold text-sm sm:text-base transition-all"
          >
            Konsultasi Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}