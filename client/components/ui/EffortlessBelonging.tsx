import React from "react";

const EffortlessBelonging = () => {
  return (
    <section className="bg-[#FFF7F9]  overflow-visible   md:py-24 m">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24">
        <div className="grid md:grid-cols-2  items-start">

          {/* LEFT COLUMN */}
          <div className="relative">
            <p className="font-manrope text-xs font-semibold tracking-widest text-[#FF4F87] mb-6">
              CONNECTION, ON YOUR TERMS
            </p>

            <h2 className="font-kraskario text-[48px] md:text-[72px] leading-[1.1] mb-6">
              Effortless Belonging
            </h2>

            <p className="font-manrope text-[16px] md:text-[18px] text-[#6F6F6F] leading-relaxed max-w-md mb-10">
              No subscription fatigue. No pressure to perform.
              <br />
              Just a community of women coming together
              <br />
              when they choose.
            </p>

           <button
  onClick={() => {
    const section = document.getElementById("form-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="px-10 py-4 rounded-full bg-gradient-to-r from-[#D14E9A] to-[#FF566D] text-white font-manrope text-lg font-semibold"
>
  <span className="gradient-text1">Get Started</span>
</button>


            {/* STEP 1 */}
            <div
              className="relative mt-12 max-w-md
                         md:absolute md:left-[40%] md:top-[145%]
                         md:-translate-x-1/2 md:-translate-y-1/2"
            >
              {/* BACK NUMBER */}
             <span className="absolute -top-6 right-20 text-[80px] md:text-[150px] font-bold text-[#FF4F87]/15 leading-none pointer-events-none select-none hidden md:block">
  1
</span>


              {/* CONTENT */}
              <div className="relative z-10">
                <p className="text-base font-bold text-[#FF4F87] mb-1">
                  Join Once
                </p>
                <p className="text-base font-bold text-black mb-3">
                  ₹2,500 · Lifetime
                </p>
                <p className="text-sm text-[#6F6F6F] leading-relaxed">
                  Lifetime membership.<br /> Pay once and gain access<br /> forever.
                  No recurring fees or hidden costs.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative h-auto md:h-[620px] w-full">

            {/* CONNECTING CURVE */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="800 0 200 670"
              fill="none"
            >
              <path
                d="
                  M0 570
                  C250 800, 160 220, 500 400
                  S800 100, 1100 150
                "
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />

              {/* <circle cx="50" cy="607" r="8" fill="#FF4F87" />
              <circle cx="620" cy="440" r="8" fill="#FF4F87" />
              <circle cx="1000" cy="155" r="8" fill="#FF4F87" /> */}

              {/* DOT 1 */}
<g>
  <rect
    x="30"
    y="587"
    width="40"
    height="40"
    rx="8"          // ← square with soft corners
    ry="8"
    fill="#FFF"
    // stroke="#FFD1DE"
    strokeWidth="2"
  />
  <circle cx="50" cy="607" r="6" fill="#FF4F87" />
</g>


{/* DOT 2 */}
<g>
  <rect
    x="600"
    y="420"
    width="40"
    height="40"
    rx="8"
    ry="8"
    fill="#FFF"
    // stroke="#FFD1DE"
    strokeWidth="2"
  />
  <circle cx="620" cy="440" r="6" fill="#FF4F87" />
</g>


{/* DOT 3 */}
<g>
  <rect
    x="980"
    y="135"
    width="40"
    height="40"
    rx="8"
    ry="8"
    fill="#FFF"
    // stroke="#FFD1DE"
    strokeWidth="2"
  />
  <circle cx="1000" cy="155" r="6" fill="#FF4F87" />
</g>

              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D14E9A" />
                  <stop offset="100%" stopColor="#FF566D" />
                </linearGradient>
              </defs>
            </svg>

            {/* STEP 2 */}
            <div
              className="relative mt-12 max-w-md
                         md:absolute md:left-[10%] md:top-[75%]
                         md:-translate-x-1/2 md:-translate-y-1/2"
            >
              <span className="absolute -top-6 -right-20 text-[80px] md:text-[150px] font-bold text-[#FF4F87]/15 leading-none pointer-events-none select-none hidden md:block">
  2
</span>

              <div className="relative z-10">
                <p className="text-base font-bold text-[#FF4F87] mb-1">
                  Choose Your Moments
                </p>
                <p className="text-base font-bold text-black mb-3">
                  CURATED EXPERIENCES
                </p>
                <p className="text-sm text-[#6F6F6F] leading-relaxed">
                  Explore brunches, workshops,<br /> and retreats.
                  Join only what fits<br /> your season.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div
              className="relative mt-12 max-w-md
                         md:absolute md:left-[68%] md:top-[40%]
                         md:-translate-x-1/2 md:-translate-y-1/2"
            >
             <span className="absolute -top-6 -right-12 text-[80px] md:text-[150px] font-bold text-[#FF4F87]/15 leading-none pointer-events-none select-none hidden md:block">
  3
</span>


              <div className="relative z-10">
                <p className="text-base font-bold text-[#FF4F87] mb-1">
                  Come As You Are
                </p>
                <p className="text-base font-bold text-black mb-3">
                  NO PRESSURE. EVER.
                </p>
                <p className="text-sm text-[#6F6F6F] leading-relaxed">
                  Show up fully yourself — no expectations, no performance required.
                </p>
              </div>
            </div>  

          </div>
        </div>
      </div>
    </section>
  );
};

export default EffortlessBelonging;
