"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ExhibitionItem = {
  title: string;
  image: string;
  location: string;
  address?: string;
  date: string;
  description?: string;
};

type ExhibitionYear = {
  [year: number]: ExhibitionItem[];
};


/* =========================================================
   EXHIBITION DATA
========================================================= */

const exhibitionData: ExhibitionYear = {
  2026: [
    {
      title: "MRO XPO India",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "ICC, Dwarka, New Delhi",
      address:
        "India International Convention & Expo Centre, Dwarka, New Delhi, India",
      date: "11–12 March, 2026",
      description:
        "Glimpses from MRO XPO India, where leaders and professionals from across the Indian aviation and MRO industry came together to exchange ideas, build partnerships, and explore the future of aircraft maintenance and support.",
    },

    {
      title: "Aero India 2026",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "Bengaluru, India",
      address:
        "Air Force Station Yelahanka, Bengaluru, Karnataka, India",
      date: "2026",
      description:
        "Connecting with aviation leaders and industry professionals to explore new opportunities, technologies and partnerships.",
    },

    {
      title: "Aircraft Expo 2026",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "India",
      address:
        "India International Convention & Expo Centre, New Delhi, India",
      date: "2026",
      description:
        "Showcasing aircraft component repair, overhaul and maintenance capabilities.",
    },

    {
      title: "Aero India 2026",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "Bengaluru, India",
      address:
        "Air Force Station Yelahanka, Bengaluru, Karnataka, India",
      date: "2026",
      description:
        "Connecting with aviation leaders and industry professionals to explore new opportunities, technologies and partnerships.",
    },
  ],

  2025: [
    {
      title: "MRO India 2025",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "New Delhi, India",
      address:
        "New Delhi, National Capital Territory of Delhi, India",
      date: "2025",
      description:
        "Meeting aviation professionals and strengthening partnerships across the aircraft maintenance industry.",
    },

    {
      title: "Aero India 2025",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "Bengaluru, India",
      address:
        "Air Force Station Yelahanka, Bengaluru, Karnataka, India",
      date: "2025",
      description:
        "Exploring aerospace technologies and building meaningful industry connections.",
    },

    {
      title: "Aviation Expo 2025",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "India",
      address:
        "Bengaluru International Exhibition Centre, Bengaluru, India",
      date: "2025",
      description:
        "Connecting with aviation businesses and professionals from around the world.",
    },

    {
      title: "Aviation Expo 2025",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "India",
      address:
        "India International Convention & Expo Centre, New Delhi, India",
      date: "2025",
      description:
        "Connecting with aviation businesses and professionals from around the world.",
    },
  ],

  2024: [
    {
      title: "Aviation Expo 2024",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "India",
      address:
        "New Delhi, National Capital Territory of Delhi, India",
      date: "2024",
      description:
        "A platform for connecting with aviation and MRO professionals.",
    },

    {
      title: "MRO Exhibition 2024",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "New Delhi, India",
      address:
        "New Delhi, National Capital Territory of Delhi, India",
      date: "2024",
      description:
        "Discovering new technologies and opportunities within aircraft maintenance.",
    },

    {
      title: "Aero Exhibition 2024",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "India",
      address:
        "Bengaluru, Karnataka, India",
      date: "2024",
      description:
        "Building new relationships across the aerospace industry.",
    },

    {
      title: "Aero Exhibition 2024",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "India",
      address:
        "Bengaluru, Karnataka, India",
      date: "2024",
      description:
        "Building new relationships across the aerospace industry.",
    },
  ],

  2023: [
    {
      title: "Aviation Expo 2023",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "India",
      address:
        "New Delhi, National Capital Territory of Delhi, India",
      date: "2023",
      description:
        "Connecting aviation professionals and exploring new opportunities.",
    },

    {
      title: "MRO Expo 2023",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "India",
      address:
        "New Delhi, National Capital Territory of Delhi, India",
      date: "2023",
      description:
        "Engaging with the MRO industry and its global community.",
    },

    {
      title: "Aero India 2023",
      image:
        "/Alpha-Aircraft-Systems-at-Wings-India-2026-11.webp",
      location: "Bengaluru, India",
      address:
        "Air Force Station Yelahanka, Bengaluru, Karnataka, India",
      date: "2023",
      description:
        "Connecting with aerospace leaders and industry experts.",
    },

    {
      title: "MRO Expo 2023",
      image:
        "/Alpha-Aircraft-Systems-Exhibition-America-3.webp",
      location: "India",
      address:
        "New Delhi, National Capital Territory of Delhi, India",
      date: "2023",
      description:
        "Engaging with the MRO industry and its global community.",
    },
  ],
};


