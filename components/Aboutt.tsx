"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/4.jpg",
  "/Cam.jpg",
  "/Cam1.jpg",
  "/1.jpg",
  
  "/3.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/9.jpg",
  "/10.jpg",
  "/11.jpg",
  "/12.jpg",
  "/13.jpg",
   "/14.jpg",
  "/15.jpg",
  "/16.jpg",
  "/17.jpg",
  "/18.jpg",
  "/19.jpg",
  "/20.jpg",
  "/21.jpg",
  "/22.jpg",
  "/23.jpg",
  
];

export default function FacilitySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="facility-page">
      <section className="facility-section">
        <div className="facility-container">

          {/* TOP TEXT */}
          <div className="facility-heading">
            <p className="facility-label">
              WHERE THE WORK HAPPENS
            </p>

            <h1>
              THE PEOPLE, EQUIPMENT AND
              <br />
              EXPERTISE BEHIND THE WORK
            </h1>
          </div>

          {/* LARGE IMAGE */}
          <div className="facility-main-image">
            <Image
              src="/Team.JPG"
              alt="Large aircraft facility"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 680px"
            />
          </div>

          {/* IMAGE CAROUSEL */}
          <div className="facility-carousel">

            {/* PREVIOUS */}
            <button
              className="carousel-arrow carousel-prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous images"
            >
              <span></span>
            </button>

            {/* VIEWPORT */}
            <div className="carousel-viewport">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (33.333% + 23.33px)))`,
                }}
              >
                {images.map((image, index) => (
                  <div
                    className="carousel-item"
                    key={`${image}-${index}`}
                  >
                    <Image
                      src={image}
                      alt={`Aircraft facility ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 85vw, 30vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* NEXT */}
            <button
              className="carousel-arrow carousel-next"
              onClick={handleNext}
              disabled={currentIndex >= images.length - 3}
              aria-label="Next images"
            >
              <span></span>
            </button>

          </div>

        </div>
      </section>
    </main>
  );
}