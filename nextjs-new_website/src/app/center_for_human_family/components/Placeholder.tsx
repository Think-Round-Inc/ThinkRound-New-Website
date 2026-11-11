import Image from "next/image";

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
  /** Corner radius in px, where the design differs from the page default. */
  radius?: number;
  /** Widths for the browser to choose from; the default suits a half-width image. */
  sizes?: string;
}

export default function Placeholder({
  ratio,
  label,
  src,
  className = "",
  radius,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: PlaceholderProps) {
  const box = `relative w-full overflow-hidden rounded-[var(--chf-radius)] bg-[var(--chf-placeholder)] ${className}`;
  const shape = {
    aspectRatio: ratio,
    ...(radius ? { borderRadius: radius } : {}),
  };

  if (!src) {
    return (
      <div
        className={box}
        style={shape}
        role="img"
        aria-label={`Placeholder for ${label}`}
      />
    );
  }

  return (
    <div className={box} style={shape}>
      <Image
        className="object-cover"
        src={src}
        alt={label}
        fill
        sizes={sizes}
      />
    </div>
  );
}
