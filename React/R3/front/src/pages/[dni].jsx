import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Details() {
  const { dni } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/users/${dni}`);
        const data = await res.json();
        console.log(data);
        setUser(data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dni]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textRegex = /^[a-zA-Z]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!textRegex.test(data.nombre) || !textRegex.test(data.apellido)) {
      alert("El nombre o apellido son invalidos.");
      return;
    }
    if (!emailRegex.test(data.email)) {
      alert("El email no es válido.");
      return;
    }
    if (data.telefono_fijo && !numberRegex.test(data.telefono_fijo)) {
      alert("El telefono fijo invalido.");
      return;
    }
    if (!numberRegex.test(data.celular)) {
      alert("El telefono celular invalido.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users/${dni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const data2 = await res.json();

      console.log(data2);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <Link
        to={"/"}
        className="font-semibold text-white bg-blue-500 px-4 py-1 rounded-md mb-8"
      >
        Volver
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-4">
        {user.nombre} {user.apellido}
      </h1>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">DNI:</span> {user.dni}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Dirección:</span> {user.direccion}
        </p>
        <p>
          <span className="font-semibold">Teléfono Fijo:</span> {user.telefono}
        </p>
        <p>
          <span className="font-semibold">Celular:</span> {user.celular}
        </p>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Modificar Usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              className="input"
              onChange={(e) =>
                setData((prev) => ({ ...prev, nombre: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Apellido"
              className="input"
              onChange={(e) =>
                setData((prev) => ({ ...prev, apellido: e.target.value }))
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Direccion"
              className="input"
              onChange={(e) =>
                setData((prev) => ({ ...prev, direccion: e.target.value }))
              }
            />
            <input
              type="tel"
              placeholder="Telefono fijo"
              className="input"
              onChange={(e) =>
                setData((prev) => ({ ...prev, fijo: e.target.value }))
              }
            />
            <input
              type="tel"
              placeholder="Telefono celular"
              className="input"
              onChange={(e) =>
                setData((prev) => ({ ...prev, celular: e.target.value }))
              }
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
