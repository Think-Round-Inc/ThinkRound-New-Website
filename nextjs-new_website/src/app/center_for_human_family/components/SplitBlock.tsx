import Placeholder from "./Placeholder";
import styles from "./SplitBlock.module.css";

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

  const media = (
    <figure className={styles.figure}>
      <Placeholder ratio={imageRatio} label={imageLabel} src={imageSrc} />
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );

  const text = (
    <div className={styles.text}>
      {paragraphs.map((paragraph) => (
        <p className={styles.paragraph} key={paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );

  const imageFirst = imageSide === "left";

  return (
    <div
      className={styles.block}
      style={{
        gridTemplateColumns: imageFirst
          ? `minmax(0, ${imageWidth}fr) minmax(0, ${textWidth}fr)`
          : `minmax(0, ${textWidth}fr) minmax(0, ${imageWidth}fr)`,
      }}
    >
      {imageFirst ? media : text}
      {imageFirst ? text : media}
    </div>
  );
}
