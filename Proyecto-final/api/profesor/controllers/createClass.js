import { supabase } from "../../config/supabase.js";

export async function createClass(req, res) {
  const { titulo, descripcion, topics, profesor } = req.body;

  if (!titulo) return res.status(400).json({ error: "El titulo es requerido" });
  if (!descripcion)
    return res.status(400).json({ error: "La descripcion es requerida" });
  if (!topics || !topics.length)
    return res.status(400).json({ error: "Los topicos son requeridos" });
  if (!profesor) res.status(400).json({ error: "El profesor es requerido" });

  try {
    const { data, error } = await supabase.from("cursos").insert([
      {
        titulo: titulo,
        descripcion: descripcion,
        topicos: topics,
        profesor: profesor,
      },
    ]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }

    if (data) {
      console.log(data);
    }
    res.status(201).json({ msg: "Tabla creada", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
