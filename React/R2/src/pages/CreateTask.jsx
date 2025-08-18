import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateTask({ setTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || title.length <= 3) return;
    if (!description || description.length <= 10) return;

    console.log(`Titulo: ${title}, Descripción: ${description}`);
    setTask((prev) => [...prev, { id: prev.length + 1, title, description }]);
    navigate("/");
  };

  return (
    <div>
      <Link className="bg-sky-700 px-3 py-1 text-white font-semibold" to={"/"}>
        Volver
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <label className="flex flex-col">
          <p className="font-semibold text-xl">Titulo</p>
          <input
            type="text"
            className="pl-2 pr-4 py-1 border-2 border-sky-600 rounded-lg w-48"
            placeholder="Comprar"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={3}
          />
        </label>
        <label className="flex flex-col">
          <p className="font-semibold text-xl">Descripción</p>
          <textarea
            value={description}
            className="pl-2 pr-4 py-1 border-2 border-sky-600 rounded-lg w-48"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Minimo 10 caracteres"
            minLength={10}
          ></textarea>
        </label>
        <button
          className="bg-sky-600 px-2 py-1 rounded-lg font-semibold text-white"
          type="submit"
        >
          Guardar tarea
        </button>
      </form>
    </div>
  );
}
