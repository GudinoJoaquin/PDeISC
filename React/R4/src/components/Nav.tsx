import { useRef, useState, useEffect } from "react";
import {
  IoMenu,
  IoClose,
  IoDocument,
  IoDocumentOutline,
  IoTerminal,
  IoTerminalOutline,
  IoLogInOutline,
  IoLogIn,
} from "react-icons/io5";
import { RiHome6Fill, RiHome6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { SiTailwindcss } from "react-icons/si";

// Componente de navegación principal
export default function Nav() {
  // Estado para controlar si el menú está abierto o cerrado
  const [open, setOpen] = useState(false);
  // Estado para detectar si la vista es móvil
  const [isMobile, setIsMobile] = useState(false);
  // Referencia al contenedor del nav
  const navRef = useRef<HTMLDivElement>(null);
  // Referencia al botón del menú
  const menuRef = useRef<HTMLDivElement>(null);
  // Hook para navegación programática
  const navigate = useNavigate();

  // Alterna el estado del menú (abierto/cerrado)
  const handleClick = () => setOpen((prev) => !prev);

  // Hace scroll suave a la sección indicada por id
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // Detecta si la pantalla es móvil y actualiza el estado
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Anima la altura del nav y la posición del botón del menú según el estado
  useEffect(() => {
    if (!navRef.current || !menuRef.current) return;

    const navHeight = isMobile ? "400px" : "500px";
    const buttonY = isMobile ? 170 : 215;

    gsap.to(navRef.current, {
      height: open ? navHeight : isMobile ? "3.5rem" : "4.5rem",
      duration: 0.5,
      ease: open ? "power2.out" : "power2.in",
    });

    gsap.to(menuRef.current, {
      y: open ? buttonY : 0,
      duration: 0.5,
      ease: open ? "power2.out" : "power2.in",
    });
  }, [open, isMobile]);

  // Maneja el hover/cambio visual de los íconos (relleno y línea)
  const handleHover = (id: string, state: boolean) => {
    const fill = document.getElementById(`${id}-fill`);
    const line = document.getElementById(`${id}-line`);
    if (fill && line) {
      gsap.to(fill, {
        opacity: state ? 0 : 1,
        duration: 0.2,
      });
      gsap.to(line, {
        opacity: state ? 1 : 0,
        duration: 0.2,
      });
    }
  };

  // Tamaños de íconos y botón según si es móvil o no
  const iconSize = isMobile ? 24 : 30;
  const buttonSize = isMobile ? 36 : 48;

  return (
    <main className="fixed z-50">
      {/* Barra de navegación principal */}
      <nav
        ref={navRef}
        className="w-14 md:w-18 bg-petroleoum rounded-b-full overflow-hidden relative shadow-xl md:shadow-2xl shadow-grass"
        style={{ height: isMobile ? "3.5rem" : "4.5rem" }}
      >
        {/* Menú de íconos centrados, visible solo cuando el menú está abierto */}
        {open && (
          <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 flex flex-col gap-4 md:gap-6 items-center">
            {/* Botón Home */}
            <div className="relative">
              <button
                onMouseEnter={() => handleHover("home", true)}
                onMouseLeave={() => handleHover("home", false)}
                onTouchStart={() => handleHover("home", true)}
                onTouchEnd={() => handleHover("home", false)}
                onClick={() => handleScroll("hero")}
              >
                {/* Ícono relleno */}
                <RiHome6Fill
                  id="home-fill"
                  className="text-white"
                  color="#3c7068"
                  size={iconSize}
                />
                {/* Ícono línea */}
                <RiHome6Line
                  id="home-line"
                  color="#3c7068"
                  className="text-white opacity-0 absolute top-0"
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
                  color="#3c7068"
                  className="text-white opacity-0 absolute top-0"
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
                  color="#3c7068"
                  className="text-white opacity-0 absolute top-0"
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
          </div>
        )}

        {/* Botón para abrir/cerrar el menú */}
        <div
          ref={menuRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={handleClick}
            className="-translate-y-1/2 rounded-full p-1 md:p-2"
          >
            {/* Ícono de menú hamburguesa o de cerrar según el estado */}
            {open ? (
              <IoClose
                className="text-white"
                color="#3c7068"
                size={buttonSize}
              />
            ) : (
              <IoMenu
                className="text-white"
                color="#3c7068"
                size={buttonSize}
              />
            )}
          </button>
        </div>
      </nav>
    </main>
  );
}
