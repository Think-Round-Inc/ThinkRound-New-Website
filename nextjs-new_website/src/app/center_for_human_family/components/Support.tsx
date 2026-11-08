import Link from "next/link";

import Placeholder from "./Placeholder";
import styles from "./Support.module.css";

interface SupportProps {
  title: string;
  heading: string;
  paragraphs: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  imageSrc?: string;
}

/**
 * The closing white section. Its top edge is the same dome as the lavender
 * band, mirrored — white rising back into the lavender above it.
 */
export default function Support({
  title,
  heading,
  paragraphs,
  ctaLabel,
  ctaHref,
  imageSrc,
}: SupportProps) {
  return (
    <section className={styles.section} aria-labelledby="chf-support">
      <div className="chf-container">
        <p className={styles.title}>{title}</p>

        <div className={styles.columns}>
          <div className={styles.text}>
            <h2 className={styles.heading} id="chf-support">
              {heading}
            </h2>
            {paragraphs.map((paragraph) => (
              <p className={styles.paragraph} key={paragraph}>
                {paragraph}
              </p>
            ))}
            <Link className={styles.cta} href={ctaHref}>
              {ctaLabel}
            </Link>
          </div>

          <Placeholder
            ratio="458 / 492"
            label="supporters at The Center"
            src={imageSrc}
          />
        </div>
      </div>
    </section>
  );
}
