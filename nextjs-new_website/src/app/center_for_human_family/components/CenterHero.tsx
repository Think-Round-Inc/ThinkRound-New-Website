import Image from "next/image";

interface CenterHeroProps {
  partners: readonly string[];
}

export default function CenterHero({ partners }: CenterHeroProps) {
  return (
    <header className="chf-hero">
      <Image
        className="chf-hero-image"
        src="/images/center-for-human-family/center-rendering.png"
        alt="Architectural rendering of the Center for the Human Family, surrounded by gardens"
        width={1385}
        height={779}
        sizes="(max-width: 1440px) 96vw, 1385px"
        priority
      />
      <div className="chf-hero-content">
        <div
          className="chf-logo-placeholder"
          role="img"
          aria-label="ThinkRound logo placeholder"
        />
        <div className="chf-hero-row">
          <section
            className="chf-partners"
            aria-labelledby="chf-partners-heading"
          >
            <h2 className="chf-partners-heading" id="chf-partners-heading">
              In Partnership With
            </h2>
            <ul className="chf-partners-list">
              {partners.map((partner) => (
                <li className="chf-partner" key={partner}>
                  <span
                    className="chf-partner-placeholder"
                    aria-hidden="true"
                  />
                  <span className="chf-partner-name">{partner}</span>
                </li>
              ))}
            </ul>
          </section>
          <div className="chf-brand">
            <Image
              className="chf-ring"
              src="/images/center-for-human-family/purple-ring.svg"
              alt=""
              width={134}
              height={134}
            />
            <h1 className="chf-title" id="chf-title">
              <span className="chf-title-line">CENTER FOR THE</span>
              <span className="chf-title-line chf-title-line--larger">
                HUMAN FAMILY
              </span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
