import short from "../../public/short.jpg";
import casaca from "../../public/casaca.jpg";
import musculosa from "../../public/musculosa.jpg";
import gorra from "../../public/gorra.jpg";
import { stardos } from "@/fonts/stencil";
import Image from "next/image";

export default function About() {
  return (
    <div>
      <h1 className="text-center my-10 text-4xl sm:text-5xl">Sobre mí</h1>
      <section className="flex flex-col items-center sm:flex-row sm:justify-center gap-8">
        <article className="w-70">
          <Image src={short} alt="Short" className="h-70" />
          <div className="mt-4 flex flex-col items-center">
            <p
              className={`${stardos.className} antialiased text-center text-lg text-[#bba712]`}
            >
              Short River Plate
            </p>
            <p className="text-lg">$59.000,00</p>
          </div>
        </article>
        <article className="w-70">
          <Image src={casaca} alt="Short" className="h-70" />
          <div className="mt-4 flex flex-col items-center">
            <p
              className={`${stardos.className} antialiased text-center text-lg text-[#bba712]`}
            >
              Casaca Nfl River Plate
            </p>
            <p className="text-lg">$40.000,00</p>
          </div>
        </article>
        <article className="w-70">
          <Image src={gorra} alt="Short" className="h-70" />
          <div className="mt-4 flex flex-col items-center">
            <p
              className={`${stardos.className} antialiased text-center text-lg text-[#bba712]`}
            >
              Gorra La Dodgers
            </p>
            <p className="text-lg">$59.000,00</p>
          </div>
        </article>
        <article className="w-70">
          <Image src={musculosa} alt="Short" className="w-full h-70" />
          <div className="mt-4 flex flex-col items-center justify-center">
            <p
              className={`${stardos.className} antialiased text-center text-lg truncate text-[#bba712]`}
            >
              Musculosa Chicago Bulls Michael Jordan
            </p>
            <p className="text-lg">$45.000,00</p>
          </div>
        </article>
      </section>
    </div>
  );
}
