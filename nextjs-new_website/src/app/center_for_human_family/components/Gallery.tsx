import Placeholder from "./Placeholder";
import styles from "./Gallery.module.css";

interface GalleryProps {
  label: string;
  items: readonly string[];
  /** One path per item, in the same order; empty entries stay grey. */
  srcs?: readonly string[];
}

export default function Gallery({ label, items, srcs }: GalleryProps) {
  return (
    <section className={`chf-container ${styles.gallery}`} aria-label={label}>
      <ul className={styles.row}>
        {items.map((item, index) => (
          <li key={item}>
            <Placeholder
              className={styles.item}
              ratio="236 / 420"
              label={item}
              src={srcs?.[index] || undefined}
              sizes="(max-width: 767px) 50vw, 236px"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
