
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Download,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   TYPES
========================================================= */

type CertificateCard = {
  id: number;
  text: string;
  cta: string;
  image: string;
};

/* =========================================================
   DATA
========================================================= */

const cardsData: CertificateCard[] = [
  {
    id: 1,
    text: "Certificate of Registration",
    cta: "DOWNLOAD",
    image: "/Certificate-of-Registration.webp",
  },
  {
    id: 2,
    text: "EASA Approved",
    cta: "DOWNLOAD",
    image: "/EASA-Approved.webp",
  },
  {
    id: 3,
    text: "FAA Approved",
    cta: "DOWNLOAD",
    image: "/FAA-Approved.webp",
  },
  {
    id: 4,
    text: "ISO Certificate",
    cta: "DOWNLOAD",
    image: "/ISO-Certificate.webp",
  },
  {
    id: 5,
    text: "FAMO Certificate",
    cta: "DOWNLOAD",
    image: "/FAMO-Certificate.webp",
  },
];

/* =========================================================
   CREATE 3 COPIES
========================================================= */

const loopCards: CertificateCard[] = [
  ...cardsData,
  ...cardsData,
  ...cardsData,
];

/* =========================================================
   COMPONENT
========================================================= */

export default function WhatIfSection() {
  /* =======================================================
     REFS
  ======================================================= */

  const sectionRef = useRef<HTMLElement | null>(null);

  const cardsRef = useRef<
    (HTMLDivElement | null)[]
  >([]);

  const imagesRef = useRef<
    (HTMLImageElement | null)[]
  >([]);

  const currentIndex = useRef<number>(
    cardsData.length
  );

  const isAnimating = useRef<boolean>(false);

  const timeoutRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  /* =======================================================
     STATE
  ======================================================= */

  const [activeIndex, setActiveIndex] =
    useState<number>(0);

  /* =======================================================
     REAL INDEX
  ======================================================= */

  const getRealIndex = useCallback(
    (index: number): number => {
      return (
        ((index % cardsData.length) +
          cardsData.length) %
        cardsData.length
      );
    },
    []
  );

  /* =======================================================
     UPDATE SLIDER
  ======================================================= */

  const updateSlider = useCallback(
    (animate = true): void => {
      const index = currentIndex.current;

      cardsRef.current.forEach(
        (card, i) => {
          if (!card) return;

          const position = i - index;

          gsap.to(card, {
            x: position * 380,
            duration: animate ? 0.9 : 0,
            ease: "power4.inOut",
            overwrite: true,
          });

          const image =
            imagesRef.current[i];

          if (!image) return;

          gsap.to(image, {
            scale:
              i === index ? 1.08 : 1,
            yPercent:
              i === index ? -4 : 0,
            duration: animate ? 1.2 : 0,
            ease: "power3.out",
            overwrite: true,
          });
        }
      );
    },
    []
  );

  /* =======================================================
     NEXT SLIDE
  ======================================================= */

  const nextSlide = useCallback((): void => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    currentIndex.current += 1;

    setActiveIndex(
      getRealIndex(currentIndex.current)
    );

    updateSlider(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (
        currentIndex.current >=
        cardsData.length * 2
      ) {
        currentIndex.current =
          cardsData.length;

        setActiveIndex(
          getRealIndex(
            currentIndex.current
          )
        );

        updateSlider(false);
      }

      isAnimating.current = false;
    }, 920);
  }, [getRealIndex, updateSlider]);

  /* =======================================================
     PREVIOUS SLIDE
  ======================================================= */

  const previousSlide = useCallback(
    (): void => {
      if (isAnimating.current) return;

      isAnimating.current = true;

      currentIndex.current -= 1;

      setActiveIndex(
        getRealIndex(currentIndex.current)
      );

      updateSlider(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (
          currentIndex.current <
          cardsData.length
        ) {
          currentIndex.current =
            cardsData.length * 2 - 1;

          setActiveIndex(
            getRealIndex(
              currentIndex.current
            )
          );

          updateSlider(false);
        }

        isAnimating.current = false;
      }, 920);
    },
    [getRealIndex, updateSlider]
  );

  /* =======================================================
     DOWNLOAD CERTIFICATE
  ======================================================= */

  const downloadImage = useCallback(
    async (
      imageUrl: string,
      index: number
    ): Promise<void> => {
      try {
        const response =
          await fetch(imageUrl);

        if (!response.ok) {
          throw new Error(
            "Certificate download failed"
          );
        }

        const blob =
          await response.blob();

        const blobUrl =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement("a");

        link.href = blobUrl;

        link.download =
          `certificate-${String(
            index + 1
          ).padStart(2, "0")}.webp`;

        document.body.appendChild(
          link
        );

        link.click();

        document.body.removeChild(
          link
        );

        window.URL.revokeObjectURL(
          blobUrl
        );
      } catch {
        window.open(
          imageUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }
    },
    []
  );

  /* =======================================================
     INITIAL SETUP + SCROLL ANIMATION
  ======================================================= */

  useEffect(() => {
    const cards = cardsRef.current;
    const images = imagesRef.current;

    currentIndex.current =
      cardsData.length;

    setActiveIndex(
      getRealIndex(
        currentIndex.current
      )
    );

    /* =====================================================
       GSAP CONTEXT
    ===================================================== */

    const ctx = gsap.context(() => {

      /* ===================================================
         INITIAL SLIDER
      =================================================== */

      updateSlider(false);

      /* ===================================================
         CERTIFICATES HEADING
         SCROLL ANIMATION
      =================================================== */

      const headingChars =
        gsap.utils.toArray<HTMLElement>(
          ".what-if-char"
        );

      if (headingChars.length) {

        /* -----------------------------------------------
           INITIAL POSITION
        ------------------------------------------------ */

        gsap.set(headingChars, {
          y: 100,
          opacity: 0,
          rotateX: -70,
          transformOrigin:
            "center bottom",
        });

        /* -----------------------------------------------
           SCROLL REVEAL
        ------------------------------------------------ */

        gsap.to(headingChars, {
          y: 0,
          opacity: 1,
          rotateX: 0,

          duration: 1,

          stagger: 0.06,

          ease: "power4.out",

          scrollTrigger: {
            trigger:
              ".what-if-heading",

            start: "top 88%",

            end: "top 35%",

            scrub: 1,

            invalidateOnRefresh: true,
          },
        });
      }

      /* =================================================
         CARD ENTRANCE
      ================================================= */

      gsap.fromTo(
        cards,
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
    }, sectionRef);

    /* =====================================================
       KEYBOARD
    ===================================================== */

    const keyboardHandler = (
      event: KeyboardEvent
    ): void => {
      const target = event.target;

      if (
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLTextAreaElement ||
        target instanceof
          HTMLSelectElement
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousSlide();
      }
    };

    window.addEventListener(
      "keydown",
      keyboardHandler
    );

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      window.removeEventListener(
        "keydown",
        keyboardHandler
      );

      ctx.revert();

      gsap.killTweensOf(cards);
      gsap.killTweensOf(images);

      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current
        );

        timeoutRef.current = null;
      }

      isAnimating.current = false;
    };
  }, [
    getRealIndex,
    nextSlide,
    previousSlide,
    updateSlider,
  ]);

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      className="what-if-sectionss"
    >
      <div className="what-if-container">

        <div className="what-if-box">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="what-if-heading">
            <h2>
              <span className="milestone-heading-line">

                {"CERTIFICATES"
                  .split("")
                  .map(
                    (char, index) => (
                      <span
                        key={`certificate-${index}`}
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

          {/* =================================================
              SLIDER
          ================================================= */}

          <div className="what-if-slider">

            <div className="what-if-track">

              {loopCards.map(
                (card, index) => {

                  const realIndex =
                    getRealIndex(index);

                  const isActive =
                    activeIndex ===
                    realIndex;

                  return (
                    <div
                      key={`${card.id}-${index}`}
                      ref={(element) => {
                        cardsRef.current[
                          index
                        ] = element;
                      }}
                      className={`what-if-card ${
                        isActive
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
                            imagesRef.current[
                              index
                            ] = element;
                          }}
                          src={card.image}
                          alt={card.text}
                          fill
                          sizes="
                            (max-width: 768px) 85vw,
                            (max-width: 1200px) 50vw,
                            380px
                          "
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

                          <p className="what-if-main-text">
                            {card.text}
                          </p>

                          {/* =================================
                              DOWNLOAD CTA
                          ================================= */}

                          <div className="what-if-hover-content">

                            <button
                              type="button"
                              className="what-if-download-cta"
                              onClick={(
                                event
                              ) => {
                                event.stopPropagation();

                                void downloadImage(
                                  card.image,
                                  realIndex
                                );
                              }}
                            >
                              <span>
                                {card.cta}
                              </span>

                              <Download
                                size={16}
                                strokeWidth={1.5}
                              />
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          </div>

          {/* =================================================
              ARROWS
          ================================================= */}

          <div className="what-if-arrows">

            <button
              type="button"
              onClick={previousSlide}
              className="what-if-arrow"
              aria-label="Previous certificate"
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
              aria-label="Next certificate"
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
