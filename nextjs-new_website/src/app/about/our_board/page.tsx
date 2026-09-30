import { client, urlFor } from "@/sanity/client";
import Image from "next/image";

interface BoardMember {
  _id: string;
  name: string;
  photo?: { asset: { _ref: string } };
  bio: string;
  role?: string;
}

export const revalidate = 60;

async function getBoardMembers() {
  const query = `*[_type == "boardMember"] | order(order asc){
    _id,
    name,
    photo,
    bio,
    role,
    pronouns,
    order
  }`;

  return client.fetch<BoardMember[]>(query);
}

export default async function OurBoardPage() {
  const members = await getBoardMembers();

  return (
    <main className="board-page">
      <div className="board-container">
        <h1 className="board-title">Our Board</h1>

        <div className="board-list">
          {members.map((member) => (
            <article key={member._id} className="board-card">
              {member.photo && (
                <div className="board-photo-wrapper">
                  <Image
                    src={urlFor(member.photo)
                      .width(500)
                      .height(500)
                      .auto("format")
                      .url()}
                    alt={member.name}
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 180px, 200px"
                    className="board-photo"
                  />
                </div>
              )}

              <div className="board-content">
                <h2 className="board-name">{member.name}</h2>

                {member.role && (
                  <p className="board-role">{member.role}</p>
                )}

                <p className="board-bio">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}