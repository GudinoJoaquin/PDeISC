import { useState, type FormEvent } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { session } = useSession();
  const navigate = useNavigate();

  if (session) {
    navigate("/dashboard");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error);
      return;
    }

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-grass font-medium">
              Email
            </label>
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
