import { League_Spartan } from "next/font/google";
type Props = {
  heading2: string;
  paragraph: string;
};
const leagueSpartan = League_Spartan({ subsets: ["latin"] });
export default function HeroSection({ heading2, paragraph }: Props) {
  return (
    <>
      {/* Hero Section */}
      <section className=" px-6 py-12  flex flex-col   xl:mx-120 lg:mx-80 md:mx-35 sm:mx-10">
        <div>
          <h2
            className="font-semibold mb-4 "
            style={{
              fontSize: "clamp(1.8em, 5vw, 3.5em)",
              fontWeight: 300,
              fontFamily: leagueSpartan.style.fontFamily,
              color: "#000",
              lineHeight: "1em",
            }}
          >
            {heading2}
          </h2>
        </div>
        <div>
          <p
            style={{
              fontSize: "clamp(1em, 4vw, 1.8em)",
            }}
          >
            {paragraph}
          </p>
        </div>
      </section>
    </>
  );
}
