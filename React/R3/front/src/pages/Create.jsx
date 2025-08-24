import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Create() {
  const [data, setData] = useState({});
  const [alert, setAlert] = useState({
    msg: "",
    type: "success",
    visible: false,
  });
  const navigate = useNavigate();

  const showAlert = (msg, type = "error") => {
    setAlert({ msg, type, visible: true });
    setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textRegex = /^[a-zA-ZñÑ]+$/;  
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !textRegex.test(data.nombre) ||
      !textRegex.test(data.apellido) ||
      !data.nombre
    ) {
      showAlert("El nombre o apellido son inválidos.");
      return;
    }
    if (!numberRegex.test(data.dni) || String(data.dni).length < 8) {
      showAlert("DNI inválido.");
      return;
    }
    if (!emailRegex.test(data.email)) {
      showAlert("El email no es válido.");
      return;
    }
    if (data.fijo && !numberRegex.test(data.fijo)) {
      showAlert("El teléfono fijo es inválido.");
      return;
    }
    if (!numberRegex.test(data.celular)) {
      showAlert("El teléfono celular es inválido.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const data2 = await res.json();
      console.log(data2)

      if (!data2) {
        setAlert({
          msg: "Error al crear el usuario.",
          type: "error",
          visible: true,
        });
        return;
      }

      setAlert({
        msg: "Usuario creado exitosamente.",
        type: "success",
        visible: true,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showAlert("Error al crear el usuario.");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Crear Usuario
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
            type="number"
            placeholder="DNI"
            className="input"
            onChange={(e) =>
              setData((prev) => ({ ...prev, dni: e.target.value }))
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
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            className="input"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                fecha_de_nacimiento: e.target.value,
              }))
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
      {alert.visible && (
        <Alert
          msg={alert.msg}
          type={alert.type}
          setVisible={(v) => setAlert((prev) => ({ ...prev, visible: v }))}
        />
      )}
    </div>
  );
}
