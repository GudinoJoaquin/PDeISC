import { supabase } from "../../config/supabase.js";

export async function getClass(req, res) {
  const { profesor_id } = req.params;
  if (!profesor_id)
    return res.status(400).json({ error: "El profesor_id es requerido" });

  try {
    const { data, error } = await supabase
      .from("cursos")
      .select()
      .eq("profesor", profesor_id);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener la clase" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function getClassByID(req, res) {
  const { class_id } = req.params;

  if (!class_id) return res.status(400).json({ error: "El id es requerido" });

  try {
    const { data, error } = await supabase
      .from("cursos")
      .select()
      .eq("id", class_id)
      .single();

    if (error) {
      return res.status(500).json({ error });
    }

    if (!data) {
      return res.status(404).json({ error: "No se encontro la clase" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}
