import { supabase } from "../../config/supabase.js";

export async function listInstitutions(req, res) {
  try {
    const { data, error } = await supabase.from("instituciones").select();

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener instituciones" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function getInstitutionByOwner(req, res) {
  const { owner_id } = req.params;
  if (!owner_id)
    return res.status(400).json({ error: "owner_id es requerido" });

  try {
    const { data, error } = await supabase
      .from("instituciones")
      .select()
      .eq("owner", owner_id)
      .single();

    if (error && error.code !== "PGRST116") {
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
