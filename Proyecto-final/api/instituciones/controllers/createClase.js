import { supabase } from "../../config/supabase.js";

export async function createClase(req, res) {
  const { nombre, titulo, descripcion, profesor, institucion } = req.body;

  // aceptar 'titulo' por compatibilidad con frontend
  const finalNombre = nombre || titulo;

  if (!finalNombre)
    return res.status(400).json({ error: "El nombre/título es requerido" });
  if (!descripcion)
    return res.status(400).json({ error: "La descripcion es requerida" });
  if (!institucion)
    return res.status(400).json({ error: "La institucion es requerida" });

  try {
    const { data, error } = await supabase.from("clases").insert([
      {
        nombre: finalNombre,
        descripcion: descripcion,
        institucion: institucion,
        profesor: profesor || null,
      },
    ]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    res.status(201).json({ msg: "Clase creada", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
