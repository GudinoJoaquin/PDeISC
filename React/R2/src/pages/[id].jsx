import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Details({ task }) {
  const { id } = useParams();
  const tarea = task.find((t) => t.id === Number(id));
  return (
    <div>
      <Link className="bg-sky-700 px-3 py-1 text-white font-semibold" to={"/"}>
        Volver
      </Link>
      <h1 className="font-bold text-center text-3xl mb-12">{tarea.title}</h1>
      <p className="font-semibold text-center mt-24 mb-4">Descripción</p>
      <p className="text-center text-medium mx-24">{tarea.description}</p>
    </div>
  );
}
