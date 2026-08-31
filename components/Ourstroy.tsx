"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";


export default function OurStory() {
  return (
    <section className="our-story">
      <div className="our-story__container">

        {/* LEFT CONTENT */}
        <div className="our-story__content">

          <div className="our-story__eyebrow">
        
            <span>OUR STORY</span>
          </div>

          <h2 className="our-story__title">
            FROM EXPERIENCE
            <br />
            TO <span>EXPERTISE</span>
          </h2>

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

          <a href="#capabilities" className="our-story__button">
            <span>EXPLORE CAPABILITIES</span>
            <ArrowRight size={25} strokeWidth={1.8} />
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="our-story__image-wrapper">

          <Image
            src="/our.png"
            alt="Aircraft flying over runway"
            fill
            priority
            className="our-story__image"
            sizes="(max-width: 768px) 100vw, 58vw"
          />

          {/* SINCE 1995 */}
          

         
        </div>

      </div>
    </section>
  );
}