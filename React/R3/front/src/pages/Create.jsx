import { useState } from "react";

export default function Create() {
  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    const textRegex = /^[a-zA-Z]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!numberRegex.test(data.dni) || data.dni < 8) {
      alert("DNI invalido.");
      return;
    }
    if (!emailRegex.test(data.email)) {
      alert("El email no es válido.");
      return;
    }
    if (data.fijo && !numberRegex.test(data.fijo)) {
      alert("El telefono fijo invalido.");
      return;
    }
    if (!numberRegex.test(data.celular)) {
      alert("El telefono celular invalido.");
      return;
    }
    if (!textRegex.test(data.nombre) || !textRegex.test(data.apellido)) {
      alert("El nombre o apellido son invalidos.");
      return;
    }
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const data2 = await res.json();

      console.log(data2);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) =>
            setData((prev) => ({ ...prev, nombre: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Apellido"
          onChange={(e) =>
            setData((prev) => ({ ...prev, apellido: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="DNI"
          onChange={(e) =>
            setData((prev) => ({ ...prev, dni: e.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Direccion"
          onChange={(e) =>
            setData((prev) => ({ ...prev, direccion: e.target.value }))
          }
        />
        <input
          type="tel"
          placeholder="Telefono fijo"
          onChange={(e) =>
            setData((prev) => ({ ...prev, telefono: e.target.value }))
          }
        />
        <input
          type="tel"
          placeholder="Telefono celular"
          onChange={(e) =>
            setData((prev) => ({ ...prev, celular: e.target.value }))
          }
        />
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              fecha_de_nacimiento: e.target.value,
            }))
          }
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
