"use client";

import React from "react";

interface BrandItem {
  id: number;
  name: string;
  href: string;
  renderLogo: () => React.ReactNode;
}

const brandsData: BrandItem[] = [
  {
    id: 1,
    name: "Saudia Airlines",
    href: "https://www.saudia.com",
    renderLogo: () => (
      <svg viewBox="0 0 210 56" className="h-10 sm:h-11 w-auto" fill="none">
        {/* Emblem Palm & Crossed Swords */}
        <g transform="translate(8, 8)">
          <circle cx="20" cy="20" r="18" stroke="#006C35" strokeWidth="2.2" fill="#006C35" fillOpacity="0.08" />
          <path d="M20 7V25M20 11C15 9 11 11 10 14M20 11C25 9 29 11 30 14M20 15C16 14 13 16 12 18M20 15C24 14 27 16 28 18" stroke="#006C35" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 29L28 21M28 29L12 21" stroke="#B68B2D" strokeWidth="2" strokeLinecap="round" />
        </g>
        <text x="54" y="34" fill="#006C35" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="22" letterSpacing="1.5">
          SAUDIA
        </text>
        <text x="55" y="45" fill="#B68B2D" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="2.2">
          AIRLINES
        </text>
      </svg>
    ),
  },
  {
    id: 2,
    name: "Garuda Indonesia",
    href: "https://www.garuda-indonesia.com",
    renderLogo: () => (
      <svg viewBox="0 0 245 56" className="h-10 sm:h-11 w-auto" fill="none">
        {/* Stylized Wing Emblem */}
        <path d="M10 34C22 34 34 26 42 14C34 17 24 18 14 17C23 20 30 22 35 22C26 25 18 26 10 26C19 29 25 30 29 30C22 32 16 33 10 34Z" fill="#006699" />
        <path d="M15 39C25 38 35 32 43 22C36 27 27 32 15 39Z" fill="#00A8B5" />
        <text x="50" y="30" fill="#005587" fontFamily="Georgia, serif" fontWeight="700" fontSize="19" letterSpacing="0.3">
          Garuda Indonesia
        </text>
        <text x="51" y="42" fill="#0095A8" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="8" letterSpacing="1.4">
          THE AIRLINE OF INDONESIA
        </text>
      </svg>
    ),
  },
  {
    id: 3,
    name: "Pullman Hotels & Resorts",
    href: "#!",
    renderLogo: () => (
      <svg viewBox="0 0 190 56" className="h-10 sm:h-11 w-auto" fill="none">
        <rect x="6" y="10" width="178" height="36" rx="4" stroke="#1E293B" strokeWidth="1.5" />
        <text x="95" y="31" textAnchor="middle" fill="#1E293B" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="18" letterSpacing="4">
          PULLMAN
        </text>
        <text x="95" y="41" textAnchor="middle" fill="#64748B" fontFamily="system-ui, sans-serif" fontWeight="500" fontSize="7.5" letterSpacing="2.5">
          HOTELS &amp; RESORTS
        </text>
      </svg>
    ),
  },
  {
    id: 4,
    name: "Hilton Hotels & Resorts",
    href: "#!",
    renderLogo: () => (
      <svg viewBox="0 0 185 56" className="h-10 sm:h-11 w-auto" fill="none">
        {/* Double H Monogram */}
        <path d="M16 14V42M28 14V42M16 28H28M12 14H20M24 14H32M12 42H20M24 42H32" stroke="#002F6C" strokeWidth="2.4" strokeLinecap="round" />
        <text x="44" y="32" fill="#002F6C" fontFamily="Georgia, serif" fontWeight="700" fontSize="23" letterSpacing="1.5">
          Hilton
        </text>
        <text x="45" y="43" fill="#475569" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="7.5" letterSpacing="2">
          HOTELS &amp; RESORTS
        </text>
      </svg>
    ),
  },
  {
    id: 5,
    name: "Bank Syariah Indonesia (BSI)",
    href: "https://www.bankbsi.co.id",
    renderLogo: () => (
      <svg viewBox="0 0 215 56" className="h-10 sm:h-11 w-auto" fill="none">
        <text x="8" y="39" fill="#00A39D" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="31" letterSpacing="-1">
          BSI
        </text>
        {/* Star Accent */}
        <polygon points="64,11 66.5,16.5 72.5,17 68,21 69.5,27 64,23.8 58.5,27 60,21 55.5,17 61.5,16.5" fill="#F59E0B" />
        <line x1="79" y1="15" x2="79" y2="41" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="87" y="26" fill="#00A39D" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="10.5" letterSpacing="0.5">
          BANK SYARIAH
        </text>
        <text x="87" y="38" fill="#00A39D" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="10.5" letterSpacing="0.5">
          INDONESIA
        </text>
      </svg>
    ),
  },
  {
    id: 6,
    name: "Bank Muamalat",
    href: "https://www.bankmuamalat.co.id",
    renderLogo: () => (
      <svg viewBox="0 0 225 56" className="h-10 sm:h-11 w-auto" fill="none">
        {/* Geometric Dome / M Emblem */}
        <rect x="8" y="12" width="32" height="32" rx="8" fill="#512D6D" />
        <path d="M15 35V23L24 29L33 23V35" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="48" y="26" fill="#512D6D" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="12" letterSpacing="1">
          BANK
        </text>
        <text x="48" y="40" fill="#512D6D" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.5">
          MUAMALAT
        </text>
      </svg>
    ),
  },
];

export default function Clients() {
  return (
    <section className="pj vp mr py-14">
      {/* Section Title Start */}
      <div className="animate_top bb ze rj ki xn vq text-center">
        <h2 className="fk vj pr kk wm on/5 gq/2 bb _b font-bold text-2xl sm:text-3xl mb-3">
          Mitra Maskapai, Hotel &amp; Perbankan Resmi
        </h2>
        <p className="bb on/5 wo/5 hq text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
          PT El Noor Mutsa Maria (PPIU: 9120004492234002) bekerjasama dengan maskapai penerbangan terkemuka, grup hotel terdepan di Makkah &amp; Madinah, serta bank syariah resmi penampung setoran ibadah.
        </p>
      </div>
      {/* Section Title End */}

      <div className="bb ze ah ch pm hj xp ki xn 2xl:ud-px-49 bc mt-10">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {brandsData.map((brand) => (
            <a
              key={brand.id}
              href={brand.href}
              target={brand.href === "#!" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-center px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
              title={brand.name}
            >
              {brand.renderLogo()}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}