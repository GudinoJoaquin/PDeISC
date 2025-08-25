"use client";

import { stardos } from "@/fonts/stencil";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import menu from "../../public/icons8-menú-500.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Escucha el scroll del viewport
    ScrollTrigger.create({
      start: "50 top", // Se activa cuando scrollY > 50px
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: "#151515",
          duration: 0.3,
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: "#202020",
          duration: 0.3,
        });
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <header
      ref={navRef}
      className="bg-[#202020] py-2 px-6 sm:px-3 grid grid-cols-2 sm:grid-cols-2 fixed w-full z-20 transition-colors duration-500"
    >
      <section className="flex justify-start items-center">
        <h1
          className={`${stardos.className} font-normal antialiased text-[#bba712] text-xl`}
        >
          Gudi Developer
        </h1>
      </section>
      <section className="hidden sm:flex gap-4 font-[400] justify-end items-center">
        <button className="hover:cursor-pointer">Iniciar sesión</button>
      </section>
      <section className="sm:hidden flex font-[400] justify-end items-center">
        <Image src={menu} alt="Menu" className="w-6 invert" />
      </section>
    </header>
  );
}
