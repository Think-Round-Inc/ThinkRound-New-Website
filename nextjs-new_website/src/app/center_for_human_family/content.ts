/**
 * All copy for the Center for the Human Family page.
 *
 * Kept in one place so the components stay purely presentational. When this
 * page is wired up to Sanity, this file is what gets replaced by the query
 * result — the components take the same shapes as props either way.
 */

export const hero = {
  titleLines: ["The Center For", "The Human Family"],
  partnersHeading: "In Partnership With",
  partners: ["University of San Francisco", "AUTODESK", "ENSCAPE", "Framer"],
} as const;

export const video = {
  heading: "Where Children And Parents Can Learn By Doing",
} as const;

export const about = {
  heading: "What Is The Center",
  /**
   * Each inner array is a group of lines that run together with no gap; the
   * design leaves a small space between groups rather than between every
   * paragraph.
   */
  paragraphGroups: [
    [
      "A destination…for families, about families, created by families",
      "The inspiration…“It is my belief that the peoples of the earth live within webs of cultural and social forces, much as stars and planets exist within webs of natural forces that both bind them together and keep them apart. Though we seem to live as separate individuals, nations, cultures, and faiths, in truth we are one in our humanity.” —Heidi Hardin",
    ],
    [
      "The Center for the Human Family is in planning as a destination for families, where they will go--physically, or virtually over the world wide web--not to be entertained (like at Disneyland), but to have an authentic experience of being human, of being a member of the human family.",
      "The Center for the Human Family will provide facilities for individuals and groups, families and foes, to study world religions, human spiritual evolution, consciousness, and creativity. The Center will also provide programs for social and political conflict resolution; personal and family healing, as well as arts programs that will help establish happy, healthy, and sustainable living on the planet.",
    ],
    [
      "Outdoors, we envision educational, hands-on activities related to healthy, sustainable living on the planet. We will feature urban aquaponic and vertical gardens and a variety of farms for fish and domesticated animals. These sustainable organic food sources will be cultivated for use by our Culinary Academy students and faculty utilizing best practices called for by the “Greenest Big City” in America, San Francisco. Indoors we envision interactive, calm, educational, cultural exhibitions and services to be offered at no-or-low cost to local communities, and over the internet to families from around the world.",
    ],
  ],
} as const;

export const story = {
  heading: "The Story",
  paragraphs: [
    "The Center for the Human Family is conceived as a state-of-the-art museum centered on Think Round’s message: Earth is home. Humans are family. Through the arts and sciences, The Center will explore issues of family, faith, ethnicity, culture, and diversity, while sharing cutting-edge knowledge about human health and the health of our planet, Earth. Creative ownership of The Center will be given to children, youth, and their families through enrichment programs Think Round offers in schools and on the world wide web that produce high-end permanent public artworks.",
    "During the pandemic Think Round designers have devoted their time to envisioning The Center for the Human Family. The renderings here are a glimpse into TRI’s twin visions: completing The Paradise Project and building The Center for the Human Family to house it. Take a look and imagine with us all that The Center can become.",
  ],
} as const;

export const gallery = {
  label: "Renderings of The Center",
  items: [
    "geodesic dome exterior",
    "children visiting the gardens",
    "vertical farm walkway",
    "auditorium during a talk",
  ],
} as const;

export const floors = {
  heading: "The Floors",
  items: [
    {
      title: "First Floor",
      body: "On the first floor, there will be a culinary school and workshop for children celebrating the PLANTS, ANIMALS, and PEOPLE of the world. The kitchens at The Center in our waterfront restaurant will feature foods from seven continents of the world with interactive, innovative exchanges between peoples of the world as you dine.",
    },
    {
      title: "Second Floor",
      body: "The second floor will provide gallery spaces for an ever-growing number of Bay Area artists, with access virtually for artists from around the world. There will be a community conference space and a separate auditorium for meetings, presentations, storytelling, poetry slams and readings, webinars, and more. Additionally, the second floor of The Center will provide recovery rooms especially focused on healing and preventing childhood trauma. TRI’s trauma incident reduction programs span the life of a family from prenatal care through retirement and are known as Think Round’s Whole Systems Learning Curricula. Created by Think Round and our partners, the Magic of Why©, the Ardicare Foundation, and STAR, Shipyard Trust for the Arts, these programs will be free, non-medical, non-diagnosing, non-religious, and confidential.",
    },
    {
      title: "Third Floor",
      body: "The third floor will house an interactive exhibition titled, The Human Family Tree/A Walk Through Paradise…seven installations, otherwise known as The Paradise Project. The Paradise Project presents 546 portraits of 28 families of different ethnicities who are practicing ten of the major world religions. This novel form of storytelling will provide an outlet for everyone in the world to add their own family’s story to it. In this way, The Center will be a destination—in person or virtually—for families, about families, created by families.",
    },
  ],
} as const;

