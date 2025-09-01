// Importación de íconos de diferentes librerías para representar tecnologías
import { BiLogoCPlusPlus } from "react-icons/bi";
import { FaJava } from "react-icons/fa";
import {
  IoLogoReact,
  IoLogoGithub,
  IoLogoJavascript,
  IoLogoPython,
  IoLogoNodejs,
} from "react-icons/io5";
import {
  SiAstro,
  SiExpress,
  SiMysql,
  SiPhp,
  SiRust,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

// Definición de las propiedades que recibe el componente Proyect
interface ProyectProps {
  img: string; // URL de la imagen del proyecto
  title: string; // Título del proyecto
  type: string; // Tipo o categoría del proyecto
  description: string; // Descripción del proyecto
  languajes: string[]; // Lista de tecnologías utilizadas
  link: string; // Enlace al proyecto
}

// Componente funcional que muestra la información de un proyecto
export default function Proyect({
  img,
  title,
  type,
  description,
  languajes,
  link,
}: ProyectProps) {

  return (
    <div
      className="relative mb-24 w-full max-w-sm bg-grass/10 backdrop-blur-sm border border-grass/30 rounded-3xl p-6 shadow-2xl hover:scale-110 transition hover:cursor-pointer"
      style={{
        boxShadow:
          "0 0 40px rgba(74, 222, 128, 0.2), inset 0 0 40px rgba(74, 222, 128, 0.05)",
      }}
      // Al hacer clic, abre el enlace del proyecto en una nueva pestaña
      onClick={() => window.open(link)}
    >
      {/* Imagen del proyecto */}
      <div className="relative">
        <img src={img} alt={title} className="rounded-2xl w-full" />
      </div>

      {/* Título y tipo del proyecto */}
      <h1 className="text-white font-bold text-xl text-center font-montserrat mt-4">
        {title}
      </h1>
      <h2 className="text-center text-white mt-2">{type}</h2>

      {/* Íconos de las tecnologías utilizadas */}
      <div className="flex gap-4 justify-center items-center my-4">
        {languajes.includes("javascript") && (
          <IoLogoJavascript color="#3c7068" size={38} />
        )}
        {languajes.includes("react") && (
          <IoLogoReact color="#3c7068" size={38} />
        )}
        {languajes.includes("python") && (
          <IoLogoPython color="#3c7068" size={38} />
        )}
        {languajes.includes("php") && <SiPhp color="#3c7068" size={38} />}
        {languajes.includes("tailwindcss") && (
          <SiTailwindcss color="#3c7068" size={38} />
        )}
        {languajes.includes("github") && (
          <IoLogoGithub color="#3c7068" size={38} />
        )}
        {languajes.includes("nodejs") && (
          <IoLogoNodejs color="#3c7068" size={38} />
        )}
        {languajes.includes("java") && <FaJava color="#3c7068" size={38} />}
        {languajes.includes("astro") && <SiAstro color="#3c7068" size={38} />}
        {languajes.includes("express") && (
          <SiExpress color="#3c7068" size={38} />
        )}
        {languajes.includes("c++") && (
          <BiLogoCPlusPlus color="#3c7068" size={38} />
        )}
        {languajes.includes("typescript") && (
          <SiTypescript color="#3c7068" size={33} />
        )}
        {languajes.includes("mysql") && <SiMysql color="#3c7068" size={33} />}
        {languajes.includes("rust") && <SiRust color="#3c7068" size={33} />}
        {languajes.includes("nextjs") && (
          <RiNextjsFill color="#3c7068" size={33} />
        )}
      </div>

      {/* Descripción del proyecto, visible solo en pantallas grandes */}
      <div className="hidden lg:block mt-4">
        <p className="text-white/80 text-sm mb-2">{description}</p>
      </div>

      {/* Efecto visual de brillo al pasar el mouse */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-grass/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}
