"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lato, Cormorant_Infant } from "next/font/google";
import { COMMUNITY_DETAILS, COMMUNITY_DETAIL_LABELS } from "./communityDetails";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const cormorantInfant = Cormorant_Infant({ subsets: ["latin"], weight: ["500"] });
const DETAIL_SECTIONS = Object.keys(COMMUNITY_DETAIL_LABELS) as (keyof typeof COMMUNITY_DETAIL_LABELS)[];
type CommunitySlug = keyof typeof COMMUNITY_DETAILS;

type Community = {
  name: string;
  subtitle?: string;
  slug: { current: string };
  image?: { alt?: string };
  imageUrl?: string;
  paintingCount?: number;
  familyCount?: number;
  comingSoon?: boolean;
  launchDate?: string;
};

type Props = {
  communities: Community[];
};

function CommunityActions({
  community,
  expanded,
  onToggleDetails,
}: {
  community: Community;
  expanded: boolean;
  onToggleDetails: () => void;
}) {
  const slug = community.slug.current;
  const detailsId = `community-details-${slug}`;

  return (
    <div className="mt-6 grid grid-cols-1 gap-3 xl:grid-cols-2">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={onToggleDetails}
        className={`${lato.className} inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F4F2F7] px-4 py-3 text-sm font-bold text-[#5C3A84] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A84] sm:text-base`}
      >
        {expanded ? "Hide Details" : "View Details"}
      </button>
      <Link
        href={`/paradise_project/${slug}`}
        aria-label={`Explore ${community.name} paintings`}
        className={`${lato.className} inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#5C3A84] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#482D6A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A84] sm:text-base`}
      >
        Explore <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

function CommunityDetails({ community, expanded }: { community: Community; expanded: boolean }) {
  const slug = community.slug.current;
  const details: Partial<Record<keyof typeof COMMUNITY_DETAIL_LABELS, string>> = COMMUNITY_DETAILS[slug as CommunitySlug];
  const [activeSection, setActiveSection] = useState<keyof typeof COMMUNITY_DETAIL_LABELS>("artist");
  const detailsId = `community-details-${slug}`;

  return (
    <div
      id={detailsId}
      hidden={!expanded}
      aria-label={`${community.name} details`}
      className="border-t border-[#D8CEE5] bg-white/70 px-5 py-5 sm:px-7 lg:col-span-2"
    >
      <div className="flex flex-wrap gap-2" aria-label={`${community.name} detail sections`}>
        {DETAIL_SECTIONS.map((section) => (
          <button
            key={section}
            type="button"
            aria-pressed={activeSection === section}
            onClick={() => setActiveSection(section)}
            className={`${lato.className} rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A84] ${
              activeSection === section
                ? "border-[#5C3A84] bg-[#5C3A84] text-white"
                : "border-[#D8CEE5] bg-white text-[#4B3B5B] hover:bg-[#F4F2F7]"
            }`}
          >
            {COMMUNITY_DETAIL_LABELS[section]}
          </button>
        ))}
      </div>
      <div className="mt-5 max-h-[32rem] overflow-y-auto rounded-xl bg-white p-4 sm:p-6">
        <h4 className={`${lato.className} text-xl font-bold text-[#2F2439]`}>
          {COMMUNITY_DETAIL_LABELS[activeSection]}
        </h4>
        <p className={`${lato.className} mt-3 whitespace-pre-line text-base leading-7 text-[#352F39]`}>
          {details[activeSection] || "Details coming soon."}
        </p>
      </div>
    </div>
  );
}

export default function CommunitiesSection({ communities }: Props) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const toggleDetails = (slug: string) => setExpandedSlug((current) => (current === slug ? null : slug));

  return (
    <section className="w-full bg-[#faf8f3] px-3 py-16 sm:px-6 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-[114rem] grid-cols-1 gap-6 xl:grid-cols-2">
        {communities.map((community) => {
          const slug = community.slug?.current;
          if (!slug) return null;

          return (
            <article
              key={slug}
              className="group overflow-hidden rounded-2xl bg-[#EDE8F4] ring-1 ring-[#E1D9EA] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex sm:min-h-[17rem] sm:flex-row sm:bg-[#fffdf8] sm:ring-black/10"
            >
              <div className="w-full sm:w-[42%] sm:shrink-0 sm:p-3 lg:p-4">
                <div className="relative aspect-[1.4] w-full overflow-hidden bg-[#E0D9E8] sm:h-full sm:min-h-[15rem] sm:aspect-auto sm:rounded-md sm:bg-gray-100">
                  {community.imageUrl && (
                    <Image
                      src={community.imageUrl}
                      alt={community.image?.alt || `${community.name} community artwork`}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 42vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
              </div>

              <div className="flex-1 p-5 sm:flex sm:flex-col sm:justify-center sm:p-6 lg:p-8">
                <p className={`${lato.className} mb-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#9b6c35] sm:mb-3`}>
                  Faith &amp; Community
                </p>
                <h3 className={`${cormorantInfant.className} text-[2.2rem] leading-none text-black lg:text-[2.8rem]`}>
                  {community.name}
                </h3>
                <p className={`${lato.className} mt-3 text-[0.95rem] text-black/70`}>
                  {community.subtitle || "Explore families, traditions, culture and shared stories."}
                </p>

                <div className="mt-5 flex items-center gap-5 sm:mt-6">
                  <div>
                    <p className={`${cormorantInfant.className} text-2xl leading-none text-black`}>
                      {community.paintingCount || "X"}
                    </p>
                    <p className={`${lato.className} mt-1 text-[0.7rem] text-black/60`}>paintings</p>
                  </div>
                  <div className="h-10 w-px bg-black/15" />
                  <div>
                    <p className={`${cormorantInfant.className} text-2xl leading-none text-black`}>
                      {community.familyCount || "X"}
                    </p>
                    <p className={`${lato.className} mt-1 text-[0.7rem] text-black/60`}>families</p>
                  </div>
                  {community.comingSoon && (
                    <p className={`${lato.className} ml-auto text-right text-xs font-bold text-[#69577B]`}>
                      Coming soon{community.launchDate ? ` · ${community.launchDate}` : ""}
                    </p>
                  )}
                </div>

                <CommunityActions
                  community={community}
                  expanded={expandedSlug === slug}
                  onToggleDetails={() => toggleDetails(slug)}
                />
              </div>

              <CommunityDetails community={community} expanded={expandedSlug === slug} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
