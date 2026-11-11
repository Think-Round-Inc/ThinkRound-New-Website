import Placeholder from "./Placeholder";
import SplitBlock, { type SplitBlockData } from "./SplitBlock";

interface CulinaryProps {
  feature: {
    readonly imageLabel: string;
    readonly caption: string;
    readonly quote: string;
  };
  blocks: readonly SplitBlockData[];
  featureSrc?: string;
  /** One path per block, in order. */
  blockSrcs?: readonly string[];
}

export default function Culinary({
  feature,
  blocks,
  featureSrc,
  blockSrcs,
}: CulinaryProps) {
  return (
    <section
      className="chf-container pt-[96px] max-[1250px]:pt-[72px] max-[767px]:pt-[48px]"
      aria-label="The Culinary Academy"
    >
      {/* Image 673px, pull-quote 467px, 84px apart. */}
      <div className="grid grid-cols-[minmax(0,673fr)_minmax(0,467fr)] items-start gap-[84px] max-[1250px]:gap-[40px] max-[767px]:grid-cols-[minmax(0,1fr)] max-[767px]:gap-[24px]">
        <figure className="m-0 min-w-0">
          <Placeholder
            ratio="673 / 369"
            label={feature.imageLabel}
            src={featureSrc}
          />
          <figcaption className="mt-[10px] text-[14px] leading-[19px]">
            {feature.caption}
          </figcaption>
        </figure>
        <p className="m-0 text-[40px] leading-[48px] font-normal text-[var(--chf-text)] max-[1250px]:text-[30px] max-[1250px]:leading-[38px] max-[767px]:text-[26px] max-[767px]:leading-[34px]">
          {feature.quote}
        </p>
      </div>

      <div className="mt-[96px] grid gap-[96px] max-[1250px]:mt-[64px] max-[1250px]:gap-[64px] max-[767px]:mt-[48px] max-[767px]:gap-[48px]">
        {blocks.map((block, index) => (
          <SplitBlock
            key={block.imageLabel}
            {...block}
            imageRatio="673 / 378"
            imageSrc={blockSrcs?.[index] || undefined}
          />
        ))}
      </div>
    </section>
  );
}
