import Placeholder from "./Placeholder";
import styles from "./Artists.module.css";

interface ArtistsProps {
  heading: string;
  imageSrc?: string;
  paragraphGroups: readonly (readonly string[])[];
}

export default function Artists({
  heading,
  paragraphGroups,
  imageSrc,
}: ArtistsProps) {
  return (
    <section
      className={`chf-container ${styles.artists}`}
      aria-labelledby="chf-artists"
    >
      <div className={styles.text}>
        <h2 className="chf-heading" id="chf-artists">
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

      <Placeholder
        ratio="456 / 488"
        label="gallery space for Bay Area artists"
        src={imageSrc}
      />
    </section>
  );
}
