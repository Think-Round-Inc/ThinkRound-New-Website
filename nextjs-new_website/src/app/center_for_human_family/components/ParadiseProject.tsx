import Placeholder from "./Placeholder";
import SplitBlock, { type SplitBlockData } from "./SplitBlock";
import styles from "./ParadiseProject.module.css";

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
      className={`chf-container ${styles.paradise}`}
      aria-labelledby="chf-paradise"
    >
      <h2 className={styles.heading} id="chf-paradise">
        {heading}
      </h2>
      <p className={styles.intro}>{intro}</p>

      <Placeholder
        className={styles.hero}
        ratio="1089 / 616"
        label={heroImageLabel}
        src={heroSrc}
        sizes="(max-width: 1250px) 100vw, 1089px"
      />

      <div className={styles.blocks}>
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
