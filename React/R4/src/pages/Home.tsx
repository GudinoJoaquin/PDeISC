import Hero from "../sections/Hero";
import Nav from "../components/Nav";
import ScrollBridge from "../components/ScrollBridge";
import Personal from "../sections/Personal";
import CallToAction from "../components/CallToAction";
import Proyectos from "../sections/Proyectos";
import Skills from "../sections/Skills";
import Footer from "../sections/Footer";
import DesktopNav from "../components/DesktopNav";

export default function Home() {
  return (
    <main className="overflow-x-hidden z-0">
      <section className="flex flex-col h-screen bg-forest z-100">
        {/* Nav fijo en la esquina con mejor posicionamiento móvil */}
        <section className="sm:flex justify-center lg:justify-start relative">
          <div className="flex lg:hidden">
            <Nav />
          </div>
          <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-4 z-50">
            <DesktopNav />
          </div>
        </section>

        <Hero />
        <div className="translate-y-[-70px] z-10">
          <CallToAction />
        </div>
      </section>

      {/* Contenido adicional para probar el scroll */}
      <Personal />

      <section className="bg-forest z-10">
        <ScrollBridge title="Proyectos destacados" />
      </section>

      <Proyectos />

      <section className="bg-forest">
        <ScrollBridge title="Habilidades" />
      </section>

      <Skills />

      <Footer />
    </main>
  );
}
