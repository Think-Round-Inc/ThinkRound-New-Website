import HeroSection from "@/components/volunteer-and-subscribe-page/HeroSection";
import Navbar from "@/components/Navbar";

import { League_Spartan } from "next/font/google";
import VolunteerSubscribeFormClient from "@/components/volunteer-and-subscribe-page/VolunteerSubscribeFormClient";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });
export default function SubscribePage() {
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
        heading2="Subscribe to Think Round, Inc.’s Mailing List to receive Invites,
            Reminders, and our Newsletter"
        paragraph="  Please complete the form below"
      />
      {/* Form Section */}
      <section
        className=" px-6 py-12 xl:mx-120 lg:mx-80 md:mx-35 sm:mx-10"
        style={{ fontFamily: leagueSpartan.style.fontFamily }}
      >
        <VolunteerSubscribeFormClient id="subscribe" />
      </section>
    </main>
  );
}
