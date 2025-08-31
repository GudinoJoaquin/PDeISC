import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "../config/supabase";

gsap.registerPlugin(ScrollTrigger);

interface InfoProps {
  name: string;
  country: string;
  phone: string;
  email: string;
}

export default function Personal() {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const orbsRef = useRef([]);
  const linesRef = useRef([]);
  const infoItemsRef = useRef([]);
  const descriptionRef = useRef(null);
  const [data, setData] = useState<InfoProps | null>(null);

  useEffect(() => {
    const getPersonalInfo = async () => {
      const { data: info, error } = await supabase
        .from("info")
        .select("*")
        .single();
      if (error) {
        console.log(error);
        setData(null);
      }

      if (!info) {
        console.log("No hay info");
        setData(null);
      }

      setData(info);
    };
    getPersonalInfo();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      });

      mainTl.fromTo(
        cardRef.current,
        { scale: 0, rotation: -5, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2 }
      );

      mainTl.fromTo(
        imageRef.current,
        { scale: 0, rotation: 180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
        0.3
      );

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

      linesRef.current.forEach((line, index) => {
        mainTl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.8 + index * 0.05
        );
      });

      mainTl.fromTo(
        infoItemsRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        1
      );

      mainTl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        1.5
      );

      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 3,
        ease: "sine.inOut",
      });
      orbsRef.current.forEach((orb, index) => {
        gsap.to(orb, {
          rotation: "+=360",
          duration: 6 + index * 2,
          repeat: -1,
          ease: "none",
        });
      });
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
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 4,
        ease: "sine.inOut",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const personalInfo = [
    { label: "Nombre", value: data?.name },
    { label: "País", value: data?.country },
    { label: "Email", value: data?.email },
    { label: "Teléfono", value: data?.phone },
  ];

  return (
    <section
      id="personal"
      className="h-[130vh] bg-forest flex items-center justify-center px-4"
    >
      <div
        ref={cardRef}
        className="relative lg:h-88 mb-24 w-full max-w-5xl bg-grass/10 backdrop-blur-sm border border-grass/30 rounded-3xl p-6 shadow-2xl flex flex-col lg:flex-row lg:items-start gap-6"
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
              // @ts-expect-error bien
              ref={(el) => (orbsRef.current[i] = el)}
              className={`absolute ${
                i % 3 === 0
                  ? "w-2 h-2 bg-grass/70"
                  : i % 3 === 1
                  ? "w-1.5 h-1.5 bg-grass/50"
                  : "w-1 h-1 bg-grass/80"
              } rounded-full`}
              style={{
                top: `${20 + i * 12}%`,
                right: i % 2 === 0 ? "10px" : "auto",
                left: i % 2 === 1 ? "10px" : "auto",
                boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)",
              }}
            />
          ))}
        </div>

        {/* IZQUIERDA: imagen + info personal */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-6 lg:w-1/2 lg:h-full">
          <div className="flex justify-center lg:block">
            <div
              ref={imageRef}
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-grass/80 to-grass/40 p-0.5"
              style={{ boxShadow: "0 0 30px rgba(74, 222, 128, 0.4)" }}
            >
              <div className="w-full h-full rounded-full bg-forest/80 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-grass/30 to-grass/10 flex items-center justify-center text-grass/70 text-2xl font-bold">
                  JG
                </div>
              </div>
              <div className="absolute inset-0 w-28 h-28 -top-2 -left-2 border border-grass/30 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>

          <div className="space-y-3">
            {personalInfo.map((item, index) => (
              <div
                key={index}
                // @ts-expect-error bien
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
        </div>

        {/* LINEA SEPARADORA */}
        <div className="hidden lg:block w-px bg-grass/30 mx-4"></div>

        {/* DERECHA: descripción */}
        <div ref={descriptionRef} className="relative lg:w-1/2 h-full">
          <div className="px-4 py-3 h-full rounded-2xl bg-grass/10 backdrop-blur-sm border border-grass/30 hover:bg-grass/20 transition-all duration-300 cursor-pointer group">
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

            <p className="text-white/90 text-md text-center lg:text-left leading-relaxed">
              Desarrollador Full Stack especializado en crear experiencias web
              únicas y funcionales. Apasionado por el diseño UI/UX, tecnologías
              modernas y siempre buscando innovar en cada proyecto. Me gusta
              crear interfaces limpias y experiencias interactivas que
              sorprendan al usuario. Enfocado en optimizar el rendimiento y la
              accesibilidad de las apps web, asegurando la escalabilidad.
              Disfruto colaborar con equipos y aprender constantemente nuevas
              herramientas y frameworks
            </p>

            <div className="flex justify-center lg:justify-end mt-3">
              <div className="w-4 h-4 border border-grass/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-1.5 h-1.5 bg-grass rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
