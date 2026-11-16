import Image from "next/image";
import type { ChfContent } from "../types";

import styles from "./Hero.module.css";

export default function Hero({
  title,
  titleLines,
  partnersHeading,
  partners,
}: ChfContent["hero"]) {
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
          {title ||
            titleLines.map((line) => (
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
            <li key={partner._key}>
              {partner.href ? (
                <a
                  className={`chf-partner-link ${styles.partner}`}
                  href={partner.href}
                >
                  <PartnerDetails partner={partner} />
                </a>
              ) : (
                <div className={styles.partner}>
                  <PartnerDetails partner={partner} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </header>
  );
}

function PartnerDetails({
  partner,
}: {
  partner: ChfContent["hero"]["partners"][number];
}) {
  return (
    <>
      {partner.logo.src ? (
        <span className={`relative overflow-hidden ${styles.partnerLogo}`}>
          <Image
            src={partner.logo.src}
            alt={partner.logo.label}
            fill
            sizes="103px"
            className="object-contain"
          />
        </span>
      ) : (
        <span className={styles.partnerLogo} aria-hidden="true" />
      )}
      <span className={styles.partnerName}>{partner.name}</span>
    </>
  );
}
