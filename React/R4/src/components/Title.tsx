import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

// Props del componente AnimatedTitle
type AnimatedTitleProps = {
  words: string[]; // Lista de palabras a animar
  className?: string; // Clases CSS opcionales
  interval?: number; // Tiempo total que cada palabra permanece visible (incluye entrada y salida)
};

// Componente principal Title
export default function Title({
  words,
  className = "",
  interval = 5000,
}: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor principal
  const [index, setIndex] = useState(0); // Índice de la palabra actual

  // Efecto para animar las letras cada vez que cambia el índice, las palabras o el intervalo
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Contexto de GSAP para limpiar animaciones al desmontar
    const ctx = gsap.context(() => {
      // Selecciona todos los spans con la clase "letter"
      const letters = gsap.utils.toArray<HTMLSpanElement>(".letter");

      const timeline = gsap.timeline();

      // Animación de entrada: las letras suben y aparecen
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

      // Espera antes de la animación de salida
      timeline.to({}, { duration: interval / 1000 - 1.2 }); // Lo que sobra del intervalo

      // Animación de salida: las letras suben y desaparecen
      timeline.to(letters, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          // Cambia al siguiente índice de palabra
          setIndex((prev) => (prev + 1) % words.length);
        },
      });
    }, containerRef);

    // Limpia las animaciones al desmontar o actualizar dependencias
    return () => ctx.revert();
  }, [index, words, interval]);

  // Obtiene la palabra actual y la separa en letras
  const currentWord = words[index].split("");

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {/* Renderiza cada letra en un span, usando espacio no separable para los espacios */}
      {currentWord.map((letter, i) => (
        <span key={i} className="letter inline-block">
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
}
