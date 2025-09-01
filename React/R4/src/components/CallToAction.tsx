// Importar hooks de react y librería de animaciones
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CallToAction() {
  // Definir referencias para manipular los elementos del DOM
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const magneticFieldRef = useRef<HTMLDivElement[]>([]);
  const energyWaveRef = useRef<HTMLDivElement[]>([]);
  const callToActionRef = useRef<HTMLDivElement | null>(null);

  // useEffect para ejecutar animaciones al montar el componente
  useEffect(() => {
    // Crear contexto de gsap para animaciones
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline(); // Línea de tiempo principal

      // Validar existencia de elementos principales
      if (!coreRef.current || !arrowRef.current || !callToActionRef.current) return;

      // 1. Animación del núcleo central
      mainTl
        .fromTo(
          coreRef.current,
          { scale: 0, rotation: 0 }, // Estado inicial: escala 0 y rotación 0
          { scale: 1.2, rotation: 180, duration: 0.8, ease: "back.out(2)" } // Estado final: escala 1.2 y rotar 180°
        )
        .to(coreRef.current, { scale: 1, duration: 0.3, ease: "power2.out" }); // Regresa a escala 1

      // 2. Animación de ondas de energía
      energyWaveRef.current.forEach((wave, index) => {
        mainTl.fromTo(
          wave,
          { scale: 0, opacity: 0.8 },
          { scale: 3, opacity: 0, duration: 1.5, ease: "power2.out" },
          0.3 + index * 0.2 // Retraso progresivo
        );
      });

      // 3. Animación de formas geométricas
      shapesRef.current.forEach((shape, index) => {
        const angle = (360 / shapesRef.current.length) * index;
        const radius = 60;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        mainTl.fromTo(
          shape,
          { scale: 0, rotation: 0, x: 0, y: 0 },
          { scale: 1, rotation: index % 2 === 0 ? 360 : -360, x, y, duration: 1.2, ease: "elastic.out(1, 0.4)" },
          0.6 + index * 0.1 // Retraso progresivo
        );
      });

      // 4. Animación de líneas de conexión
      linesRef.current.forEach((line, index) => {
        mainTl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          1.5 + index * 0.05 // Retraso progresivo
        );
      });

      // 5. Animación de la flecha direccional
      mainTl.fromTo(
        arrowRef.current,
        { y: -30, opacity: 0, scale: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "bounce.out" },
        2
      );

      // 6. Animación del call to action
      mainTl.fromTo(
        callToActionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        2.3
      );

      // ANIMACIONES CONTINUAS (loop)
      gsap.to(coreRef.current, { scale: 1.3, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      shapesRef.current.forEach((shape, index) => {
        // Rotación continua
        gsap.to(shape, { rotation: "+=360", duration: 8 + index * 2, repeat: -1, ease: "none" });
        // Movimiento en trayectoria curva
        gsap.to(shape, {
          motionPath: { path: "M0,0 Q30,30 0,60 Q-30,30 0,0", autoRotate: false },
          duration: 6 + index,
          repeat: -1,
          ease: "none",
          transformOrigin: "center",
        });
      });

      // Parpadeo de líneas
      linesRef.current.forEach((line) => {
        gsap.to(line, { opacity: 0.2, duration: 0.1 + Math.random() * 0.3, repeat: -1, yoyo: true, ease: "none", delay: Math.random() * 2 });
      });

      // Animación de la flecha
      gsap.to(arrowRef.current, { y: 10, scale: 1.1, duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut" });

      // Animación de campos magnéticos
      magneticFieldRef.current.forEach((field, index) => {
        gsap.to(field, { scale: 1.5, opacity: 0, rotation: 360, duration: 3 + index * 0.5, repeat: -1, ease: "none", delay: index * 0.8 });
      });

      // Animación del call to action (bombeo)
      gsap.to(callToActionRef.current, { scale: 1.05, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, containerRef);

    // Limpiar animaciones al desmontar
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-48 bg-gradient-to-b from-forest via-grass/50 to-forest overflow-hidden cursor-pointer group"
      // Al hacer click, hace scroll suave hacia abajo
      onClick={() => window.scrollTo({ top: window.innerHeight * 1, behavior: "smooth" })}
    >
      {/* Fondo dinámico con ondas */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-grass/30 via-grass/10 to-transparent"></div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-grass/20"
            style={{
              animation: `pulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
              transform: `scale(${0.5 + i * 0.3})`,
            }}
          />
        ))}
      </div>

      {/* Núcleo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ondas de energía */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              // @ts-expect-error bien
              ref={(el) => (energyWaveRef.current[i] = el!)}
              className="absolute inset-0 w-8 h-8 -top-4 -left-4 border-2 border-grass/60 rounded-full"
            />
          ))}

          {/* Campos magnéticos */}
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              // @ts-expect-error bien
              ref={(el) => (magneticFieldRef.current[i] = el!)}
              className="absolute inset-0 w-16 h-16 -top-8 -left-8 border border-grass/30 rounded-full"
            />
          ))}

          {/* Núcleo */}
          <div
            ref={coreRef}
            className="w-6 h-6 bg-grass rounded-full relative z-10"
            style={{
              boxShadow: "0 0 30px rgba(74, 222, 128, 0.8), 0 0 60px rgba(74, 222, 128, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Formas geométricas alrededor del núcleo */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            // @ts-expect-error bien
            ref={(el) => (shapesRef.current[i] = el!)}
            className={`absolute ${
              i % 4 === 0
                ? "w-3 h-3 bg-grass/80 rounded-full"
                : i % 4 === 1
                ? "w-2 h-2 bg-grass/70 rotate-45"
                : i % 4 === 2
                ? "w-3 h-3 border-2 border-grass/70 rounded-full"
                : "w-2 h-4 bg-gradient-to-t from-grass/80 to-grass/40 rounded-full"
            }`}
            style={{ boxShadow: i % 2 === 0 ? "0 0 10px rgba(74, 222, 128, 0.6)" : "none" }}
          />
        ))}
      </div>

      {/* Red de líneas de conexión */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          // @ts-expect-error bien
          ref={(el) => (linesRef.current[i] = el!)}
          className="absolute bg-gradient-to-r from-grass/60 via-grass/80 to-grass/20 origin-center"
          style={{
            width: `${40 + i * 8}px`,
            height: "1px",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
          }}
        />
      ))}

      {/* Flecha direccional animada */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div ref={arrowRef} className="flex flex-col items-center space-y-2 group-hover:scale-110 transition-transform duration-300">
          <div className="relative">
            <div className="w-8 h-8 border-l-2 border-b-2 border-grass transform rotate-45 relative z-10"></div>
            <div className="absolute inset-0 w-8 h-8 border-l-2 border-b-2 border-grass/50 transform rotate-45 animate-ping"></div>
          </div>
          <div className="w-0.5 h-6 bg-gradient-to-b from-grass to-grass/30"></div>
        </div>
      </div>

      {/* Call to action (botón) */}
      <div ref={callToActionRef} className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-grass/10 backdrop-blur-sm border border-grass/30 group-hover:bg-grass/20 transition-all duration-300">
          {/* Puntos animados */}
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-grass rounded-full"
                style={{ animation: `bounce 1.5s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-white/90 text-sm font-regular tracking-wide">Descubre quien soy</span>
          <div className="w-4 h-4 border border-grass/70 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-grass rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Definición de animaciones CSS */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.1; transform: scale(1.2); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
          60% { transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
}
