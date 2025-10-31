import { supabase, supabaseAdmin } from "../../config/supabase.js";

export async function getContents(req, res) {
  const { curso_id } = req.params;

  if (!curso_id)
    return res.status(400).json({ error: "Class id es necesario" });

  try {
    const { data, error } = await supabase
      .from("contenidos")
      .select()
      .eq("curso_id", curso_id);
    if (error)
      return res.status(500).json({ error: "Error recuperando contenidos" });

    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
