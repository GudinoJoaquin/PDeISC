import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Personal() {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const orbsRef = useRef([]);
  const linesRef = useRef([]);
  const infoItemsRef = useRef([]);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline principal para la entrada de la carta
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      });

      // 1. Entrada de la carta con escala y rotación sutil
      mainTl.fromTo(
        cardRef.current,
        { scale: 0, rotation: -5, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
        }
      );

      // 2. Imagen con efecto magnético
      mainTl.fromTo(
        imageRef.current,
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        0.3
      );

      // 3. Orbes decorativos
      orbsRef.current.forEach((orb, index) => {
        mainTl.fromTo(
          orb,
          { scale: 0, x: 0, y: 0, opacity: 0 },
          {
            scale: 1,
            x: (index % 2 === 0 ? -1 : 1) * (20 + index * 10),
            y: Math.sin(index) * 15,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          0.6 + index * 0.1
        );
      });

      // 4. Líneas de conexión
      linesRef.current.forEach((line, index) => {
        mainTl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          0.8 + index * 0.05
        );
      });

      // 5. Items de información con stagger
      mainTl.fromTo(
        infoItemsRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        1
      );

      // 6. Descripción final
      mainTl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        1.5
      );

      // ANIMACIONES CONTINUAS

      // Pulso sutil en la imagen
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 3,
        ease: "sine.inOut",
      });

      // Orbes en movimiento orbital
      orbsRef.current.forEach((orb, index) => {
        gsap.to(orb, {
          rotation: "+=360",
          duration: 6 + index * 2,
          repeat: -1,
          ease: "none",
        });
      });

      // Líneas con efecto de energía
      linesRef.current.forEach((line) => {
        gsap.to(line, {
          opacity: 0.3,
          duration: 1 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });

      // Respiración sutil de la carta
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 4,
        ease: "sine.inOut",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const personalInfo = [
    { label: "Nombre", value: "Joaquín Gudiño" },
    { label: "País", value: "Argentina" },
    { label: "Email", value: "contacto@joaquin.dev" },
    { label: "Teléfono", value: "+54 9 223 xxx-xxxx" },
  ];

  return (
    <section className="h-screen bg-forest flex items-center justify-center px-4">
      <div
        ref={cardRef}
        className="relative mb-24 w-full max-w-sm bg-grass/10 backdrop-blur-sm border border-grass/30 rounded-3xl p-6 shadow-2xl"
        style={{
          boxShadow:
            "0 0 40px rgba(74, 222, 128, 0.2), inset 0 0 40px rgba(74, 222, 128, 0.05)",
        }}
      >
        {/* Orbes decorativos */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (orbsRef.current[i] = el)}
              className={`absolute ${
                i % 3 === 0
                  ? "w-2 h-2 bg-grass/70 rounded-full"
                  : i % 3 === 1
                  ? "w-1.5 h-1.5 bg-grass/50 rounded-full"
                  : "w-1 h-1 bg-grass/80 rounded-full"
              }`}
              style={{
                top: `${20 + i * 12}%`,
                right: i % 2 === 0 ? "10px" : "auto",
                left: i % 2 === 1 ? "10px" : "auto",
                boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)",
              }}
            />
          ))}
        </div>

        {/* Líneas de conexión */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            className="absolute bg-grass/40 origin-left"
            style={{
              width: "30px",
              height: "1px",
              top: `${25 + i * 20}%`,
              right: "15px",
              transform: `rotate(${i * 20}deg)`,
            }}
          />
        ))}

        {/* Imagen de perfil */}
        <div className="flex justify-center mb-6 relative">
          <div
            ref={imageRef}
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-grass/80 to-grass/40 p-0.5"
            style={{
              boxShadow: "0 0 30px rgba(74, 222, 128, 0.4)",
            }}
          >
            <div className="w-full h-full rounded-full bg-forest/80 flex items-center justify-center overflow-hidden">
              {/* Placeholder para imagen - reemplaza con tu foto */}
              <div className="w-full h-full bg-gradient-to-br from-grass/30 to-grass/10 flex items-center justify-center text-grass/70 text-2xl font-bold">
                JG
              </div>
            </div>
            {/* Anillo exterior animado */}
            <div className="absolute inset-0 w-28 h-28 -top-2 -left-2 border border-grass/30 rounded-full animate-ping opacity-30"></div>
          </div>
        </div>

        {/* Información personal */}
        <div className="space-y-3 mb-6">
          {personalInfo.map((item, index) => (
            <div
              key={index}
              ref={(el) => (infoItemsRef.current[index] = el)}
              className="flex justify-between items-center py-2 px-3 rounded-xl bg-grass/5 border border-grass/20 hover:bg-grass/10 transition-all duration-300"
            >
              <span className="text-grass/80 text-sm font-medium">
                {item.label}:
              </span>
              <span className="text-white/90 text-sm font-light">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Descripción con estilo call to action */}
        <div ref={descriptionRef} className="relative">
          <div className="px-4 py-3 rounded-2xl bg-grass/10 backdrop-blur-sm border border-grass/30 hover:bg-grass/20 transition-all duration-300 cursor-pointer group">
            {/* Puntos animados como el conector */}
            <div className="flex justify-center mb-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-grass rounded-full mx-1"
                  style={{
                    animation: `bounce 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            <p className="text-white/90 text-md text-center leading-relaxed">
              Desarrollador Full Stack especializado en crear experiencias web
              únicas y funcionales. Apasionado por el diseño UI/UX y las
              tecnologías modernas.
            </p>

            {/* Indicador central como el conector */}
            <div className="flex justify-center mt-3">
              <div className="w-4 h-4 border border-grass/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-1.5 h-1.5 bg-grass rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Efecto de brillo en los bordes */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-grass/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </section>
  );
}
