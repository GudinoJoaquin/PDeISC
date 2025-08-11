import { Link } from "react-router-dom";

export default function Home({ task, setTask }) {
  const handleDelete = (id) => {
    console.log(id);
    console.log(task.length);
    setTask((prev) => prev.filter((p) => p.id !== id));
    console.log("Tareas");
  };

  return (
    <div className="flex flex-col items-center">
      <Link to={"/crear"}>Crear</Link>
      <h1 className="text-5xl font-bold mb-12">Home</h1>
      <div className="flex flex-col items-center shadow-lg shadow-slate-400">
        {task &&
          task.map((t, i) => (
            <div
              className={`flex justify-center items-center gap-4 ${
                i % 2 === 0 ? "bg-gray-300" : "bg-neutral-400"
              } w-48 h-12 ${i === 0 && "rounded-t-lg"} ${
                i === task.length - 1 && "rounded-b-lg"
              }`}
              key={t.id}
            >
              <Link to={`/${t.id}`}>
                <div className="flex gap-4">
                  <p>
                    {t.id}. {t.title}
                  </p>
                </div>
              </Link>
              <button onClick={() => handleDelete(t.id)}>Borrar</button>
            </div>
          ))}
      </div>
    </div>
  );
}
