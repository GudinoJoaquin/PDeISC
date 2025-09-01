import { useState, type FormEvent } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession";

// Definición de la interfaz para los datos del formulario
interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // Hook personalizado para obtener la sesión actual
  const { session } = useSession();
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Si el usuario ya tiene sesión, redirige al dashboard
  if (session) {
    navigate("/dashboard");
  }

  // Maneja el envío del formulario de login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Llama a Supabase para iniciar sesión con email y contraseña
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    // Si hay un error, lo muestra en consola
    if (error) {
      console.log(error);
      return;
    }

    // Si el login es exitoso, redirige al dashboard
    if (data) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-forest">
      <div className="bg-petroleoum rounded-2xl p-10 w-96 shadow-2xl shadow-grass">
        <h2 className="text-2xl font-bold text-center text-grass mb-6">
          Iniciar Sesión
        </h2>
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-grass font-medium">
              Email
            </label>
            {/* Campo para el email */}
            <input
              type="email"
              id="email"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="tu@email.com"
              className="border border-forest rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-grass placeholder:text-grass text-grass"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-grass font-medium">
              Contraseña
            </label>
            {/* Campo para la contraseña */}
            <input
              type="password"
              id="password"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="********"
              className="border border-forest rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-grass placeholder:text-grass text-grass"
              required
            />
          </div>
          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="bg-grass text-forest font-semibold py-2 rounded-lg hover:bg-petroleoum hover:ring-2 hover:ring-grass hover:text-grass transition-colors hover:cursor-pointer mt-4"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
