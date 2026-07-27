import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedGallery = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animated fade-in wrapper
  const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  // Vertical scroll wrapper
  const VerticalScroll = ({ direction = "up", children }: { direction?: "up" | "down"; children: React.ReactNode }) => {
    return (
      <motion.div
        initial={{ y: direction === "up" ? "0%" : "-50%" }}
        animate={{ y: direction === "up" ? "-50%" : "0%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="space-y-4"
      >
        {children}
        {children} {/* duplicate for seamless loop */}
      </motion.div>
    );
  };

  const galleryColumns = [
    [
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g1.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g2.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g3.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g2.png",
    ],
    [
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g3.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g2.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g1.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g2.png",
    ],
    [
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g2.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g1.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g3.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g1.png",

    ],
    [
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g1.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g2.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g3.png",
      "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/g2.png",

    ],
  ];

  return (
    <div className="min-h-screen bg-bg-cream">
      <section className="bg-[#FFFAFA] py-24 md:py-36 w-full overflow-visible">
        <AnimatedSection className="text-center mb-12 md:mb-16 px-6 md:px-12">
          <h2 className="font-kraskario text-4xl md:text-7xl mb-4 md:mb-6 ">Member <span className="gradient-text1">Gallery</span></h2>
          <p className="text-gray-600 text-base md:text-lg">Moments from our community</p>
        </AnimatedSection>

        {/* Desktop Grid */}
        <div className="hidden md:flex gap-6 h-[950px] px-6">
          {galleryColumns.map((col, idx) => (
            <div key={idx} className="flex-1 overflow-hidden rounded-2xl">
              <VerticalScroll direction={idx % 2 === 0 ? "up" : "down"}>
                {col.map((src, i) => (
                  <motion.div
                    key={i}
                    className="bg-gray-200 overflow-hidden h-96 mb-4 border-t border-b border-gray-300/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </VerticalScroll>
            </div>
          ))}
        </div>

        {/* Mobile Grid - Animated */}
        <div className="md:hidden flex gap-3 h-[600px] px-3 overflow-hidden">
          {galleryColumns.flat().slice(0, 2).map((src, idx) => (
            <div key={idx} className="flex-1 overflow-hidden rounded-xl">
              <VerticalScroll direction={idx % 2 === 0 ? "up" : "down"}>
                {galleryColumns.flat().slice(0, 5).map((img, i) => (
                  <motion.div
                    key={i}
                    className="bg-gray-200 overflow-hidden h-48 mb-3 border-t border-b border-gray-300/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </VerticalScroll>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnimatedGallery;
