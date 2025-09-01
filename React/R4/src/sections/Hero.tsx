import Languajes from "../components/Languajes";
import Title from "../components/Title";

// Array de saludos en distintos idiomas
const words = [
  "Hi!, I'm", // Inglés
  "Hola!, Soy", // Español
  "Ciao!, Sono", // Italiano
  "Bonjour!, Je suis", // Francés
  "Hallo!, Ich bin", // Alemán
  "Olá!, Eu sou", // Portugués
  "こんにちは!, 私は", // Japonés
  "안녕하세요!, 저는", // Coreano
  "你好!, 我是", // Chino (Mandarín)
  "Привет!, Я", // Ruso
  "Merhaba!, Ben", // Turco
  "Salam!, Mən", // Azerí
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col lg:flex-row items-center justify-center h-screen lg:px-20 gap-12"
    >
      {/* Columna izquierda: texto principal */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
        {/* Componente Title que rota entre las palabras del array */}
        <Title
          words={words}
          className="font-bold text-grass font-montserrat text-5xl lg:text-6xl"
        />
        {/* Nombre principal */}
        <h1 className="font-bold text-white font-montserrat mt-4 text-5xl lg:text-7xl">
          Gudiño Joaquin
        </h1>
        {/* Descripción corta */}
        <p className="font-semibold text-white mt-12 text-2xl lg:text-3xl">
          Diseño y desarrollo web
        </p>
        <p className="font-semibold text-white mt-2 text-2xl lg:text-3xl">
          Fullstack developer
        </p>
      </div>

      {/* Columna derecha: animación/visualización de lenguajes */}
      <div className="w-full lg:w-1/2">
        <Languajes />
      </div>
    </section>
  );
}
