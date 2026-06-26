import { client } from "@/sanity/client";
import Navbar from "@/components/Navbar";
import VolunteerFormClient from "@/app/volunteer/VolunteerFormClient";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export default async function VolunteerPage() {
  const form = await client.fetch(
    `*[_type == "volunteerForm"][0]{ firstName, lastName, email, dropdown, message }`,
  );

  return (
    <main
      className="min-h-screen   bg-gray-50 "
      style={{
        fontWeight: 400,
        color: "#828282",

        letterSpacing: ".02em",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className=" px-6 py-12  flex flex-col items-center justify-center   xl:mx-120 lg:mx-80 md:mx-35 sm:mx-10">
        <h2
          className="font-semibold mb-4 "
          style={{
            fontSize: "clamp(1.8em, 5vw, 3.5em)",
            fontWeight: 300,
            fontFamily: leagueSpartan.style.fontFamily,
            color: "#000",
          }}
        >
          Interested in volunteering with us?
        </h2>
        <p
          style={{
            fontSize: "clamp(1em, 4vw, 1.8em)",
            lineHeight: "1.5em",
          }}
        >
          Our projects provide a great opportunity to learn and hone your
          creative skillsets while working on real projects.
        </p>
      </section>

      {/* Form Section */}
      <section
        className=" px-6 py-12 xl:mx-120 lg:mx-80 md:mx-35 sm:mx-10"
        style={{ fontFamily: leagueSpartan.style.fontFamily }}
      >
        <VolunteerFormClient initialForm={form} />
      </section>
    </main>
  );
}
