import { client, urlFor } from "@/sanity/client";
import Image from "next/image";

export const revalidate = 60;

type Artist = {
  _id: string;
  name: string;
  image?: any;
  bio?: string;
};

/* 🔗 External Links Mapping */
const artistLinks: Record<string, string> = {
  "Heidi Hardin": "http://heidihardin.com/bio.html",
  "Mary Southall": "https://www.marysouthall.com/bio.html",
  "Marc Ellen Hamel": "https://www.marcellenhamel.com/about",
  "Salma Arastu": "https://salmaarastu.com/about/bio/",
  "Kim Smith": "https://www.kimmyerssmith.com/about-1",
  "Rachel Leibman": "https://www.rachelleibman.com/statement",
  "Betsie Miller-Kusz": "https://creationmigrationstories.blogspot.com/",
  "Jennifer Ewing": "https://www.jenniferewing.com/",
  "Leo Germano": "https://www.missionartists.org/artists/leopoldo",
  "Mark Roller": "https://www.markrollerart.com/",
  "Colette Crutcher": "https://www.colettecrutcher.com/",
  "Elaine Michaud":
    "https://www.shipyardartists.com/shipyard-artist-elaine-michaud-show-at-think-round-fine-arts/",
  "Josefa Vaughan": "https://www.josefa.com/biography/",
};

async function getArtists() {
  const query = `*[_type == "artist"] | order(name asc){
    _id,
    name,
    image,
    bio
  }`;

  return client.fetch<Artist[]>(query);
}

export default async function OurArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      
      {/* TITLE */}
      <h1 className="text-6xl font-bold text-center mb-6">
        Think Round Fine Arts
      </h1>

      <h2 className="text-4xl text-center text-gray-600 mb-16">
        Exhibiting Artists
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-stretch">
        
        {artists.map((artist) => (
          
          <div
            key={artist._id}
            className="flex flex-col h-full"
          >
            
            {/* IMAGE */}
            {artist.image && (
              <div className="relative w-full h-[330px] mb-4">
                <Image
                  src={urlFor(artist.image).url()}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* NAME */}
            <h3 className="text-2xl font-semibold mb-3">
              {artist.name}
            </h3>

            {/* BIO */}
            <p className="text-gray-600 text-lg leading-8 flex-grow">
              {artist.bio?.slice(0, 220)}...
            </p>

            {/* BUTTON (Aligned Bottom) */}
            <a
              href={artistLinks[artist.name] || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 border-2 border-orange-500 text-orange-500 px-6 py-2 font-semibold hover:bg-orange-500 hover:text-white transition self-start"
            >
              LEARN MORE
            </a>

          </div>
        ))}

      </div>
    </div>
  );
}