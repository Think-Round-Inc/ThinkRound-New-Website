import styles from "./VideoSection.module.css";

interface VideoSectionProps {
  heading: string;
}

/**
 * The lavender band with the "learn by doing" film.
 *
 * The frame is a still placeholder for now. When the video is added to Sanity,
 * replace the inner <div className={styles.frame}> with the player; the band,
 * heading and sizing around it stay as they are.
 */
export default function VideoSection({ heading }: VideoSectionProps) {
  return (
    <section className={styles.band} aria-labelledby="chf-video">
      <div className="chf-container">
        <h2 className={styles.heading} id="chf-video">
          {heading}
        </h2>

        <div
          className={styles.frame}
          role="img"
          aria-label="Placeholder for the film about learning by doing"
        >
          <span className={styles.playButton} aria-hidden="true">
            <svg viewBox="0 0 44 50" className={styles.playIcon}>
              <path d="M44 25 0 50V0z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
