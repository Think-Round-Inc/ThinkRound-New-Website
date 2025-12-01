
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface Artist {
  _id: string;
  name: string;
  bio: string;
  website?: string;
  photo?: {
    asset: {
      _ref: string;
    };
  };
}

// Revalidate every 60s
export const revalidate = 60;

// Fetch artists with image
async function getArtists() {
  const query = `
    *[_type == "artist"]{
      _id,
      name,
      bio,
      website,
      photo
    } | order(name asc)
  `;

  return client.fetch<Artist[]>(query);
}

export default async function OurArtistsPage() {
  const artists = await getArtists();

  return (
    <main className="w-full max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        ThinkRound Fine Arts – Exhibiting Artists
      </h1>

      <div className="flex flex-col gap-6">
        {artists.length > 0 ? (
          artists.map((artist) => (
            <div
              key={artist._id}
              className="flex flex-col sm:flex-row gap-6 p-6 border rounded-lg shadow-sm hover:shadow-md transition w-full"
            >
              {/* Photo */}
              {artist.photo ? (
                <div className="flex-shrink-0">
                  <Image
                    src={urlFor(artist.photo).width(150).height(150).url()}
                    alt={artist.name}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover"
                  />
                </div>
              ) : (
                <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg" />
              )}

              {/* Content */}
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-bold">{artist.name}</h2>

                <p className="text-gray-700 leading-relaxed mt-2 mb-3">
                  {artist.bio}
                </p>

                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No artists available yet.</p>
        )}
      </div>
    </main>
  );
}
