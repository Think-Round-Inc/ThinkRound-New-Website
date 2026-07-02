import { client } from "@/sanity/client";
import Navbar from "@/components/Navbar";
import VolunteerSubscribeFormClient from "@/components/volunteer-and-subscribe-page/VolunteerSubscribeFormClient";
import { League_Spartan } from "next/font/google";
import HeroSection from "@/components/volunteer-and-subscribe-page/HeroSection";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export default async function VolunteerPage() {
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
      <HeroSection
        heading2="Interested in volunteering with us?"
        paragraph="  Our projects provide a great opportunity to learn and hone your
          creative skillsets while working on real projects."
      />

      {/* Form Section */}
      <section
        className=" px-6 py-12 xl:mx-120 lg:mx-80 md:mx-35 sm:mx-10"
        style={{ fontFamily: leagueSpartan.style.fontFamily }}
      >
        {/* <VolunteerFormClient initialForm={form} /> */}
        <VolunteerSubscribeFormClient id="volunteer" />
      </section>
    </main>
  );
}
