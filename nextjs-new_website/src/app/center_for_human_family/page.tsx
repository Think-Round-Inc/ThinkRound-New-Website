import type { Metadata } from "next";
import { Lato } from "next/font/google";

import ClosingNote from "./components/ClosingNote";
import Culinary from "./components/Culinary";
import Floors from "./components/Floors";
import Hero from "./components/Hero";
import LavenderBand from "./components/LavenderBand";
import ParadiseProject from "./components/ParadiseProject";
import SplitSection from "./components/SplitSection";
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

      {/* Column widths, gaps and paddings below are Figma measurements at 1440px. */}
      <SplitSection
        id="chf-story"
        heading={story.heading}
        paragraphGroups={story.paragraphs.map((paragraph) => [paragraph])}
        groupGap={16}
        imageSide="right"
        imageRatio="458 / 401"
        imageLabel="rendering of The Center"
        imageSrc={images.story || undefined}
        columns="minmax(0, 675fr) minmax(0, 456fr)"
        gap={93}
        paddingTop={159}
        paddingTopMd={90}
        paddingTopSm={64}
      />

      <VideoSection {...video} />

      <SplitSection
        id="chf-about"
        heading={about.heading}
        paragraphGroups={about.paragraphGroups}
        imageSide="left"
        imageRatio="456 / 692"
        imageLabel="interior rendering of The Center"
        imageSrc={images.about || undefined}
        columns="minmax(0, 456fr) minmax(0, 687fr)"
        gap={81}
        paddingTop={81}
        paddingTopMd={64}
        paddingTopSm={48}
      />

      <Floors {...floors} gallery={gallery} gallerySrcs={images.gallery} />

      <SplitSection
        id="chf-artists"
        heading={artists.heading}
        paragraphGroups={artists.paragraphGroups}
        imageSide="right"
        imageRatio="456 / 488"
        imageLabel="gallery space for Bay Area artists"
        imageSrc={images.artists || undefined}
        columns="minmax(0, 687fr) minmax(0, 456fr)"
        gap={81}
        paddingTop={122}
        paddingTopMd={80}
        paddingTopSm={56}
        textOffset={101}
      />

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
