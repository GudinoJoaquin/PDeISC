import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IoLogoGithub, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";

export default function Footer() {
  // Referencia al footer completo
  const footerRef = useRef<HTMLDivElement | null>(null);
  // Referencia a las partículas (array de divs), sin null
  const particlesRef = useRef<HTMLDivElement[]>([]); // <- ya no permitimos null

  useEffect(() => {
    // Creamos un contexto de GSAP para manejar animaciones en este componente
    const ctx = gsap.context(() => {
      if (!footerRef.current) return;

      // Animación de entrada del footer (deslizar hacia arriba con fade-in)
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Animación de las partículas flotantes
      particlesRef.current.forEach((p, i) => {
        gsap.to(p, {
          y: `+=${10 + i * 3}`, // movimiento vertical variable
          x: `+=${5 + i * 2}`,  // movimiento horizontal variable
          duration: 4 + i,      // cada partícula dura distinto
          repeat: -1,           // animación infinita
          yoyo: true,           // vuelve al punto inicial
          ease: "sine.inOut",   // suavizado senoidal
          delay: i * 0.4,       // cada partícula inicia en distinto tiempo
        });
      });
    }, footerRef);

    // Limpiar animaciones al desmontar el componente
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-forest border-t border-grass/30 py-10 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Partículas flotantes generadas dinámicamente */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el; // <- solo asignamos si existe
          }}
          className="absolute w-2 h-2 rounded-full bg-grass/60"
          style={{
            top: `${Math.random() * 90}%`,  // posición vertical aleatoria
            left: `${Math.random() * 90}%`, // posición horizontal aleatoria
            boxShadow: "0 0 8px rgba(74, 222, 128, 0.7)", // efecto glow
          }}
        />
      ))}

      {/* Texto principal del footer */}
      <h3 className="text-xl font-bold text-white mb-3">
        © {new Date().getFullYear()} Joaquín Gudiño
      </h3>
      <p className="text-white/70 mb-6 max-w-lg">
        Desarrollador Full Stack apasionado por crear experiencias digitales
        únicas, eficientes y modernas.
      </p>

      {/* Links sociales con hover animado */}
      <div className="flex space-x-6 text-2xl text-grass">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <IoLogoGithub />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <IoLogoLinkedin />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <IoLogoInstagram />
        </a>
      </div>

      {/* Línea de luz animada en la parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-grass/70 to-transparent opacity-70"></div>
    </footer>
  );
}
