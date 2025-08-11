import { Link } from "react-router-dom";

export default function Home({ task, setTask }) {
  const handleDelete = (id) => {
    console.log(id);
    console.log(task.length);
    setTask((prev) => prev.filter((p) => p.id !== id));
    console.log("Tareas");
  };

  const toggleComplete = (id) => {
    setTask((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, complete: !item.complete } : item
      )
    );
  };

  return (
    <div className="flex flex-col items-center">
      <Link
        className="bg-sky-700 px-3 py-1 text-white font-semibold"
        to={"/crear"}
      >
        Crear
      </Link>
      <h1 className="text-5xl font-bold mb-12">Home</h1>
      <div className="flex flex-col items-center shadow-lg shadow-slate-400">
        {task &&
          task.map((t, i) => (
            <div
              className={`flex justify-between items-center gap-4 ${
                i % 2 === 0 ? "bg-gray-300" : "bg-neutral-400"
              } w-96 h-12 px-4 ${i === 0 && "rounded-t-lg"} ${
                i === task.length - 1 && "rounded-b-lg"
              }`}
              key={t.id}
            >
              <Link to={`/${t.id}`}>
                <div className="flex gap-4">
                  <p className={`${t.complete && "line-through"}`}>
                    {t.id}. {t.title}
                  </p>
                </div>
              </Link>
              <button
                className="bg-red-500 px-2 py-1 rounded-lg text-white font-semibold"
                onClick={() => toggleComplete(t.id)}
              >
                Marcar
              </button>
              <button
                className="bg-red-500 px-2 py-1 rounded-lg text-white font-semibold"
                onClick={() => handleDelete(t.id)}
              >
                Borrar
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
