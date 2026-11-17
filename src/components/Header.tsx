"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CheckBookingModal from "@/src/components/CheckBookingModal";

export default function Header() {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setStickyMenu(window.pageYOffset > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNavigationOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getNavTextColor = () => {
    if (navigationOpen) {
      return "!text-gray-900 lg:!text-white hover:!text-[#1BC033]";
    }
    if (isHome && !stickyMenu) {
      return "!text-white hover:!text-[#1BC033]";
    }
    return "!text-gray-800 hover:!text-[#1BC033]";
  };

  return (
    <>
      <header className={`g s r vd ya cj ${stickyMenu ? "hh sm _k dj bl ll" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Logo & Mobile Hamburger Toggle */}
          <div className="flex items-center justify-between w-full lg:w-auto shrink-0">
            <Link
              href="/"
              className={`inline-flex items-center transition-all duration-300 ${
                isHome && !stickyMenu
                  ? "bg-white/95 px-3.5 py-1.5 rounded-xl shadow-md backdrop-blur-sm"
                  : ""
              }`}
            >
              <Image
                src="/images/logo-el.svg"
                alt="Logo PT El Noor Mutsa Maria"
                width={145}
                height={36}
                className="om"
                priority
              />
              <Image
                src="/images/logo-dark.svg"
                alt="Logo Dark PT El Noor Mutsa Maria"
                width={140}
                height={34}
                className="xc nm"
                priority
              />
            </Link>

            {/* Hamburger Toggle BTN */}
            <button
              type="button"
              className="po rc lg:hidden"
              onClick={() => setNavigationOpen(!navigationOpen)}
              aria-label="Toggle Navigation"
            >
              <span className="rc i pf re pd">
                <span className="du-block h q vd yc">
                  <span
                    className={`rc i r s eh um tg te rd eb ml jl dl ${
                      isHome && !stickyMenu ? "!bg-white" : ""
                    } ${!navigationOpen ? "ue el" : ""}`}
                  ></span>
                  <span
                    className={`rc i r s eh um tg te rd eb ml jl fl ${
                      isHome && !stickyMenu ? "!bg-white" : ""
                    } ${!navigationOpen ? "ue qr" : ""}`}
                  ></span>
                  <span
                    className={`rc i r s eh um tg te rd eb ml jl gl ${
                      isHome && !stickyMenu ? "!bg-white" : ""
                    } ${!navigationOpen ? "ue hl" : ""}`}
                  ></span>
                </span>
                <span className="du-block h q vd yc lf">
                  <span
                    className={`rc eh um tg ml jl el h na r ve yc ${
                      isHome && !stickyMenu ? "!bg-white" : ""
                    } ${!navigationOpen ? "sd dl" : ""}`}
                  ></span>
                  <span
                    className={`rc eh um tg ml jl qr h s pa vd rd ${
                      isHome && !stickyMenu ? "!bg-white" : ""
                    } ${!navigationOpen ? "sd rr" : ""}`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          {/* Navigation & Action Area */}
          <div
            className={`flex-1 lg:flex lg:items-center lg:justify-between lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:p-0 lg:border-0 ${
              navigationOpen
                ? "block absolute top-full left-0 w-full bg-white shadow-2xl p-6 z-50 border-t border-gray-100"
                : "hidden lg:flex"
            }`}
          >
            {/* Main Menu */}
            <nav className="lg:mx-auto">
              <ul className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-7">
                <li>
                  <Link
                    href="/"
                    onClick={() => setNavigationOpen(false)}
                    className={`xl font-medium whitespace-nowrap transition-colors ${
                      isHome
                        ? "!text-[#1BC033] font-semibold"
                        : getNavTextColor()
                    }`}
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    onClick={() => setNavigationOpen(false)}
                    className={`xl font-medium whitespace-nowrap transition-colors ${getNavTextColor()}`}
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    onClick={() => setNavigationOpen(false)}
                    className={`xl font-medium whitespace-nowrap transition-colors ${getNavTextColor()}`}
                  >
                    Layanan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#packages"
                    onClick={() => setNavigationOpen(false)}
                    className={`xl font-medium whitespace-nowrap transition-colors ${getNavTextColor()}`}
                  >
                    Paket Ibadah
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#support"
                    onClick={() => setNavigationOpen(false)}
                    className={`xl font-medium whitespace-nowrap transition-colors ${getNavTextColor()}`}
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right Action Area (Tombol Cek Status dengan Padding Proporsional) */}
            <div className="flex flex-col lg:flex-row lg:items-center mt-6 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-200 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setNavigationOpen(false);
                  setIsCheckModalOpen(true);
                }}
                style={{ 
                  backgroundColor: "#1BC033", 
                  color: "#ffffff",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}
                className="bg-[#1BC033] hover:bg-[#16a32b] !text-white text-sm font-bold rounded-full transition-all whitespace-nowrap text-center shadow-lg hover:shadow-emerald-500/25 cursor-pointer inline-flex items-center justify-center"
              >
                <span>Cek Status</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Render Modal Portal Jamaah */}
      <CheckBookingModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
      />
    </>
  );
}