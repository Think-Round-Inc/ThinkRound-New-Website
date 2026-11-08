import StairsIcon from "./StairsIcon";
import styles from "./Floors.module.css";

interface FloorsProps {
  heading: string;
  items: readonly { readonly title: string; readonly body: string }[];
}

export default function Floors({ heading, items }: FloorsProps) {
  return (
    <section
      className={`chf-container ${styles.floors}`}
      aria-labelledby="chf-floors"
    >
      <span className={styles.badge} aria-hidden="true">
        <StairsIcon className={styles.badgeIcon} />
      </span>

      <h2 className={styles.heading} id="chf-floors">
        {heading}
      </h2>

      <ul className={styles.cards}>
        {items.map((floor) => (
          <li className={styles.card} key={floor.title}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden="true">
                <StairsIcon className={styles.cardIconGlyph} />
              </span>
              <h3 className={styles.cardTitle}>{floor.title}</h3>
            </div>
            <p className={styles.cardBody}>{floor.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