export const artists = {
  heading: "A Destination… For Artist By Artist",
  paragraphGroups: [
    [
      "The Center will provide young, thriving Bay Area artists with a space to exhibit their artworks and kickstart their careers, as well as, space for acclaimed eco-artists and their artworks on the leading edge of thought about the needs of the planet.",
    ],
    [
      "2nd Floor will house big spaces for simultaneous exhibits of the artworks of young, thriving Bay Area artists, as well as established eco-artists on the leading edge of thought about the needs of our planet.",
      "The second-floor exhibitions about AIR, WATER, SOIL…will be explorable in immersive, interactive, touch-free exhibitions.",
    ],
  ],
} as const;

export const whatWeDo = {
  heading: "What We Do",
  cards: [
    {
      title: "Free Mental Health Access",
      body: "The world in a near future is a mental health conscious one. Center for the Human Family endeavors to bring free therapy sessions particularly focusing on ACEs (adverse childhood experiences)",
    },
    {
      title: "Fish Farm & Gardens",
      body: "The vertical garden and aquaponic fish farm complex are the first of their kind in teaching children about the importance of such things as food supplies and home gardens.",
    },
    {
      title: "Culinary Academy",
      body: "Knowledgeable children understand food as fuel and its impact on their health across a lifetime.",
    },
  ],
} as const;

export const paradise = {
  heading: "The Paradise Project",
  intro:
    "The seven installations of the Human Family Tree/A Walk Through Paradise… (The Paradise Project) are envisioned to be the great attractor or centerpiece of The Center for the Human Family. High overhead, an expansive stained-glass window depicting the human walk out of Africa onto the seven continents of the world will fill the dome with the journey of the human family. Down the walls of the dome, frescos and changing digital displays that depict the flora and fauna of the seven continents will flow… landing on immersive displays of the art history of the ten major world religions.",
  heroImageLabel: "the Paradise Project dome, seven installations",
  blocks: [
    {
      imageSide: "right",
      imageLabel: "holographic Earth installation",
      imageRatio: "458 / 234",
      caption:
        "Holographic Earth with cross section showing interactions of the core, mantel, crust, & magnetic field whose lines divide the room into the seven installations of the Paradise Project",
      paragraphs: [
        "Laid out as a labyrinth as large as a football field on the third floor, each of the seven “houses” of The Paradise Project will celebrate the ethnic, cultural, and spiritual heritage of 28 families practicing ten of the world’s major religions as seen through the life stories of Hardin’s subjects.",
        "Taken together, The Paradise Project is envisioned to be an artistic, interactive story-telling project of the human family conceived to raise humanity’s consciousness of the continuity of our existence back into deep time. The featured stories of individual families of different origins, cultures, and faiths aim to connect those stories to the planet earth, as well as the sacred nature of the origins and essence of all life here.",
      ],
    },
    {
      imageSide: "left",
      imageLabel: "redesigned portrait armatures",
      imageRatio: "465 / 410",
      caption:
        "The newly designed armatures reduces distractions while increasing the immersive experience of the portraits, touching objects, environmental displays, and sound tracks.",
      paragraphs: [
        "Over the coming decades, new families of different backgrounds from everywhere in the world will be provided a digital space to artistically tell the stories of their own families in unique, engaging, informative ways. For more information regarding the current state of the Paradise Project and how to participate, please contact info@thinkround.org.",
        "Think Round’s creative team has been redesigning the armatures that hold the numerous portraits to maximize the values held within the scores of touching objects surrounding the painting. Conceived as object portraits and talismans, these heavily curated objects invite, perhaps induce, visitors to the labyrinth to engage directly with them to glean vibrational energies of personals, historical, cultural, and holy items of interest.",
      ],
    },
    {
      imageSide: "right",
      imageLabel: "stained glass ceiling of the dome",
      imageRatio: "847 / 448",
      caption:
        "Stained glass ceiling: Humans walk out of Africa onto the seven continents of the world. Walls of the dome: Flora & fauna of the seven continents along with touch-free, changing displays of the art history from each faith",
      paragraphs: [
        "Paradise Project will be a new standard for the way interactive exhibitions are done. Bay Area has always been a cradle for new ideas and new technologies. It deserves to house one of the most immersive interactive exhibitions in the country.",
      ],
    },
  ],
} as const;

