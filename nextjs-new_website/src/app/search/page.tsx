// "use client";
import Link from "next/link";
import { client } from "@/sanity/client";
import SearchBox from "./SearchBox";

interface SearchDocument {
  _id: string;
  _type: string;
  slug?: { current?: string };
  publishedAt?: string;
  [key: string]: unknown;
}

interface SearchResult {
  id: string;
  label: string;
  sentence: string;
  href: string;
}

const resultLabels: Record<string, string> = {
  aboutUs: "ABOUT US",
  partnerCurrent: "ABOUT US",
  partnerPast: "ABOUT US",
  boardMember: "OUR BOARD",
  blogs: "BLOGS",
  post: "PRESS",
  postType: "PRESS",
  donatePage: "DONATE",
  currentExhibition: "CURRENT & UPCOMING EXHIBITIONS",
  pastExhibition: "PAST EXHIBITIONS",
  virtualExhibitions3D: "VIRTUAL ART EXHIBITIONS",
  childrenMuralProgram: "CHILDREN'S MURAL PROGRAM",
  classes: "CLASSES AT THINK ROUND",
  familyArtsProgram: "FAMILY ARTS PROGRAM",
  iapPage: "INTERGENERATIONAL AFTER SCHOOL PROGRAM",
  keep: "KEEP(KID’S ENVIRONMENTAL EDUCATION PROGRAM)",
  streamOfConsciousness: "STREAM OF CONSCIOUSNESS",
  turningTheTideOfTrauma: "TURNING THE TIDE OF TRAUMA",
  paradiseProject: "PARADISE PROJECT",
  volunteerPage: "VOLUNTEER",
  subscribePage: "SUBSCRIBE",
  ourArtistsPage: "OUR ARTISTS",
};

const staticPages: SearchDocument[] = [
  {
    _id: "search-page-volunteer",
    _type: "volunteerPage",
    title: "Interested in volunteering with us?",
    description:
      "Our projects provide a great opportunity to learn and hone your creative skillsets while working on real projects.",
  },
  {
    _id: "search-page-subscribe",
    _type: "subscribePage",
    title:
      "Subscribe to Think Round, Inc.'s Mailing List to receive Invites, Reminders, and our Newsletter",
    description: "Please complete the form below.",
  },
  {
    _id: "search-page-our-artists",
    _type: "ourArtistsPage",
    title: "Think Round Fine Arts Exhibiting Artists",
    description:
      "Meet the exhibiting artists featured by Think Round Fine Arts.",
  },
];

const documentQuery = `*[
  !(_id in path("drafts.**")) &&
  !(_type in ["sanity.imageAsset", "sanity.fileAsset"])
]`;

const portableTextMetadataKeys = new Set([
  "marks",
  "markDefs",
  "style",
  "listItem",
  "level",
]);

function getTextValues(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(getTextValues);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      key.startsWith("_") || portableTextMetadataKeys.has(key)
        ? []
        : getTextValues(nestedValue),
    );
  }
  return [];
}

function getMatchingSentence(document: SearchDocument, term: string) {
  const text = getTextValues(document).join(" ").replace(/\s+/g, " ").trim();
  const matchIndex = text.toLocaleLowerCase().indexOf(term.toLocaleLowerCase());

  if (matchIndex < 0) return null;

  const sentenceStart = Math.max(
    text.lastIndexOf(".", matchIndex) + 1,
    text.lastIndexOf("!", matchIndex) + 1,
    text.lastIndexOf("?", matchIndex) + 1,
  );
  const nextSentenceEnd = [".", "!", "?"]
    .map((punctuation) => text.indexOf(punctuation, matchIndex))
    .filter((index) => index >= 0)
    .sort((first, second) => first - second)[0];
  const sentenceEnd = nextSentenceEnd >= 0 ? nextSentenceEnd + 1 : text.length;

  return text.slice(sentenceStart, sentenceEnd).trim();
}

function highlightSearchTerm(sentence: string, term: string) {
  const matchIndex = sentence
    .toLocaleLowerCase()
    .indexOf(term.toLocaleLowerCase());

  if (matchIndex < 0) return sentence;

  return (
    <>
      {sentence.slice(0, matchIndex)}
      <em>{sentence.slice(matchIndex, matchIndex + term.length)}</em>
      {sentence.slice(matchIndex + term.length)}
    </>
  );
}

function getDocumentHref(document: SearchDocument) {
  if (
    document._type === "blogs" &&
    document.slug?.current &&
    document.publishedAt
  ) {
    const [year, month, day] = document.publishedAt.split("-");
    return `/blogs/${year}/${month}/${day}/${document.slug.current}`;
  }

  const routes: Record<string, string> = {
    aboutUs: "/about/about_us",
    boardMember: "/about/our_board",
    blogs: "/blogs",
    post: "/about/press",
    postType: "/about/press",
    donatePage: "/donate",
    childrenMuralProgram: "/programs/children_mural_program",
    classes: "/programs/classes",
    familyArtsProgram: "/programs/family_arts_program",
    iapPage: "/programs/IAP",
    keep: "/programs/keep",
    paradiseProject: "/paradise_project",
    streamOfConsciousness: "/programs/stream_of_consciousness",
    turningTheTideOfTrauma: "/programs/turning_the_tide_of_trauma",
    currentExhibition: "/think_round_fine_arts/current_upcoming_exhibitions",
    pastExhibition: "/think_round_fine_arts/past_exhibitions",
    virtualExhibitions3D: "/think_round_fine_arts/virtual_art_exhibitions",
    volunteerPage: "/volunteer",
    subscribePage: "/subscribe",
    ourArtistsPage: "/about/our-artists",
  };

  return routes[document._type] ?? "/search";
}

async function getSearchResults(term: string): Promise<SearchResult[]> {
  const sanityDocuments = await client.fetch<SearchDocument[]>(documentQuery);
  const documents = [...sanityDocuments, ...staticPages];

  return documents
    .map((document) => {
      const label = resultLabels[document._type];
      const sentence = label ? getMatchingSentence(document, term) : null;

      if (!label || !sentence) return null;

      return {
        id: document._id,
        label,
        sentence,
        href: getDocumentHref(document),
      };
    })
    .filter((result): result is SearchResult => result !== null)
    .filter(
      (result, index, allResults) =>
        allResults.findIndex(
          (candidate) => candidate.label === result.label,
        ) === index,
    );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q?.trim() ?? "";
  const results = query ? await getSearchResults(query) : [];

  return (
    <div className="min-h-[50vh] bg-white px-6 py-16 text-[#2e2e2e]">
      <main className="mx-auto max-w-4xl">
        <SearchBox initialQuery={query} />
        {query ? (
          <>
            {results.length > 0 ? (
              <ul className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
                {results.map((result) => (
                  <li key={result.id} className="py-6">
                    <Link href={result.href} className="group block">
                      <p className="text-xl font-bold uppercase tracking-widest text-[#70169c]">
                        {result.label}
                      </p>
                      <p className="mt-2 text-xl leading-relaxed group-hover:text-[#70169c]">
                        {highlightSearchTerm(result.sentence, query)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-10 text-gray-600">No results found.</p>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
