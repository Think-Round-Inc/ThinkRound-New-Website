import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface BoardMember {
  _id: string;
  name: string;
  photo: { asset: { _ref: string } };
  introduction: string;
  position?: string;
}

export const revalidate = 60;

async function getBoardMembers() {
  const query = `*[_type == "boardMember"]{
    _id,
    name,
    photo,
    introduction,
    position
  }`;
  return client.fetch<BoardMember[]>(query);
}

export default async function OurBoardPage() {
  const members = await getBoardMembers();

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Board</h1>
      <div className="flex flex-col gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="flex flex-col sm:flex-row gap-6 p-6 border rounded-lg shadow-sm hover:shadow-md transition w-full"
          >
            {/* Left: Photo */}
            <div className="flex-shrink-0">
              <Image
                src={urlFor(member.photo).width(150).height(150).url()}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Right: Name and Introduction */}
            <div className="flex flex-col flex-1 justify-start">
              <h2 className="text-xl font-bold">{member.name}</h2>
              {member.position && (
                <p className="text-gray-500 mb-2">{member.position}</p>
              )}
              <p className="text-gray-700">{member.introduction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}