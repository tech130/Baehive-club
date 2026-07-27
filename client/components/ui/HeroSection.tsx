export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[unset] lg:min-h-[731px] gap-10 sm:gap-12 lg:gap-8 pt-12 pb-8 sm:py-16 lg:py-0">

          {/* LEFT */}
          <div className="w-full max-w-xl space-y-5 sm:space-y-6 text-center lg:text-left mx-auto lg:mx-0 order-1">
            <h1 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.15] font-medium text-[#1A1A1A]">
              A <span className="gradient-text1">Community for Women </span>Who Want to Belong.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#6B6B6B]">
              More conversations. More experiences. More confidence. More connection.
              <br className="hidden sm:block" />
              Join a growing community where women support, inspire, and celebrate each other.
            </p>

            <p className="text-sm sm:text-base md:text-lg font-semibold text-[#6B6B6B]">
              Connect. Discover. Belong.
            </p>

            <button
              onClick={() => {
                const section = document.getElementById("form-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="mt-2 sm:mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C7A] to-[#FF8AA0] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Join our Hive
            </button>
          </div>

          {/* RIGHT */}
          <div className="relative w-full h-[340px] sm:h-[460px] md:h-[600px] lg:h-[731px] flex items-center justify-center order-2">
            <svg
              viewBox="0 0 600 600"
              aria-hidden="true"
              className="absolute max-w-none w-[400px] h-[400px] sm:w-[560px] sm:h-[560px] md:w-[720px] md:h-[720px] lg:w-[780px] lg:h-[780px] xl:w-[900px] xl:h-[900px]"
            >
              <defs>
                <mask id="wMask">
                  <rect width="100%" height="100%" fill="black" />
                  <g transform="rotate(30 350 350)">
                    <path
                      d="
                        M70 100
                        C140 660, 200 460, 240 240
                        C270 0, 320 140, 350 260
                        C390 460, 450 560, 500 60
                      "
                      fill="none"
                      stroke="white"
                      strokeWidth="110"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-mask-draw"
                    />
                  </g>
                </mask>
              </defs>

              <image
                href="/banner-image.png"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                mask="url(#wMask)"
                transform="scale(0.95) translate(50 40)"
              />
            </svg>

            {/* FLOATING GLASS CARD */}
            <div className="absolute bottom-4 sm:bottom-10 lg:bottom-16 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-44 sm:w-56 lg:w-64 p-3 sm:p-4 lg:p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg flex flex-col gap-2 sm:gap-3 animate-float-slow text-center lg:text-left">

              <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-gradient-to-r from-[#FF5C7A] to-[#FF8AA0] text-white font-bold text-base sm:text-lg">
                Join our Hive
              </div>

              <div className="flex items-center justify-center lg:justify-start -space-x-3">
                <img
                  src="https://randomuser.me/api/portraits/women/46.jpg"
                  alt=""
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt=""
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white"
                />
                <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#FF5C7A] to-[#FF8AA0] rounded-full border-2 border-white">
                  +99
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-black/70">
                One-time payment. <br /> Lifetime access.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
