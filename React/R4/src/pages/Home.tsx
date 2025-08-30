import Hero from "../sections/Hero";
import Nav from "../components/Nav";
import ScrollBridge from "../components/ScrollBridge";
import Personal from "../sections/Personal";
import CallToAction from "../components/CallToAction";
import Proyectos from "../sections/Proyectos";
import Contact from "../sections/Contact";
export default function Home() {
  return (
    <main className="overflow-x-hidden z-0">
      <section className="flex flex-col h-screen bg-forest">
        {/* Nav fijo en la esquina con mejor posicionamiento móvil */}
        <section className="sm:flex justify-center">
          <Nav />
        </section>
        <Hero />
        <div className="translate-y-[-70px]">
          <CallToAction />
        </div>
      </section>

      {/* Contenido adicional para probar el scroll */}
      <Personal />

      <section className="bg-forest">
        <ScrollBridge title="Proyectos destacados"/>
      </section>


      <Proyectos />

      <section className="bg-forest">
        <ScrollBridge title="Contacto"/>
      </section>

      <Contact />
    </main>
  );
}
