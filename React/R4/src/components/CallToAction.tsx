import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const magneticFieldRef = useRef<HTMLDivElement[]>([]);
  const energyWaveRef = useRef<HTMLDivElement[]>([]);
  const callToActionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline();

      if (!coreRef.current || !arrowRef.current || !callToActionRef.current) return;

      // 1. Animación del core central
      mainTl
        .fromTo(
          coreRef.current,
          { scale: 0, rotation: 0 },
          { scale: 1.2, rotation: 180, duration: 0.8, ease: "back.out(2)" }
        )
        .to(coreRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });

      // 2. Ondas de energía
      energyWaveRef.current.forEach((wave, index) => {
        mainTl.fromTo(
          wave,
          { scale: 0, opacity: 0.8 },
          { scale: 3, opacity: 0, duration: 1.5, ease: "power2.out" },
          0.3 + index * 0.2
        );
      });

      // 3. Formas geométricas
      shapesRef.current.forEach((shape, index) => {
        const angle = (360 / shapesRef.current.length) * index;
        const radius = 60;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        mainTl.fromTo(
          shape,
          { scale: 0, rotation: 0, x: 0, y: 0 },
          { scale: 1, rotation: index % 2 === 0 ? 360 : -360, x, y, duration: 1.2, ease: "elastic.out(1, 0.4)" },
          0.6 + index * 0.1
        );
      });

      // 4. Líneas de conexión
      linesRef.current.forEach((line, index) => {
        mainTl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          1.5 + index * 0.05
        );
      });

      // 5. Flecha direccional
      mainTl.fromTo(
        arrowRef.current,
        { y: -30, opacity: 0, scale: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "bounce.out" },
        2
      );

      // 6. Call to action
      mainTl.fromTo(
        callToActionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        2.3
      );

      // ANIMACIONES CONTINUAS
      gsap.to(coreRef.current, { scale: 1.3, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      shapesRef.current.forEach((shape, index) => {
        gsap.to(shape, { rotation: "+=360", duration: 8 + index * 2, repeat: -1, ease: "none" });
        gsap.to(shape, {
          motionPath: { path: "M0,0 Q30,30 0,60 Q-30,30 0,0", autoRotate: false },
          duration: 6 + index,
          repeat: -1,
          ease: "none",
          transformOrigin: "center",
        });
      });

      linesRef.current.forEach((line) => {
        gsap.to(line, { opacity: 0.2, duration: 0.1 + Math.random() * 0.3, repeat: -1, yoyo: true, ease: "none", delay: Math.random() * 2 });
      });

      gsap.to(arrowRef.current, { y: 10, scale: 1.1, duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut" });

      magneticFieldRef.current.forEach((field, index) => {
        gsap.to(field, { scale: 1.5, opacity: 0, rotation: 360, duration: 3 + index * 0.5, repeat: -1, ease: "none", delay: index * 0.8 });
      });

      gsap.to(callToActionRef.current, { scale: 1.05, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-48 bg-gradient-to-b from-forest via-grass/50 to-forest overflow-hidden cursor-pointer group"
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

      {/* Core central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              // @ts-expect-error bien
              ref={(el) => (energyWaveRef.current[i] = el!)}
              className="absolute inset-0 w-8 h-8 -top-4 -left-4 border-2 border-grass/60 rounded-full"
            />
          ))}

          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              // @ts-expect-error bien
              ref={(el) => (magneticFieldRef.current[i] = el!)}
              className="absolute inset-0 w-16 h-16 -top-8 -left-8 border border-grass/30 rounded-full"
            />
          ))}

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

      {/* Formas geométricas */}
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

      {/* Red de líneas */}
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

      {/* Flecha direccional */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div ref={arrowRef} className="flex flex-col items-center space-y-2 group-hover:scale-110 transition-transform duration-300">
          <div className="relative">
            <div className="w-8 h-8 border-l-2 border-b-2 border-grass transform rotate-45 relative z-10"></div>
            <div className="absolute inset-0 w-8 h-8 border-l-2 border-b-2 border-grass/50 transform rotate-45 animate-ping"></div>
          </div>
          <div className="w-0.5 h-6 bg-gradient-to-b from-grass to-grass/30"></div>
        </div>
      </div>

      {/* Call to action */}
      <div ref={callToActionRef} className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-grass/10 backdrop-blur-sm border border-grass/30 group-hover:bg-grass/20 transition-all duration-300">
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
