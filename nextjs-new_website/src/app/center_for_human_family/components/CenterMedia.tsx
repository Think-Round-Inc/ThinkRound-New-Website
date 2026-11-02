import Image from "next/image";

export default function CenterMedia() {
  return (
    <section
      className="chf-media"
      aria-label="Exhibition rendering and unfinished media previews"
    >
      {/* No slides or navigation targets are supplied in this frame. */}
      <div
        className="chf-media-navigation"
        role="group"
        aria-label="Gallery navigation unavailable until slides are provided"
      >
        <button
          className="chf-gallery-arrow chf-gallery-arrow--previous"
          type="button"
          aria-label="Previous image (unavailable)"
          disabled
        >
          <Image
            src="/images/center-for-human-family/arrow-previous.svg"
            alt=""
            width={48.6949}
            height={42.1711}
          />
        </button>
        <button
          className="chf-gallery-arrow chf-gallery-arrow--next"
          type="button"
          aria-label="Next image (unavailable)"
          disabled
        >
          <Image
            src="/images/center-for-human-family/arrow-next.svg"
            alt=""
            width={48.6949}
            height={42.1711}
          />
        </button>
      </div>
      <div
        className="chf-media-circle chf-media-circle--right"
        role="img"
        aria-label="Unfinished circular media placeholder"
      >
        <Image
          src="/images/center-for-human-family/media-circle.svg"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <Image
        className="chf-exhibition-image"
        src="/images/center-for-human-family/immersive-exhibition.png"
        alt="Concept rendering of visitors experiencing family portraits, audio stations, and an illuminated globe inside the Center"
        width={653}
        height={357}
        sizes="(max-width: 767px) 90vw, 653px"
      />
      <div
        className="chf-media-circle chf-media-circle--left"
        role="img"
        aria-label="Unfinished circular media placeholder"
      >
        <Image
          src="/images/center-for-human-family/media-circle.svg"
          alt=""
          width={100}
          height={100}
        />
      </div>
    </section>
  );
}
