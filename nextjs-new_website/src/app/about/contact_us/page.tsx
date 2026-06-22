import Navbar from "@/components/Navbar";
import { client } from "@/sanity/client";

interface ContactUsData {
  title?: string;
  contactName?: string;
  aboutCompany?: string;
  address?: string;
  phone?: string;
  email?: string;
  boardSectionTitle?: string;
}

interface BoardMember {
  name: string;
  role?: string;
}

export const revalidate = 60;

const defaultBoardMembers: BoardMember[] = [
  { name: "Heidi Hardin", role: "President" },
  { name: "Hideki Uchida", role: "Treasurer" },
  { name: "Kelly Campbell-Hinshaw", role: "Secretary" },
  { name: "Ismael Biaye" },
  { name: "Jeffrey Betcher" },
];

async function getContactPage() {
  try {
    const query = `*[_type == "contactUs"][0]{
      title,
      contactName,
      aboutCompany,
      address,
      phone,
      email,
      boardSectionTitle
    }`;
    return await client.fetch<ContactUsData | null>(query);
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return null;
  }
}

async function getBoardMembers() {
  try {
    const query = `*[_type == "boardMember"] | order(order asc){
      name,
      role
    }`;
    return await client.fetch<BoardMember[]>(query);
  } catch (error) {
    console.error("Error fetching board members:", error);
    return [];
  }
}

function formatPhoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

export default async function ContactUsPage() {
  const contactData = await getContactPage();
  const boardMembersFromSanity = await getBoardMembers();

  const title = contactData?.title || "Contact";
  const contactName = contactData?.contactName || "Heidi Hardin";
  const aboutCompany =
    contactData?.aboutCompany ||
    "ThinkRound is a San Francisco-based nonprofit bringing together art, education, and community programs.";
  const address =
    contactData?.address ||
    "2140 Bush Street, Suite 1\nSan Francisco, CA 94115\nUnited States";
  const phone = contactData?.phone || "415-771-2198";
  const email = contactData?.email || "heidi@heidihardin.com";
  const boardSectionTitle =
    contactData?.boardSectionTitle || "Meet our Board of Directors";
  const boardMembers =
    boardMembersFromSanity.length > 0
      ? boardMembersFromSanity
      : defaultBoardMembers;

  return (
    <div className="w-full min-h-screen mx-auto bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center">{title}</h1>

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <section className="space-y-8 text-lg">
            <div>
              <h2 className="text-2xl font-bold mb-3">About ThinkRound</h2>
              <p className="leading-8">{aboutCompany}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Address</h2>
              <p className="leading-8 whitespace-pre-line">{address}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Primary Contact</h2>
              <p className="font-semibold">{contactName}</p>
              <p className="mt-2">
                Phone:{" "}
                <a
                  href={`tel:${formatPhoneHref(phone)}`}
                  className="text-orange-500 hover:text-orange-600 hover:underline"
                >
                  {phone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-orange-500 hover:text-orange-600 hover:underline"
                >
                  {email}
                </a>
              </p>
            </div>
          </section>

          <section className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Send a Message
            </h2>
            <form action={`mailto:${email}`} method="post" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-sm font-semibold mb-2">
                    First Name
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold mb-2">
                    Last Name
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-sm font-semibold mb-2">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {boardSectionTitle}
          </h2>
          <ul className="space-y-3 text-center text-lg">
            {boardMembers.map((member) => (
              <li key={member.name}>
                {member.name}
                {member.role ? `, ${member.role}` : ""}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
