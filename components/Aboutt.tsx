"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/4.jpg",
  "/A1.webp",
  "/A2.webp",
  "/A3.webp",
  "/A4.webp",
  "/A5.webp",
  "/A6.webp",
  "/A7.webp",
"/A8.webp",
  "/A9.webp",
  "/A10.webp",
 "/11.webp",
  "/12.webp",
  "/13.webp",
  "/14.webp",
  "/15.webp",
  "/16.webp",
  "/17.webp",
"/18.webp",
  "/19.webp",
  "/20.webp",
"/21.webp",
  "/22.webp",
  
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