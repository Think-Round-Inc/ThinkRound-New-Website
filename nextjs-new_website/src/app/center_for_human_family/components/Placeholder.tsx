import Image from "next/image";

import styles from "./Placeholder.module.css";

interface PlaceholderProps {
  /** Aspect ratio from the Figma frame, written as "width / height". */
  ratio: string;
  /** Describes the picture: used as alt text, or as the placeholder's label. */
  label: string;
  /**
   * Path to the exported image under /public. Leave it out and a grey box is
   * drawn instead, so the layout is right before the artwork exists.
   */
  src?: string;
  className?: string;
  /** Widths for the browser to choose from; the default suits a half-width image. */
  sizes?: string;
}

export default function Placeholder({
  ratio,
  label,
  src,
  className,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: PlaceholderProps) {
  const classes = className
    ? `${styles.placeholder} ${className}`
    : styles.placeholder;

  if (!src) {
    return (
      <div
        className={classes}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={`Placeholder for ${label}`}
      />
    );
  }

  return (
    <div className={classes} style={{ aspectRatio: ratio }}>
      <Image
        className={styles.image}
        src={src}
        alt={label}
        fill
        sizes={sizes}
      />
    </div>
  );
}
