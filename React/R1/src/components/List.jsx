import { useState } from "react";

export default function List() {
  const [list, setList] = useState([
    { tarea: "Comprar", completada: false },
    { tarea: "Vender", completada: false },
    { tarea: "Alquilar", completada: false },
    { tarea: "Pagar", completada: false },
    { tarea: "Limpiar", completada: false },
  ]);

  const toggleCompletada = (index) => {
    setList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, completada: !item.completada } : item
      )
    );
  };

  return (
    <main className="flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Lista de Tareas</h1>
        <ul className="space-y-4">
          {list.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <span
                className={`text-lg ${
                  item.completada ? "line-through text-green-600" : "text-gray-800"
                }`}
              >
                {item.tarea}
              </span>
              <button
                onClick={() => toggleCompletada(index)}
                className={`py-1 px-3 rounded-md text-sm font-medium transition ${
                  item.completada
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
              >
                {item.completada ? "Desmarcar" : "Marcar"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
