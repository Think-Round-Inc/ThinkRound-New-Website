import type { Metadata } from "next";
import { Lato } from "next/font/google";

import About from "./components/About";
import Artists from "./components/Artists";
import ClosingNote from "./components/ClosingNote";
import Culinary from "./components/Culinary";
import Floors from "./components/Floors";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import LavenderBand from "./components/LavenderBand";
import ParadiseProject from "./components/ParadiseProject";
import Story from "./components/Story";
import Support from "./components/Support";
import VideoSection from "./components/VideoSection";
import WhatWeDo from "./components/WhatWeDo";
import {
  about,
  artists,
  closingNote,
  culinary,
  floors,
  gallery,
  hero,
  images,
  paradise,
  story,
  support,
  video,
  whatWeDo,
} from "./content";
import "./chf.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-chf-lato",
});

export const metadata: Metadata = {
  title: "Center for the Human Family | ThinkRound",
  description:
    "Discover Think Round’s vision for the Center for the Human Family. Earth is home. Humans are family.",
};

export default function CenterForHumanFamilyPage() {
  return (
    <article className={`chf-page ${lato.variable}`}>
      <Hero {...hero} />
      <Story {...story} imageSrc={images.story || undefined} />
      <VideoSection {...video} />
      <About {...about} imageSrc={images.about || undefined} />
      <Gallery {...gallery} srcs={images.gallery} />
      <Floors {...floors} />
      <Artists {...artists} imageSrc={images.artists || undefined} />
      <WhatWeDo {...whatWeDo} />

      <LavenderBand>
        <ParadiseProject
          {...paradise}
          heroSrc={images.paradiseDome || undefined}
          blockSrcs={[
            images.paradiseHolographicEarth,
            images.paradiseArmatures,
            images.paradiseStainedGlassCeiling,
          ]}
        />
        <Culinary
          {...culinary}
          featureSrc={images.visitorsAndPortraits || undefined}
          blockSrcs={[images.culinaryKitchens, images.balcony]}
        />
        <ClosingNote {...closingNote} />
      </LavenderBand>

      <Support {...support} imageSrc={images.support || undefined} />
    </article>
  );
}
