"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import img1 from "../../public/img1.jpg";
import img3 from "../../public/img3.jpg";

const images = [img1, img3];

export default function ImageCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 });
    imageRefs.current.forEach((el) => {
      if (!el) return;

      timeline
        .to(el, { autoAlpha: 1, duration: 1 }) // aparece
        .to(el, { autoAlpha: 1, duration: 5 }) // permanece visible
        .to(el, { autoAlpha: 0, duration: 1 }, "+=0.5"); // desaparece
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            imageRefs.current[i] = el!;
          }}
          className="absolute inset-0 opacity-0"
        >
          <Image
            src={img}
            alt={`Imagen ${i}`}
            fill
            priority={i === 0}
            className="object-cover mask-radial-[100%_100%] brightness-50 sm:brightness-100 mask-radial-from-60% mask-radial-at-top sm:mask-radial-[50%_45%] sm:mask-radial-from-60% sm:mask-radial-at-center
"
          />
        </div>
      ))}
    </div>
  );
}
