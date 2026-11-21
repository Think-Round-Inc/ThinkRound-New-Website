import Link from "next/link";
import type { Route } from "next";

import Placeholder from "./Placeholder";
import RichText from "./RichText";
import type { ChfContent } from "../types";

/**
 * The closing white section. Its top edge is the same dome as the lavender
 * band, mirrored — white rising back into the lavender above it.
 */
export default function Support({
  title,
  heading,
  body,
  ctaLabel,
  ctaHref,
  image,
}: ChfContent["support"]) {
  return (
    <section
      className="chf-dome bg-white pb-[120px] max-[767px]:pb-[72px]"
      aria-labelledby="chf-support"
    >
      <div className="chf-container">
        <p className="m-0 pt-[40px] text-center text-[63px] leading-[76px] font-bold text-[var(--chf-purple)] max-[1250px]:text-[44px] max-[1250px]:leading-[54px] max-[767px]:pt-[24px] max-[767px]:text-[30px] max-[767px]:leading-[38px]">
          {title}
        </p>

        <div className="mt-[64px] grid grid-cols-[minmax(0,687fr)_minmax(0,456fr)] items-start gap-[81px] max-[1250px]:gap-[48px] max-[767px]:mt-[40px] max-[767px]:grid-cols-[minmax(0,1fr)] max-[767px]:gap-[32px]">
          <div className="min-w-0">
            <h2
              className="mt-0 mb-[22px] text-[40px] leading-[48px] font-bold text-[var(--chf-heading)] max-[767px]:text-[28px] max-[767px]:leading-[36px]"
              id="chf-support"
            >
              {heading}
            </h2>
            <RichText value={body} />
            {ctaHref && ctaLabel ? (
              <Link
                className="mt-[32px] flex h-[55px] w-[175px] items-center justify-center rounded-[10px] bg-[var(--chf-purple)] text-[16px] leading-none text-white no-underline transition-colors duration-150 hover:bg-[var(--chf-purple-dark)] focus-visible:outline-[3px] focus-visible:outline-offset-[5px] focus-visible:outline-[var(--chf-purple)]"
                href={ctaHref as Route}
              >
                {ctaLabel}
              </Link>
            ) : null}
          </div>

          <Placeholder ratio="458 / 492" {...image} />
        </div>
      </div>
    </section>
  );
}
