"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-20"
    >
      {/* Full Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />

      {/* Konten Utama Tengah */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
        
        {/* 1. Logo Brand dengan Wadah Kontras yang Lebih Ramping */}
        <div className="mb-5 bg-white/95 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-3.5 rounded-2xl shadow-2xl border border-white/40">
          <img
            src="/images/logo-el.svg"
            alt="Logo PT El Noor Mutsa Maria"
            className="w-[180px] sm:w-[220px] md:w-[250px] h-auto object-contain mx-auto"
          />
        </div>

        {/* 2. Keterangan Nama PT & Nomor Izin PPIU */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-gray-100 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#1BC033] animate-pulse shrink-0" />
          <span>PT El Noor Mutsa Maria • Izin PPIU: 9120004492234002</span>
        </div>

        {/* 3. Tagline & Headline Utama (Pas 2 Baris & Proporsional) */}
{/* 3. Tagline & Headline Utama (Menyatu dengan Aksen Garis) */}
        <h1
          style={{ fontSize: "clamp(1.75rem, 3.6vw, 3.35rem)" }}
          className="font-extrabold tracking-tight leading-[1.3] text-white max-w-5xl"
        >
          Mudah, Amanah &amp; Sesuai Sunnah.{" "}
          <span className="relative inline-block text-[#24e03f] drop-shadow-md">
            Indahnya Berziarah Ke Baitullah
            {/* Aksen Garis Bawah */}
            <span className="block h-1.5 sm:h-2 w-full bg-[#24e03f] rounded-full mt-1 sm:mt-1.5 opacity-90" />
          </span>
        </h1>

        {/* 4. Tombol CTA Utama */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#packages"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1BC033] hover:bg-[#16a32b] !text-white font-bold text-sm sm:text-base shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105"
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 !text-white font-semibold text-sm sm:text-base transition-all"
          >
            Konsultasi Gratis
          </Link>
        </div>

      </div>
    </section>
  );
}