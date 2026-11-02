import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Link from "next/link";
import CenterHero from "./components/CenterHero";
import CenterContentSection from "./components/CenterContentSection";
import CenterMedia from "./components/CenterMedia";
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

const partners = ["Framer", "Autodesk", "ENSCAPE", "USanFran"] as const;

const story = {
  introduction:
    "The Center for the Human Family is conceived as a state-of-the-art museum centered on Think Round’s message:",
  message: "Earth is home. Humans are family.",
  paragraphs: [
    "Through the arts and sciences, The Center will explore issues of family, faith, ethnicity, culture, and diversity, while sharing cutting-edge knowledge about human health and the health of our planet, Earth.",
    "Creative ownership of The Center will be given to children, youth, and their families through enrichment programs Think Round offers in schools and on the world wide web that produce high-end permanent public artworks.",
    "During the pandemic Think Round designers have devoted their time to envisioning The Center for the Human Family. The renderings here are a glimpse into TRI’s twin visions: completing The Paradise Project and building The Center for the Human Family to house it. Take a look and imagine with us all that The Center can become.",
  ],
};

const about = {
  destination:
    "A destination…for families, about families, created by families",
  inspiration:
    "The inspiration…“It is my belief that the peoples of the earth live within webs of cultural and social forces, much as stars and planets exist within webs of natural forces that both bind them together and keep them apart. Though we seem to live as separate individuals, nations, cultures, and faiths, in truth we are one in our humanity.” —Heidi Hardin",
  vision: [
    "The Center for the Human Family is in planning as a destination for families, where they will go--physically, or virtually over the world wide web--not to be entertained (like at Disneyland), but to have an authentic experience of being human, of being a member of the human family.",
    "The Center for the Human Family will provide facilities for individuals and groups, families and foes, to study world religions, human spiritual evolution, consciousness, and creativity. The Center will also provide programs for social and political conflict resolution; personal and family healing, as well as arts programs that will help establish happy, healthy, and sustainable living on the planet.",
  ],
  outdoors:
    "Outdoors, we envision educational, hands-on activities related to healthy, sustainable living on the planet. We will feature urban aquaponic and vertical gardens and a variety of farms for fish and domesticated animals. These sustainable organic food sources will be cultivated for use by our Culinary Academy students and faculty utilizing best practices called for by the “Greenest Big City” in America, San Francisco. Indoors we envision interactive, calm, educational, cultural exhibitions and services to be offered at no-or-low cost to local communities, and over the internet to families from around the world.",
};

const facilities = [
  "The Center provides many facilities that aim to democratize local and global public access to the art and science of Earth as our home, and humans as family, thus spreading cultural and artistic ideas.",
  "The Auditorium serves the people of the Bay Area at no-or-low cost to hold their talks and presentation. The Conference Room serves our students for environmental science education and trauma incident reduction.",
];

export default function CenterForHumanFamilyPage() {
  return (
    <article
      className={`chf-page ${lato.variable}`}
      aria-labelledby="chf-title"
    >
      <CenterHero partners={partners} />

      <div className="chf-story-background">
        <CenterContentSection
          id="chf-story"
          title="The Story"
          variant="story"
          media={
            <div className="chf-story-media" aria-hidden="true">
              <div className="chf-placeholder chf-placeholder--wide" />
              <div className="chf-placeholder chf-placeholder--large" />
            </div>
          }
        >
          <p className="chf-story-introduction">{story.introduction}</p>
          <p className="chf-story-message">{story.message}</p>
          <div className="chf-story-paragraphs">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </CenterContentSection>
      </div>

      <CenterContentSection
        id="chf-about"
        title="What Is The Center"
        variant="about"
        media={
          <div
            className="chf-placeholder chf-placeholder--portrait"
            aria-hidden="true"
          />
        }
      >
        <div className="chf-about-copy-group">
          <p>{about.destination}</p>
          <p>{about.inspiration}</p>
        </div>
        <div className="chf-about-copy-group">
          {about.vision.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p>{about.outdoors}</p>
      </CenterContentSection>

      <div className="chf-divider" aria-hidden="true" />
      <section
        className="chf-facilities"
        aria-label="Facilities and supporting the Center"
      >
        {facilities.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link className="chf-patron-link" href="/donate">
          Become a Patron
        </Link>
      </section>    



      {/* <CenterMedia /> */}

      <div className="chf-story-background">
        <CenterContentSection
          id="chf-story"
          title="The Story"
          variant="story"
          media={
            <div className="chf-story-media" aria-hidden="true">
              <div className="chf-placeholder chf-placeholder--wide" />
              <div className="chf-placeholder chf-placeholder--large" />
            </div>
          }
        >
          <p className="chf-story-introduction">{story.introduction}</p>
          <p className="chf-story-message">{story.message}</p>
          <div className="chf-story-paragraphs">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </CenterContentSection>
      </div>
      
      <footer className="chf-closing">
        <div
          className="chf-closing-placeholders"
          role="img"
          aria-label="Five logo placeholders"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <span className="chf-closing-placeholder" key={index} />
          ))}
        </div>
        <p className="chf-closing-title">
          <span className="chf-title-line">CENTER FOR THE</span>
          <span className="chf-title-line chf-title-line--larger">
            HUMAN FAMILY
          </span>
        </p>
      </footer>
    </article>
  );
}
