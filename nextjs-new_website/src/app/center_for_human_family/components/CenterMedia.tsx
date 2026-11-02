import Image from "next/image";

export default function CenterMedia() {
  return (
    <section
      className="px-[27px] max-[768px]:px-[16px]"
      aria-label="Exhibition rendering and unfinished media previews"
    >
      {/*No slides or navigation targets are supplied in this frame.*/}
      <div
        className="mt-[49px] flex items-center justify-between max-[768px]:mt-[32px]"
        role="group"
        aria-label="Gallery navigation unavailable until slides are provided"
      >
        <button
          className="grid size-[57px] cursor-default place-items-center border-0 bg-transparent p-0"
          type="button"
          aria-label="Previous image (unavailable)"
          disabled
        >
          <Image
            className="rotate-[-89.72deg]"
            src="/images/center-for-human-family/arrow-previous.svg"
            alt=""
            width={48.6949}
            height={42.1711}
          />
        </button>
        <button
          className="grid size-[57px] cursor-default place-items-center border-0 bg-transparent p-0"
          type="button"
          aria-label="Next image (unavailable)"
          disabled
        >
          <Image
            className="rotate-[89.69deg]"
            src="/images/center-for-human-family/arrow-next.svg"
            alt=""
            width={48.6949}
            height={42.1711}
          />
        </button>
      </div>
      <div
        className="my-[96px] mr-[20%] ml-auto size-[100px] max-[768px]:my-[56px] max-[768px]:mr-[12%]"
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
        className="ml-[40px] block aspect-[653/357] h-auto w-[653px] max-w-[calc(100%-80px)] object-cover max-[768px]:ml-0 max-[768px]:max-w-full"
        src="/images/center-for-human-family/immersive-exhibition.png"
        alt="Concept rendering of visitors experiencing family portraits, audio stations, and an illuminated globe inside the Center"
        width={653}
        height={357}
        sizes="(max-width: 767px) 90vw, 653px"
      />
      <div
        className="mt-[96px] ml-[21%] size-[100px] max-[768px]:mt-[56px]"
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
