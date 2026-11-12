"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectItem {
  id: number;
  title: string;
  categoryText: string;
  image: string;
  categories: ("umrah" | "ziarah" | "manasik")[];
  gridClass: string;
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Ibadah Tawaf & Sa'i",
    categoryText: "Dokumentasi Umrah",
    image:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1000&auto=format&fit=crop",
    categories: ["umrah"],
    gridClass: "jn/2 to/3",
  },
  {
    id: 2,
    title: "Ziarah Jabal Rahmah & Arafah",
    categoryText: "Ziarah Makkah",
    image:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
    categories: ["ziarah"],
    gridClass: "jn/2 to/3",
  },
  {
    id: 3,
    title: "Kunjungan Masjid Nabawi",
    categoryText: "Dokumentasi Madinah",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
    categories: ["umrah", "ziarah"],
    gridClass: "jn/2 to/3",
  },
  {
    id: 4,
    title: "Bimbingan Manasik Pra-Keberangkatan",
    categoryText: "Persiapan Jemaah",
    image:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop",
    categories: ["manasik"],
    gridClass: "vo/3",
  },
];

export default function Projects() {
  const [filterTab, setFilterTab] = useState<number>(1);

  const isVisible = (categories: ("umrah" | "ziarah" | "manasik")[]) => {
    if (filterTab === 1) return true;
    if (filterTab === 2 && categories.includes("umrah")) return true;
    if (filterTab === 3 && categories.includes("ziarah")) return true;
    if (filterTab === 4 && categories.includes("manasik")) return true;
    return false;
  };

  return (
    <section id="projects" className="scroll-mt-24 pg pj vp mr oj wp nr">
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
        {/* Project Tab */}
        <div className="projects-tab _e bb tc uf wf xf cg rg hh rm vk xm si ti fc">
          <button
            type="button"
            onClick={() => setFilterTab(1)}
            className={`project-tab-btn ek rg ml il vi mi cursor-pointer transition-colors ${
              filterTab === 1
                ? "gh lk !bg-[#1BC033] !text-white"
                : "hover:!text-[#1BC033]"
            }`}
          >
            Semua Dokumentasi
          </button>
          <button
            type="button"
            onClick={() => setFilterTab(2)}
            className={`project-tab-btn ek rg ml il vi mi cursor-pointer transition-colors ${
              filterTab === 2
                ? "gh lk !bg-[#1BC033] !text-white"
                : "hover:!text-[#1BC033]"
            }`}
          >
            Ibadah Umrah
          </button>
          <button
            type="button"
            onClick={() => setFilterTab(3)}
            className={`project-tab-btn ek rg ml il vi mi cursor-pointer transition-colors ${
              filterTab === 3
                ? "gh lk !bg-[#1BC033] !text-white"
                : "hover:!text-[#1BC033]"
            }`}
          >
            Ziarah Makkah &amp; Madinah
          </button>
          <button
            type="button"
            onClick={() => setFilterTab(4)}
            className={`project-tab-btn ek rg ml il vi mi cursor-pointer transition-colors ${
              filterTab === 4
                ? "gh lk !bg-[#1BC033] !text-white"
                : "hover:!text-[#1BC033]"
            }`}
          >
            Manasik Ibadah
          </button>
        </div>

        {/* Projects item wrapper */}
        <div className="projects-wrapper tc -ud-mx-5">
          <div className="project-sizer"></div>

          {projectsData.map(
            (item) =>
              isVisible(item.categories) && (
                <div
                  key={item.id}
                  className={`project-item wi fb vd ${item.gridClass} ${item.categories.join(
                    " "
                  )}`}
                >
                  <div className="c i pg sg z-1 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={420}
                      className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 hover:scale-105"
                    />

                    <div className="h s r df nl kl im tc sf wf xf vd yc sg al hh/20 z-10">
                      <h4 className="ek tj kk hc">{item.title}</h4>
                      <p>{item.categoryText}</p>
                      <a
                        className="c tc wf xf ie ld rg _g !bg-[#1BC033] hover:!bg-[#16a32b] !text-white ml il ph jm km jc transition-colors"
                        href="#support"
                        title="Tanyakan Jadwal Keberangkatan"
                      >
                        <svg
                          className="th lm ml il"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4763 6.16664L6.00634 1.69664L7.18467 0.518311L13.6663 6.99998L7.18467 13.4816L6.00634 12.3033L10.4763 7.83331H0.333008V6.16664H10.4763Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}