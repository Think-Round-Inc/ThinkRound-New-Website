import { createClient } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const client = createClient({
  projectId: 's3cfqcyr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
})

interface IapProject {
  _id: string
  title: string
  studentName: string
  theme: string
  mainImage: {
    asset: {
      url: string
    }
  }
  description: string
}

async function getProjects() {
  return client.fetch<IapProject[]>(`
    *[_type == "iapProject"] | order(completionDate desc) {
      _id, title, studentName, theme, mainImage { asset->{url} }, description
    }
  `)
}

export default async function IapPage() {
  const projects = await getProjects()

  return (
    <main className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />
      {/* HERO SECTION - Image Gallery with Title */}
      <section className="pt-20 pb-0 px-6 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Intergenerational Afterschool Program
          </h1>
        </div>

        {/* Hero Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Large featured image */}
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden bg-gray-200 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            </div>
          </div>

          {/* Small images on right */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-200 shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            </div>
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-200 shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            </div>
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-200 shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Text with Purpose */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-lg leading-relaxed">
            The Intergenerational Afterschool Program provides students with the opportunity to develop high-level art and 21st-century skills in a safe environment. It is an after-school program that brings together artists aged 60+ to work alongside young people to create collaborative public murals and other art forms.
          </p>
          
          <p className="text-lg leading-relaxed">
            During our sessions, students and seniors interact together. In each session, they meet, collaborate, discuss ideas, create collaborative artworks, and share ideas about their families, their schools, their communities, or any other topics that interest them. The most important part is that we create space where students of all backgrounds learn they can succeed in making art alongside grown-ups who value and encourage their ideas.
          </p>

          <p className="text-lg leading-relaxed">
            For more information, and more images of our Intergenerational Afterschool Program (IAP), please visit <Link href="https://www.instagram.com/thinkround" target="_blank" className="text-blue-600 hover:underline font-semibold">@THINKROUND</Link>. Thank you for your interest in our programs, and please visit us, see our students in action, and learn more about how Think Round is at work.
          </p>
        </div>
      </section>

      {/* IMAGE SHOWCASE - Grid of Student Projects */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Student Masterpieces</h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="group">
                {/* Image */}
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200 shadow-md mb-4 group-hover:shadow-lg transition-shadow">
                  {project.mainImage ? (
                    <Image
                      src={project.mainImage.asset.url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-gray-500 text-3xl">🎨</span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">By {project.studentName}</p>
                  {project.theme && (
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                      Theme: {project.theme}
                    </p>
                  )}
                  <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Gallery Coming Soon</h3>
            <p className="text-gray-600">
              Visit Sanity Studio to add student artworks
            </p>
          </div>
        )}
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-8">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/thinkroundinc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Twitter/X */}
            <a 
              href="https://x.com/ThinkRound_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="X (formerly Twitter)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.979 6.807H2.306l7.644-8.74L.754 2.25h6.844l4.707 6.225zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-600 hover:text-pink-600 transition-colors flex items-center gap-1"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-lg shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="py-2">
                  <li>
                    <a 
                      href="https://www.instagram.com/thinkroundinc/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Think Round Inc.
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.instagram.com/thinkround/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700 border-t border-gray-200"
                    >
                      Fine Arts Gallery
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/channel/UCWwDo1uREn4oE02onTvMUaw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}