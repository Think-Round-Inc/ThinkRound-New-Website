import styles from "./ClosingNote.module.css";

interface ClosingNoteProps {
  lines: readonly string[];
  socialLabels: readonly string[];
}

export default function ClosingNote({ lines, socialLabels }: ClosingNoteProps) {
  return (
    <section
      className={`chf-container ${styles.closing}`}
      aria-label="Get in touch"
    >
      {lines.map((line) => (
        <p className={styles.line} key={line}>
          {line}
        </p>
      ))}

      <ul className={styles.socials}>
        {socialLabels.map((label) => (
          <li key={label}>
            {/* Icons and links still to come from Think Round. */}
            <span className={styles.icon} role="img" aria-label={label} />
          </li>
        ))}
      </ul>
    </section>
  );
}
