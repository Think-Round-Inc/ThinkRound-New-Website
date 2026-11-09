import Placeholder from "./Placeholder";
import SplitBlock, { type SplitBlockData } from "./SplitBlock";

interface ParadiseProjectProps {
  heading: string;
  intro: string;
  heroImageLabel: string;
  blocks: readonly SplitBlockData[];
  heroSrc?: string;
  /** One path per block, in order. */
  blockSrcs?: readonly string[];
}

export default function ParadiseProject({
  heading,
  intro,
  heroImageLabel,
  blocks,
  heroSrc,
  blockSrcs,
}: ParadiseProjectProps) {
  return (
    <section
      className="chf-container pt-[96px] max-[1250px]:pt-[72px] max-[767px]:pt-[48px]"
      aria-labelledby="chf-paradise"
    >
      <h2 className="chf-heading-center" id="chf-paradise">
        {heading}
      </h2>
      <p className="mx-auto mt-[26px] max-w-[1160px] text-center max-[767px]:text-left">
        {intro}
      </p>

      {/* 1089 x 616 in the Figma — 16:9, narrower than the content column. */}
      <Placeholder
        className="mx-auto mt-[56px] max-w-[1089px] max-[767px]:mt-[32px]"
        ratio="1089 / 616"
        label={heroImageLabel}
        radius={12}
        src={heroSrc}
        sizes="(max-width: 1250px) 100vw, 1089px"
      />

      <div className="mt-[96px] grid gap-[96px] max-[1250px]:mt-[64px] max-[1250px]:gap-[64px] max-[767px]:mt-[48px] max-[767px]:gap-[48px]">
        {blocks.map((block, index) => (
          <SplitBlock
            key={block.imageLabel}
            {...block}
            imageSrc={blockSrcs?.[index] || undefined}
          />
        ))}
      </div>
    </section>
  );
}
