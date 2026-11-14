"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchGalleriesFromApi, FALLBACK_IMAGE } from "@/src/lib/api";

export type GalleryCategoryType =
  | "BANDARA"
  | "MAKKAH"
  | "MADINAH"
  | "MANASIK"
  | "LAINNYA";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategoryType | string;
  imageUrl: string;
  createdAt?: string;
}

const FILTER_TABS: { key: "ALL" | GalleryCategoryType; label: string }[] = [
  { key: "ALL", label: "Semua Dokumentasi" },
  { key: "BANDARA", label: "Bandara" },
  { key: "MAKKAH", label: "Makkah" },
  { key: "MADINAH", label: "Madinah" },
  { key: "MANASIK", label: "Manasik Ibadah" },
  { key: "LAINNYA", label: "Lain-lain" },
];

export default function Projects() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<"ALL" | GalleryCategoryType>("ALL");

  useEffect(() => {
    fetchGalleriesFromApi().then((data) => {
      setGalleries(data);
      setLoading(false);
    });
  }, []);

  const filteredGalleries =
    activeCategory === "ALL"
      ? galleries
      : galleries.filter((item) => item.category === activeCategory);

  return (
    <section
      id="projects"
      className="scroll-mt-24 pg pj vp mr oj wp nr bg-slate-50/70 dark:bg-gray-950"
    >
      {/* Section Title Start */}
      <div className="animate_top bb ze rj ki xn vq">
        <h2 className="fk vj pr kk wm on/5 gq/2 bb _b">
          Galeri Dokumentasi &amp; Kegiatan Jemaah
        </h2>
        <p className="bb on/5 wo/5 hq">
          Momen penuh keberkahan dan kebersamaan para jemaah PT El Noor Mutsa
          Maria (PPIU: 9120004492234002) selama menunaikan ibadah di Tanah Suci.
        </p>
      </div>
      {/* Section Title End */}

      <div className="bb ze ki xn 2xl:ud-px-0 jb">
        {/* Project Filter Tabs */}
        <div className="projects-tab _e bb tc uf wf xf cg rg hh rm vk xm si ti fc flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`project-tab-btn ek rg ml il vi mi cursor-pointer transition-colors ${
                  isActive
                    ? "gh lk !bg-[#1BC033] !text-white"
                    : "hover:!text-[#1BC033]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Item Wrapper */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 pb-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[380px] rounded-[28px] bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredGalleries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 pb-6">
            {filteredGalleries.map((item) => (
              <div
                key={item.id}
                style={{
                  boxShadow:
                    "0 20px 40px -12px rgba(15, 23, 42, 0.16), 0 4px 16px -4px rgba(15, 23, 42, 0.08)",
                }}
                className="rounded-[28px] overflow-hidden bg-white border border-slate-200/80 flex flex-col select-none"
              >
                {/* Gambar */}
                <div className="relative h-72 w-full bg-gray-100">
                  <Image
                    src={item.imageUrl || FALLBACK_IMAGE}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>

                {/* Title dengan Background Putih & Teks Hitam */}
                <div className="bg-white px-6 py-5">
                  <h4 className="text-lg font-bold text-black leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-14 my-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Belum ada foto dokumentasi untuk kategori{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {FILTER_TABS.find((t) => t.key === activeCategory)?.label}
              </span>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}