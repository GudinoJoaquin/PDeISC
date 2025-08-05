import { useState, useRef } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(inputRef.current.value);
    inputRef.current.value = "";
    console.log(name);
  };

  return (
    <main className="flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Nombre"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Enviar
          </button>
        </form>
        {name && (
          <div className="mt-6 text-center text-lg font-medium text-gray-700">
            Bienvenido {name}
          </div>
        )}
      </div>
    </main>
  );
}
