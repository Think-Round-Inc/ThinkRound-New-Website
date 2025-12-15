import { NextResponse } from "next/server"
import { client } from "@/sanity/client"

export async function POST(req: Request) {
  try {
    const { name, bio, website } = await req.json()

    const newArtist = await client.create({
      _type: "artist",
      name,
      bio,
      website,
    })

    return NextResponse.json({ success: true, artist: newArtist })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
