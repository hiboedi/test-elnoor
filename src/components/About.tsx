import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 ji gp uq 2xl:ud-py-35 pg">
      <div className="bb ze ki xn wq">
        <div className="tc wf gg qq">
          {/* About Images */}
          <div className="animate_left xc gn gg jn/2 i">
            <div>
              <Image
                src="/images/shape-05.svg"
                alt="Shape"
                width={100}
                height={100}
                className="h -ud-left-5 x"
              />
              <Image
                src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=800&auto=format&fit=crop"
                alt="Suasana Ibadah di Masjidil Haram Makkah"
                width={300}
                height={320}
                className="ib rounded-2xl shadow-lg object-cover aspect-[3/3.2]"
              />
              <Image
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop"
                alt="Masjid Nabawi Madinah"
                width={300}
                height={260}
                className="rounded-2xl shadow-lg object-cover aspect-[3/2.6]"
              />
            </div>
            <div>
              <Image
                src="/images/shape-06.svg"
                alt="Shape"
                width={100}
                height={100}
              />
              <Image
                src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=800&auto=format&fit=crop"
                alt="Jemaah Haji & Umrah PT El Noor Mutsa Maria"
                width={300}
                height={340}
                className="ob gb rounded-2xl shadow-lg object-cover aspect-[3/3.4]"
              />
              <Image
                src="/images/shape-07.svg"
                alt="Shape"
                width={100}
                height={100}
                className="bb"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="animate_right jn/2">
            <h4 className="ek yj mk gb text-[#1BC033] font-semibold">
              Mengapa Memilih Kami
            </h4>
            <h2 className="fk vj zp pr kk wm qb">
              Melayani Perjalanan Suci Anda dengan Sepenuh Hati &amp; Sesuai
              Syariat.
            </h2>
            <p className="uo leading-relaxed">
              <strong>PT El Noor Mutsa Maria</strong> (Izin PPIU:
              9120004492234002) adalah penyelenggara perjalanan ibadah umrah dan
              haji khusus resmi dan terpercaya di Indonesia. Kami berkomitmen
              memberikan kepastian jadwal keberangkatan, kenyamanan akomodasi
              terdekat dari pelataran masjid, serta bimbingan ibadah yang
              khusyuk sesuai tuntunan Al-Qur&apos;an dan Sunnah.
            </p>

            <a
              href="/#projects"
              className="vc wf hg mb inline-flex items-center gap-3 group"
            >
              <span className="tc wf xf be dd rg i gh ua !bg-[#1BC033]">
                <span className="nf h vc yc vd rg gh qk -ud-z-1 !bg-[#1BC033]"></span>
                <Image
                  src="/images/icon-play.svg"
                  alt="Play"
                  width={18}
                  height={18}
                />
              </span>
              <span className="kk group-hover:text-[#1BC033] transition-colors">
                LIHAT DOKUMENTASI JAMAAH
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}