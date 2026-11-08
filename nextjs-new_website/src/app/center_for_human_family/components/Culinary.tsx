import Placeholder from "./Placeholder";
import SplitBlock, { type SplitBlockData } from "./SplitBlock";
import styles from "./Culinary.module.css";

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
      className={`chf-container ${styles.culinary}`}
      aria-label="The Culinary Academy"
    >
      <div className={styles.feature}>
        <figure className={styles.figure}>
          <Placeholder
            ratio="673 / 369"
            label={feature.imageLabel}
            src={featureSrc}
          />
          <figcaption className={styles.caption}>{feature.caption}</figcaption>
        </figure>
        <p className={styles.quote}>{feature.quote}</p>
      </div>

      <div className={styles.blocks}>
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
