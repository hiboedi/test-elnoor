import Image from "next/image";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="i pg ji bg-gradient-to-r from-[#138a24] via-[#1BC033] to-[#27d640] relative overflow-hidden">
      {/* Bg Shape */}
      <Image
        className="h p q opacity-25 mix-blend-overlay pointer-events-none select-none z-0"
        src="/images/shape-16.svg"
        alt="Bg Shape"
        width={400}
        height={400}
      />

      <div className="bb ye i z-10 ki xn dr">
        <div className="tc uf sn tn un gg items-center">
          <div className="animate_left to/2">
            <h2 className="fk vj zp pr text-white ac">
              Wujudkan Niat Suci ke Tanah Suci Bersama El Noor.
            </h2>
            <p className="text-white/95 leading-relaxed">
              Konsultasikan rencana perjalanan Umrah &amp; Haji Anda bersama PT
              El Noor Mutsa Maria (PPIU: 9120004492234002). Dapatkan kepastian
              jadwal, bimbingan sunnah, dan pelayanan terbaik.
            </p>
          </div>
          <div className="animate_right bf">
            <Link
              href="/#support"
              className="vc ek kk rg ol il cm gi hi !bg-white !text-[#16a32b] font-bold hover:!bg-gray-100 shadow-lg transition-all whitespace-nowrap"
            >
              Konsultasi Ibadah Gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}