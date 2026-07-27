import React from "react";
import { Brain } from "lucide-react";
import "./feature-carousel.css";

const FeatureCarousel = () => {
  return (
    <section className="feature-section">

      {/* ===== TOP ROW ===== */}
      <div className="carousel-wrapper">
        <div className="carousel-track left">
          
          <CarouselCard speed="18s">
            <FeatureCardJoin />
          </CarouselCard>

          <CarouselCard speed="26s">
            <ImageCard />
          </CarouselCard>

          <CarouselCard speed="22s">
            <TestimonialCard />
          </CarouselCard>

          <CarouselCard speed="30s">
            <ProblemSolvingCard />
          </CarouselCard>

          <CarouselCard speed="24s">
            <CookingCard />
          </CarouselCard>

          <CarouselCard speed="28s">
            <BuiltForWomenCard />
          </CarouselCard>

        </div>
      </div>

      {/* ===== BOTTOM ROW ===== */}
      <div className="carousel-wrapper">
        <div className="carousel-track right">
          
          <CarouselCard speed="20s">
            <ImageCard />
          </CarouselCard>

          <CarouselCard speed="32s">
            <ProblemSolvingCard />
          </CarouselCard>

          <CarouselCard speed="26s">
            <TestimonialCard />
          </CarouselCard>

          <CarouselCard speed="34s">
            <CookingCard />
          </CarouselCard>

          <CarouselCard speed="28s">
            <BuiltForWomenCard />
          </CarouselCard>

        </div>
      </div>

    </section>
  );
};

export default FeatureCarousel;

/* ================= COMPONENTS ================= */

const CarouselCard = ({ children, speed }) => (
  <div className="carousel-card" style={{ "--speed": speed }}>
    {children}
  </div>
);

/* ================= CARD TYPES ================= */

const FeatureCardJoin = () => (
  <div className="card join-card">
    <img src="https://api.builder.io/api/v1/image/assets/TEMP/bcfc50b4fe41e16cda146ac1d467009d7cde5db4" />
    <div>
      <h3>Come as you are.</h3>
      <p>A women-only space that feels like home.</p>
      <button>Join Now</button>
    </div>
  </div>
);

const ImageCard = () => (
  <div className="card image-card">
    <img src="https://api.builder.io/api/v1/image/assets/TEMP/75e0f4cb83c1ec063a59b0249376d6d38e842741" />
  </div>
);

const TestimonialCard = () => (
  <div className="card testimonial-card">
    <img src="https://api.builder.io/api/v1/image/assets/TEMP/f75de16025440cd4ec91c613d57974312199b57d" />
    <div className="stars">★★★★★</div>
    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit.”</p>
  </div>
);

const ProblemSolvingCard = () => (
  <div className="card problem-card">
    <Brain />
    <h3>Problem Solving</h3>
    <p>Navigate life’s everyday challenges with clarity and confidence.</p>
  </div>
);

const CookingCard = () => (
  <div className="card cooking-card">
    <img src="https://api.builder.io/api/v1/image/assets/TEMP/8c6cb4c5492a06edfda2a6664e5ce99dccffb599" />
    <div className="overlay">
      <h3>Cooking Sessions</h3>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  </div>
);

const BuiltForWomenCard = () => (
  <div className="card women-card">
    <h3>Built for Women</h3>
    <p>Navigate life’s everyday challenges with clarity and confidence.</p>
    <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f" />
  </div>
);
