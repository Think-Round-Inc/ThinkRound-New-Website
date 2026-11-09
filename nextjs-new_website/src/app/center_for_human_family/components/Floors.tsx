import Placeholder from "./Placeholder";
import styles from "./Floors.module.css";

interface FloorsProps {
  gallery: { readonly label: string; readonly items: readonly string[] };
  gallerySrcs?: readonly string[];
  heading: string;
  items: readonly { readonly title: string; readonly body: string }[];
}

/** The three-step glyph on the floors badge and on each floor card. */
function StairsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 2h8v20h-8zM8 9h7v13H8zM0 16h7v6H0z" />
    </svg>
  );
}

export default function Floors({
  gallery,
  gallerySrcs,
  heading,
  items,
}: FloorsProps) {
  return (
    <>
      {/* Four tall tiles, inset from the content edges. */}
      <section
        className="chf-container pt-[122px] max-[1250px]:pt-[80px] max-[767px]:pt-[56px]"
        aria-label={gallery.label}
      >
        <ul className="m-0 grid list-none grid-cols-[repeat(4,236px)] justify-center gap-[72px] p-0 max-[1250px]:grid-cols-[repeat(4,minmax(0,1fr))] max-[1250px]:gap-[24px] max-[767px]:grid-cols-[repeat(2,minmax(0,1fr))] max-[767px]:gap-[16px]">
          {gallery.items.map((item, index) => (
            <li key={item}>
              <Placeholder
                ratio="236 / 420"
                label={item}
                radius={16}
                src={gallerySrcs?.[index] || undefined}
                sizes="(max-width: 767px) 50vw, 236px"
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        className={`chf-container ${styles.floors}`}
        aria-labelledby="chf-floors"
      >
        <span className={styles.badge} aria-hidden="true">
          <StairsIcon className="size-[62px] max-[767px]:size-[40px]" />
        </span>

        {/*
          Inline, not a utility class: chf.css is unlayered, so its margin
          would beat a Tailwind margin utility.
        */}
        <h2
          className="chf-heading-center"
          style={{ marginTop: 28 }}
          id="chf-floors"
        >
          {heading}
        </h2>

        <ul className={styles.cards}>
          {items.map((floor) => (
            <li className={styles.card} key={floor.title}>
              <div className="flex items-center gap-[11px]">
                <span className={styles.cardIcon} aria-hidden="true">
                  <StairsIcon className="size-[21px]" />
                </span>
                <h3 className={styles.cardTitle}>{floor.title}</h3>
              </div>
              <p className="mt-[22px] mb-0">{floor.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
