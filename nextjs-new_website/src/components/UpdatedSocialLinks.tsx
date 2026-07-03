export default function UpdatedSocialLinks() {
  return (
    <section className="py-12 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-8">
          <a
            href="https://www.facebook.com/thinkroundinc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          <a
            href="https://x.com/ThinkRound_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.979 6.807H2.306l7.644-8.74L.754 2.25h6.844l4.707 6.225z" />
            </svg>
          </a>

          <div className="relative group flex items-center justify-center">
            <button className="text-gray-600 hover:text-pink-600 transition-colors flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                href="https://www.instagram.com/thinkroundinc/"
                target="_blank"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Think Round Inc.
              </a>
              <a
                href="https://www.instagram.com/thinkround/"
                target="_blank"
                className="block px-4 py-2 hover:bg-gray-100 border-t"
              >
                Fine Arts Gallery
              </a>
            </div>
          </div>

          <a
            href="https://www.youtube.com/channel/UCWwDo1uREn4oE02onTvMUaw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
