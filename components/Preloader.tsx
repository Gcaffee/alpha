"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   PROCESS DATA
========================================================= */

const processItems = [
  {
    number: "01",
    title: "INSPECT",
    text: "Detailed inspection and assessment of every APU component.",
  },
  {
    number: "02",
    title: "REPAIR",
    text: "Precision repair and replacement of serviceable components.",
  },
  {
    number: "03",
    title: "OVERHAUL",
    text: "Complete overhaul carried out according to required standards.",
  },
  {
    number: "04",
    title: "TEST",
    text: "Final testing to ensure reliable and operational performance.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function APUOverhaulPage() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         HERO INTRO
      ===================================================== */

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      heroTimeline
        .from(".alpha-apu-hero-eyebrow", {
          y: 40,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".alpha-apu-hero-title",
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
          },
          "-=.5"
        )
        .from(
          ".alpha-apu-hero-description",
          {
            y: 45,
            opacity: 0,
            duration: 0.8,
          },
          "-=.7"
        )
        .from(
          ".alpha-apu-hero-actions",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=.5"
        )
        .from(
          ".alpha-apu-scroll-indicator",
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
          },
          "-=.4"
        )
        .from(
          ".alpha-apu-hero-image-wrap",
          {
            scale: 0.78,
            opacity: 0,
            rotationY: -20,
            rotationX: 10,
            x: 80,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=1"
        );

      /* =====================================================
         HERO IMAGE FLOAT
      ===================================================== */

      gsap.to(".alpha-apu-hero-image-wrap", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =====================================================
         HERO IMAGE ROTATION
      ===================================================== */

      gsap.to(".alpha-apu-hero-image", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: ".alpha-apu-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         HERO MOUSE 3D
      ===================================================== */

      const handleMouseMove = (event: MouseEvent) => {
        if (window.innerWidth <= 767) return;

        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        gsap.to(".alpha-apu-hero-image-card", {
          rotationY: x * 8,
          rotationX: y * -6,
          x: x * 12,
          y: y * 8,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to(".alpha-apu-hero-image-glow", {
          x: x * -25,
          y: y * -20,
          duration: 1,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      /* =====================================================
         HERO HOVER
      ===================================================== */

      const heroImageCard =
        root.current?.querySelector(
          ".alpha-apu-hero-image-card"
        ) as HTMLElement | null;

      if (heroImageCard) {
        const handleHeroEnter = () => {
          gsap.to(".alpha-apu-hero-image", {
            scale: 1.06,
            duration: 1,
            ease: "power3.out",
          });
        };

        const handleHeroLeave = () => {
          gsap.to(".alpha-apu-hero-image", {
            scale: 1,
            duration: 1,
            ease: "power3.out",
          });
        };

        heroImageCard.addEventListener(
          "mouseenter",
          handleHeroEnter
        );

        heroImageCard.addEventListener(
          "mouseleave",
          handleHeroLeave
        );
      }

      /* =====================================================
         EXPERTISE
      ===================================================== */

      const expertiseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".alpha-apu-expertise",
          start: "top 75%",
          end: "center center",
          scrub: 1,
        },
      });

      expertiseTimeline
        .from(".alpha-apu-expertise-copy", {
          x: -180,
          opacity: 0,
        })
        .from(
          ".alpha-apu-expertise-visual",
          {
            x: 180,
            opacity: 0,
            scale: 0.7,
            rotationY: 45,
            rotationX: 20,
          },
          0
        )
        .from(
          ".alpha-apu-expertise-image",
          {
            scale: 0.55,
            opacity: 0,
            rotationY: 35,
            rotationX: 20,
          },
          "-=.5"
        )
        .from(
          ".alpha-apu-info-tag",
          {
            scale: 0.5,
            opacity: 0,
            stagger: 0.1,
          },
          "-=.3"
        );

      /* =====================================================
         EXPERTISE FLOAT
      ===================================================== */

      gsap.to(".alpha-apu-expertise-image-wrap", {
        y: -18,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".alpha-apu-image-ring", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      /* =====================================================
         EXPERTISE MOUSE 3D
      ===================================================== */

      const expertiseVisual =
        root.current?.querySelector(
          ".alpha-apu-expertise-visual"
        ) as HTMLElement | null;

      const expertiseImage =
        root.current?.querySelector(
          ".alpha-apu-expertise-image-wrap"
        ) as HTMLElement | null;

      if (expertiseVisual && expertiseImage) {
        const handleImageMove = (event: MouseEvent) => {
          const rect =
            expertiseVisual.getBoundingClientRect();

          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          const rotateY =
            (x / rect.width - 0.5) * 14;

          const rotateX =
            (y / rect.height - 0.5) * -14;

          gsap.to(expertiseImage, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.04,
            duration: 0.6,
            ease: "power3.out",
          });
        };

        const handleImageLeave = () => {
          gsap.to(expertiseImage, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        expertiseVisual.addEventListener(
          "mousemove",
          handleImageMove
        );

        expertiseVisual.addEventListener(
          "mouseleave",
          handleImageLeave
        );
      }

      /* =====================================================
         FLOATING TAGS
      ===================================================== */

      gsap
        .utils
        .toArray<HTMLElement>(".alpha-apu-info-tag")
        .forEach((tag, index) => {
          gsap.to(tag, {
            y: index % 2 === 0 ? -18 : 18,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

      /* =====================================================
         PROCESS HEADER
      ===================================================== */

      gsap.from(".alpha-apu-process-header", {
        scrollTrigger: {
          trigger: ".alpha-apu-process",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
        y: 120,
        opacity: 0,
      });

      /* =====================================================
         PROCESS CARDS
      ===================================================== */

      gsap.from(".alpha-apu-process-card", {
        scrollTrigger: {
          trigger: ".alpha-apu-process-grid",
          start: "top 80%",
        },
        y: 130,
        rotationX: 45,
        opacity: 0,
        transformOrigin: "center bottom",
        duration: 1.2,
        stagger: 0.18,
        ease: "power4.out",
      });

      /* =====================================================
         PROCESS CARD HOVER
      ===================================================== */

      root.current
        ?.querySelectorAll<HTMLElement>(
          ".alpha-apu-process-card"
        )
        .forEach((card) => {
          const handleMove = (event: MouseEvent) => {
            const rect =
              card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            gsap.to(card, {
              rotationX:
                (y / rect.height - 0.5) * -12,
              rotationY:
                (x / rect.width - 0.5) * 12,
              scale: 1.03,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const handleLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
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

      /* =====================================================
         CAPABILITIES
      ===================================================== */

      gsap.from(".alpha-apu-cap-header", {
        scrollTrigger: {
          trigger: ".alpha-apu-capabilities",
          start: "top 80%",
        },
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      const capabilitiesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".alpha-apu-cap-grid",
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
      });

      capabilitiesTimeline
        .from(".alpha-apu-cap-card:first-child", {
          x: -250,
          rotationY: -40,
          opacity: 0,
          scale: 0.75,
        })
        .from(
          ".alpha-apu-cap-card:last-child",
          {
            x: 250,
            rotationY: 40,
            opacity: 0,
            scale: 0.75,
          },
          "-=.7"
        );

      /* =====================================================
         CAPABILITY NUMBERS
      ===================================================== */

      gsap
        .utils
        .toArray<HTMLElement>(".alpha-apu-cap-number")
        .forEach((number) => {
          gsap.to(number, {
            scrollTrigger: {
              trigger: number,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -100,
            x: 50,
            rotation: 8,
          });
        });

      /* =====================================================
         CAPABILITY HOVER
      ===================================================== */

      root.current
        ?.querySelectorAll<HTMLElement>(
          ".alpha-apu-cap-card"
        )
        .forEach((card) => {
          const handleMove = (event: MouseEvent) => {
            const rect =
              card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            gsap.to(card, {
              rotationX:
                (y / rect.height - 0.5) * -14,
              rotationY:
                (x / rect.width - 0.5) * 14,
              scale: 1.025,
              duration: 0.45,
              ease: "power3.out",
            });
          };

          const handleLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
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

      /* =====================================================
         SUPPORT
      ===================================================== */

      const supportTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".alpha-apu-support",
          start: "top 75%",
          end: "center center",
          scrub: 1,
        },
      });

      supportTimeline
        .from(".alpha-apu-support-badge", {
          y: 80,
          opacity: 0,
        })
        .from(
          ".alpha-apu-support-title",
          {
            y: 150,
            scale: 0.65,
            opacity: 0,
            filter: "blur(14px)",
          },
          "-=.4"
        )
        .from(
          ".alpha-apu-support-text",
          {
            y: 60,
            opacity: 0,
          },
          "-=.4"
        )
        .from(
          ".alpha-apu-support-button",
          {
            y: 50,
            scale: 0.8,
            opacity: 0,
          },
          "-=.3"
        );

      /* =====================================================
         BACKGROUND PARALLAX
      ===================================================== */

      gsap
        .utils
        .toArray<HTMLElement>(".alpha-apu-grid-bg")
        .forEach((grid) => {
          gsap.to(grid, {
            scrollTrigger: {
              trigger: grid.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -120,
            scale: 1.15,
          });
        });

      /* =====================================================
         BOTTOM CAROUSEL INTRO
      ===================================================== */

      gsap.from(".alpha-apu-carousel-header", {
        scrollTrigger: {
          trigger: ".alpha-apu-carousel-section",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
      });

      gsap.from(".alpha-apu-bottom-card", {
        scrollTrigger: {
          trigger: ".alpha-apu-carousel-wrapper",
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        rotationY: 18,
        scale: 0.9,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      /* =====================================================
         BACKGROUND MODULE IMAGE PARALLAX
      ===================================================== */

      gsap.to(".alpha-apu-carousel-bg img", {
        y: -100,
        rotation: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".alpha-apu-carousel-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         MODULE NUMBER PARALLAX
      ===================================================== */

      gsap.to(".alpha-apu-module-number", {
        x: -100,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".alpha-apu-carousel-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         CAROUSEL CARD 3D HOVER
      ===================================================== */

      root.current
        ?.querySelectorAll<HTMLElement>(
          ".alpha-apu-bottom-card"
        )
        .forEach((card) => {
          const handleCardMove = (event: MouseEvent) => {
            if (window.innerWidth <= 767) return;

            const rect =
              card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            gsap.to(card, {
              rotationX:
                (y / rect.height - 0.5) * -8,
              rotationY:
                (x / rect.width - 0.5) * 8,
              scale: 1.02,
              duration: 0.4,
              ease: "power3.out",
            });
          };

          const handleCardLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            });
          };

          card.addEventListener(
            "mousemove",
            handleCardMove
          );

          card.addEventListener(
            "mouseleave",
            handleCardLeave
          );
        });

      ScrollTrigger.refresh();

      /* =====================================================
         CLEANUP
      ===================================================== */

      return () => {
        window.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      className="alpha-apu-page"
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="alpha-apu-hero">
        <div className="alpha-apu-grid-bg" />

        

        <div className="alpha-apu-container">
          <div className="alpha-apu-hero-content">
            

            <h1 className="alpha-apu-hero-title">
              A.P.U
              <br />
              <span>OVERHAUL</span>
              <br />
              &amp; REPAIRS
            </h1>

            <p className="alpha-apu-hero-description">
              Alpha Aircraft Systems provides
              first-class APU services to protect
              you from the unexpected. Our APU
              experience covers all aspects of
              daily flying or backup.
            </p>

            <div className="alpha-apu-hero-actions">
              <a
                href="#capabilities"
                className="alpha-apu-button alpha-apu-button-primary"
              >
                EXPLORE CAPABILITIES
                <b>↗</b>
              </a>

              <a
                href="#expertise"
                className="alpha-apu-button alpha-apu-button-outline"
              >
                REQUEST A DEMO
                <b>↗</b>
              </a>
            </div>
          </div>
        </div>

        <div className="alpha-apu-hero-image-wrap">
          <div className="alpha-apu-hero-image-glow" />

          <div className="alpha-apu-hero-image-card">
            <Image
              src="/app.png"
              alt="Alpha Aircraft Systems APU Overhaul"
              className="alpha-apu-hero-image"
              width={900}
              height={900}
              priority
            />

            <div className="alpha-apu-hero-image-overlay" />
          </div>
        </div>

       
      </section>

      {/* =====================================================
          EXPERTISE
      ===================================================== */}
<section
      className="alpha-apu-modules-section"
      id="capabilities"
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="alpha-apu-modules-bg" />

      {/* =================================================
          SECTION NUMBER
      ================================================= */}

    

      <div className="alpha-apu-modules-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div  style={{ color: "#082b4c;" }} className="alpha-apu-modules-header">

          <span>CAPABILITIES</span>

          <h2>
             APU MODULES
          </h2>

          <p>
            Advanced maintenance, repair and overhaul
            capabilities for critical aircraft systems.
          </p>

        </div>


        {/* =================================================
            CARDS
        ================================================= */}

        <div className="alpha-apu-modules-grid">

          {/* =================================================
              CARD 01
          ================================================= */}

          <article className="alpha-apu-module-card">

            <div className="alpha-apu-module-image">

              <Image
                src="/2.jpeg"
                alt="APU Overhaul"
                width={1200}
                height={800}
              />

              <div className="alpha-apu-module-overlay" />

              <span className="alpha-apu-module-no">
                01
              </span>

              <span className="alpha-apu-module-tag">
                GTCP331-200ER
              </span>

            </div>

            <div className="alpha-apu-module-content">

              <span>
                AIRCRAFT
              </span>

              <h3>
                BOEING767 
              </h3>

              

            </div>

          </article>


          {/* =================================================
              CARD 02
          ================================================= */}

          <article className="alpha-apu-module-card">

            <div className="alpha-apu-module-image">

              <Image
                src="/3.jpeg"
                alt="C-130"
                width={1200}
                height={800}
              />

              <div className="alpha-apu-module-overlay" />

              <span className="alpha-apu-module-no">
                02
              </span>

              <span className="alpha-apu-module-tag">
                APS2000
              </span>

            </div>

            <div className="alpha-apu-module-content">

              <span>
                BOEING
              </span>

              <h3>
                737 CLASSIC
              </h3>

              

            </div>

          </article>


          {/* =================================================
              CARD 03
          ================================================= */}

          <article className="alpha-apu-module-card">

            <div className="alpha-apu-module-image">

              <Image
                src="/4.jpeg"
                alt="Aircraft MRO"
                width={1200}
                height={800}
              />

              <div className="alpha-apu-module-overlay" />

              <span className="alpha-apu-module-no">
                03
              </span>

              <span className="alpha-apu-module-tag">
                GTCP36-100G
              </span>

            </div>

            <div className="alpha-apu-module-content">

              <span>
                GUIF STREAM
              </span>

              <h3>
                GTCP36-100G
              </h3>

             

            </div>

          </article>


          {/* =================================================
              CARD 04
          ================================================= */}

          <article className="alpha-apu-module-card">

            <div className="alpha-apu-module-image">

              <Image
                src="/5.jpeg"
                alt="Component MRO"
                width={1200}
                height={800}
              />

              <div className="alpha-apu-module-overlay" />

              <span className="alpha-apu-module-no">
                04
              </span>

              <span className="alpha-apu-module-tag">
                GTCP331-200ER
              </span>

            </div>

            <div className="alpha-apu-module-content">

              <span>
                AIRCRAFT
              </span>

              <h3>
                BOEING767
              </h3>

              

            </div>

          </article>

        </div>


        {/* =================================================
            BOTTOM DOWNLOAD CTA
        ================================================= */}

        <div className="alpha-apu-modules-cta">

          
<a style={{ color: "#fff"}}
                href="#capabilities"
                className="alpha-apu-button alpha-apu-button-primary"
              >
                EXPLORE OUR CAPABILITIES
                <b>↗</b>
              </a>
        </div>

      </div>

    </section>
      

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section
        className="alpha-apu-process"
        id="process"
      >
        

        <div className="alpha-apu-container">
          <div className="alpha-apu-process-header">
            <div>
              

              <h2 className="alpha-apu-process-title">
                FROM TEST
                <br />
                TO FLIGHT.
              </h2>
            </div>

            
          </div>

          <div className="alpha-apu-process-grid">
            {processItems.map((item) => (
              <article
                className="alpha-apu-process-card"
                key={item.number}
              >
                <span>{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}
<section
        className="alpha-apu-expertise"
        id="expertise"
      >
        <div className="alpha-apu-grid-bg" />

        <span className="alpha-apu-section-number">
          01 / 04
        </span>

        <div className="alpha-apu-container">
          <div className="alpha-apu-expertise-grid">
            <div className="alpha-apu-expertise-copy">
              

              <h2>
                KEEPING THE
                <br />
                C-130 FLEET
                <br />
                MISSION-READY.
                
              </h2>

              <p>
                From component repair and overhaul to testing and support, Alpha Aircraft Systems delivers dependable MRO capabilities for the C-130 Hercules. Browse our detailed C-130 parts and capability database.
              </p>
              <a
  href="/documents/component-mro.pdf"
  download
  className="alpha-apu-module-download"
>
  <span>EXPLORE C-130 MRO CAPABILITIES</span>
  <span className="alpha-apu-download-arrow">↗</span>
</a>
            </div>

            <div className="alpha-apu-expertise-visual">
              <div className="alpha-apu-image-ring" />

              <div className="alpha-apu-expertise-image-wrap">
                <Image
                  src="/c130.jpg"
                  alt="APU Overhaul and Repair"
                  className="alpha-apu-expertise-image"
                  width={1000}
                  height={1000}
                />

                <div className="alpha-apu-image-overlay" />
              </div>

              

              

              
            </div>
          </div>
        </div>
      </section>
      
      {/* <section
        className="alpha-apu-capabilities"
        id="capabilities"
      >
        <div className="alpha-apu-grid-bg" />

        <span className="alpha-apu-section-number">
          03 / 04
        </span>

        <div className="alpha-apu-container">
          <div className="alpha-apu-cap-header">
            <div>
              <div className="alpha-apu-eyebrow">
                CAPABILITIES
              </div>

              <h2>
                WHAT
                <br />
                WE DO.
              </h2>
            </div>

            <div className="alpha-apu-cap-meta">
              TECHNICAL CAPABILITY DOCUMENTS
            </div>
          </div>

          <div className="alpha-apu-cap-grid">
            <article className="alpha-apu-cap-card">
              <div className="alpha-apu-cap-number">
                01
              </div>

              <div className="alpha-apu-cap-content">
                <h3>APU</h3>

                <p>
                  APU overhaul, repair, testing
                  and maintenance capabilities
                  designed to keep your aircraft
                  operating reliably.
                </p>

                <a
                  href="https://alphaaircraftsystems.com/wp-content/uploads/AAS-APU-CAPABILITIES-8-8-2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alpha-apu-pdf-link"
                >
                  VIEW APU CAPABILITIES PDF →
                </a>
              </div>
            </article>

            <article className="alpha-apu-cap-card">
              <div className="alpha-apu-cap-number">
                02
              </div>

              <div className="alpha-apu-cap-content">
                <h3>C-130</h3>

                <p>
                  Specialized capabilities
                  supporting C-130 aircraft
                  maintenance, repair and
                  overhaul requirements.
                </p>

                <a
                  href="https://alphaaircraftsystems.com/wp-content/uploads/AAS-CAPABILITIES-C-130.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alpha-apu-pdf-link"
                >
                  VIEW C-130 CAPABILITIES PDF →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section> */}
      
   
      {/* =====================================================
          APU MODULE IMAGE CAROUSEL
      ===================================================== */}

      {/* <section
        className="alpha-apu-carousel-section"
        id="contact"
      >
        <div className="alpha-apu-carousel-bg">
          <Image
            src="/apu-module.png"
            alt="APU Module"
            width={1800}
            height={1000}
          />

          <div className="alpha-apu-carousel-bg-overlay" />

          <div className="alpha-apu-module-number">
            {carouselItems[activeSlide].module}
          </div>
        </div>

        <span className="alpha-apu-section-number">
          APU / 05
        </span>

        <div className="alpha-apu-container">
         

          <div className="alpha-apu-carousel-header">
            <div>
              <div className="alpha-apu-eyebrow">
                APU MODULES
              </div>

              <h2>
                POWERING
                <br />
                <span>EVERY MISSION.</span>
              </h2>
            </div>

            <div className="alpha-apu-carousel-controls">
              <button
                type="button"
                onClick={previousSlide}
                className="alpha-apu-carousel-prev"
                aria-label="Previous card"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="alpha-apu-carousel-next"
                aria-label="Next card"
              >
                →
              </button>
            </div>
          </div>

         

          <div className="alpha-apu-carousel-wrapper">
            <div
              className="alpha-apu-carousel-track"
              style={{
                transform: `translateX(calc(-${activeSlide} * (50vw - 100px + 22px)))`,
              }}
            >
              {carouselItems.map((item) => (
                <article
                  className="alpha-apu-bottom-card"
                  key={item.number}
                >
                  

                  <div className="alpha-apu-bottom-card-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1000}
                      height={700}
                    />

                    <div className="alpha-apu-bottom-card-image-overlay" />
                  </div>

                

                  <div className="alpha-apu-module-label">
                    {item.module}
                  </div>

                 

                  <div className="alpha-apu-bottom-card-number">
                    {item.number}
                  </div>

                 

                  <div className="alpha-apu-bottom-card-content">
                    <span>{item.title}</span>

                    <h3>
                      {item.title}
                    </h3>

                    <a href={item.link}>
                      {item.linkText}
                      <b>↗</b>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* DOTS */}

          {/* </main><div className="alpha-apu-carousel-dots">
            {carouselItems.map((item, index) => (
              <button
                type="button"
                key={item.number}
                onClick={() => setActiveSlide(index)}
                className={
                  activeSlide === index
                    ? "active"
                    : ""
                }
                aria-label={`Go to slide ${index + 1}`}
              />
            ))} *}
          </div>
        </div>
      </section> */}

      {/* =====================================================
          SUPPORT
      ===================================================== */}

      <section
        className="alpha-apu-support"
        id="support"
      >
        <div className="alpha-apu-grid-bg" />

        <span className="alpha-apu-section-number">
          04 / 04
        </span>

        <div className="alpha-apu-container">
          <div className="alpha-apu-support-inner">
            <div className="alpha-apu-support-badge">
              <i />
REQUEST A DEMO            </div>

            <h2 className="alpha-apu-support-title">
              READY WHEN
              <br />
              <span>YOU NEED US.</span>
            </h2>

            <p className="alpha-apu-support-text">
              Get a closer look at how Alpha Aircraft Systems supports aircraft MRO with reliable repair, overhaul, testing and component solutions. Request a free demo to explore our capabilities and discuss your requirements with our team.
            </p>

            <a
              href="#contact"
              className="alpha-apu-button alpha-apu-button-primary alpha-apu-support-button"
            >
              DISCUSS YOUR REQUIREMENTS
              <b>↗</b>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}