import type { ReactNode } from "react";
import styles from "./CenterContentSection.module.css";

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
      className={`grid items-start ${styles[variant]}`}
      aria-labelledby={id}
    >
      <div className="min-w-0">
        <h2
          className={`mt-0 text-[40px] leading-[48px] text-black max-[768px]:text-[32px] max-[768px]:leading-[40px] ${variant === "story" ? "mb-[18px] font-bold" : "mb-[24px] font-semibold"}`}
          id={id}
        >
          {title}
        </h2>
        <div className="[&_p]:mb-0">{children}</div>
      </div>
      {media}
    </section>
  );
}
