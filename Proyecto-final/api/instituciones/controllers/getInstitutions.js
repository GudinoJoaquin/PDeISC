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
    // Fetch all institutions and find by encargado (new) or owner (old field)
    const { data, error } = await supabase.from("instituciones").select();

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener instituciones" });
    }

    const found = (data || []).find((inst) => {
      // compare as strings to avoid uuid vs string mismatches
      const encargado = inst?.encargado ? String(inst.encargado) : null;
      const ownerField = inst?.owner ? String(inst.owner) : null;
      const idStr = String(owner_id);
      return encargado === idStr || ownerField === idStr;
    });

    if (!found) return res.status(404).json({ error: "No encontrada" });

    res.status(200).json({ data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
