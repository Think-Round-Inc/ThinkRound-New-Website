import Placeholder from "./Placeholder";
import styles from "./Story.module.css";

interface StoryProps {
  heading: string;
  imageSrc?: string;
  paragraphs: readonly string[];
}

export default function Story({ heading, paragraphs, imageSrc }: StoryProps) {
  return (
    <section
      className={`chf-container ${styles.story}`}
      aria-labelledby="chf-story"
    >
      <div className="chf-prose">
        <h2 className="chf-heading" id="chf-story">
          {heading}
        </h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <Placeholder
        ratio="458 / 401"
        label="rendering of The Center"
        src={imageSrc}
      />
    </section>
  );
}
