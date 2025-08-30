import Languajes from "../components/Languajes";
import Title from "../components/Title";

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
    <section className="flex flex-col items-center h-screen justify-center">
      <Title
        words={words}
        className={`font-bold text-center text-grass font-montserrat text-5xl`}
      />
      <h1 className="font-bold text-center text-white font-montserrat mt-4 text-5xl">
        Gudiño Joaquin
      </h1>
      <p className="font-semibold text-white mt-12 text-2xl">
        Diseño y desarrollo web
      </p>
      <p className="font-semibold text-white mt-2 text-2xl">
        Fullstack developer
      </p>
      <section className="mt-8">
        <Languajes />
      </section>
      
    </section>
  );
}
