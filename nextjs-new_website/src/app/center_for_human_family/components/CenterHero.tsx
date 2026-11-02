import Image from "next/image";
import styles from "./CenterHero.module.css";

interface CenterHeroProps {
  partners: readonly string[];
}

export default function CenterHero({ partners }: CenterHeroProps) {
  return (
    <header className={`relative ${styles.hero}`}>
      <Image
        className={`absolute -z-10 h-auto rounded-[25px] object-cover max-[768px]:rounded-[20px] ${styles.image}`}
        src="/images/center-for-human-family/center-rendering.png"
        alt="Architectural rendering of the Center for the Human Family, surrounded by gardens"
        width={1385}
        height={779}
        sizes="(max-width: 1440px) 96vw, 1385px"
        priority
      />
      <div className="relative">
        <div
          className="ml-auto mr-[33px] h-[120px] w-[308px] bg-[#d9d9d9] max-[768px]:mr-0 max-[768px]:h-[60px] max-[768px]:w-[154px]"
          role="img"
          aria-label="ThinkRound logo placeholder"
        />
        <div className={`grid items-start ${styles.row}`}>
          <section
            className="mt-[20px] text-black max-[1251px]:mt-0"
            aria-labelledby="chf-partners-heading"
          >
            <h2
              className="m-0 text-[24px] leading-[28px] font-semibold text-inherit max-[1101px]:text-center max-[768px]:text-[22px]"
              id="chf-partners-heading"
            >
              In Partnership With
            </h2>
            <ul className="mt-[18px] mb-0 grid max-w-[372px] list-none grid-cols-4 gap-[12px] p-0 max-[1101px]:mx-auto max-[768px]:mt-[20px] max-[768px]:max-w-[320px] max-[768px]:grid-cols-2 max-[768px]:gap-x-[16px] max-[768px]:gap-y-[18px]">
              {partners.map((partner) => (
                <li
                  className="flex flex-col items-center gap-[4px] text-center"
                  key={partner}
                >
                  <span
                    className="size-[68px] rounded-[16px] bg-[#d9d9d9] max-[1251px]:size-[56px]"
                    aria-hidden="true"
                  />
                  <span className="text-[20px] leading-[29px] font-semibold max-[1251px]:text-[16px] max-[768px]:text-[17px] max-[768px]:leading-[24px]">
                    {partner}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <div className="flex items-start gap-[26px] max-[1251px]:items-center max-[1251px]:gap-[20px] max-[1101px]:row-start-1 max-[1101px]:justify-center max-[768px]:gap-[14px]">
            <Image
              className="mt-[7px] block size-[134px] flex-none max-[1251px]:mt-0 max-[1251px]:size-[100px] max-[768px]:size-[68px]"
              src="/images/center-for-human-family/purple-ring.svg"
              alt=""
              width={134}
              height={134}
            />
            <h1
              className={`m-0 font-bold text-[#701a99] ${styles.title}`}
              id="chf-title"
            >
              <span className="block">CENTER FOR THE</span>
              <span className="block">HUMAN FAMILY</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
