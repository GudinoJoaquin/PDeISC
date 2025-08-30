import { useEffect, useRef } from "react";
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

export default function Languajes() {
  const trackRef = useRef<HTMLDivElement>(null);

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

  // duplicamos varias veces la lista para que siempre haya íconos entrando
  const repeatedIcons = [...icons, ...icons, ...icons, ...icons];

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;

    const items = Array.from(track.children) as HTMLElement[];
    const totalWidth = items.reduce((acc, el) => acc + el.offsetWidth + 24, 0); // gap-6 = 24px

    gsap.to(track, {
      x: `-=${totalWidth / 4}`, // animamos un bloque
      duration: 10, // velocidad del carrusel
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-6 whitespace-nowrap w-max">
        {repeatedIcons.map((icon, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-col items-center justify-center"
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}
