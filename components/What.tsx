
"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   TYPES
========================================================= */

type CardData = {
  id: number;
  text: string;
  hoverText: string;
  cta: string;
  link: string;
  image: string;
};

/* =========================================================
   CARD DATA
========================================================= */

const cardsData: CardData[] = [
  {
    id: 1,
    text: "A.P.U. Overhaul & Repairs",
    hoverText:
      "Specialization is all types of APU overhaul and repair",
    cta: "VIEW SERVICE",
    link: "https://alpha-hazel-five.vercel.app/a-p-u-overhaul-repairs",
    image: "/1-APU.jpg",
  },
  {
    id: 2,
    text: "Fuel Systems & Fuel Flow Transmitter",
    hoverText: "Reliable and durable overhauling",
    cta: "VIEW SERVICE",
    link: "https://alpha-hazel-five.vercel.app/fuel-systems-fuel-flow-transmitter",
    image: "/2-Fuel.jpg",
  },
  {
    id: 3,
    text: "Plasma Spray & Professional Welding",
    hoverText: "Cost-effective high-tech solutions",
    cta: "VIEW SERVICE",
    link: "https://alpha-hazel-five.vercel.app/plasma-spray-professional-welding",
    image: "/3-Plasma.jpg",
  },
  {
    id: 4,
    text: "Hydraulic Systems",
    hoverText:
      "Long-lasting and reliable component overhaul",
    cta: "VIEW SERVICE",
    link: "https://alpha-hazel-five.vercel.app/hydraulic-systems",
    image: "/4-Hydraulic.jpg",
  },
  {
    id: 5,
    text: "C.S.D. & Pneumatic Systems",
    hoverText:
      "Dealt with precision and accuracy",
    cta: "VIEW SERVICE",
    link: "https://alpha-hazel-five.vercel.app/c-s-d-pneumatic-systems",
    image: "/5-CSD.jpg",
  },
  {
    id: 6,
    text: "Aircraft Scanning",
    hoverText:
      "CNN 3D scan measurements with FARO instrument",
    cta: "VIEW SERVICE",
    link: "https://alpha-hazel-five.vercel.app/aircraft-scanning",
    image: "/6-Aircraft-Scanning.jpg",
  },
  {
    id: 7,
    text: "Borescope Services",
    hoverText:
      "Optimised instrument to take accurate measurements",
    cta: "VIEW SERVICE",
    link: "https://alpha-hazel-five.vercel.app/borescope-services",
    image: "/7-Borescope.jpg",
  },
];

/* =========================================================
   CREATE 3 COPIES
   Makes slider visually infinite
========================================================= */

const loopCards: CardData[] = [
  ...cardsData,
  ...cardsData,
  ...cardsData,
];

/* =========================================================
   GET REAL CARD INDEX
========================================================= */

const getRealIndex = (index: number): number => {
  return (
    ((index % cardsData.length) +
      cardsData.length) %
    cardsData.length
  );
};

/* =========================================================
   COMPONENT
========================================================= */

