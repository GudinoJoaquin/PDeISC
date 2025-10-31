import { supabase, supabaseAdmin } from "../../config/supabase.js";
export async function addCurso(req, res) {
  const { user_id, class_id } = req.body;

  if (!user_id)
    return res.status(400).json({ error: "El user_id es requerido" });
  if (!class_id)
    return res.status(400).json({ error: "El class_id es requerido" });

  try {
    // 🔹 Obtener contenidos de la clase
    const { data: contents, error: contentsError } = await supabase
      .from("contenidos")
      .select()
      .eq("curso_id", class_id);

    if (contentsError)
      return res.status(500).json({ error: "Error recuperando contenidos" });

    const contentsIDs = contents.map((c) => c.id);

    // 🔹 Obtener usuario
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.admin.getUserById(user_id);

    if (userError) return res.status(500).json({ error: userError.message });

    const existingCursos = user.user_metadata.cursos || [];

    // 🔹 Actualizar array de cursos
    const updatedCursos = [...existingCursos, class_id];

    // 🔹 Actualizar metadata del usuario
    const { error: updateUserError } =
      await supabaseAdmin.auth.admin.updateUserById(user_id, {
        user_metadata: {
          ...user.user_metadata,
          cursos: updatedCursos,
        },
      });

    if (updateUserError)
      return res.status(500).json({ error: updateUserError.message });

    return res.status(200).json({ message: "Curso agregado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
