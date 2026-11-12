"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ScrollToTop from "@/src/components/ScrollToTop";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        {/* ===== 404 Start ===== */}
        <section className="i pg fh rm ej np er fj op fr">
          {/* Bg Shapes */}
          <Image
            src="/images/shape-06.svg"
            alt="Shape"
            width={100}
            height={100}
            className="h j k"
          />
          <Image
            src="/images/shape-03.svg"
            alt="Shape"
            width={100}
            height={100}
            className="h l m"
          />
          <Image
            src="/images/shape-17.svg"
            alt="Shape"
            width={100}
            height={100}
            className="h n o"
          />
          <Image
            src="/images/shape-18.svg"
            alt="Shape"
            width={100}
            height={100}
            className="h p q"
          />

          <div className="animate_top bb xe rj">
            <Image
              src="/images/404.svg"
              alt="404"
              width={400}
              height={300}
              className="bb fb"
            />

            <h2 className="ek tj eo kk wm gb">
              Sorry, the page can’t be found
            </h2>
            <p className="hb">
              The page you were looking for appears to have been moved, deleted
              or does not exist.
            </p>

            <Link href="/" className="ek vc rg gh lk ml il _l gi hi">
              Back to Home
            </Link>
          </div>
        </section>
        {/* ===== 404 End ===== */}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}