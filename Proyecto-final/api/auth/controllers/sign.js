import { supabase } from "../../config/supabase.js";
import jwt from "jsonwebtoken";

export async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "Email es requerido" });
  if (!password)
    return res.status(400).json({ error: "Contraseña es requerida" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "La contraseña debe tener al menos 8 caracteres" });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log(data);

    if (error) return res.status(400).json({ error: error.message });

    const token = jwt.sign(
      {
        user_id: data.user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user_id: data.user.id,
      access_token: data.session.access_token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

export async function signUp(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "Email es requerido" });
  if (!password)
    return res.status(400).json({ error: "Contraseña es requerida" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "La contraseña debe tener al menos 8 caracteres" });

  try {
    // 1️⃣ Crear el usuario
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    console.log("Esperando confirmación de email...");

    // 2️⃣ Esperar hasta 2 minutos (24 intentos cada 5 segundos)
    let session = null;
    for (let i = 0; i < 24; i++) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // esperar 5 segundos

      const { data: sessionData } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (sessionData?.session) {
        session = sessionData.session;
        console.log("Email confirmado ✅");
        break;
      }

      console.log(`Intento ${i + 1}/24: esperando confirmación...`);
    }

    // 3️⃣ Si nunca confirmó, devolver aviso
    if (!session) {
      return res.status(202).json({
        message:
          "El usuario fue creado, pero aún no confirmó su correo electrónico.",
        email,
      });
    }

    // 4️⃣ Crear JWT cuando ya tiene sesión
    const token = jwt.sign(
      { user_id: session.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user_id: session.user.id,
      access_token: session.access_token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export async function signOut(req, res) {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: "access_token es requerido" });
  }

  try {
    // Supabase tiene un método para revocar la sesión
    const { error } = await supabase.auth.signOut({
      access_token,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: "Sesión cerrada correctamente" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error cerrando sesión" });
  }
}
