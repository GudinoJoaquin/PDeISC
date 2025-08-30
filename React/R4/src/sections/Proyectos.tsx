import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoLogoReact } from "react-icons/io5";
import { SiTailwindcss } from "react-icons/si";

import eestn5 from "../assets/img/eestn5.jpg";
import Proyect from "../components/Proyect";

gsap.registerPlugin(ScrollTrigger);

export default function Proyectos() {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const orbsRef = useRef([]);
  const linesRef = useRef([]);
  const infoItemsRef = useRef([]);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline principal para la entrada de la carta
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      });

      // 1. Entrada de la carta con escala y rotación sutil
      mainTl.fromTo(
        cardRef.current,
        { scale: 0, rotation: -5, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
        }
      );

      // 2. Imagen con efecto magnético
      mainTl.fromTo(
        imageRef.current,
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        0.3
      );

      // 3. Orbes decorativos
      orbsRef.current.forEach((orb, index) => {
        mainTl.fromTo(
          orb,
          { scale: 0, x: 0, y: 0, opacity: 0 },
          {
            scale: 1,
            x: (index % 2 === 0 ? -1 : 1) * (20 + index * 10),
            y: Math.sin(index) * 15,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          0.6 + index * 0.1
        );
      });

      // 4. Líneas de conexión
      linesRef.current.forEach((line, index) => {
        mainTl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          0.8 + index * 0.05
        );
      });

      // 5. Items de información con stagger
      mainTl.fromTo(
        infoItemsRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        1
      );

      // 6. Descripción final
      mainTl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        1.5
      );

      // ANIMACIONES CONTINUAS

      // Pulso sutil en la imagen
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 3,
        ease: "sine.inOut",
      });

      // Orbes en movimiento orbital
      orbsRef.current.forEach((orb, index) => {
        gsap.to(orb, {
          rotation: "+=360",
          duration: 6 + index * 2,
          repeat: -1,
          ease: "none",
        });
      });

      // Líneas con efecto de energía
      linesRef.current.forEach((line) => {
        gsap.to(line, {
          opacity: 0.3,
          duration: 1 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });

      // Respiración sutil de la carta
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 4,
        ease: "sine.inOut",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const personalInfo = [
    { label: "Nombre", value: "Joaquín Gudiño" },
    { label: "País", value: "Argentina" },
    { label: "Email", value: "contacto@joaquin.dev" },
    { label: "Teléfono", value: "+54 9 223 xxx-xxxx" },
  ];

  return (
    <section className="bg-forest flex flex-col items-center justify-center px-4">
      <Proyect cardRef={cardRef} orbsRef={orbsRef} linesRef={linesRef} descriptionRef={descriptionRef}/>
      <Proyect cardRef={cardRef} orbsRef={orbsRef} linesRef={linesRef} descriptionRef={descriptionRef}/>
      <Proyect cardRef={cardRef} orbsRef={orbsRef} linesRef={linesRef} descriptionRef={descriptionRef}/>
    </section>
  );
}
