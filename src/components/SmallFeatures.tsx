import React from "react";

interface FeatureItem {
  id: number;
  iconSvg: React.ReactNode;
  title: string;
  description: string;
  bgClass: string;
}

const featuresData: FeatureItem[] = [
  {
    id: 1,
    title: "Pendampingan 24/7",
    description: "Tim mutawwif dan pembimbing siaga membantu kebutuhan jemaah selama di Tanah Suci.",
    bgClass: "mh",
    iconSvg: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Ibadah Sesuai Sunnah",
    description: "Bimbingan manasik dan pelaksanaan ibadah haji & umrah yang khusyuk sesuai tuntunan.",
    bgClass: "oh",
    iconSvg: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Beroperasi 10+ Tahun",
    description: "Kami telah memberangkatkan puluhan ribu Jamaah menuju Tanah Suci.",
    bgClass: "nh",
    iconSvg: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

export default function SmallFeatures() {
  return (
    <section id="features" className="pt-16 pb-12 lg:pt-24 lg:pb-16">
      <div className="bb ze ki yn 2xl:ud-px-12.5">
        <div className="tc uf zo xf ap zf bp mq">
          {featuresData.map((feature) => (
            <div key={feature.id} className="animate_top kn to/3 tc cg oq items-center">
              <div className={`tc wf xf cf ae cd rg ${feature.bgClass} flex items-center justify-center shrink-0`}>
                {feature.iconSvg}
              </div>
              <div>
                <h4 className="ek yj go kk wm xb">{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}