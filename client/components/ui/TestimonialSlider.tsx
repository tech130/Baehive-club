import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Divya",
    role: "",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text:
      "I joined hoping to meet new people. I left with genuine friendships and a community that feels like home.",
  },
  {
    name: "Aarthi",
    role: "",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/cd2299f96ebf69427f7749f152289ed969b8a7b8?width=196",
    text:
      "Baehive gave me something I didn't know I was missing—a space to be myself without judgment.",
  },
  {
    name: " Lakshana",
    role: "",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
    text:
      "Every event feels like catching up with friends, even when you're meeting people for the first time.",
  },
  {
    name: "Aara",
    role: "",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
    text:
      "I spent years prioritizing everyone else. Baehive helped me reconnect with myself and make time for things I love.",
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const getPosition = (i) => {
    const diff = (i - active + testimonials.length) % testimonials.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === testimonials.length - 1) return "left";
    return "hidden";
  };

  const variants = {
    left: { x: -720, scale: 0.9, opacity: 0.3, zIndex: 1 },
    center: { x: 0, scale: 1, opacity: 1, zIndex: 3 },
    right: { x: 720, scale: 0.9, opacity: 0.3, zIndex: 1 },
    hidden: { opacity: 0, zIndex: 0 },
  };

  return (
    <section id="testimonials1" className="relative bg-[#FFFAFA] md:py-32 overflow-hidden">

      {/* Decorative circles */}
      <div className="absolute left-6 md:left-24 top-24 md:top-40 w-10 md:w-14 h-10 md:h-14 rounded-full bg-pink-300/60" />
      <div className="absolute right-6 md:right-40 top-20 md:top-32 w-16 md:w-24 h-16 md:h-24 rounded-full bg-pink-300/60" />
      <div className="absolute right-6 md:right-24 bottom-6 md:bottom-24 w-28 md:w-40 h-28 md:h-40 rounded-full bg-pink-200/70" />

      {/* Header */}
      <div className="text-center mb-16 md:mb-28 px-4">
        <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-serif mb-4 text-[#141414]">
          Testimonial
        </h2>
        <p className="max-w-[90%] sm:max-w-[500px] md:max-w-[640px] mx-auto text-[12px] sm:text-[13px] md:text-[14px] leading-6 text-[#5A5A5A]">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
          Maecenas Lobortis Nisi At Est Euismod Volutpat.
        </p>
      </div>

      {/* Slider */}
      <div className="relative h-[350px] sm:h-[380px] md:h-[420px] flex justify-center items-start">
        {testimonials.map((item, index) => {
          const position = getPosition(index);
          const isCenter = position === "center";

          return (
            <motion.div
              key={index}
              className="absolute w-[90%] sm:w-[600px] md:w-[720px]"
              variants={variants}
              animate={position}
              transition={{
                x: { type: "spring", stiffness: 90, damping: 28 },
                opacity: { duration: 0.35 },
              }}
            >
              {/* Card */}
              <div
                className={`relative rounded-2xl px-8 sm:px-10 md:px-14 py-12 sm:py-14 md:py-16 text-center shadow-xl
                ${isCenter ? "bg-gradient-to-r from-[#D94C9F] to-[#FF5A6C] text-white" : "bg-white text-[#9A9A9A]"}`}
              >
                {/* Quote */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <span className={`text-[120px] sm:text-[150px] md:text-[200px] leading-none font-serif opacity-40 ${isCenter ? "text-white" : "text-[#D1D1D1]"}`}>
                    “
                  </span>
                </div>

                <p className="relative text-[12px] sm:text-[13px] md:text-[14px] leading-6 sm:leading-7 md:leading-7 mt-10">
                  {item.text}
                </p>
              </div>

              {/* Profile */}
              {isCenter && (
                <div className="flex flex-col items-center mt-8 sm:mt-10 md:mt-12">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mb-2 sm:mb-3"
                  />
                  <h4 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#2A2A2A]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#FF5A6C]">
                    {item.role}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 gap-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-10 bg-[#FF5A6C]" : "w-2 bg-pink-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
