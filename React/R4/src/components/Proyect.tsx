import { IoLogoReact } from "react-icons/io5";
import eestn5 from "../assets/img/eestn5.jpg"
import { SiTailwindcss } from "react-icons/si";

export default function Proyect({ cardRef, orbsRef, linesRef, descriptionRef }) {
  return (
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

        {/* Descripción con estilo call to action */}
        <div ref={descriptionRef} className="relative hover:scale-110">
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
          <div className="px-4 py-3 rounded-2xl bg-grass/10 backdrop-blur-sm border border-grass/30 hover:bg-grass/20 transition-all duration-300 cursor-pointer group">
            <img src={eestn5} alt="" />
          </div>
          <h1 className="text-white font-bold text-xl text-center font-montserrat mt-4">
            EESTN5
          </h1>
          <h2 className="text-center text-white mt-2">Landing page</h2>
          <div className="flex gap-4 justify-center items-center my-4">
            <IoLogoReact color="#3c7068" size={32}/>
            <SiTailwindcss color="#3c7068" size={32}/>
          </div>
          <div className="flex justify-center mt-3">
            <div className="w-4 h-4 border border-grass/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-1.5 h-1.5 bg-grass rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Efecto de brillo en los bordes */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-grass/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
  );
}
