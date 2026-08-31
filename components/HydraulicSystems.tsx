
"use client";

import Image from "next/image";
import { useState } from "react";

/* =========================================================
   PERFORMANCE CARDS
========================================================= */

const performanceCards = [
  {
    icon: "◉",
    title: "SYSTEM RELIABILITY",
    text: "Dependable maintenance solutions designed to keep critical hydraulic systems operating reliably.",
  },
  {
    icon: "♢",
    title: "PRECISION MAINTENANCE",
    text: "Experienced technical support focused on maintaining hydraulic systems to demanding standards.",
  },
  {
    icon: "⚙",
    title: "AIRCRAFT EXPERTISE",
    text: "In-depth knowledge of hydraulic system interactions across diverse aircraft and aerospace systems.",
  },
  {
    icon: "↗",
    title: "MINIMAL DOWNTIME",
    text: "Maintenance focused on restoring performance while reducing operational disruption.",
  },
];

/* =========================================================
   SLIDER IMAGES
========================================================= */

const sliderImages = [
  {
    src: "/Alpha_Aircraft_Systems-Fuel-Systems.webp",
    alt: "Aircraft Hydraulic System",
    number: "01",
    title: "HYDRAULIC",
    subtitle: "SYSTEMS",
  },
  {
    src: "/Alpha-Aircraft-Systems_APU.webp",
    alt: "Aircraft APU System",
    number: "02",
    title: "AIRCRAFT",
    subtitle: "EQUIPMENT",
  },
  {
    src: "/Alpha_Aircraft_Systems-Fuel-Systems.webp",
    alt: "Aircraft Hydraulic Equipment",
    number: "03",
    title: "PRECISION",
    subtitle: "ENGINEERING",
  },
  {
    src: "/Alpha-Aircraft-Systems_APU.webp",
    alt: "Aircraft Maintenance",
    number: "04",
    title: "MRO",
    subtitle: "CAPABILITIES",
  },
  {
    src: "/Alpha_Aircraft_Systems-Fuel-Systems.webp",
    alt: "Hydraulic Maintenance",
    number: "05",
    title: "ADVANCED",
    subtitle: "MAINTENANCE",
  },
  {
    src: "/Alpha-Aircraft-Systems_APU.webp",
    alt: "Aerospace Technology",
    number: "06",
    title: "AEROSPACE",
    subtitle: "TECHNOLOGY",
  },
];

