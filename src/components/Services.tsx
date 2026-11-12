import React from "react";

interface ServiceItem {
  id: number;
  iconSvg: React.ReactNode;
  title: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Paket Umrah Reguler & VVIP",
    description:
      "Pilihan paket perjalanan umrah bervariasi dengan akomodasi hotel bintang 3 hingga bintang 5 dekat masjid.",
    iconSvg: (
      <svg
        className="w-10 h-10 text-[#1BC033]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M10 9h4"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Haji Khusus & Furoda",
    description:
      "Layanan pendaftaran ibadah haji tanpa antre panjang dengan fasilitas prioritas dan pendampingan penuh.",
    iconSvg: (
      <svg
        className="w-10 h-10 text-[#1BC033]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17l2-10 4 4 3-6 3 6 4-4 2 10H3z"
        />
        <circle cx="12" cy="5" r="1" fill="currentColor" />
        <circle cx="5" cy="8" r="1" fill="currentColor" />
        <circle cx="19" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Bimbingan Manasik Sunnah",
    description:
      "Pelatihan dan bimbingan manasik intensif oleh ustaz/muthawwif berpengalaman sesuai tuntunan Al-Qur'an & Sunnah.",
    iconSvg: (
      <svg
        className="w-10 h-10 text-[#1BC033]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Pengurusan Visa & Dokumen",
    description:
      "Proses penerbitan visa umrah/haji, asuransi perjalanan, serta verifikasi dokumen yang cepat dan aman.",
    iconSvg: (
      <svg
        className="w-10 h-10 text-[#1BC033]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
        <circle cx="12" cy="8" r="1.5" stroke="currentColor" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Transportasi Executive AC",
    description:
      "Kenyamanan armada bus executive AC terbaru untuk perjalanan ziarah di Makkah, Madinah, dan Jeddah.",
    iconSvg: (
      <svg
        className="w-10 h-10 text-[#1BC033]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zM5 17V6a2 2 0 012-2h10a2 2 0 012 2v11M5 11h14M7 8h2m6 0h2"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Layanan Ziarah Lengkap",
    description:
      "Kunjungan ke tempat-tempat bersejarah di Tanah Suci dengan penjelasan siroh nabawiyah dari pembimbing.",
    iconSvg: (
      <svg
        className="w-10 h-10 text-[#1BC033]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 lj tp kr">
      {/* Section Title */}
      <div className="animate_top bb ze rj ki xn vq">
        <h2 className="fk vj pr kk wm on/5 gq/2 bb _b">
          Layanan Terbaik PT El Noor Mutsa Maria
        </h2>
        <p className="bb on/5 wo/5 hq">
          Sebagai penyelenggara perjalanan ibadah resmi (PPIU: 9120004492234002),
          kami siap menghadirkan pengalaman ibadah ke Tanah Suci yang aman,
          nyaman, dan penuh keberkahan.
        </p>
      </div>

      {/* Services Grid */}
      <div className="bb ze ki xn yq mb en">
        <div className="wc qf pn xo ng">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="animate_top sg oi pi zq ml il am cn _m flex flex-col items-start group hover:border-[#1BC033]/40 transition-colors"
            >
              <div className="mb-4 p-3 rounded-2xl bg-[#1BC033]/10 inline-flex items-center justify-center group-hover:bg-[#1BC033]/15 transition-colors">
                {service.iconSvg}
              </div>
              <h4 className="ek zj kk wm nb _b group-hover:text-[#1BC033] transition-colors">
                {service.title}
              </h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}