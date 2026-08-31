"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    number: "01",
    name: "Nelson Leppe",
    role: "President",
    image: "/male-profile-pic.webp",
    text: "Oversees budgets, staff, executives and evaluates the success of the company.",
  },
  {
    number: "02",
    name: "Cesar Leppe",
    role: "Accessories Shop Supervisor",
    image: "/male-profile-pic.webp",
    text: "Oversees and motivates employees toward achieving departmental goals for safety, quality, training, on-time work orders.",
  },
  {
    number: "03",
    name: "Ulises Guerrero",
    role: "Customer Support",
    image: "/male-profile-pic.webp",
    text: "Manages incoming calls and customer service inquiries, generating leads that develop into new customers.",
  },
  {
    number: "04",
    name: "Dario Abascal",
    role: "Quality Control",
    image: "/male-profile-pic.webp",
    text: "Reads blueprints, specifications and monitors operations to ensure that they meet production standards.",
  },
  {
    number: "05",
    name: "Israel Leppe",
    role: "General Manager",
    image: "/male-profile-pic.webp",
    text: "Oversees budgets, staff, executives and evaluates the success of the company.",
  },
  {
    number: "06",
    name: "Alberto Rodriguez",
    role: "Quality Assurance",
    image: "/male-profile-pic.webp",
    text: "Monitors, inspects, and implements measures to meet established quality standards.",
  },
];

export default function AboutPage() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==========================================
      // HERO INTRO
      // ==========================================

      const hero = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      hero
        .from(".section-tag", {
          opacity: 0,
          x: -40,
          duration: 0.8,
        })
        .from(
          ".about-title .line",
          {
            opacity: 0,
            y: 100,
            rotateX: -70,
            stagger: 0.12,
            duration: 1.15,
          },
          "-=.4"
        )
        .from(
          ".about-copy",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=.65"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=.45"
        )
        .from(
          ".visual-frame",
          {
            opacity: 0,
            scale: 0.82,
            rotate: -8,
            duration: 1.2,
          },
          "-=1"
        )
        .from(
          ".aircraft-image",
          {
            opacity: 0,
            x: 180,
            scale: 0.7,
            rotate: 8,
            duration: 1.3,
          },
          "-=.9"
        )
        .from(
          ".apu-orb",
          {
            opacity: 0,
            scale: 0,
            duration: 0.9,
            ease: "back.out(1.7)",
          },
          "-=.7"
        );

      // ==========================================
      // DESKTOP HERO PARALLAX
      // ==========================================

      mm.add("(min-width: 769px)", () => {
        gsap.to(".aircraft-image", {
          y: 170,
          x: -90,
          rotate: -4,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });

        gsap.to(".visual-frame", {
          y: 100,
          rotate: 5,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        gsap.to(".apu-orb", {
          y: -180,
          x: -60,
          rotate: 25,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // ==========================================
      // TEAM HEADER
      // ==========================================

      gsap.from(".team-heading", {
        opacity: 0,
        y: 100,
        rotateX: -35,
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 75%",
          end: "top 45%",
          scrub: 1,
        },
      });

      // ==========================================
      // TEAM CARDS
      // ==========================================

      gsap.from(".team-card", {
        opacity: 0,
        y: 120,
        rotateY: 25,
        scale: 0.8,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
          end: "top 45%",
          scrub: 1.2,
        },
      });

      // ==========================================
      // TEAM IMAGE PARALLAX
      // ==========================================

      gsap.utils
        .toArray<HTMLElement>(".team-image")
        .forEach((image) => {
          gsap.to(image, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

      // ==========================================
      // TEAM CARD 3D MOUSE EFFECT
      // ==========================================

      const cards =
        gsap.utils.toArray<HTMLElement>(".team-card");

      cards.forEach((card) => {
        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();

          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          const rotateY =
            (x / rect.width - 0.5) * 10;

          const rotateX =
            (y / rect.height - 0.5) * -10;

          gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.025,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, .5)",
          });
        };

        card.addEventListener(
          "mousemove",
          handleMove
        );

        card.addEventListener(
          "mouseleave",
          handleLeave
        );
      });

      // ==========================================
      // FLOATING APU
      // ==========================================

      gsap.to(".orb-ring", {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".apu-orb", {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ==========================================
      // CLEANUP MATCH MEDIA
      // ==========================================

      return () => {
        mm.revert();
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={root}
      className="about-page"
    >
      {/* ==========================================
          01 / ABOUT HERO
      ========================================== */}

      <section className="about-hero">
        <div className="hero-grid-lines" />

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-inner">

          {/* LEFT CONTENT */}

          <div className="hero-content">

            <div className="section-tag">
              <span />
              ABOUT ALPHA AIRCRAFT
            </div>

            <h1 className="about-title">
              <span className="line">
                ABOUT
              </span>

              <span className="line">
                ALPHA
              </span>
            </h1>

            <p className="about-copy">
              Alpha Aircraft Systems Inc., located in
              East 10th Lane, Hialeah, Florida, is a
              global leader in certified aircraft APU
              services.
              <br />
              <br />
              We specialize in FAA and EASA-approved
              APU testing, repair, and overhaul for
              clients around the world. With
              multilingual support and international
              shipping logistics, we make it easy for
              operators abroad to access trusted
              aviation services.
            </p>

            <div className="hero-meta">

              <div className="meta-item">
                <strong>FAA</strong>
                <span>APPROVED</span>
              </div>

              <div className="meta-item">
                <strong>EASA</strong>
                <span>APPROVED</span>
              </div>

              <div className="meta-item">
                <strong>APU</strong>
                <span>SPECIALIST</span>
              </div>

            </div>

          </div>

          {/* RIGHT VISUAL */}

          <div className="hero-visual">

            <div className="visual-frame">
              <div className="frame-cross cross-one" />
              <div className="frame-cross cross-two" />
            </div>

            <div className="aircraft-image">
              <Image
                src="/ab.png"
                alt="Alpha Aircraft"
                width={900}
                height={700}
                priority
                className="aircraft-img"
              />
            </div>

            <div className="apu-orb">

              <div className="orb-ring" />

              <div className="apu-core">
                <Image
                  src="/apuu.png"
                  alt="Aircraft APU"
                  width={300}
                  height={300}
                  className="apu-img"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          02 / TEAM
      ========================================== */}

      <section
        className="team-section"
        id="team"
      >

        <div className="team-background-grid" />

        <div className="section-container">

          {/* TEAM HEADING */}

          <div className="team-heading">

            <div>

              <div className="section-tag light">
                <span />
                OUR SUPPORT SYSTEM IN THE JOURNEY
              </div>

              <h2>
                TEAM
              </h2>

            </div>

            <p>
              Our expert team provides high-quality
              aircraft systems maintenance and
              support. Whether you’re a private owner
              or a commercial operator, we deliver
              precision, reliability, and global reach
              from our South Florida facility.
            </p>

          </div>

          {/* TEAM GRID */}

          <div className="team-grid">

            {team.map((member) => (

              <article
                className="team-card"
                key={member.number}
              >

                <div className="team-card-top">

                  <span>
                    {member.number}
                  </span>

                  <span>
                    ALPHA / TEAM
                  </span>

                </div>

                <div className="team-photo">

                  <Image
                    className="team-image"
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={700}
                  />

                  <div className="photo-overlay" />

                </div>

                <div className="team-card-content">

                  <div className="team-role">
                    {member.role}
                  </div>

                  <h3>
                    {member.name}
                  </h3>

                  <p>
                    {member.text}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}