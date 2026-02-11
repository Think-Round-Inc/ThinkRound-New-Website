import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client";

interface ClassesData {
  _id: string;
  heading: string;
  programs: string[];
  footerMessage?: string;
  contactEmail?: string;
  contactLabel?: string;
}

export const revalidate = 60;

async function getClassesData() {
  try {
    const query = `*[_type == "classes"][0]{
      _id,
      heading,
      programs,
      footerMessage,
      contactEmail,
      contactLabel
    }`;
    return await client.fetch<ClassesData | null>(query);
  } catch (error) {
    console.error("Error fetching classes data:", error);
    return null;
  }
}

export default async function ClassesPage() {
  const classesData = await getClassesData();

  // Fallback to default values if no data is found
  const heading = classesData?.heading || "Heading";
  const defaultPrograms = [
    "Program 1",
    "Program 2",
    "Program 3",
    "Program 4",
    "Program 5",
    "Program 6",
  ];
  const fetchedPrograms = classesData?.programs;
  const programs = (Array.isArray(fetchedPrograms) && fetchedPrograms.length > 0)
    ? fetchedPrograms
    : defaultPrograms;
  const footerMessage = classesData?.footerMessage || "Footer Message";
  const contactEmail = classesData?.contactEmail || "info@thinkround.org";
  const contactLabel = classesData?.contactLabel || "contact us";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-5xl p-4 md:p-20 py-12 bg-white">
        <div className="space-y-8">
          <h1
            className="text-gray-800 classes-h1"
            style={{
              textAlign: "center",
              whiteSpace: "pre-wrap",
            }}
          >
            {heading}
          </h1>
          <p className="whitespace-pre-wrap">&nbsp;</p>

          <div className="space-y-4">
            {programs.map((program, index) => (
              <h1
                key={index}
                className="text-gray-800 text-center classes-h1"
              >
                {program}
              </h1>
            ))}
          </div>

          <hr className="border-gray-300 my-8" />

          <p className="text-gray-800 text-base md:text-lg text-center">
            {footerMessage}{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              {contactLabel}
            </a>
          </p>
          <hr className="border-gray-300 my-8" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