/* =========================================================
   YEARS
========================================================= */

const exhibitionYears: number[] = [
  2026,
  2025,
  2024,
  2023,
];


/* =========================================================
   EXHIBITION DETAIL URL
========================================================= */

const exhibitionDetailUrl =
  "https://alpha-hazel-five.vercel.app/exhibition-singal";


/* =========================================================
   COMPONENT
========================================================= */

export default function Exhibition() {

  const [activeYear, setActiveYear] =
    useState<number>(2026);

  const [recentSlide, setRecentSlide] =
    useState<number>(0);

  const [galleryStart, setGalleryStart] =
    useState<number>(0);


  /* =======================================================
     CURRENT YEAR DATA
  ======================================================= */

  const currentYearData: ExhibitionItem[] =
    exhibitionData[activeYear] || [];


  /* =======================================================
     RECENT DATA
  ======================================================= */

  const recentData: ExhibitionItem[] =
    exhibitionData[2026] || [];


  const currentRecent:
    | ExhibitionItem
    | undefined =
    recentData[recentSlide];


  /* =======================================================
     RECENT PREVIOUS
  ======================================================= */

  const previousRecent = () => {

    if (recentData.length === 0) {
      return;
    }

    setRecentSlide((previous) => {

      if (previous <= 0) {
        return recentData.length - 1;
      }

      return previous - 1;

    });
  };


  /* =======================================================
     RECENT NEXT
  ======================================================= */

  const nextRecent = () => {

    if (recentData.length === 0) {
      return;
    }

    setRecentSlide((previous) => {

      return (
        (previous + 1) %
        recentData.length
      );

    });
  };


  /* =======================================================
     CHANGE YEAR
  ======================================================= */

  const changeYear = (year: number) => {

    setActiveYear(year);

    setGalleryStart(0);

  };


  /* =======================================================
     GALLERY PREVIOUS
  ======================================================= */

  const previousGallery = () => {

    if (currentYearData.length === 0) {
      return;
    }

    setGalleryStart((previous) => {

      if (previous <= 0) {
        return currentYearData.length - 1;
      }

      return previous - 1;

    });
  };


  /* =======================================================
     GALLERY NEXT
  ======================================================= */

  const nextGallery = () => {

    if (currentYearData.length === 0) {
      return;
    }

    setGalleryStart((previous) => {

      return (
        (previous + 1) %
        currentYearData.length
      );

    });
  };


  /* =======================================================
     THREE VISIBLE CARDS
  ======================================================= */

  const visibleCards: ExhibitionItem[] =
    currentYearData.length > 0
      ? [
          currentYearData[
            galleryStart %
              currentYearData.length
          ],

          currentYearData[
            (galleryStart + 1) %
              currentYearData.length
          ],

          currentYearData[
            (galleryStart + 2) %
              currentYearData.length
          ],
        ]
      : [];


  /* =======================================================
     RETURN
  ======================================================= */

  return (

    <main className="expo-page">


      {/* ===================================================
          HERO
      =================================================== */}

      <section className="expo-hero">

        <div className="expo-hero-bg">

          <Image
            src="/hero.png"
            alt="Alpha Aircraft Systems aircraft"
            fill
            priority
            sizes="100vw"
            className="expo-hero-image"
          />

        </div>


        <div className="expo-hero-overlay" />


        <div className="expo-container expo-hero-inner">

          <div className="expo-hero-content">

            <span className="expo-hero-label">
              EXHIBITIONS
            </span>


            <h1 className="expo-hero-title">

              CONNECTING AVIATION

              <br />

              BEYOND BOUNDARIES

            </h1>


            <p className="expo-hero-description">

              Meet Alpha Aircraft Systems at

              <br />

              leading aviation, defence and MRO

              <br />

              exhibitions.

            </p>

          </div>

        </div>

      </section>


      {/* ===================================================
          RECENT EXHIBITION
      =================================================== */}

      <section className="expo-recent-section">

        <div className="expo-container">


          <div className="expo-section-label">
            RECENT EXHIBITION
          </div>


          <div className="expo-recent-layout">


            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="expo-recent-media">

              <div className="expo-recent-image-wrap">

                {currentRecent && (

                  <Image
                    src={currentRecent.image}
                    alt={currentRecent.title}
                    fill
                    sizes="
                      (max-width: 768px)
                      100vw,
                      45vw
                    "
                    className="expo-recent-image"
                  />

                )}

              </div>


              {/* ARROWS */}

              <div className="expo-recent-arrows">

                <button
                  type="button"
                  onClick={previousRecent}
                  aria-label="Previous exhibition"
                  className="expo-arrow-button"
                >

                  <ArrowLeft />

                </button>


                <button
                  type="button"
                  onClick={nextRecent}
                  aria-label="Next exhibition"
                  className="expo-arrow-button"
                >

                  <ArrowRight />

                </button>

              </div>

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="expo-recent-content">


              <h2 className="expo-recent-title">

                {currentRecent?.title}

              </h2>


              <div className="expo-recent-meta">

                <span>
                  {currentRecent?.location}
                </span>


                <span className="expo-meta-divider">
                  |
                </span>


                <span>
                  {currentRecent?.date}
                </span>

              </div>


              <p className="expo-recent-description">

                {currentRecent?.description}

              </p>


              {/* =================================================
                  RECENT EXPLORE CTA
              ================================================= */}
<br /><br />
              <Link
                href={exhibitionDetailUrl}
                className="expo-explore-button"
              >
                EXPLORE
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          ALL EXHIBITIONS
      =================================================== */}

      <section className="expo-all-section">

        <div className="expo-container">


          <h2 className="expo-all-title">
            ALL EXHIBITIONS
          </h2>


          {/* =================================================
              YEAR BUTTONS
          ================================================= */}

          <div className="expo-year-tabs">

            {exhibitionYears.map(
              (year) => (

                <button
                  key={year}
                  type="button"
                  onClick={() =>
                    changeYear(year)
                  }
                  className={
                    activeYear === year
                      ? "expo-year-button expo-year-active"
                      : "expo-year-button"
                  }
                >

                  Exhibitions {year}

                </button>

              )
            )}

          </div>


          {/* =================================================
              GALLERY
          ================================================= */}

          <div className="expo-gallery">


            {/* LEFT ARROW */}

            <button
              type="button"
              className="
                expo-gallery-arrow
                expo-gallery-left
              "
              onClick={previousGallery}
              aria-label="Previous exhibitions"
            >

              <ArrowLeft />

            </button>


            {/* =================================================
                CARDS
            ================================================= */}

            <div className="expo-gallery-cards">

              {visibleCards.map(
                (
                  exhibition,
                  index
                ) => (

                  <div
                    key={`
                      ${activeYear}-
                      ${exhibition.title}-
                      ${exhibition.image}-
                      ${galleryStart}-
                      ${index}
                    `}
                    className="expo-gallery-card"
                  >

                    <div className="expo-gallery-image">


                      {/* =================================================
                          IMAGE
                      ================================================= */}

                      <Image
                        src={exhibition.image}
                        alt={exhibition.title}
                        fill
                        sizes="
                          (max-width: 600px)
                          90vw,
                          (max-width: 900px)
                          45vw,
                          30vw
                        "
                        className="expo-card-img"
                      />


                      {/* =================================================
                          DEFAULT TITLE
                      ================================================= */}

                      <div className="expo-card-overlay">

                        <span>
                          {exhibition.title}
                        </span>

                      </div>


                      {/* =================================================
                          HOVER CONTENT
                      ================================================= */}

                      <div className="expo-card-hover">

                        <div className="expo-hover-content">


                          {/* LABEL */}

                          <span className="expo-hover-label">
                            EXHIBITION
                          </span>


                          {/* TITLE */}

                          <h3 className="expo-hover-title">

                            {exhibition.title}

                          </h3>


                          {/* =================================================
                              META
                          ================================================= */}

                          <div className="expo-hover-meta">


                            {/* LOCATION */}

                            <div className="expo-hover-meta-row">

                              <span className="expo-meta-icon">

                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >

                                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />

                                  <circle
                                    cx="12"
                                    cy="10"
                                    r="2.5"
                                  />

                                </svg>

                              </span>


                              <span>

                                {exhibition.address ||
                                  exhibition.location}

                              </span>

                            </div>


                            {/* DATE */}

                            <div className="expo-hover-meta-row">

                              <span className="expo-meta-icon">

                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >

                                  <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="4"
                                    rx="2"
                                  />

                                  <line
                                    x1="16"
                                    x2="16"
                                    y1="2"
                                    y2="6"
                                  />

                                  <line
                                    x1="8"
                                    x2="8"
                                    y1="2"
                                    y2="6"
                                  />

                                  <line
                                    x1="3"
                                    x2="21"
                                    y1="10"
                                    y2="10"
                                  />

                                </svg>

                              </span>


                              <span>
                                {exhibition.date}
                              </span>

                            </div>

                          </div>


                          {/* =================================================
                              DESCRIPTION
                          ================================================= */}

                          {exhibition.description && (

                            <p className="expo-hover-description">

                              {exhibition.description}

                            </p>

                          )}


                          {/* =================================================
                              CARD CTA
                              LINK ADDED HERE
                          ================================================= */}

                          <Link
                            href={exhibitionDetailUrl}
                            className="expo-hover-cta"
                            aria-label={`Explore ${exhibition.title}`}
                          >

                            <span>
                              EXPLORE
                            </span>


                            <ArrowRight
                              size={17}
                            />

                          </Link>


                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>


            {/* RIGHT ARROW */}

            <button
              type="button"
              className="
                expo-gallery-arrow
                expo-gallery-right
              "
              onClick={nextGallery}
              aria-label="Next exhibitions"
            >

              <ArrowRight />

            </button>

          </div>

        </div>

      </section>


      {/* ===================================================
          VIDEO CTA
      =================================================== */}

      <section className="expo-video-section">


        {/* VIDEO */}

        <video
          className="expo-video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >

          <source
            src="/Alpha-Aircraft-Systems-Facility-at-Hialeah.mp4"
            type="video/mp4"
          />

          Your browser does not support
          the video tag.

        </video>


        {/* OVERLAY */}

        <div className="expo-video-overlay" />


        {/* CONTENT */}

        <div className="expo-video-content">


          <h2 className="expo-cta-title">

            THE NEXT CONNECTION STARTS

            <br className="expo-desktop-break" />

            WITH A CONVERSATION

          </h2>


          {/* BUTTONS */}

          <div className="expo-cta-buttons">


            <Link
              href="/capabilities"
              className="expo-cta-primary"
            >
              EXPLORE CAPABILITIES
            </Link>


            <Link
              href="/contact"
              className="expo-cta-secondary"
            >
              CONTACT US
            </Link>


          </div>

        </div>

      </section>

    </main>
  );
}