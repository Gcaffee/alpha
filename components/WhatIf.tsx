// 
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    number: "1995",
    text: "Become an Approved Repair Station",
    image: "/1.png",
  },
  {
    number: "1995-2019",
    text: "Have been successfully repairing aircraft accessories",
    image: "/2.png",
  },
  {
    number: "2019",
    text: "Developed a full engineered department",
    image: "/3.png",
  },
  {
    number: "2000 TO PRESENT",
    text: "Received approval of APU overhauling & repair",
    image: "/4.png",
  },
  {
    number: "2020 TO PRESENT",
    text: "Qualified to reverse engineering & repairing with in-house capability & CNC equipment",
    image: "/5.png",
  },
  {
    number: "2021 TO PRESENT",
    text: "Handling complete process of PMA's part program",
    image: "/6.png",
  },
  
  
  
  
  
];

export default function WhatIf() {
  const root = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressLine = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState(items[0].image);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =====================================================
         DESKTOP
      ===================================================== */

      mm.add("(min-width: 900px)", () => {
        const milestoneItems =
          gsap.utils.toArray<HTMLElement>(".milestone-item");

        /*
         * Initial active state
         */

        gsap.set(milestoneItems, {
          opacity: 0.3,
        });

        gsap.set(milestoneItems[0], {
          opacity: 1,
        });

        /*
         * Main sticky timeline
         */

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".milestones-desktop",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        /*
         * Progress line
         */

        if (progressLine.current) {
          gsap.fromTo(
            progressLine.current,
            {
              scaleY: 0,
              transformOrigin: "top center",
            },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".milestones-list",
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            }
          );
        }

        /*
         * Individual milestone triggers
         */

        milestoneItems.forEach((element, index) => {
          const item = items[index];

          ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",

            onEnter: () => {
              activateMilestone(item, index);
            },

            onEnterBack: () => {
              activateMilestone(item, index);
            },
          });
        });

        /*
         * Activate milestone
         */

        function activateMilestone(
          item: (typeof items)[number],
          index: number
        ) {
          /*
           * Remove active class
           */

          milestoneItems.forEach((el) => {
            el.classList.remove("is-active");
          });

          /*
           * Add active class
           */

          milestoneItems[index]?.classList.add("is-active");

          /*
           * Image animation
           */

          if (!imageRef.current) return;

          const imageElement =
            imageRef.current.querySelector(
              ".milestones-image"
            );

          if (!imageElement) return;

          gsap.killTweensOf(imageElement);

          const tl = gsap.timeline();

          /*
           * Fade image out
           */

          tl.to(imageElement, {
            opacity: 0,
            y: 25,
            duration: 0.25,
            ease: "power2.in",
          });

          /*
           * Change image using React state
           */

          tl.call(() => {
            setActiveImage(item.image);
          });

          /*
           * Fade image in
           */

          tl.to(imageElement, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          });
        }

        /*
         * Heading animation
         */

        gsap.from(".milestone-heading-line", {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",

          scrollTrigger: {
            trigger: ".milestones-heading-wrap",
            start: "top 85%",
            once: true,
          },
        });

        /*
         * Timeline item reveal
         */

        milestoneItems.forEach((item) => {
          gsap.fromTo(
            item,
            {
              y: 50,
              opacity: 0.2,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",

              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        });

        return () => {
          timeline.kill();
        };
      });

      /* =====================================================
         MOBILE
      ===================================================== */

      mm.add("(max-width: 899px)", () => {
        const cards =
          gsap.utils.toArray<HTMLElement>(
            ".milestone-mobile-card"
          );

        /*
         * Mobile cards animation
         */

        cards.forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          });
        });

        /*
         * Mobile heading animation
         */

        gsap.from(".milestone-heading-line", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",

          scrollTrigger: {
            trigger: ".milestones-heading-wrap",
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="milestones-section"
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="milestones-heading-wrap">
        <h2 className="milestones-heading">
          <span className="milestone-heading-line">
            OUR MAJOR
          </span>

          <span className="milestone-heading-line">
            MILESTONES
          </span>
        </h2>

        <p className="milestones-intro">
          A journey built on engineering,
          innovation, experience, and continuous
          improvement.
        </p>
      </div>

      {/* =====================================================
          DESKTOP TIMELINE
      ===================================================== */}

      <div className="milestones-desktop">
        {/* =================================================
            LEFT STICKY IMAGE
        ================================================= */}

        <div className="milestones-visual-column">
          <div className="milestones-sticky">
            {/* IMAGE */}

            <div
              ref={imageRef}
              className="milestones-image-wrap"
            >
              <Image
                key={activeImage}
                src={activeImage}
                alt="Alpha Aircraft Systems milestone"
                fill
                sizes="(max-width: 1200px) 45vw, 600px"
                className="milestones-image"
                priority
              />

              <div className="milestones-image-overlay" />

              <div className="milestones-image-label">
                <span>
                  ALPHA AIRCRAFT SYSTEMS
                </span>

                <span>
                  EST. 1995
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT TIMELINE
        ================================================= */}

        <div className="milestones-list">
          {/* BASE LINE */}

          <div className="milestones-line" />

          {/* ANIMATED PROGRESS */}

          <div
            ref={progressLine}
            className="milestones-progress-line"
          />

          {/* MILESTONE ITEMS */}

          {items.map((item, index) => (
            <div
              key={`${item.number}-${index}`}
              className={`milestone-item milestone-item-${index}`}
            >
              {/* DOT */}

              <div className="milestone-dot">
                <span />
              </div>

              {/* CONTENT */}

              <div className="milestone-content">
                <span className="milestone-number">
                  {item.number}
                </span>

                <h3>{item.text}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="milestones-mobile">
        {items.map((item) => (
          <article
            key={`${item.number}-mobile`}
            className="milestone-mobile-card"
          >
            {/* MOBILE IMAGE */}

            <div className="milestone-mobile-image">
              <Image
                src={item.image}
                alt={item.text}
                fill
                sizes="(max-width: 899px) 100vw"
              />
            </div>

            {/* MOBILE CONTENT */}

            <div className="milestone-mobile-content">
              <span className="milestone-mobile-number">
                {item.number}
              </span>

              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}