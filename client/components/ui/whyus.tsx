import { useState } from "react";
import { Brain, Heart, Search, TrendingUp } from "lucide-react"; // your icons

const cards = [
  {
    title: "Problem Solving",
    icon: <Brain className="w-6 h-6" />,
    short: "Navigate life's everyday challenges with clarity and confidence.From small decisions to bigger crossroads, you don't have to figure things out alone. ",
    long: ` Through shared conversations, real stories, and women who've been there.`,
  },
  {
    title: "Relationships",
    icon: <Heart className="w-6 h-6" />,
    short: "Build deeper, healthier connections — with friends, family, and yourself.Because real relationships grow through understanding, honesty, ",
    long: ` and shared moments. Find support, perspective, and connection within a trusted women-only community.`,
  },
  {
    title: "Identifying Passion",
    icon: <Search className="w-6 h-6" />,
    short: "Explore what excites you, motivates you, and feels truly yours.Sometimes all it takes is the right space to rediscover what you love.  ",
    long: `Discover your interests through experiences, conversations, and creative spaces.`,
  },
  {
    title: "Growth Career",
    icon: <TrendingUp className="w-6 h-6" />,
    short: "Move forward in your career without pressure or comparison.Learn, share, and grow at your own pace with support that feels genuine. ",
    long: `Grow alongside women who encourage, share insights, and uplift each other.`,
  },
];

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleExpand = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="why-us" className="bg-bg-light py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <h2 className="font-kraskario text-5xl md:text-6xl text-center mb-12 capitalize">
          We Can Help Transform You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`p-6 rounded-[30px] border ${
                  isActive
                    ? "border-[#FF566D] shadow-lg bg-white"
                    : "border-[#F5E8DE] bg-white"
                } space-y-6 transition-all duration-300`}
              >
                {/* Icon with background highlight */}
                <div
                  className={`p-3 rounded-full w-fit transition-colors duration-300 ${
                    isActive ? "bg-[#FF566D] text-white" : "bg-bg-beige text-black/60"
                  }`}
                >
                  {card.icon}
                </div>

                <h3 className="font-kraskario text-3xl capitalize">{card.title}</h3>

                {/* Single continuous paragraph */}
                <p className="font-manrope text-base text-black">
                  {card.short}
                  {isActive && card.long}
                </p>

                <button
                  onClick={() => toggleExpand(index)}
                  className="flex items-center gap-2 px-6 py-3 group mt-2"
                >
                  <span className="font-manrope text-base font-semibold gradient-text capitalize">
                    {isActive ? "Show Less" : "Learn More"}
                  </span>
                  <svg className="w-5 h-5" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M12 3.75C12 4.3065 12.5497 5.1375 13.1062 5.835C13.8217 6.735 14.6767 7.52025 15.657 8.1195C16.392 8.56875 17.283 9 18 9M18 9C17.283 9 16.3912 9.43125 15.657 9.8805C14.6767 10.4805 13.8217 11.2657 13.1062 12.1642C12.5497 12.8625 12 13.695 12 14.25M18 9H0"
                      stroke="url(#gradient)"
                      strokeWidth="1.5"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="9" x2="18" y2="9">
                        <stop offset="0.14" stopColor="#D14E9A" />
                        <stop offset="0.735577" stopColor="#FF566D" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