export default function WhatIfSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  /* =========================================================
     START FROM MIDDLE COPY
  ========================================================= */

  const currentIndex = useRef<number>(
    cardsData.length
  );

  const isAnimating = useRef<boolean>(false);

  const [activeIndex, setActiveIndex] =
    useState<number>(0);

  /* =========================================================
     UPDATE SLIDER
  ========================================================= */

  const updateSlider = useCallback(
    (animate = true): void => {
      const index = currentIndex.current;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const position = i - index;

        gsap.to(card, {
          x: position * 380,
          duration: animate ? 0.9 : 0,
          ease: "power4.inOut",
          overwrite: true,
        });

        /* =============================================
           IMAGE PARALLAX / ZOOM
        ============================================= */

        const image = imagesRef.current[i];

        if (image) {
          gsap.to(image, {
            scale: i === index ? 1.08 : 1,
            yPercent: i === index ? -4 : 0,
            duration: animate ? 1.2 : 0,
            ease: "power3.out",
            overwrite: true,
          });
        }
      });
    },
    []
  );

  /* =========================================================
     NEXT SLIDE
  ========================================================= */

  const nextSlide = useCallback((): void => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    currentIndex.current += 1;

    setActiveIndex(
      getRealIndex(currentIndex.current)
    );

    updateSlider(true);

    window.setTimeout(() => {
      /*
       * After reaching third copy,
       * silently move to middle copy.
       */

      if (
        currentIndex.current >=
        cardsData.length * 2
      ) {
        currentIndex.current =
          cardsData.length;

        updateSlider(false);

        setActiveIndex(
          getRealIndex(currentIndex.current)
        );
      }

      isAnimating.current = false;
    }, 920);
  }, [updateSlider]);

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================= */

  const previousSlide = useCallback((): void => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    currentIndex.current -= 1;

    setActiveIndex(
      getRealIndex(currentIndex.current)
    );

    updateSlider(true);

    window.setTimeout(() => {
      /*
       * If we reach first copy,
       * silently jump to middle copy.
       */

      if (
        currentIndex.current <
        cardsData.length
      ) {
        currentIndex.current =
          cardsData.length * 2 - 1;

        updateSlider(false);

        setActiveIndex(
          getRealIndex(currentIndex.current)
        );
      }

      isAnimating.current = false;
    }, 920);
  }, [updateSlider]);

  /* =========================================================
     INITIAL SETUP
  ========================================================= */

  useEffect(() => {
    currentIndex.current =
      cardsData.length;

    /* =====================================================
       INITIAL CARD POSITION
    ===================================================== */

    updateSlider(false);

    /* =====================================================
       SCROLL HEADING ANIMATION
    ===================================================== */

    const headingChars =
      document.querySelectorAll(
        ".what-if-char"
      );

    gsap.set(headingChars, {
      y: 100,
      opacity: 0,
      rotateX: -45,
    });

    gsap.to(headingChars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.1,
      stagger: 0.06,
      ease: "power4.out",

      scrollTrigger: {
        trigger: ".what-if-heading",
        start: "top 90%",
        end: "top 35%",
        scrub: 1,
      },
    });

    /* =====================================================
       CARD ENTRANCE
    ===================================================== */

    gsap.fromTo(
      cardsRef.current,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        delay: 0.35,
        ease: "power4.out",
      }
    );

    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    const keyboardHandler = (
      event: KeyboardEvent
    ): void => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener(
      "keydown",
      keyboardHandler
    );

    /* =====================================================
       COPY REF VALUES FOR CLEANUP
    ===================================================== */

    const cards = cardsRef.current;
    const images = imagesRef.current;

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      window.removeEventListener(
        "keydown",
        keyboardHandler
      );

      gsap.killTweensOf(cards);
      gsap.killTweensOf(images);

      ScrollTrigger.getAll().forEach(
        (trigger) => {
          if (
            trigger.trigger ===
            document.querySelector(
              ".what-if-heading"
            )
          ) {
            trigger.kill();
          }
        }
      );
    };
  }, [
    nextSlide,
    previousSlide,
    updateSlider,
  ]);

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className="what-if-section"
    >
      <div className="what-if-container">

        <div className="what-if-box">

          {/* =========================================
              HEADING
          ========================================= */}

          <div className="what-if-heading">

            <h2>
              <span className="milestone-heading-line">
                {"SERVICES".split("").map(
                  (char, index) => (
                    <span
                      key={`service-char-${index}`}
                      className="what-if-char"
                    >
                      {char === " "
                        ? "\u00A0"
                        : char}
                    </span>
                  )
                )}
              </span>
            </h2>

          </div>

          {/* =========================================
              SLIDER
          ========================================= */}

          <div
            ref={sliderRef}
            className="what-if-slider"
          >
            <div className="what-if-track">

              {loopCards.map(
                (card, index) => (

                  <div
                    key={`${card.id}-${index}`}
                    ref={(element) => {
                      cardsRef.current[index] =
                        element;
                    }}
                    className={`what-if-card ${
                      getRealIndex(
                        activeIndex
                      ) ===
                      getRealIndex(index)
                        ? "is-active"
                        : ""
                    }`}
                  >

                    <div className="what-if-card-inner">

                      {/* =================================
                          IMAGE
                      ================================= */}

                      <Image
                        ref={(element) => {
                          imagesRef.current[index] =
                            element;
                        }}
                        src={card.image}
                        alt={card.text}
                        width={800}
                        height={1000}
                        className="what-if-image"
                        priority={
                          index <
                          cardsData.length
                        }
                      />

                      {/* =================================
                          OVERLAY
                      ================================= */}

                      <div className="what-if-overlay" />

                      {/* =================================
                          CONTENT
                      ================================= */}

                      <div className="what-if-content">

                        {/* NUMBER */}

                        <span className="what-if-number">
                          {String(card.id).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        {/* MAIN TEXT */}

                        <p className="what-if-main-text">
                          {card.text}
                        </p>

                        {/* =================================
                            HOVER CONTENT
                        ================================= */}

                        <div className="what-if-hover-content">

                          {/* HOVER TEXT */}

                          <p className="what-if-hover-text">
                            {card.hoverText}
                          </p>

                          {/* =================================
                              CTA LINK
                          ================================= */}

                          <Link
                            href={card.link}
                            className="what-if-card-cta"
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            <span>
                              {card.cta}
                            </span>

                            <ArrowRight
                              size={16}
                              strokeWidth={1.5}
                            />
                          </Link>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          </div>

          {/* =========================================
              ARROWS
          ========================================= */}

          <div className="what-if-arrows">

            <button
              type="button"
              onClick={previousSlide}
              className="what-if-arrow"
              aria-label="Previous slide"
            >
              <ArrowLeft
                size={42}
                strokeWidth={1.2}
              />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="what-if-arrow"
              aria-label="Next slide"
            >
              <ArrowRight
                size={42}
                strokeWidth={1.2}
              />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

