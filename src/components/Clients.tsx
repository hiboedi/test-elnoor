import Image from "next/image";

interface BrandItem {
  id: number;
  name: string;
  logo: string;
  href: string;
  imgClass?: string;
}

const brandsData: BrandItem[] = [
  {
    id: 1,
    name: "Saudia Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Saudia_Logo.svg",
    href: "https://www.saudia.com",
  },
  {
    id: 2,
    name: "Garuda Indonesia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Garuda_Indonesia_logo.svg",
    href: "https://www.garuda-indonesia.com",
  },
  {
    id: 3,
    name: "Pullman Hotels",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Pullman_Hotels_%26_Resorts_logo.svg",
    href: "#!",
  },
  {
    id: 4,
    name: "Hilton Hotels",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Hilton_Hotels_%26_Resorts_logo.svg",
    href: "#!",
  },
  {
    id: 5,
    name: "Bank Syariah Indonesia (BSI)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg",
    href: "https://www.bankbsi.co.id",
  },
  {
    id: 6,
    name: "Bank Muamalat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Bank_Muamalat_Logo.svg",
    href: "https://www.bankmuamalat.co.id",
  },
];

export default function Clients() {
  return (
    <section className="pj vp mr py-12">
      {/* Section Title Start */}
      <div className="animate_top bb ze rj ki xn vq text-center">
        <h2 className="fk vj pr kk wm on/5 gq/2 bb _b font-bold text-2xl sm:text-3xl mb-3">
          Mitra Maskapai, Hotel & Perbankan Resmi
        </h2>
        <p className="bb on/5 wo/5 hq text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
          PT El Noor Mutsa Maria (PPIU: 9120004492234002) bekerjasama dengan maskapai penerbangan terkemuka, grup hotel terdepan di Makkah & Madinah, serta bank syariah resmi penampung setoran ibadah.
        </p>
      </div>
      {/* Section Title End */}

      <div className="bb ze ah ch pm hj xp ki xn 2xl:ud-px-49 bc mt-10">
        <div className="wc rf qn zf cp kq xf wf flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {brandsData.map((brand) => (
            <a
              key={brand.id}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rc animate_top flex items-center justify-center p-2"
              title={brand.name}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={130}
                height={45}
                unoptimized
                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105 dark:invert dark:hover:invert-0"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}