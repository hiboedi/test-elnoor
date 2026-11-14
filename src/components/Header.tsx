"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function Header() {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setStickyMenu(window.pageYOffset > 20);
    };

    // Otomatis tutup menu mobile saat layar diperbesar ke desktop (>= 1024px)
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
      return "!text-gray-900 dark:!text-gray-100 lg:!text-white hover:!text-[#1BC033]";
    }
    if (isHome && !stickyMenu) {
      return "!text-white hover:!text-[#1BC033]";
    }
    return "!text-gray-800 dark:!text-gray-200 hover:!text-[#1BC033]";
  };

  return (
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
          className={`flex-1 lg:flex lg:items-center lg:justify-between lg:static lg:w-auto lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:p-0 lg:border-0 ${
            navigationOpen
              ? "block absolute top-full left-0 w-full bg-white dark:bg-gray-950 shadow-xl p-6 z-50 border-t border-gray-100 dark:border-gray-800"
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

              {/* Dropdown Menu */}
              <li className="relative">
                {/* <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`xl font-medium whitespace-nowrap transition-colors flex items-center justify-between lg:justify-start w-full lg:w-auto gap-1.5 cursor-pointer ${
                    ["/blog", "/signin", "/signup"].some((p) =>
                      pathname.startsWith(p)
                    )
                      ? "!text-[#1BC033] font-semibold"
                      : getNavTextColor()
                  }`}
                >
                  <span>Lainnya</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </button> */}

                <ul
                  className={`${
                    dropdownOpen ? "block" : "hidden"
                  } mt-2 lg:mt-3 lg:absolute lg:top-full lg:left-0 bg-gray-50 lg:bg-white dark:bg-gray-900 lg:shadow-xl rounded-xl py-2.5 pl-4 lg:pl-0 space-y-1 lg:w-52 border border-gray-100 dark:border-gray-800 z-50`}
                >
                  <li>
                    <Link
                      href="/#projects"
                      onClick={() => {
                        setDropdownOpen(false);
                        setNavigationOpen(false);
                      }}
                      className="block px-4 py-2 text-sm !text-gray-800 dark:!text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:!text-[#1BC033] whitespace-nowrap transition-colors"
                    >
                      Galeri Dokumentasi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#testimonials"
                      onClick={() => {
                        setDropdownOpen(false);
                        setNavigationOpen(false);
                      }}
                      className="block px-4 py-2 text-sm !text-gray-800 dark:!text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:!text-[#1BC033] whitespace-nowrap transition-colors"
                    >
                      Testimoni Jemaah
                    </Link>
                  </li>
                </ul>
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

          {/* Right Action Area (Theme Toggle + Auth Buttons) */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-5 mt-6 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-200 dark:border-gray-800 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Dark Mode"
              className={`p-2 rounded-full transition-colors cursor-pointer self-start lg:self-auto ${
                isHome && !stickyMenu
                  ? "!text-gray-800 dark:!text-gray-200 lg:!text-white hover:bg-gray-100 lg:hover:bg-white/15"
                  : "!text-gray-700 dark:!text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {mounted && theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <Link
              href="/signin"
              onClick={() => setNavigationOpen(false)}
              className={`font-medium text-sm whitespace-nowrap transition-colors text-center lg:text-left ${
                isHome && !stickyMenu
                  ? "!text-gray-900 dark:!text-white lg:!text-white hover:!text-[#1BC033]"
                  : "!text-gray-800 dark:!text-white hover:!text-[#1BC033]"
              }`}
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              onClick={() => setNavigationOpen(false)}
              className="bg-[#1BC033] hover:bg-[#16a32b] !text-white text-sm font-semibold rounded-full px-6 py-2.5 transition-all whitespace-nowrap text-center shadow-md"
            >
              Daftar Umrah
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}