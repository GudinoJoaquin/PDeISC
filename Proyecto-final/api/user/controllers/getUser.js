import { supabaseAdmin } from "../../config/supabase.js";

export async function getUser(req, res) {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: "User id es requerido" });

  try {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(user_id);
    if (error) return res.status(400).json({ error: "Error con credenciales" });
    res.send(data.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error obteniendo usuario" });
  }
}
