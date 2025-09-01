import { useEffect, useRef, useState, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "../config/supabase";

// Íconos
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
import { RiNextjsFill } from "react-icons/ri";
import { FaJava } from "react-icons/fa";

// Registro del plugin para usar animaciones con scroll
gsap.registerPlugin(ScrollTrigger);

// Definición de interfaz para los datos que vienen de Supabase
interface Skill {
  id: number;
  languaje: string;
  level: string;
}

export default function Skills() {
  // Referencias al DOM para animaciones
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const skillItemsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  // Estado para guardar las skills obtenidas de Supabase
  const [skills, setSkills] = useState<Skill[]>([]);

  // Mapa de íconos en base al nombre del lenguaje
  const iconsMap: Record<string, JSX.Element> = {
    javascript: <IoLogoJavascript />,
    typescript: <SiTypescript />,
    react: <IoLogoReact />,
    tailwindcss: <SiTailwindcss />,
    nodejs: <IoLogoNodejs />,
    express: <SiExpress />,
    mysql: <SiMysql />,
    python: <IoLogoPython />,
    java: <FaJava />,
    cpp: <BiLogoCPlusPlus />,
    php: <SiPhp />,
    rust: <SiRust />,
    astro: <SiAstro />,
    github: <IoLogoGithub />,
    nextjs: <RiNextjsFill />,
  };

  useEffect(() => {
    // Función para traer los skills desde Supabase
    const getSkills = async () => {
      const { data, error } = await supabase.from("skills").select("*");
      if (error) {
        console.log("Error obteniendo skills:", error);
        return;
      }
      if (data) {
        setSkills(data as Skill[]);
      }
    };

    getSkills();
  }, []);

  useEffect(() => {
    // Animaciones con GSAP y ScrollTrigger
    const ctx = gsap.context(() => {
      // Animación del título (si existiera un .skills-title)
      gsap.fromTo(
        ".skills-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animación de las tarjetas de skills
      gsap.fromTo(
        skillItemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, // efecto escalonado
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Animación de las partículas flotantes
      particlesRef.current.forEach((p, i) => {
        gsap.to(p, {
          y: `+=${15 + i * 5}`,
          x: `+=${10 + i * 3}`,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // limpiar animaciones al desmontar
  }, [skills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative h-[150vh] lg:h-[80vh] bg-forest flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Partículas flotantes decorativas */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          // @ts-expect-error -> necesario para indexar en el array de refs
          ref={(el) => (particlesRef.current[i] = el!)}
          className={`absolute w-2 h-2 rounded-full bg-grass/60`}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            boxShadow: "0 0 8px rgba(74, 222, 128, 0.7)",
          }}
        />
      ))}

      {/* Grid de tarjetas de Skills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl">
        {skills.map((skill, i) => (
          <div
            key={skill.id}
            // @ts-expect-error -> necesario para indexar en el array de refs
            ref={(el) => (skillItemsRef.current[i] = el!)}
            className="flex flex-col items-center p-4 rounded-2xl bg-grass/10 border border-grass/20 shadow-lg hover:shadow-grass/40 transition-all duration-300"
          >
            {/* Ícono correspondiente al lenguaje */}
            <div className="text-4xl text-grass mb-2">
              {iconsMap[skill.languaje.toLowerCase()] || null}
            </div>
            {/* Nombre del lenguaje */}
            <p className="text-white/90 text-lg font-semibold capitalize">
              {skill.languaje}
            </p>
            {/* Nivel del lenguaje */}
            <span className="text-sm text-grass/70">{skill.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
