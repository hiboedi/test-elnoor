"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role: string; // Menampilkan asal kota & paket ibadah jemaah
  rating: number;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "Alhamdulillah perjalanan Umrah VVIP bersama PT El Noor Mutsa Maria sangat berkesan. Jarak hotel sangat dekat dengan Masjidil Haram, pembimbing manasik ustadznya ramah dan sangat sesuai sunnah.",
    name: "H. Ahmad Subagja",
    role: "Jemaah Umrah Eksekutif - Bandung",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Pelayanan dari awal pendaftaran hingga kepulangan ke tanah air luar biasa cepat dan transparan. Legalitas resmi PPIU bikin hati tenang selama menunaikan ibadah.",
    name: "Hj. Siti Rahmawati",
    role: "Jemaah Umrah Reguler - Jakarta",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Ibadah Haji Furoda bersama El Noor benar-benar prioritas. Maktab di Arafah & Mina sangat nyaman, muthawwif siaga 24 jam mendampingi kondisi kesehatan jemaah.",
    name: "Dr. Hendra Wijaya",
    role: "Jemaah Haji Khusus - Surabaya",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Bimbingan manasiknya intensif dan dipandu ustadz ahli siroh. Ziarah ke Makkah dan Madinah dijelaskan secara mendalam, membuat ibadah terasa lebih khusyuk.",
    name: "Ust. M. Ridwan",
    role: "Jemaah Umrah Plus Taif - Medan",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "Sangat bersyukur memilih PT El Noor Mutsa Maria untuk umrah perdana keluarga. Bus executive nyaman, makanan masakan Indonesia cocok di lidah.",
    name: "Bpk. Bambang Triyono",
    role: "Jemaah Paket Keluarga - Semarang",
    rating: 5,
  },
  {
    id: 6,
    quote:
      "Fasilitas hotel bintang 5 sesuai dengan yang dijanjikan di brosur. Tidak ada biaya tersembunyi, penanganan dokumen dan visa sangat profesional.",
    name: "Hj. Nurul Aini",
    role: "Jemaah Umrah VVIP - Makassar",
    rating: 5,
  },
  {
    id: 7,
    quote:
      "Tim pendamping di Tanah Suci sangat sabar membimbing jemaah lansia seperti ibu saya. Pelayanan ramah 24 jam benar-benar terbukti.",
    name: "Ahmad Fauzi",
    role: "Jemaah Umrah Reguler - Yogyakarta",
    rating: 5,
  },
  {
    id: 8,
    quote:
      "Pengalaman spiritual yang tak terlupakan. Hotel di Madinah hanya beberapa langkah ke Raudhah. Terima kasih PT El Noor Mutsa Maria!",
    name: "Hj. Ratna Sari",
    role: "Jemaah Umrah Ramadhan - Palembang",
    rating: 5,
  },
  {
    id: 9,
    quote:
      "Penyelenggara haji dan umrah yang amanah. Keberangkatan tepat waktu tanpa kendala penerbangan. InsyaAllah akan berangkat lagi bersama El Noor.",
    name: "H. Supriyadi",
    role: "Jemaah Haji Khusus - Balikpapan",
    rating: 5,
  },
  {
    id: 10,
    quote:
      "Manasik sebelum berangkat sangat lengkap. Semua pertanyaan jemaah dijawab tuntas. Fasilitas bus ziarah dingin dan nyaman.",
    name: "Dewi Lestari",
    role: "Jemaah Umrah Reguler - Bekasi",
    rating: 5,
  },
];

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 pt-16 pb-16 lg:pt-24 lg:pb-24 hj rp hr"
    >
      {/* Section Title Start */}
      <div className="animate_top bb ze rj ki xn vq">
        <h2 className="fk vj pr kk wm on/5 gq/2 bb _b">Testimoni Jemaah Kami</h2>
        <p className="bb on/5 wo/5 hq">
          Pengalaman dan kesan mendalam dari para jemaah yang telah menunaikan ibadah Haji & Umrah bersama PT El Noor Mutsa Maria (PPIU: 9120004492234002).
        </p>
      </div>
      {/* Section Title End */}

      <div className="bb ze ki xn ar">
        <div className="animate_top jb cq">
          <div className="testimonial-01 relative">
            {mounted && (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={{
                  prevEl: ".testimonial-prev",
                  nextEl: ".testimonial-next",
                }}
              >
                {testimonialsData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="i hh rm sg vk xm bi qj p-8 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-gray-800 shadow-xl">
                      {/* Border Shape Decorative */}
                      <span className="rc je md/2 gh xg h q r"></span>
                      <span className="rc je md/2 mh yg h q p"></span>

                      <div className="flex flex-col space-y-4">
                        {/* Rating Bintang 5 Emas */}
                        <div className="flex items-center space-x-1">
                          {[...Array(item.rating)].map((_, index) => (
                            <svg
                              key={index}
                              className="w-6 h-6 text-[#D4AF37]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Icon Quote & Isi Kesan Jemaah */}
                        <div className="space-y-3">
                          <Image
                            src="/images/icon-quote.svg"
                            alt="Quote"
                            width={36}
                            height={36}
                          />
                          <p className="ek ik xj _p kc fb text-base sm:text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
                            &ldquo;{item.quote}&rdquo;
                          </p>
                        </div>

                        {/* Identitas Jemaah */}
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                          <span className="block ek xj kk wm zb font-bold text-lg text-gray-900 dark:text-white">
                            {item.name}
                          </span>
                          <span className="block text-xs font-semibold text-[#D4AF37] mt-0.5">
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Swiper Navigation Buttons */}
            <div className="tc wf xf fg jb mt-8 flex justify-center items-center gap-4">
              <button
                type="button"
                aria-label="Previous Testimonial"
                className="testimonial-prev swiper-button-prev c tc wf xf ie ld rg _g dh pf ml vr hh rm tl zm rl ym cursor-pointer"
              >
                <svg
                  className="th lm"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.52366 7.83336L7.99366 12.3034L6.81533 13.4817L0.333663 7.00002L6.81533 0.518357L7.99366 1.69669L3.52366 6.16669L13.667 6.16669L13.667 7.83336L3.52366 7.83336Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next Testimonial"
                className="testimonial-next swiper-button-next c tc wf xf ie ld rg _g dh pf ml vr hh rm tl zm rl ym cursor-pointer"
              >
                <svg
                  className="th lm"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}