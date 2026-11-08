import Placeholder from "./Placeholder";
import styles from "./About.module.css";

interface AboutProps {
  heading: string;
  imageSrc?: string;
  /** Lines within a group run together; groups are separated by a small gap. */
  paragraphGroups: readonly (readonly string[])[];
}

export default function About({
  heading,
  paragraphGroups,
  imageSrc,
}: AboutProps) {
  return (
    <section
      className={`chf-container ${styles.about}`}
      aria-labelledby="chf-about"
    >
      <Placeholder
        className={styles.media}
        ratio="456 / 692"
        label="interior rendering of The Center"
        src={imageSrc}
      />

      <div className={styles.text}>
        <h2 className="chf-heading" id="chf-about">
          {heading}
        </h2>
        {paragraphGroups.map((group) => (
          <div className={styles.group} key={group[0]}>
            {group.map((paragraph) => (
              <p className={styles.paragraph} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
