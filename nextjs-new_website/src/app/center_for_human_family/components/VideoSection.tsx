interface VideoSectionProps {
  heading: string;
}

/**
 * The lavender band with the "learn by doing" film.
 *
 * The frame is a still placeholder. When the video is added to Sanity, replace
 * the inner div with the player; the band and sizing around it stay put.
 */
export default function VideoSection({ heading }: VideoSectionProps) {
  return (
    <section
      className="mt-[81px] bg-[var(--chf-lavender)] pt-[83px] pb-[81px] max-[1250px]:mt-[64px] max-[1250px]:py-[64px] max-[767px]:mt-[48px] max-[767px]:py-[48px]"
      aria-labelledby="chf-video"
    >
      <div className="chf-container">
        {/* Not .chf-heading-center: this one drops to 28px on phones, not 32px. */}
        <h2
          className="m-0 text-center text-[40px] leading-[48px] font-bold text-[var(--chf-heading)] max-[767px]:text-[28px] max-[767px]:leading-[36px]"
          id="chf-video"
        >
          {heading}
        </h2>

        {/* 1125 x 554 in the Figma, with square corners. */}
        <div
          className="mx-auto mt-[63px] grid aspect-[1125/554] w-full max-w-[1125px] place-items-center bg-[var(--chf-placeholder)] max-[1250px]:mt-[48px] max-[767px]:mt-[32px]"
          role="img"
          aria-label="Placeholder for the film about learning by doing"
        >
          <span
            className="grid size-[122px] place-items-center rounded-full bg-white text-black max-[767px]:size-[72px]"
            aria-hidden="true"
          >
            {/* Nudged right of true centre so the triangle reads as centred. */}
            <svg
              viewBox="0 0 44 50"
              className="ml-[8px] h-[50px] w-[44px] max-[767px]:ml-[5px] max-[767px]:h-[30px] max-[767px]:w-[26px]"
            >
              <path d="M44 25 0 50V0z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