/* =========================================================
   HOME PAGE
========================================================= */

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* =======================================================
     TWO CARDS PER SLIDE
  ======================================================= */

  const cardsPerSlide = 2;

  const totalSlides = Math.ceil(
    sliderImages.length / cardsPerSlide
  );

  /* =======================================================
     NEXT
  ======================================================= */

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= totalSlides - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        return totalSlides - 1;
      }

      return prev - 1;
    });
  };

  return (
    <main className="site">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="heroContent">

          {/* HERO TEXT */}

          <div className="heroText">

            <h1>
              HYDRAULIC
              <br />
              <span>SYSTEMS</span>
            </h1>

            <p>
              Dependable hydraulic repair and maintenance solutions engineered
              for aircraft performance, safety, and reliability.
            </p>

            <div className="heroButtons">

              <a
                href="#contact"
                className="primaryBtn"
              >
                CONTACT US
              </a>

              <a
                href="#solutions"
                className="secondaryBtn"
              >
                EXPLORE OTHER SERVICES
              </a>

            </div>

          </div>


          {/* HERO IMAGE */}

          <div className="heroImageArea">

            <Image
              src="/Hydraulic.png"
              alt="Hydraulic System"
              width={750}
              height={550}
              priority
              className="hydraulicImage"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          POWER UNDER PRESSURE
      ===================================================== */}

      <section className="powerSection">

        {/* LEFT */}

        <div className="powerText">

          <h2>
            POWER UNDER PRESSURE
          </h2>

          <p>
            Alpha Aircraft Systems offers hydraulic system repair and
            maintenance services with dependability. Whether your aircraft is
            small or large, we have the expertise to maintain your
            aircraft&apos;s hydraulic systems to the highest standards.
          </p>

          <p>
            We have extensive aircraft maintenance experience and an in-depth
            knowledge of Hydraulic Systems interactions and aircraft systems.
          </p>

          <p>
            Because Hydraulic Systems are critical to the health of your
            flying machine and safety of passengers and pilots, top-notch
            maintenance ensures maximum performance with minimal downtime.
          </p>

        </div>


        {/* RIGHT IMAGE */}

        <div className="powerImage">

          <Image
            src="/Alpha-Aircraft-Systems_APU.webp"
            alt="Aircraft Hydraulic Pipes"
            fill
            className="coverImage"
          />

          <div className="powerImageOverlay" />

        </div>

      </section>


      {/* =====================================================
          PERFORMANCE
      ===================================================== */}

      <section
        className="performance"
        id="solutions"
      >

        <div className="performanceBackgroundDots" />

        <div className="sectionHeading">

          <h2>
            FROM PRESSURE
            <br />
            TO PERFORMANCE
          </h2>

          <p>
            Dependable hydraulic solutions engineered around aircraft
            performance, safety, and reliability.
          </p>

        </div>


        <div className="performanceGrid">

          {performanceCards.map((card, index) => (

            <div
              className="performanceCard"
              key={index}
            >

              <div className="cardTop">

                <div className="cardIcon">
                  {card.icon}
                </div>

                <span className="cardNumber">
                  0{index + 1}
                </span>

              </div>

              <h3>
                {card.title}
              </h3>

              <p>
                {card.text}
              </p>

              <span className="cardArrow">
                →
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          WHERE THE WORK HAPPENS
      ===================================================== */}

      <section className="workSection">

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="workLeft">

          <h2>
            WHERE THE WORK HAPPENS
          </h2>

          <p>
            A closer look at the equipment, technical expertise and working
            environment behind Alpha Aircraft Systems&apos; hydraulic
            maintenance capabilities.
          </p>

          <div className="workCounter">

            <Image
              src="/Alpha-Aircraft-Plasma_Spray.webp"
              alt="Hydraulic System"
              width={750}
              height={550}
              priority
            />

          </div>

        </div>


        {/* ===================================================
            RIGHT SLIDER
        =================================================== */}

        <div className="workRight">

          {/* IMAGE SLIDER */}

          <div className="twoCardSlider">

            <div
              className="twoCardTrack"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >

              {Array.from({
                length: totalSlides,
              }).map((_, slideIndex) => {

                const firstIndex =
                  slideIndex * cardsPerSlide;

                const firstCard =
                  sliderImages[firstIndex];

                const secondCard =
                  sliderImages[firstIndex + 1];

                return (

                  <div
                    className="twoCardSlide"
                    key={slideIndex}
                  >

                    {/* ===================================
                        CARD ONE
                    =================================== */}

                    {firstCard && (

                      <div className="imageCard">

                        <Image
                          src={firstCard.src}
                          alt={firstCard.alt}
                          fill
                          sizes="(max-width: 700px) 100vw, 40vw"
                          className="sliderCardImage"
                        />

                        <div className="imageCardOverlay" />

                        <div className="imageCardContent">

                          <span className="imageCardNumber">
                            {firstCard.number}
                          </span>

                          <h3>
                            {firstCard.title}
                            <br />
                            {firstCard.subtitle}
                          </h3>

                        </div>

                      </div>

                    )}


                    {/* ===================================
                        CARD TWO
                    =================================== */}

                    {secondCard && (

                      <div className="imageCard">

                        <Image
                          src={secondCard.src}
                          alt={secondCard.alt}
                          fill
                          sizes="(max-width: 700px) 100vw, 40vw"
                          className="sliderCardImage"
                        />

                        <div className="imageCardOverlay" />

                        <div className="imageCardContent">

                          <span className="imageCardNumber">
                            {secondCard.number}
                          </span>

                          <h3>
                            {secondCard.title}
                            <br />
                            {secondCard.subtitle}
                          </h3>

                        </div>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          </div>


          {/* =================================================
              SLIDER BOTTOM
          ================================================= */}

          <div className="aboutBottom">

            <p>
              Discover the expertise behind Alpha Aircraft Systems.
            </p>

          </div>


          <div className="sliderBottomControls">

            {/* ABOUT BUTTON */}

            <a
              href="#contact"
              className="aboutButton"
            >
              ABOUT US
              <span>→</span>
            </a>


            {/* ARROWS */}

            <div className="twoCardControls">

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                →
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

