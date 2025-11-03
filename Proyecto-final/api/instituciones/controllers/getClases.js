import { supabase } from "../../config/supabase.js";

export async function getClasesByInstitucion(req, res) {
  const { institucion_id } = req.params;
  if (!institucion_id)
    return res.status(400).json({ error: "institucion_id es requerido" });

  try {
    const { data, error } = await supabase
      .from("clases")
      .select()
      .eq("institucion", institucion_id);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener clases" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function getClaseByID(req, res) {
  const { clase_id } = req.params;
  if (!clase_id)
    return res.status(400).json({ error: "clase_id es requerido" });

  try {
    const { data, error } = await supabase
      .from("clases")
      .select()
      .eq("id", clase_id)
      .single();

    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    if (!data) return res.status(404).json({ error: "No encontrada" });

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
