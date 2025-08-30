import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

type AnimatedTitleProps = {
  words: string[];
  className?: string;
  interval?: number; // Tiempo total que cada palabra permanece visible (incluye entrada y salida)
};

export default function Title({
  words,
  className = "",
  interval = 5000,
}: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLSpanElement>(".letter");

      const timeline = gsap.timeline();

      // Entrada: letras suben y aparecen
      timeline.fromTo(
        letters,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.05,
        }
      );

      // Espera (después de entrada y antes de salida)
      timeline.to({}, { duration: interval / 1000 - 1.2 }); // lo que sobra del intervalo

      // Salida: letras suben y desaparecen
      timeline.to(letters, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [index, words, interval]);

  const currentWord = words[index].split("");

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {currentWord.map((letter, i) => (
        <span key={i} className="letter inline-block">
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
}
