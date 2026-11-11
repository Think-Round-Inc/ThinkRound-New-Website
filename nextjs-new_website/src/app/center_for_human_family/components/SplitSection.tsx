import type { CSSProperties } from "react";

import Placeholder from "./Placeholder";

export interface SplitSectionProps {
  id: string;
  heading: string;
  /** Paragraphs inside a group run together; groups are separated by a gap. */
  paragraphGroups: readonly (readonly string[])[];
  imageSide: "left" | "right";
  imageRatio: string;
  imageLabel: string;
  imageSrc?: string;
  /** Figma measurements for this section, at 1440px. */
  columns: string;
  gap: number;
  paddingTop: number;
  paddingTopMd?: number;
  paddingTopSm?: number;
  /** Space between paragraph groups — 16px in The Story, 8px elsewhere. */
  groupGap?: number;
  /** The design drops the Artists text below the top of its image. */
  textOffset?: number;
}

/**
 * Body copy beside an image: The Story, What Is The Center and Artists.
 *
 * They are the same layout with different numbers, so the numbers arrive as
 * props and the shape lives in chf.css under .chf-split.
 */
export default function SplitSection({
  id,
  heading,
  paragraphGroups,
  imageSide,
  imageRatio,
  imageLabel,
  imageSrc,
  columns,
  gap,
  paddingTop,
  paddingTopMd,
  paddingTopSm,
  groupGap,
  textOffset,
}: SplitSectionProps) {
  const measurements = {
    "--chf-split-cols": columns,
    "--chf-split-gap": `${gap}px`,
    "--chf-split-pad": `${paddingTop}px`,
    "--chf-split-gap-md": "48px",
    "--chf-split-gap-sm": "32px",
    ...(paddingTopMd ? { "--chf-split-pad-md": `${paddingTopMd}px` } : {}),
    ...(paddingTopSm ? { "--chf-split-pad-sm": `${paddingTopSm}px` } : {}),
    ...(groupGap ? { "--chf-split-group-gap": `${groupGap}px` } : {}),
    ...(textOffset ? { "--chf-split-offset": `${textOffset}px` } : {}),
  } as CSSProperties;

  return (
    <section
      className="chf-container chf-split"
      style={measurements}
      data-image={imageSide}
      aria-labelledby={id}
    >
      <div className="chf-split-text">
        <h2 className="chf-heading" id={id}>
          {heading}
        </h2>
        {paragraphGroups.map((group) => (
          <div className="chf-split-group" key={group[0]}>
            {group.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>

      <Placeholder ratio={imageRatio} label={imageLabel} src={imageSrc} />
    </section>
  );
}
