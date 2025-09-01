import { useEffect, useState } from "react";
import Proyect from "../components/Proyect";
import { supabase } from "../config/supabase";

interface ProyectProps {
  img: string;
  title: string;
  type: string;
  description: string;
  languajes: string[];
  link: string;
}

export default function Proyectos() {
  const [proyects, setProyects] = useState<ProyectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProyects = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("proyects").select("*");

      if (error) {
        console.error("Error obteniendo proyectos:", error);
        setProyects([]);
      } else {
        setProyects(data ?? []);
      }

      setLoading(false);
    };

    getProyects();
  }, []);

  return (
    <section id="proyects" className="bg-forest px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Título de la sección */}
        <h2 className="text-4xl font-bold text-center text-white font-montserrat mb-12">
          Proyectos
        </h2>

        {/* Estado de carga */}
        {loading ? (
          <p className="text-center text-gray-300 text-lg">Cargando proyectos...</p>
        ) : proyects.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No hay proyectos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
            {proyects.map((p, i) => (
              <Proyect
                key={i}
                img={p.img}
                title={p.title}
                type={p.type}
                description={p.description}
                languajes={p.languajes}
                link={p.link}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
