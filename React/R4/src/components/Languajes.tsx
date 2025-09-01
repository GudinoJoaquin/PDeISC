import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  IoLogoJavascript,
  IoLogoReact,
  IoLogoPython,
  IoLogoGithub,
  IoLogoNodejs,
} from "react-icons/io5";
import {
  SiPhp,
  SiTailwindcss,
  SiAstro,
  SiExpress,
  SiTypescript,
  SiMysql,
  SiRust,
} from "react-icons/si";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { FaJava } from "react-icons/fa";

// Componente principal que muestra los lenguajes/tecnologías
export default function Languajes() {
  const trackRef = useRef<HTMLDivElement>(null); // Referencia al contenedor de los íconos
  const [isDesktop, setIsDesktop] = useState(false); // Estado para detectar si es escritorio

  // Lista de íconos de tecnologías/lenguajes
  const icons = [
    <IoLogoJavascript color="#3c7068" size={38} />,
    <IoLogoReact color="#3c7068" size={38} />,
    <IoLogoPython color="#3c7068" size={38} />,
    <SiPhp color="#3c7068" size={38} />,
    <SiTailwindcss color="#3c7068" size={38} />,
    <IoLogoGithub color="#3c7068" size={38} />,
    <IoLogoNodejs color="#3c7068" size={38} />,
    <FaJava color="#3c7068" size={38} />,
    <SiAstro color="#3c7068" size={38} />,
    <SiExpress color="#3c7068" size={38} />,
    <BiLogoCPlusPlus color="#3c7068" size={38} />,
    <SiTypescript color="#3c7068" size={33} />,
    <SiMysql color="#3c7068" size={33} />,
    <SiRust color="#3c7068" size={33} />,
  ];

  // Duplicamos la lista de íconos varias veces para el carrusel horizontal
  const repeatedIcons = [...icons, ...icons, ...icons, ...icons];

  // Detecta si la pantalla es de escritorio y actualiza el estado
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Efecto para animar los íconos según el tamaño de pantalla
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    // Limpia animaciones previas
    gsap.killTweensOf(track.children);
    gsap.killTweensOf(track);

    if (isDesktop) {
      // ---- Animación circular para escritorio ----
      const items = Array.from(track.children) as HTMLElement[];
      const radius = 120; // radio del círculo
      const angleStep = (2 * Math.PI) / items.length; // ángulo entre íconos

      // Posiciona cada ícono en el círculo
      items.forEach((item, i) => {
        const angle = i * angleStep;
        gsap.set(item, {
          position: "absolute",
          left: `${Math.cos(angle) * radius + radius}px`,
          top: `${Math.sin(angle) * radius + radius}px`,
        });
      });

      // Rota el círculo completo y mantiene los íconos en posición vertical
      gsap.to(track, {
        rotate: 360,
        duration: 30,
        ease: "linear",
        repeat: -1,
        transformOrigin: "center center",
        onUpdate: () => {
          const rotation = gsap.getProperty(track, "rotate") as number;
          items.forEach((item) => {
            gsap.set(item, { rotate: -rotation });
          });
        },
      });
    } else {
      // ---- Animación horizontal para móvil/tablet ----
      const items = Array.from(track.children) as HTMLElement[];
      // Calcula el ancho total del carrusel
      const totalWidth = items.reduce(
        (acc, el) => acc + el.offsetWidth + 24,
        0
      );

      // Anima el carrusel de izquierda a derecha infinitamente
      gsap.to(track, {
        x: `-=${totalWidth / 4}`,
        duration: 10,
        ease: "linear",
        repeat: -1,
      });
    }
  }, [isDesktop]);

  return (
    <div className="overflow-hidden w-full flex justify-center">
      <div
        ref={trackRef}
        className={`${
          isDesktop
            ? "relative w-[300px] h-[300px]" // círculo en escritorio
            : "flex gap-6 whitespace-nowrap w-max" // carrusel en móvil/tablet
        }`}
      >
        {/* Renderiza los íconos según el modo */}
        {(isDesktop ? icons : repeatedIcons).map((icon, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center"
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}
