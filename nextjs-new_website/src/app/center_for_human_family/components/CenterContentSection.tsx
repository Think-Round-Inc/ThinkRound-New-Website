import type { ReactNode } from "react";

interface CenterContentSectionProps {
  id: string;
  title: string;
  variant: "story" | "about";
  media: ReactNode;
  children: ReactNode;
}

export default function CenterContentSection({
  id,
  title,
  variant,
  media,
  children,
}: CenterContentSectionProps) {
  return (
    <section
      className={`chf-section chf-section--${variant}`}
      aria-labelledby={id}
    >
      <div className="chf-section-copy">
        <h2 className="chf-section-heading" id={id}>
          {title}
        </h2>
        <div className="chf-section-body">{children}</div>
      </div>
      {media}
    </section>
  );
}
