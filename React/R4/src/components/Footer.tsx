import Image from "next/image";

import ig from "../../public/icons8-instagram-512.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-30">
      <section className="flex flex-col items-center justify-center">
        <article className="flex items-center justify-center">
          <Image src={ig} alt="instagram" className="w-14 invert" />
          <h2 className="text-4xl">lagorrerastore</h2>
        </article>
        <p className="font-[200]">Estamos en Instagram</p>
        <Link
          href={"https://instagram.com/lagorrerastore"}
          className="font-[400] mt-5 border-2 border-white rounded-full px-4 py-1 hover:text-[#bba712] hover:border-[#bba712] transition duration-300"
        >
          SEGUINOS
        </Link>
      </section>
      <main className="bg-[#151515]">
        <section className="grid sm:grid-cols-3 gap-16 mt-24 px-16 py-16 font-[200]">
          <article>
            <h2 className="text-xl font-[400]">Categorías</h2>
            <div className="mt-6 flex flex-col gap-4">
              <p>Inicio</p>
              <p>Productos</p>
              <p>Contacto</p>
              <p>Quiénes Somos</p>
            </div>
          </article>
          <article>
            <h2 className="text-xl font-[400]">Contactános</h2>
            <div className="mt-6 flex flex-col gap-4">
              <p>542236366305</p>
              <p>2236366305</p>
              <p>lagorrerastore@gmail.com</p>
            </div>
          </article>
          <article>
            <h2 className="text-xl font-[400]">Sigamos conectados</h2>
            <div className="mt-6 flex flex-col gap-4">
              <div className="bg-[#202020] hover:bg-[#bba117] w-12 h-12 rounded-full flex items-center justify-center transition duration-150">
                <Image src={ig} alt="instagram" className="w-8 h-10 invert" />
              </div>
            </div>
          </article>
        </section>
        <article>
          <p className="font-[200] text-center text-sm sm:text-md">
            Copyright La Gorrera Store - 2025. Todos los derechos reservados.
          </p>
        </article>
      </main>
    </footer>
  );
}
