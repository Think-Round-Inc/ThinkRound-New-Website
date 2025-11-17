import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClassesPage() {
  const programs = [
    "Painting",
    "Drawing",
    "Family Art Making",
    "Family Photos: Documenting Family History",
    "Video Taped Family Histories",
    "Family Iconography",
  ];

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
            We offer private and group lessons for all ages in the following
            areas:
          </h1>
          <p className="white-space-pre-wrap">&nbsp;</p>

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
            We are working on devising new programs for the post-covid era.
            Should you have any questions or comments please{" "}
            <a
              href="mailto:info@thinkround.org"
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              contact us
            </a>
          </p>
          <hr className="border-gray-300 my-8" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

