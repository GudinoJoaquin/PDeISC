import { useRef, useState, useEffect } from "react";
import {
  IoDocument,
  IoDocumentOutline,
  IoTerminal,
  IoTerminalOutline,
  IoLogIn,
  IoLogInOutline
} from "react-icons/io5";
import { RiHome6Fill, RiHome6Line } from "react-icons/ri";
import { SiTailwindcss } from "react-icons/si"; // Icono de Skills
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export default function DesktopNav() {
  // Estado para detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  // Detectar si la pantalla es móvil y actualizar el estado
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Maneja el hover de los íconos cambiando la opacidad con GSAP
  const handleHover = (id: string, state: boolean) => {
    const fill = document.getElementById(`${id}-fill`);
    const line = document.getElementById(`${id}-line`);
    if (fill && line) {
      gsap.to(fill, { opacity: state ? 0 : 1, duration: 0.2 });
      gsap.to(line, { opacity: state ? 1 : 0, duration: 0.2 });
    }
  };

  // Hace scroll suave a la sección correspondiente
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // Tamaño de los íconos según si es móvil o no
  const iconSize = isMobile ? 24 : 30;

  return (
    // Contenedor principal fijo en la pantalla
    <main className="fixed z-50 top-1/2 -translate-y-1/2 left-4">
      <nav
        ref={navRef}
        className="w-18 bg-petroleoum rounded-full overflow-hidden shadow-xl md:shadow-2xl shadow-grass flex flex-col justify-center items-center py-8"
      >
        <div className="flex flex-col gap-6 items-center">
          {/* Botón Home */}
          <div className="relative">
            <button
              onMouseEnter={() => handleHover("home", true)}
              onMouseLeave={() => handleHover("home", false)}
              onTouchStart={() => handleHover("home", true)}
              onTouchEnd={() => handleHover("home", false)}
              onClick={() => handleScroll("hero")}
            >
              <RiHome6Fill
                id="home-fill"
                className="text-white"
                color="#3c7068"
                size={iconSize}
              />
              <RiHome6Line
                id="home-line"
                className="text-white opacity-0 absolute top-0"
                color="#3c7068"
                size={iconSize}
              />
            </button>
          </div>

          {/* Botón Documentos */}
          <div className="relative">
            <button
              onMouseEnter={() => handleHover("doc", true)}
              onMouseLeave={() => handleHover("doc", false)}
              onTouchStart={() => handleHover("doc", true)}
              onTouchEnd={() => handleHover("doc", false)}
              onClick={() => handleScroll("personal")}
            >
              <IoDocument
                id="doc-fill"
                className="text-white"
                color="#3c7068"
                size={iconSize}
              />
              <IoDocumentOutline
                id="doc-line"
                className="text-white opacity-0 absolute top-0"
                color="#3c7068"
                size={iconSize}
              />
            </button>
          </div>

          {/* Botón Terminal */}
          <div className="relative">
            <button
              onMouseEnter={() => handleHover("term", true)}
              onMouseLeave={() => handleHover("term", false)}
              onTouchStart={() => handleHover("term", true)}
              onTouchEnd={() => handleHover("term", false)}
              onClick={() => handleScroll("proyects")}
            >
              <IoTerminal
                id="term-fill"
                className="text-white"
                color="#3c7068"
                size={iconSize}
              />
              <IoTerminalOutline
                id="term-line"
                className="text-white opacity-0 absolute top-0"
                color="#3c7068"
                size={iconSize}
              />
            </button>
          </div>

          {/* Botón Skills */}
          <div className="relative">
            <button
              onMouseEnter={() => handleHover("skills", true)}
              onMouseLeave={() => handleHover("skills", false)}
              onTouchStart={() => handleHover("skills", true)}
              onTouchEnd={() => handleHover("skills", false)}
              onClick={() => handleScroll("skills")}
            >
              <SiTailwindcss
                id="skills-fill"
                className="text-white"
                color="#3c7068"
                size={iconSize}
              />
              <SiTailwindcss
                id="skills-line"
                className="text-white opacity-0 absolute top-0"
                color="#3c7068"
                size={iconSize}
              />
            </button>
          </div>

          {/* Botón Login */}
          <div className="relative">
            <button
              onMouseEnter={() => handleHover("login", true)}
              onMouseLeave={() => handleHover("login", false)}
              onTouchStart={() => handleHover("login", true)}
              onTouchEnd={() => handleHover("login", false)}
              onClick={() => navigate("/login")}
            >
              <IoLogIn
                id="login-fill"
                className="text-white"
                color="#3c7068"
                size={iconSize}
              />
              <IoLogInOutline
                id="login-line"
                className="text-white opacity-0 absolute top-0"
                color="#3c7068"
                size={iconSize}
              />
            </button>
          </div>

          {/* Fin de botones */}
        </div>
      </nav>
    </main>
  );
}