export const culinary = {
  feature: {
    imageLabel: "visitors viewing family portraits",
    caption:
      "Visitors will see the many portraits of our subject families and be able to listen to the 36 original soundtracks by L.A. composer, Jonathan Sacks created for each path and each station.",
    quote:
      "Knowledgeable children understand food as fuel and its impact on their health across a lifetime.",
  },
  blocks: [
    {
      imageSide: "right",
      imageLabel: "Culinary Academy kitchens",
      caption: "1st Floor: Culinary Academy Kitchens, Waterfront Restaurant,",
      paragraphs: [
        "The Center for the Human Family will house a restaurant that will offer foods that come from the in-house vertical gardens, as well as the fish and family farms housed there. The Culinary Academy at The Center will specialize in teaching children the essential skills of how to grow, harvest, prepare, and cook food.",
        "In Think Round’s ongoing, award-winning environmental science enrichment programs, The Children’s Mural Program and The Kid’s Environmental Education Program, KEEP! our students learn this simple message: when the air, water, and soil are happy and healthy, so will be the plants, animals, and people. In this way, our culinary program participants will gain hands-on experience with and the deeper importance of sustainable food sources, cooking, and the link of foods they eat to the health of their bodies.",
      ],
    },
    {
      imageSide: "left",
      imageLabel: "the balcony and vertical farming",
      caption:
        "The balcony will provide a space showcasing vertical farming, solar energy panels. and more",
      paragraphs: [
        "In the face of the global climate crisis—with floods, droughts, fires, acidifying oceans—food and water scarcity will become common knowledge for our students. And our students will learn how to respond and have the ability to respond to the need to protect and care for our precious natural resources: air, water, and soil. They will be responsible, loving, nurturing stewards of the planet’s oceans, rivers and streams, watersheds, farmlands, habitats of indigenous plants and animals, and more—all the ecosystems that sustain us.",
        "The balcony area will provide a space for people to relax and have fun on a nice sunny day. The balcony will have two strategically accessible entrances to the main gallery areas that provide natural airflow on the second floor",
      ],
    },
  ],
} as const;

export const closingNote = {
  lines: [
    "Imagine with us all that The Center for the Human Family can become. Email your ideas and dreams to info@thinkround.org!",
    "For more information, please follow us on our social media outlets listed below!",
  ],
  socialLabels: ["Facebook", "X", "Instagram", "YouTube"],
} as const;

export const support = {
  title: "The Center For The Human Family",
  heading: "How You Can Help Us Make It Happen",
  paragraphs: [
    "The Center for the Human Family and its sister project Paradise Project, rely on the help of donors, philanthropist organizations, and local tech companies that can help with the complex technical aspects of this project.",
    "The Center provides many facilities that aim to democratize local and global public access to the art and science of Earth as our home, and humans as family, thus spreading cultural and artistic ideas.",
    "The Auditorium serves the people of the Bay Area at no-or-low cost to hold their talks and presentation. The Conference Room serves our students for environmental science education and trauma incident reduction.",
    "Please visit our upcoming page showcasing the ways each individual or institution can contribute to these projects.",
  ],
  ctaLabel: "Become A Patron",
  ctaHref: "/donate",
} as const;

/**
 * Exported artwork, one entry per image slot on the page.
 *
 * Drop each export into public/images/center-for-human-family/ and put its
 * path here. Anything left empty keeps rendering as a grey placeholder, so
 * the page stays correct while the artwork arrives a few files at a time.
 *
 * Already in the repo but not yet assigned to a slot:
 *   center-rendering.png  1920x1080 — an aerial exterior rendering. It was the
 *   hero image on the previous design, which Desktop 17 drops, so it has no
 *   obvious home now. Possibly the first gallery tile; worth checking.
 */
export const images = {
  /** The Story — rendering beside the opening text. */
  story: "",
  /** What Is The Center — tall interior rendering on the left. */
  about: "",
  /** The four tiles above The Floors, left to right. */
  gallery: [
    "/images/center-for-human-family/gallery-1.png",
    "/images/center-for-human-family/gallery-2.png",
    "/images/center-for-human-family/gallery-3.png",
    "/images/center-for-human-family/gallery-4.png",
  ],
  /** A Destination… For Artist By Artist — gallery space. */
  artists: "",

  /* The Paradise Project, in the order they appear. */
  paradiseDome: "/images/center-for-human-family/paradise-dome.png",
  paradiseHolographicEarth:
    "/images/center-for-human-family/holographic-earth.png",
  paradiseArmatures: "/images/center-for-human-family/armatures.png",
  paradiseStainedGlassCeiling:
    "/images/center-for-human-family/stained-glass-ceiling.png",

  /* The stretch below it — note the last of these is the balcony, not a kitchen. */
  visitorsAndPortraits:
    "/images/center-for-human-family/immersive-exhibition.png",
  culinaryKitchens: "/images/center-for-human-family/kitchens.png",
  balcony: "/images/center-for-human-family/balcony.png",

  /** How You Can Help Us Make It Happen. */
  support: "",
} as const;
