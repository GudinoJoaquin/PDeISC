import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Details({ task }) {
  const { id } = useParams();
  const tarea = task.find((t) => t.id === Number(id));
  return (
    <div>
      <Link to={"/"}>Volver</Link>
      <h1>
        Detalle de {id} con titulo {tarea.title}
      </h1>
    </div>
  );
}
