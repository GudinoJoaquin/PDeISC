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
    <main>
      <ul>
        {list.map((item, index) => (
          <div key={index}>
            <li>
              {item.tarea}, {item.completada ? "Completada" : "Pendiente"}
            </li>
            <button onClick={() => toggleCompletada(index)}>
              {item.completada ? "Desmarcar" : "Marcar"}
            </button>
          </div>
        ))}
      </ul>
    </main>
  );
}
