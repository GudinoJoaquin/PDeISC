import { supabase } from "../../config/supabase.js";

export async function createInstitution(req, res) {
  const { nombre, descripcion, topics, encargado } = req.body;

  if (!nombre) return res.status(400).json({ error: "El nombre es requerido" });
  if (!descripcion)
    return res.status(400).json({ error: "La descripcion es requerida" });
  if (!encargado)
    return res.status(400).json({ error: "El encargado es requerido" });

  try {
    const { data, error } = await supabase.from("instituciones").insert([
      {
        nombre,
        descripcion,
        topicos: topics || [],
        encargado: encargado,
      },
    ]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    res.status(201).json({ msg: "Institución registrada", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
