import Image from "next/image";

import styles from "./Hero.module.css";

interface HeroProps {
  /** Each entry renders on its own line. */
  titleLines: readonly string[];
  partnersHeading: string;
  partners: readonly string[];
}

export default function Hero({
  titleLines,
  partnersHeading,
  partners,
}: HeroProps) {
  return (
    <header className={`chf-container ${styles.hero}`}>
      <div className={styles.lockup}>
        <Image
          className={styles.ring}
          src="/images/center-for-human-family/purple-ring.svg"
          alt=""
          width={311}
          height={311}
          priority
        />
        <h1 className={styles.title}>
          {titleLines.map((line) => (
            <span className={styles.titleLine} key={line}>
              {line}
            </span>
          ))}
        </h1>
      </div>

      <section className={styles.partners} aria-labelledby="chf-partners">
        <h2 className={styles.partnersHeading} id="chf-partners">
          {partnersHeading}
        </h2>
        <ul className={styles.partnerList}>
          {partners.map((partner) => (
            <li className={styles.partner} key={partner}>
              {/* Partner logos still need exporting from Figma. */}
              <span className={styles.partnerLogo} aria-hidden="true" />
              <span className={styles.partnerName}>{partner}</span>
            </li>
          ))}
        </ul>
      </section>
    </header>
  );
}
