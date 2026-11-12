import Image from "next/image";
import Link from "next/link";

interface BlogItem {
  id: number;
  image: string;
  author: string;
  date: string;
  title: string;
  link: string;
}

const blogsData: BlogItem[] = [
  {
    id: 1,
    image: "/images/blog-01.png",
    author: "Musharof Chy",
    date: "25 Dec, 2025",
    title: "Free advertising for your online business",
    link: "/blog/single",
  },
  {
    id: 2,
    image: "/images/blog-02.png",
    author: "Musharof Chy",
    date: "25 Dec, 2025",
    title: "9 simple ways to improve your design skills",
    link: "/blog/single",
  },
  {
    id: 3,
    image: "/images/blog-03.png",
    author: "Musharof Chy",
    date: "25 Dec, 2025",
    title: "Tips to quickly improve your coding speed.",
    link: "/blog/single",
  },
];

export default function BlogSection() {
  return (
    <section className="ji gp uq">
      {/* Section Title Start */}
      <div className="animate_top bb ze rj ki xn vq">
        <h2 className="fk vj pr kk wm on/5 gq/2 bb _b">
          Latest Blogs & News
        </h2>
        <p className="bb on/5 wo/5 hq">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of using.
        </p>
      </div>
      {/* Section Title End */}

      <div className="bb ye ki xn vq jb jo">
        <div className="wc qf pn xo zf iq">
          {blogsData.map((blog) => (
            <div key={blog.id} className="animate_top sg vk rm xm">
              <div className="c rc i z-1 pg">
                <Image
                  className="w-full"
                  src={blog.image}
                  alt={blog.title}
                  width={370}
                  height={240}
                />

                <div className="im h r s df vd yc wg tc wf xf al hh/20 nl il z-10">
                  <Link
                    href={blog.link}
                    className="vc ek rg lk gh sl ml il gi hi"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              <div className="yh">
                <div className="tc uf wf ag jq">
                  <div className="tc wf ag">
                    <Image
                      src="/images/icon-man.svg"
                      alt="User"
                      width={16}
                      height={16}
                    />
                    <p>{blog.author}</p>
                  </div>
                  <div className="tc wf ag">
                    <Image
                      src="/images/icon-calender.svg"
                      alt="Calender"
                      width={16}
                      height={16}
                    />
                    <p>{blog.date}</p>
                  </div>
                </div>
                <h4 className="ek tj ml il kk wm xl eq lb">
                  <Link href={blog.link}>{blog.title}</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}