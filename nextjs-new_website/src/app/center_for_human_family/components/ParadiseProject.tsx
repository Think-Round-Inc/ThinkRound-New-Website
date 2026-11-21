import Placeholder from "./Placeholder";
import SplitBlock from "./SplitBlock";
import RichText from "./RichText";
import type { ChfContent } from "../types";

export default function ParadiseProject({
  heading,
  intro,
  image,
  blocks,
}: ChfContent["paradise"]) {
  return (
    <section
      className="chf-container pt-[96px] max-[1250px]:pt-[72px] max-[767px]:pt-[48px]"
      aria-labelledby="chf-paradise"
    >
      <h2 className="chf-heading-center" id="chf-paradise">
        {heading}
      </h2>
      <RichText
        value={intro}
        className="mx-auto mt-[26px] max-w-[1160px] text-center max-[767px]:text-left"
      />

      {/* 1089 x 616 in the Figma — 16:9, narrower than the content column. */}
      <Placeholder
        className="mx-auto mt-[56px] max-w-[1089px] max-[767px]:mt-[32px]"
        ratio="1089 / 616"
        {...image}
        radius={12}
        sizes="(max-width: 1250px) 100vw, 1089px"
      />

      <div className="mt-[96px] grid gap-[96px] max-[1250px]:mt-[64px] max-[1250px]:gap-[64px] max-[767px]:mt-[48px] max-[767px]:gap-[48px]">
        {blocks.map((block) => (
          <SplitBlock key={block._key} {...block} />
        ))}
      </div>
    </section>
  );
}
