"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const buttonClass = "inline-flex items-center gap-1 border border-black rounded-none px-3 py-1 text-[1.125rem] lg:gap-4 lg:h-11 lg:px-3.5 lg:py-0 lg:rounded lg:text-black lg:text-[1.875rem] lg:leading-none";
const buttonHoverClass = "group-hover:bg-black group-hover:text-white lg:group-hover:text-white transition-colors";

// "›" on mobile; the Figma chevron on desktop.
function Chevron() {
  return (
    <>
      <span className="lg:hidden">›</span>
      <svg viewBox="8.59 6 7.41 12" preserveAspectRatio="none" aria-hidden="true" className="hidden lg:block w-3 h-5">
        <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor" />
      </svg>
    </>
  );
}

type Community = {
  name: string;
  subtitle?: string;
  slug: { current: string };
  image?: { asset?: { url: string }; alt?: string };
  familyCount?: number;
  paintingCount?: number;
  comingSoon?: boolean;
  launchDate?: string;
};

type ViewAll = {
  familyCount?: number;
  paintingCount?: number;
};

type Props = {
  communities: Community[];
  viewAll?: ViewAll;
};

export default function CommunitiesSection({ communities, viewAll }: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section className="bg-white w-full py-12 px-[2.3125rem] lg:pb-0 lg:px-12">
      <div className="max-w-[114rem] mx-auto">
        {/* View toggle */}
        <div className="flex justify-center gap-2 mb-8 lg:hidden">
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            className={`w-10 h-10 flex items-center justify-center rounded border ${
              view === "list" ? "bg-gray-200 border-gray-300" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className={`w-10 h-10 flex items-center justify-center rounded border ${
              view === "grid" ? "bg-gray-200 border-gray-300" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="7" height="7" fill="black" />
              <rect x="13" y="4" width="7" height="7" fill="black" />
              <rect x="4" y="13" width="7" height="7" fill="black" />
              <rect x="13" y="13" width="7" height="7" fill="black" />
            </svg>
          </button>
        </div>

        <div className={`${view === "grid" ? "grid" : "hidden"} lg:grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12`}>
          {communities.map((community) => {
            const slug = community.slug?.current;
            const imageUrl = community.image?.asset?.url;

            if (community.comingSoon) {
              return (
                <div key={slug} className="border border-gray-200 rounded-xl overflow-hidden flex flex-row h-[15rem] lg:border-[#7E7E7E] lg:rounded-2xl lg:bg-[#FCFCFC] lg:h-[25rem]">
                  <div className="flex flex-col justify-between p-8 flex-1 lg:items-center lg:text-center lg:px-0 lg:py-12">
                    <div>
                      <h3 className={`${lato.className} text-[2.75rem] lg:text-[3rem] font-normal leading-tight lg:leading-[1.2] text-black`}>{community.name}</h3>
                      <p className={`${lato.className} text-[1.25rem] lg:text-[1.875rem] lg:leading-[1.2] text-black mt-3 lg:mt-[1.625rem]`}>Coming soon</p>
                    </div>
                    <div className="mt-6">
                      <span className={`${lato.className} ${buttonClass}`}>
                        {community.launchDate || "4/5/24"} <Chevron />
                      </span>
                    </div>
                  </div>
                  <div className="w-[15rem] lg:w-[29.4375rem] flex-shrink-0 p-3 lg:pl-0 lg:py-6 lg:pr-6 flex items-stretch">
                    <div className="flex-1 rounded-lg lg:rounded-[0.9375rem] overflow-hidden bg-gray-200 lg:bg-[#D9D9D9] relative">
                      {imageUrl && (
                        <Image src={imageUrl} alt={community.image?.alt || community.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={slug} href={`/paradise_project/${slug}`} className="group border border-gray-200 rounded-xl overflow-hidden flex flex-row h-[15rem] lg:border-[#7E7E7E] lg:rounded-2xl lg:bg-[#FCFCFC] lg:h-[25rem] hover:shadow-md transition-shadow">
                <div className="flex flex-col justify-between p-8 flex-1 lg:items-center lg:text-center lg:px-0 lg:py-12">
                  <div>
                    <h3 className={`${lato.className} text-[2.75rem] lg:text-[3rem] font-normal leading-tight lg:leading-[1.2] text-black`}>{community.name}</h3>
                    <p className={`${lato.className} text-[1.25rem] lg:text-[1.875rem] lg:leading-[1.2] text-black mt-3 lg:mt-[1.625rem]`}>
                      {community.familyCount ? `${community.familyCount} families` : "X number of families"}
                    </p>
                    <p className={`${lato.className} text-[1.25rem] lg:text-[1.875rem] lg:leading-[1.2] text-black lg:mt-6`}>
                      {community.paintingCount ? `${community.paintingCount} paintings` : "X number of paintings"}
                    </p>
                  </div>
                  <div className="mt-6">
                    <span className={`${lato.className} ${buttonClass} ${buttonHoverClass}`}>
                      Explore <Chevron />
                    </span>
                  </div>
                </div>
                <div className="w-[15rem] lg:w-[29.4375rem] flex-shrink-0 p-3 lg:pl-0 lg:py-6 lg:pr-6 flex items-stretch">
                  <div className="flex-1 rounded-lg lg:rounded-[0.9375rem] overflow-hidden bg-gray-200 lg:bg-[#D9D9D9] relative">
                    {imageUrl && (
                      <Image src={imageUrl} alt={community.image?.alt || community.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}

          {/* View All — always last */}
          <Link href="/paradise_project/all" className="group border border-gray-200 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 min-h-[15rem] lg:border-[#7E7E7E] lg:rounded-2xl lg:bg-[#FCFCFC] lg:h-[25rem] lg:justify-start lg:px-0 lg:py-12 hover:shadow-md transition-shadow">
            <h3 className={`${lato.className} text-[2.75rem] lg:text-[3rem] font-normal leading-tight lg:leading-[1.2] text-black text-center`}>View All</h3>
            <p className={`${lato.className} text-[1.25rem] lg:text-[1.875rem] lg:leading-[1.2] text-black mt-3 lg:mt-[1.625rem] text-center`}>
              {viewAll?.familyCount ? `${viewAll.familyCount} families` : "X number of families"}
            </p>
            <p className={`${lato.className} text-[1.25rem] lg:text-[1.875rem] lg:leading-[1.2] text-black lg:mt-6 text-center`}>
              {viewAll?.paintingCount ? `${viewAll.paintingCount} paintings` : "X number of paintings"}
            </p>
            <div className="mt-6 lg:mt-auto">
              <span className={`${lato.className} ${buttonClass} ${buttonHoverClass}`}>
                Explore <Chevron />
              </span>
            </div>
          </Link>
        </div>

        <div className={`${view === "list" ? "flex" : "hidden"} lg:hidden flex-col max-w-md mx-auto divide-y divide-gray-200`}>
          {communities.map((community, index) => {
            const slug = community.slug?.current;
            const imageUrl = community.image?.asset?.url;
            const partLabel = ROMAN_NUMERALS[index] ?? `${index + 1}`;

            return (
              <div key={slug ?? index} className="flex flex-col items-center text-center py-8 first:pt-0">
                <h3 className={`${lato.className} text-[1.5rem] text-black`}>
                  Part {partLabel}: {community.name}
                </h3>
                {community.subtitle && (
                  <p className={`${lato.className} italic text-gray-500 mt-1`}>{community.subtitle}</p>
                )}
                {imageUrl && (
                  <div className="relative w-full aspect-[4/3] mt-4 rounded-lg overflow-hidden bg-gray-200">
                    <Image src={imageUrl} alt={community.image?.alt || community.name} fill className="object-cover" sizes="100vw" />
                  </div>
                )}
                <div className="mt-4">
                  {community.comingSoon ? (
                    <span className={`${lato.className} inline-flex items-center gap-1 border border-black rounded-none px-3 py-1 text-[1rem]`}>
                      {community.launchDate || "4/5/24"} <span>›</span>
                    </span>
                  ) : (
                    <Link
                      href={`/paradise_project/${slug}`}
                      className={`${lato.className} inline-flex items-center gap-1 border border-black rounded-none px-3 py-1 text-[1rem] hover:bg-black hover:text-white transition-colors`}
                    >
                      Explore <span>›</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}

          {/* View All — always last */}
          <div className="flex flex-col items-center text-center py-8">
            <h3 className={`${lato.className} text-[1.5rem] text-black`}>View All Paintings</h3>
            <div className="mt-4">
              <Link
                href="/paradise_project/all"
                className={`${lato.className} inline-flex items-center gap-1 border border-black rounded-none px-3 py-1 text-[1rem] hover:bg-black hover:text-white transition-colors`}
              >
                Explore <span>›</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
