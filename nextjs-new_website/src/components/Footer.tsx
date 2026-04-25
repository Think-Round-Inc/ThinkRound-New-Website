import Image from "next/image";

const socialLinks = [
  {
    href: "https://www.facebook.com/thinkroundinc/?ref=bookmarks",
    label: "Facebook",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    href: "https://www.instagram.com/thinkroundinc/",
    label: "Instagram",
    icon: (
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    ),
  },
  {
    href: "https://www.linkedin.com/company/thinkround/",
    label: "LinkedIn",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    href: "https://www.youtube.com/channel/UCWwDo1uREn4oE02onTvMUaw",
    label: "YouTube",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
];

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {socialLinks.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label={label}
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {icon}
          </svg>
        </a>
      ))}
    </div>
  );
}

function NavLinks({ className = "", boardLabel = "Our Board Members" }: { className?: string; boardLabel?: string }) {
  return (
    <nav className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-base font-[100] text-gray-200 ${className}`}>
      <a href="/mission" className="hover:underline transition-all whitespace-nowrap">Mission</a>
      <a href="/contact" className="hover:underline transition-all whitespace-nowrap">Contact</a>
      <a href="/board" className="hover:underline transition-all whitespace-nowrap">{boardLabel}</a>
      <a href="/map" className="hover:underline transition-all whitespace-nowrap">Map</a>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#701a99] text-white w-full border-2 border-[#9747ff]">

      {/* ── DESKTOP LAYOUT (md and up) ── */}
      <div className="hidden md:block">
        {/* Top Row: Logo, Nav, Social Icons */}
        <div className="border-b border-white/20">
          <div className="max-w-screen-2xl mx-auto px-6 py-5 relative">
            <div className="grid grid-cols-3 items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32">
                  <Image src="/logo.svg" alt="URI Logo" width={198} height={110} className="w-full h-full object-contain" />
                </div>
                <div className="text-sm font-[100] tracking-[0.2em] text-gray-300 leading-tight mt-4">
                  UNITED RELIGIONS<br />INITIATIVE
                </div>
              </div>
              {/* Nav — naturally centered in middle column */}
              <div className="flex justify-center">
                <NavLinks className="justify-center text-base gap-x-8" />
              </div>
              {/* Social */}
              <div className="flex justify-end">
                <SocialIcons className="shrink-0 gap-8 [&_svg]:w-6 [&_svg]:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Address & Contact */}
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-base font-[100] text-gray-200">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
              <span>2140 Bush Street, Suite 1, San Francisco, CA 94115, United States</span>
              <a href="tel:+14156029599" className="hover:underline whitespace-nowrap">(415) 602-9599</a>
              <a href="mailto:info@thinkround.org" className="hover:underline whitespace-nowrap">info@thinkround.org</a>
            </div>
            <div className="text-base font-[100] text-gray-300 whitespace-nowrap">501(C)3 Nonprofit</div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (below md) ── */}
      <div className="md:hidden">

        {/* Row 1: Logo left, contact info right — vertically centered together */}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            {/* Logo only, no wordmark */}
            <div className="relative w-20 h-20 shrink-0 -mt-5">
              <Image src="/logo.svg" alt="URI Logo" width={198} height={110} className="w-full h-full object-contain" />
            </div>

            {/* Contact info stacked line by line, left-aligned */}
            <div className="flex flex-col gap-[3px] text-xs font-[100] text-white/75 text-left">
              <span>2140 Bush Street, Suite 1</span>
              <span>San Francisco, CA 94115</span>
              <span>United States</span>
              <a href="tel:+14156029599" className="hover:underline mt-1">(415) 602-9599</a>
              <a href="mailto:info@thinkround.org" className="hover:underline">info@thinkround.org</a>
            </div>
          </div>
        </div>

        {/* Row 2: Social icons centered, full opacity, more spacing */}
        <div className="px-5 pt-15 pb-3 flex justify-center">
          <SocialIcons className="gap-10 [&_svg]:w-6 [&_svg]:h-6" />
        </div>

        {/* Row 3: Nav links centered, slightly bigger */}
        <div className="px-5 py-3 flex">
          <NavLinks className="text-base text-white/75 w-full justify-between flex-nowrap gap-x-0" boardLabel="Board Members" />
        </div>

      </div>

    </footer>
  );
}

