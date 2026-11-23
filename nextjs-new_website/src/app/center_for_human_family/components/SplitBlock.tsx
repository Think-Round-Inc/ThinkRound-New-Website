import type { CSSProperties } from "react";

import Placeholder from "./Placeholder";
import RichText from "./RichText";
import type { SplitBlockData } from "../types";

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
  image,
  imageRatio = "458 / 234",
  caption,
  statement,
  body,
}: SplitBlockData) {
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
      <div className="min-w-0">
        <RichText value={body} />
        {statement ? (
          <p className="mt-[16px] mb-0 text-[26px] leading-[34px]">
            {statement}
          </p>
        ) : null}
      </div>

      <figure className="m-0 min-w-0">
        <Placeholder ratio={imageRatio} {...image} />
        {caption ? (
          <figcaption className="mt-[10px] text-[14px] leading-[19px]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
