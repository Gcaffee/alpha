"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      // CLEANUP
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
    <main ref={root} className="about-page">

      {/* ==========================================
          ABOUT HERO
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
              Alpha Aircraft Systems Inc., located in East 10th Lane, Hialeah, Florida, is a global leader
in certified aircraft APU services.  

              <br /><br />
             We specialize in FAA and EASA-approved APU testing, repair, and overhaul for clients
around the world. With multilingual support and international shipping logistics, we make
it easy for operators abroad to access trusted aviation services.
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

    </main>
  );
}

