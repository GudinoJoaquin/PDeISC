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

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => setOpen((prev) => !prev);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animación del nav y del botón
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

  // Hover de íconos y tooltips con soporte mejorado para móvil
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

  const iconSize = isMobile ? 24 : 30;
  const buttonSize = isMobile ? 36 : 48;

  return (
    <main className="fixed z-50">
      <nav
        ref={navRef}
        className="w-14 md:w-18 bg-petroleoum rounded-b-full overflow-hidden relative shadow-xl md:shadow-2xl shadow-grass"
        style={{ height: isMobile ? "3.5rem" : "4.5rem" }}
      >
        {/* Iconos centrados cuando el menú está abierto */}
        {open && (
          <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 flex flex-col gap-4 md:gap-6 items-center">
            {/* Home */}
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
                  color="#3c7068"
                  className="text-white opacity-0 absolute top-0"
                  size={iconSize}
                />
              </button>
            </div>

            {/* Documents */}
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

            {/* Terminal */}
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

        {/* Botón del menú */}
        <div
          ref={menuRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={handleClick}
            className="-translate-y-1/2 rounded-full p-1 md:p-2"
          >
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
