
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   TEAM DATA
========================================================= */

const team = [
  {
    name: "Nelson Leppe",
    role: "President",
    description:
      "Oversees budgets, staff, executives and evaluates the success of the company.",
    image: "/male-profile-pic.webp",
  },
  {
    name: "Michael Smith",
    role: "Director",
    description:
      "Leads company operations and develops long-term strategic business initiatives.",
    image: "/male-profile-pic.webp",
  },
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    description:
      "Builds strong teams and manages operational performance across the organization.",
    image: "/male-profile-pic.webp",
  },
  {
    name: "David Wilson",
    role: "Technical Director",
    description:
      "Provides technical leadership and ensures quality across every project.",
    image: "/male-profile-pic.webp",
  },
  {
    name: "James Anderson",
    role: "Finance Director",
    description:
      "Manages financial planning, reporting and business growth strategies.",
    image: "/male-profile-pic.webp",
  },
  {
    name: "Emily Davis",
    role: "HR Manager",
    description:
      "Develops people, culture and organizational strategies to support the team.",
    image: "/male-profile-pic.webp",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function TeamPage() {
  const [active, setActive] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  /* =======================================================
     RESPONSIVE SLIDES
  ======================================================= */

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth <= 700) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1050) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlides();

    window.addEventListener("resize", updateSlides);

    return () => {
      window.removeEventListener(
        "resize",
        updateSlides
      );
    };
  }, []);

  /* =======================================================
     MAX SLIDE INDEX
  ======================================================= */

  const maxSlide =
    Math.max(
      0,
      team.length - slidesPerView
    );

  /* =======================================================
     NEXT SLIDE
  ======================================================= */

  const nextSlide = () => {
    setActive((prev) =>
      prev >= maxSlide
        ? 0
        : prev + 1
    );
  };

  /* =======================================================
     PREVIOUS SLIDE
  ======================================================= */

  const prevSlide = () => {
    setActive((prev) =>
      prev <= 0
        ? maxSlide
        : prev - 1
    );
  };

  /* =======================================================
     SELECT CARD
  ======================================================= */

  const selectMember = (index: number) => {
    setActive(
      Math.min(index, maxSlide)
    );
  };

  const featuredMember =
    team[active];

  return (
    <main className="team-page">

      {/* ===================================================
          MAIN SECTION
      =================================================== */}

      <section className="team-section">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="team-intro">

          <div className="intro-top">

            <div className="intro-label">

              

              <span>
                THE PEOPLE BEHIND THE WORK
              </span>

            </div>

            

          </div>


          {/* HEADING */}

          <div className="heading-block">

            

            <h1>
              EXPERIENCE,
              <br />

              <span>
                EXPERTISE AND
              </span>

            

              <br />

              COMMITMENT
              <br />

              <strong>
                IN ACTION
              </strong>
            </h1>

          </div>


          {/* DESCRIPTION */}

          <p className="intro-text">
            Meet the people whose experience,
            expertise and commitment drive
            everything we do.
          </p>


          {/* =================================================
              CONTROLS
          ================================================= */}

          <div className="team-navigation">

            <button
              type="button"
              className="nav-button"
              onClick={prevSlide}
              aria-label="Previous team members"
            >
              <ArrowLeft
                size={19}
                strokeWidth={1.5}
              />
            </button>


            <div className="counter">

              <span className="counter-current">
                {String(active + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <span className="counter-divider" />

              <span className="counter-total">
                {String(team.length).padStart(
                  2,
                  "0"
                )}
              </span>

            </div>


            <button
              type="button"
              className="nav-button"
              onClick={nextSlide}
              aria-label="Next team members"
            >
              <ArrowRight
                size={19}
                strokeWidth={1.5}
              />
            </button>

          </div>

        </div>


        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div className="team-content">

          {/* =================================================
              FEATURED CARD
          ================================================= */}

          <div
            className="featured-card"
            key={active}
          >

            {/* IMAGE */}

            <div className="featured-image">

              <Image
                src={featuredMember.image}
                alt={featuredMember.name}
                fill
                priority
                sizes="(max-width: 1050px) 100vw, 45vw"
              />

              <div className="featured-overlay" />

              <span className="featured-index">
                {String(active + 1).padStart(
                  2,
                  "0"
                )}
              </span>


              <div className="featured-round-arrow">

                <ArrowUpRight
                  size={21}
                  strokeWidth={1.5}
                />

              </div>

            </div>


            {/* FEATURED INFO */}

            <div className="featured-info">

              <div className="featured-header">

                <span>
                  {featuredMember.role}
                </span>

                <small>
                  TEAM MEMBER
                </small>

              </div>


              <div className="featured-bottom">

                <h2>
                  {featuredMember.name}
                </h2>

                <p>
                  {featuredMember.description}
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              SLIDER
          ================================================= */}

          <div className="slider-area">

            <div
              className="slider-track"
              style={{
                transform: `translateX(-${
                  active *
                  (100 /
                    slidesPerView)
                }%)`,
              }}
            >

              {team.map(
                (member, index) => {

                  const isActive =
                    active === index;

                  return (

                    <div
                      className="slide"
                      key={member.name}
                      style={{
                        width: `${100 / slidesPerView}%`,
                      }}
                    >

                      <button
                        type="button"
                        className={`team-card ${
                          isActive
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          selectMember(index)
                        }
                        onMouseEnter={() =>
                          selectMember(index)
                        }
                      >

                        {/* CARD IMAGE */}

                        <div className="card-image">

                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 700px) 90vw, (max-width: 1050px) 45vw, 25vw"
                          />

                          <div className="card-image-overlay" />

                          <span className="card-index">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                        </div>


                        {/* CARD CONTENT */}

                        <div className="card-content">

                          <div>

                            <h3>
                              {member.name}
                            </h3>

                            <p>
                              {member.role}
                            </p>

                          </div>


                          <span className="card-arrow">

                            <ArrowUpRight
                              size={16}
                              strokeWidth={1.5}
                            />

                          </span>

                        </div>

                      </button>

                    </div>

                  );
                }
              )}

            </div>

          </div>


          {/* =================================================
              DOTS
          ================================================= */}

          <div className="slider-footer">

            <div className="slider-dots">

              {team.map(
                (_, index) => (

                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to member ${
                      index + 1
                    }`}
                    className={`slider-dot ${
                      active === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      selectMember(index)
                    }
                  />

                )
              )}

            </div>


            <span className="drag-text">
              SELECT TEAM MEMBER
            </span>

          </div>

        </div>

      </section>


      {/* ===================================================
          BOTTOM STATEMENT
      =================================================== */}

     


     

       
      
    </main>
  );
}

