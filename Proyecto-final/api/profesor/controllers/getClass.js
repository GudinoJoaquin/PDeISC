import { supabase } from "../../config/supabase.js";

export async function getClass(req, res) {
  const { profesor_id } = req.params;
  if (!profesor_id)
    return res.status(400).json({ error: "El profesor_id es requerido" });

  try {
    const { data, error } = await supabase
      .from("clases")
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
