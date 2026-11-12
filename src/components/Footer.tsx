"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<string>("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer>
      <div className="bb ze ki xn 2xl:ud-px-0">
        {/* Footer Top */}
        <div className="ji gp">
          <div className="tc uf ap gg fp">
            {/* Brand Info & Legalitas */}
            <div className="animate_top zd/2 to/4">
              <Link href="/">
                <Image
                  src="/images/logo-el.svg"
                  alt="Logo PT El Noor Mutsa Maria"
                  width={160}
                  height={40}
                  className="om"
                />
                <Image
                  src="/images/logo-dark.svg"
                  alt="Logo Dark PT El Noor Mutsa Maria"
                  width={160}
                  height={40}
                  className="xc nm"
                />
              </Link>

              <p className="lc fb mt-4">
                <strong>PT El Noor Mutsa Maria</strong> — Penyelenggara Perjalanan Ibadah Umrah & Haji Khusus resmi terdaftar di Kementerian Agama RI.
              </p>

              <p className="text-xs font-semibold text-[#D4AF37] mb-2">
                No. Izin PPIU: 9120004492234002
              </p>

              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                Jl. Raya Cipatik No.52, Pataruman, Kec. Cihampelas, Kabupaten Bandung Barat, Jawa Barat 40562
              </p>

              <ul className="tc wf cg">
                <li>
                  <a href="#!" aria-label="Facebook">
                    <svg
                      className="vh ul cl il"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_48_1499)">
                        <path
                          d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1499">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#!" aria-label="Twitter / X">
                    <svg
                      className="vh ul cl il"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_48_1502)">
                        <path
                          d="M22.162 5.65593C21.3985 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4803 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52832 8.31345 7.04328 7.56059C5.55823 6.80773 4.24812 5.75098 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.54384 12.221C4.15532 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.345 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.2641 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.2301 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1502">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#!" aria-label="LinkedIn">
                    <svg
                      className="vh ul cl il"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_48_1505)">
                        <path
                          d="M6.94 5.00002C6.93974 5.53046 6.72877 6.03906 6.35351 6.41394C5.97825 6.78883 5.46944 6.99929 4.939 6.99902C4.40857 6.99876 3.89997 6.78779 3.52508 6.41253C3.1502 6.03727 2.93974 5.52846 2.94 4.99802C2.94027 4.46759 3.15124 3.95899 3.5265 3.5841C3.90176 3.20922 4.41057 2.99876 4.941 2.99902C5.47144 2.99929 5.98004 3.21026 6.35492 3.58552C6.72981 3.96078 6.94027 4.46959 6.94 5.00002ZM7 8.48002H3V21H7V8.48002ZM13.32 8.48002H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.90002 14.94 7.13002 13.28 10.16L13.32 8.48002Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1505">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Navigation */}
            <div className="vd ro tc sf rn un gg vn">
              <div className="animate_top">
                <h4 className="kk wm tj ec">Tautan Cepat</h4>
                <ul>
                  <li>
                    <Link href="/" className="sc xl vb">
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link href="/#features" className="sc xl vb">
                      Keunggulan Kami
                    </Link>
                  </li>
                  <li>
                    <Link href="/#packages" className="sc xl vb">
                      Paket Umrah & Haji
                    </Link>
                  </li>
                  <li>
                    <Link href="/#support" className="sc xl vb">
                      Konsultasi
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="animate_top">
                <h4 className="kk wm tj ec">Layanan Utama</h4>
                <ul>
                  <li>
                    <Link href="/#packages" className="sc xl vb">
                      Umrah Reguler 9 Hari
                    </Link>
                  </li>
                  <li>
                    <Link href="/#packages" className="sc xl vb">
                      Umrah Eksekutif VVIP
                    </Link>
                  </li>
                  <li>
                    <Link href="/#packages" className="sc xl vb">
                      Haji Khusus & Furoda
                    </Link>
                  </li>
                  <li>
                    <Link href="/#features" className="sc xl vb">
                      Bimbingan Manasik
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="animate_top">
                <h4 className="kk wm tj ec">Informasi & Bantuan</h4>
                <ul>
                  <li>
                    <Link href="/#about" className="sc xl vb">
                      Profil Perusahaan
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="sc xl vb">
                      Artikel & Panduan
                    </Link>
                  </li>
                  <li>
                    <Link href="/#support" className="sc xl vb">
                      Hubungi Kami
                    </Link>
                  </li>

                </ul>
              </div>

              <div className="animate_top">
                <h4 className="kk wm tj ec">Info Keberangkatan</h4>
                <p className="ac qe">
                  Dapatkan jadwal terbaru keberangkatan Umrah & promo khusus dari PT El Noor Mutsa Maria.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bh ch pm tc uf sf yo wf xf ap cg fp bj">
          <div className="animate_top">
            <ul className="tc wf gg">
              <li>
                <a href="#!" className="xl">
                  Indonesia
                </a>
              </li>
              <li>
                <a href="#!" className="xl">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <Link href="/#support" className="xl">
                  Layanan Jemaah
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate_top">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} PT El Noor Mutsa Maria (PPIU: 9120004492234002). Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}