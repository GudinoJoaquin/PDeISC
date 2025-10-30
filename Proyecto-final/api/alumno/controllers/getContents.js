import { supabase } from "../../config/supabase.js";

export async function getContents(req, res) {
  const { class_id } = req.params;

  if (!class_id)
    return res.status(400).json({ error: "Class id es necesario" });

  try {
    const { data, error } = await supabase
      .from("contenidos")
      .select()
      .eq("clase_id", class_id);
    if (error)
      return res.status(500).json({ error: "Error recuperando contenidos" });

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
