import { useState } from "react";

const categories = ["All", "Chill", "Social", "Creative", "Wellness"];

const events = [
  {
    id: 1,
    column: 1,
    height: "tall",
    category: "Chill",
    title: "Book Clubs",
    subtitle: "Sunday Readers",
    desc: "Low stakes, high comfort, and warm chai.",
    tags: ["Slow", "Thoughtful", "Cozy"],
    image:
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/cat1.png",
  },
  {
    id: 4,
    column: 2,
    height: "small",
    category: "Social",
    title: "Social Gatherings",
    subtitle: "Open Circles",
    desc: "Come as you are, stay as long as you like.",
    tags: ["Honest", "Comfortable", "Real"],
    image:
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/cat3.png",
  },
  {
    id: 3,
    column: 2,
    height: "small",
    category: "Chill",
    title: "Adventure Days",
    subtitle: "Coastal Trek",
    desc: "Fresh air and fresh perspectives.",
    tags: ["Fun", "Outdoors", "Play"],
    image:
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/cat2.png",
  },
  {
    id: 5,
    column: 3,
    height: "tall",
    category: "Hands On",
    title: "Creative Workshops",
    subtitle: "Hands On",
    desc: "Get messy and make something beautiful.",
    tags: ["Express", "Create", "Explore"],
    image:
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/cat4.png",
  },
  {
    id: 6,
    column: 4,
    height: "small",
    category: "Wellness",
    title: "Wellness Circles",
    subtitle: "Morning Grounding",
    desc: "A safe space to breathe and just be.",
    tags: ["Gentle", "Grounding", "Rest"],
    image:
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/cat5.png",
  },
  {
    id: 7,
    column: 4,
    height: "small",
    category: "Social",
    title: "Cafe & City Hangouts",
    subtitle: "City Bites",
    desc: "Discover hidden gems and new friends.",
    tags: ["Social", "Relaxed", "Tasty"],
    image:
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/cat6.png",
  },
];

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  const getHeight = (h) => {
    if (h === "small") return "h-[260px] md:h-[263px]";
    if (h === "tall") return "h-[260px] md:h-[542px]";
    return "h-[260px] md:h-[812px]";
  };

  return (
    <section id="events1" className="bg-bg-light py-18">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="font-kraskario text-5xl md:text-6xl capitalize">
            Things We <span className="gradient-text1">Do Together</span>
          </h2>
          <p className="font-manrope text-2xl capitalize max-w-3xl mx-auto">
            Every SNB Club experience is designed to help you connect —
            comfortably and authentically.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-urbanist text-2xl transition
                ${
                  activeCategory === cat
                    ? "bg-gradient-primary text-white font-semibold"
                    : "border-2 border-[#DCDCDC] text-gray-600 hover:border-pink-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((col) => (
            <div key={col} className="space-y-6">
              {filteredEvents
                .filter((e) => e.column === col)
                .map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-[38px] overflow-hidden relative ${getHeight(
                      event.height
                    )}`}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                      <span className="text-white font-bold text-lg">
                        {event.title}
                      </span>
                      <h3 className="text-white font-semibold">
                        {event.subtitle}
                      </h3>
                      <p className="text-white/80 text-sm mb-3">
                        {event.desc}
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-1 rounded-full bg-gradient-primary text-white text-xs font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}