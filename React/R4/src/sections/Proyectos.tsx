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

  useEffect(() => {
    const getProyects = async () => {
      const { data, error } = await supabase.from("proyects").select("*");

      if (error) {
        console.log("Error obteniendo proyectos:", error);
        setProyects([]);
        return;
      }

      if (!data || data.length === 0) {
        console.log("No hay proyectos");
        setProyects([]);
        return;
      }

      setProyects(data);
    };

    getProyects();
  }, []);

  return (
    <section id="proyects" className="bg-forest px-4 py-12">
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
    </section>
  );
}
