"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function OurStory() {
  return (
    <section className="our-story">
      <div className="our-story__container">

        {/* LEFT CONTENT */}
        <div className="our-story__content">

          {/* EYEBROW */}
          <div className="our-story__eyebrow">
            <span>OUR STORY</span>
          </div>

          {/* TITLE */}
          <h2 className="our-story__title">
            FROM EXPERIENCE
            <br />
            TO <span>EXPERTISE</span>
          </h2>

          {/* DESCRIPTION */}
          <div className="our-story__description">
            <p>
              Since 1995, Alpha Aircraft Systems has evolved from an aircraft
              accessory repair operation into a specialized aviation MRO
              organization.
            </p>

            <p>
              Our experience spans APU, hydraulic, pneumatic, fuel and other
              aircraft accessory systems.
            </p>
          </div>

          {/* PRIMARY BUTTON */}
          <a
            href="https://alpha-hazel-five.vercel.app/exhibition"
            className="hero-button hero-button-primary"
          >
            <span>EXPLORE CAPABILITIES</span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
            />
          </a>

          {/* SECONDARY BUTTON */}
          
        </div>

        {/* RIGHT IMAGE */}
        <div className="our-story__image-wrapper">
          <Image
            src="/warehouse-3.jpg"
            alt="Aircraft flying over runway"
            fill
            priority
            className="our-story__image"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        </div>

      </div>
    </section>
  );
}