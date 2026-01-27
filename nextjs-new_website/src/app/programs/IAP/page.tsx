import { createClient } from 'next-sanity'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ---------------- SANITY CLIENT ---------------- */

const client = createClient({
  projectId: 's3cfqcyr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
})

/* ---------------- TYPES ---------------- */

interface ImageAsset {
  asset?: {
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
    }
  }
}

interface StudentBlock {
  _type: string
  image?: ImageAsset
  asset?: ImageAsset['asset']
  widthPercentage?: number
  children?: { text: string }[]
}

interface IapPageData {
  title: string
  heroImages: ImageAsset[]
  body?: StudentBlock[]
  studentProjectsBody?: StudentBlock[]
  studentProject1?: StudentBlock[]
  studentProject2?: StudentBlock[]
  studentProject3?: StudentBlock[]
  studentProject4?: StudentBlock[]
  studentProject5?: StudentBlock[]
}


async function getIapPageData(): Promise<IapPageData> {
  const data = await client.fetch<any>(`
    *[_type == "iapPage"][0] {
      title,
      heroImage1 { asset->{url, metadata{dimensions}} },
      heroImage2 { asset->{url, metadata{dimensions}} },
      heroImage3 { asset->{url, metadata{dimensions}} },
      heroImage4 { asset->{url, metadata{dimensions}} },
      body[]{..., asset->{url, metadata{dimensions}}},
      studentProjectsBody[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage},
      studentProject1[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage},
      studentProject2[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage},
      studentProject3[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage},
      studentProject4[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage},
      studentProject5[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage}
    }
  `)

  return {
    title: data.title,
    heroImages: [
      data.heroImage1,
      data.heroImage2,
      data.heroImage3,
      data.heroImage4,
    ],
    body: data.body,
    studentProjectsBody: data.studentProjectsBody,
    studentProject1: data.studentProject1,
    studentProject2: data.studentProject2,
    studentProject3: data.studentProject3,
    studentProject4: data.studentProject4,
    studentProject5: data.studentProject5,
  }
}


function RenderBlocks({ blocks }: { blocks?: StudentBlock[] }) {
  if (!blocks?.length) return null

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        /* ---------- TEXT BLOCK ---------- */
        if (block._type === 'block') {
          return (
            <p
              key={index}
              className="text-lg text-gray-700 leading-relaxed"
            >
              {block.children?.map(c => c.text).join('')}
            </p>
          )
        }

        
        const isStudentImage =
          block._type === 'image' ||
          block._type === 'studentProjectImage' ||
          block._type.includes('studentProject')

        if (isStudentImage) {
          const asset =
            block.image?.asset ||
            block.asset

          if (!asset?.url) return null

          const aspectRatio =
            asset.metadata?.dimensions
              ? `${asset.metadata.dimensions.width}/${asset.metadata.dimensions.height}`
              : '1/1'

          return (
            <div key={index} className="flex justify-center">
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  width: `${block.widthPercentage ?? 100}%`,
                  maxWidth: '600px',
                  aspectRatio,
                }}
              >
                <Image
                  src={asset.url}
                  alt="Student artwork"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}


export default async function IapPage() {
  const iap = await getIapPageData()

  return (
    <main className="bg-white min-h-screen text-gray-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-20">
          {iap.title}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {iap.heroImages.map((img, i) => (
            <div
              key={i}
              className="relative w-full rounded-lg overflow-hidden bg-gray-200 shadow-lg"
              style={{
                aspectRatio: img?.asset?.metadata?.dimensions
                  ? `${img.asset.metadata.dimensions.width}/${img.asset.metadata.dimensions.height}`
                  : '1/1',
              }}
            >
              {img?.asset?.url && (
                <Image
                  src={img.asset.url}
                  alt="Hero image"
                  fill
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto prose prose-lg">
        <RenderBlocks blocks={iap.body} />
      </section>

      {/* STUDENT ART WORK */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          Student Art Works
        </h2>

        {[
          iap.studentProjectsBody,
          iap.studentProject1,
          iap.studentProject2,
          iap.studentProject3,
          iap.studentProject4,
          iap.studentProject5,
        ].some(section => section?.length) ? (
          <div className="space-y-20">
            <RenderBlocks blocks={iap.studentProjectsBody} />
            <RenderBlocks blocks={iap.studentProject1} />
            <RenderBlocks blocks={iap.studentProject2} />
            <RenderBlocks blocks={iap.studentProject3} />
            <RenderBlocks blocks={iap.studentProject4} />
            <RenderBlocks blocks={iap.studentProject5} />
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold">
              Gallery Coming Soon
            </h3>
            <p className="text-gray-600">
              Add student artworks in Sanity Studio
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
