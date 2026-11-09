import type { CSSProperties } from "react";

import Placeholder from "./Placeholder";

export interface SplitBlockData {
  readonly imageSide: string;
  readonly imageLabel: string;
  readonly imageRatio?: string;
  readonly caption?: string;
  readonly paragraphs: readonly string[];
}

/** Gap between the image and the text in every split block, from the Figma. */
const GAP = 84;
const CONTENT = 1224;

/**
 * An image on one side and body copy on the other, with an optional caption
 * under the image. Column widths come from the image's design width, so a wide
 * image (the dome ceiling) automatically gets a narrow text column.
 */
export default function SplitBlock({
  imageSide,
  imageLabel,
  imageRatio = "458 / 234",
  imageSrc,
  caption,
  paragraphs,
}: SplitBlockData & { imageSrc?: string }) {
  const imageWidth = Number.parseInt(imageRatio, 10);
  const textWidth = CONTENT - GAP - imageWidth;
  const imageFirst = imageSide === "left";

  const columns = imageFirst
    ? `minmax(0, ${imageWidth}fr) minmax(0, ${textWidth}fr)`
    : `minmax(0, ${textWidth}fr) minmax(0, ${imageWidth}fr)`;

  return (
    <div
      className="chf-split"
      data-image={imageFirst ? "left" : "right"}
      data-mobile="image-first"
      style={{ "--chf-split-cols": columns } as CSSProperties}
    >
      <div className="min-w-0 [&>p]:mb-[16px] [&>p:last-child]:mb-0">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <figure className="m-0 min-w-0">
        <Placeholder ratio={imageRatio} label={imageLabel} src={imageSrc} />
        {caption ? (
          <figcaption className="mt-[10px] text-[14px] leading-[19px]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
