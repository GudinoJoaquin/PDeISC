import { stardos } from "@/fonts/stencil";
import AnimatedTitle from "@/animated/AnimatedTitle";
import ImageCarousel from "@/components/ImageCarousel";
import LenisProvider from "@/providers/LenisProvider";
import Image from "next/image";

import eestn5 from "../../public/eestn5.jpg";
import saberCrypto from "../../public/sabercrypto.svg";
import bahia from "../../public/bahia.svg";

import Link from "next/link";
import About from "@/sections/About";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <header className="relative h-screen flex flex-col sm:flex-row items-center justify-center px-4 sm:px-16">
        {/* Fondo con overlay en mobile */}
        <div className="absolute inset-0 z-0 block sm:hidden">
          <ImageCarousel />
        </div>

        {/* Texto animado */}
        <section className="relative z-10 text-center sm:text-left sm:flex-2 flex flex-col justify-center items-start">
          <h1
            className={`text-7xl text-center sm:text-start sm:text-6xl ${stardos.className} antialiased`}
          >
            Gudiño Joaquin
          </h1>
          <AnimatedTitle
            words={["JavaScript", "Java", "C++", "PHP", "Python"]}
            className={`text-7xl text-center sm:text-start sm:text-4xl ${stardos.className} antialiased`}
          />
          <p className="italic font-[200] text-center text-3xl sm:text-start sm:text-xl">
            Fullstack developer
          </p>
          <p className="italic font-[400] text-center text-2xl sm:text-start sm:text-2xl">
            Servicios de diseño y desarrollo web
          </p>
        </section>

        {/* Carousel visible solo en escritorio */}
        <section className="hidden sm:flex flex-3 relative items-center justify-center">
          <ImageCarousel />
        </section>
      </header>

      {/* DESTACADO */}
      <LenisProvider>
        <section className="mt-16">
          <h1 className="text-center mb-16 text-4xl sm:text-5xl">
            Proyectos destacados
          </h1>
          <article
            className={`grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 sm:h-[94vh] sm:gap-0 ${stardos.className}`}
          >
            {/* Item 1 */}
            <Link
              href={"https://eest5mdp.edu.ar/"}
              className="group relative w-full h-[300px] sm:col-span-1 sm:row-span-2 hover:cursor-pointer sm:h-full overflow-hidden"
            >
              <Image
                src={eestn5}
                alt="Remera"
                fill
                className="object-cover transition brightness-25 duration-500 group-hover:opacity-0"
              />
              <Image
                src={eestn5}
                alt="Remera Hover"
                fill
                className="object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                <h2 className="text-white text-3xl sm:text-4xl font-bold uppercase">
                  EESTN°5
                </h2>
              </div>
            </Link>

            {/* Item 2 */}
            <Link
              href={"https://sabercrypto.vercel.app"}
              className="group relative w-full h-[300px] sm:col-span-1 sm:row-span-1 sm:h-full hover:pointer-curs overflow-hidden"
            >
              <Image
                src={saberCrypto}
                alt="Remera"
                fill
                className="object-cover transition brightness-25 duration-500 group-hover:opacity-0"
              />
              <Image
                src={saberCrypto}
                alt="Remera Hover"
                fill
                className="object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                <h2 className="text-white text-3xl sm:text-4xl font-bold uppercase">
                  SaberCrypto
                </h2>
              </div>
            </Link>

            {/* Item 3 */}
            <Link
              href={"https://bahiaayuda.vercel.app/"}
              className="group relative w-full h-[300px] sm:col-span-1 sm:row-span-1 sm:h-full overflow-hidden"
            >
              <Image
                src={bahia}
                alt="Remera"
                fill
                className="object-cover transition brightness-25 duration-500 group-hover:opacity-0"
              />
              <Image
                src={bahia}
                alt="Remera Hover"
                fill
                className="object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                <h2 className="text-white text-3xl sm:text-4xl font-bold uppercase">
                  Bahia Ayuda
                </h2>
              </div>
            </Link>
          </article>
        </section>
        <About />
      </LenisProvider>
    </main>
  );
}
