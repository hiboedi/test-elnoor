import Image from "next/image";

interface StatItem {
  id: number;
  value: string;
  label: string;
  iconSvg: React.ReactNode;
}

const statsData: StatItem[] = [
  {
    id: 1,
    value: "10+",
    label: "Tahun Pengalaman",
    iconSvg: (
      /* Icon Globe / Jangkauan Global */
      <svg
        className="w-8 h-8 text-[#D4AF37] mb-2 animate-pulse"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    id: 2,
    value: "15.000+",
    label: "Jemaah Terberangkatkan",
    iconSvg: (
      /* Icon Pesawat Perjalanan */
      <svg
        className="w-8 h-8 text-[#D4AF37] mb-2 transform -rotate-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    id: 3,
    value: "100%",
    label: "Izin PPIU Kemenag Resmi",
    iconSvg: (
      /* Icon Verifikasi / Legalitas */
      <svg
        className="w-8 h-8 text-[#D4AF37] mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    value: "4.9/5",
    label: "Tingkat Kepuasan Jemaah",
    iconSvg: (
      /* Icon Bintang / Kepuasan Jemaah */
      <svg
        className="w-8 h-8 text-[#D4AF37] mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
];

export default function Counter() {
  return (
    <section className="i pg qh rm ji hp">
      {/* Background Shapes */}
      <Image
        src="/images/shape-11.svg"
        alt="Shape"
        width={100}
        height={100}
        className="of h ga ha ke"
      />
      <Image
        src="/images/shape-07.svg"
        alt="Shape"
        width={100}
        height={100}
        className="h ia o ae jf"
      />
      <Image
        src="/images/shape-14.svg"
        alt="Shape"
        width={100}
        height={100}
        className="h ja ka"
      />
      <Image
        src="/images/shape-15.svg"
        alt="Shape"
        width={100}
        height={100}
        className="h q p"
      />

      <div className="bb ze i va ki xn br">
        <div className="tc uf sn tn xf un gg grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="animate_top me/5 ln rj flex flex-col items-center text-center p-4"
            >
              <div className="flex justify-center items-center">
                {stat.iconSvg}
              </div>
              <h2 className="gk vj zp or kk wm hc text-3xl sm:text-4xl font-bold">
                {stat.value}
              </h2>
              <p className="ek bk aq text-xs sm:text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}