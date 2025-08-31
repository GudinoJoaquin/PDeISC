import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IoLogoGithub, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";

export default function Footer() {
  const footerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada del footer
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Animación partículas flotantes
      particlesRef.current.forEach((p, i) => {
        gsap.to(p, {
          y: `+=${10 + i * 3}`,
          x: `+=${5 + i * 2}`,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-forest border-t border-grass/30 py-10 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Partículas flotantes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-2 h-2 rounded-full bg-grass/60"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            boxShadow: "0 0 8px rgba(74, 222, 128, 0.7)",
          }}
        />
      ))}

      {/* Texto principal */}
      <h3 className="text-xl font-bold text-white mb-3">
        © {new Date().getFullYear()} Joaquín Gudiño
      </h3>
      <p className="text-white/70 mb-6 max-w-lg">
        Desarrollador Full Stack apasionado por crear experiencias digitales
        únicas, eficientes y modernas.
      </p>

      {/* Links sociales */}
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

      {/* Línea de luz animada */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-grass/70 to-transparent opacity-70"></div>
    </footer>
  );
}
