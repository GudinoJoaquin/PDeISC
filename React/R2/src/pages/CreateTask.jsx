import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateTask({ setTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`Titulo: ${title}, Descripción: ${description}`);

    setTask((prev) => [...prev, { id: prev.length + 1, title, description }]);
  };

  return (
    <div>
      <Link to={"/"}>Volver</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Titulo
          <input
            type="text"
            placeholder="Comprar"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Descripción
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Comprar en la tienda x"
          ></textarea>
        </label>
        <button type="submit">Guardar tarea</button>
      </form>
    </div>
  );
}
