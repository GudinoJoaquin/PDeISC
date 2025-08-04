import { useState, useRef } from "react";
import "../styles/form.css";

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
    <main className="main">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          ref={inputRef}
          type="text"
          placeholder="Nombre"
        />
        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
      <div className="display">{name ? `Bienvenido ${name}` : ""}</div>
    </main>
  );
}
