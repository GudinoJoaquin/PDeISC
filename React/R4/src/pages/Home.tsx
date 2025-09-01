import Hero from "../sections/Hero";
import Nav from "../components/Nav";
import ScrollBridge from "../components/ScrollBridge";
import Personal from "../sections/Personal";
import CallToAction from "../components/CallToAction";
import Proyectos from "../sections/Proyectos";
import Skills from "../sections/Skills";
import Footer from "../sections/Footer";
import DesktopNav from "../components/DesktopNav";

// Componente principal de la página de inicio
export default function Home() {
  return (
    // Contenedor principal con control de overflow y z-index
    <main className="overflow-x-hidden z-0">
      {/* Sección principal de la página con fondo y altura de pantalla completa */}
      <section className="flex flex-col h-screen bg-forest z-100">
        {/* Navegación fija: versión móvil y escritorio */}
        <section className="sm:flex justify-center lg:justify-start relative">
          {/* Navegación para dispositivos móviles */}
          <div className="flex lg:hidden">
            <Nav />
          </div>
          {/* Navegación para escritorio, fija en el lateral izquierdo */}
          <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-4 z-50">
            <DesktopNav />
          </div>
        </section>

        {/* Sección de héroe (presentación principal) */}
        <Hero />
        {/* Llamado a la acción, ligeramente desplazado hacia arriba */}
        <div className="translate-y-[-70px] z-10">
          <CallToAction />
        </div>
      </section>

      {/* Sección personal (sobre mí, perfil, etc.) */}
      <Personal />

      {/* Separador visual y título para la sección de proyectos */}
      <section className="bg-forest z-10">
        <ScrollBridge title="Proyectos destacados" />
      </section>

      {/* Sección de proyectos */}
      <Proyectos />

      {/* Separador visual y título para la sección de habilidades */}
      <section className="bg-forest">
        <ScrollBridge title="Habilidades" />
      </section>

      {/* Sección de habilidades */}
      <Skills />

      {/* Pie de página */}
      <Footer />
    </main>
  );
}
