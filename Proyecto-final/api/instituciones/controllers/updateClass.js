import { supabase } from "../../config/supabase.js";
import multer from "multer";

// Configurar multer para memoria (no guardar en disco)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Exportamos un middleware para usar en Express
export const uploadMiddleware = upload.single("archivo"); // "archivo" debe coincidir con el nombre del campo en FormData

// Endpoint para actualizar la clase
export async function updateClass(req, res) {
  try {
    // Los campos vienen en req.body
    const { claseId, titulo, mensaje, tipo, link } = req.body;

    let archivoUrl = null;

    // El archivo viene en req.file (si se envió)
    if (req.file) {
      const archivo = req.file;
      const filePath = `uploads/${Date.now()}_${archivo.originalname}`;

      const { error } = await supabase.storage
        .from("imagenes")
        .upload(filePath, archivo.buffer, {
          contentType: archivo.mimetype || "application/octet-stream",
        });

      if (error) {
        console.error("Error al subir archivo:", error);
        return res
          .status(500)
          .json({ error: "Error al subir archivo a Supabase" });
      }

      // Obtener URL pública
      const { data: publicUrlData } = supabase.storage
        .from("imagenes")
        .getPublicUrl(filePath);
      archivoUrl = publicUrlData.publicUrl;
    }

    // Guardar como tarea en la tabla `tareas` cuando el origen es institución
    // Esperamos recibir un campo adicional: due_date (YYYY-MM-DD) opcional
    const { due_date } = req.body;

    const tareaPayload = {
      clase_id: claseId,
      titulo: titulo,
      descripcion: mensaje,
      due_date: due_date || null,
      bucket_path: archivoUrl,
    };

    const { data, error } = await supabase
      .from("tareas")
      .insert([tareaPayload]);

    if (error) {
      console.error("Error al guardar la tarea:", error);
      return res
        .status(500)
        .json({ error: "Error al guardar la tarea en la DB" });
    }

    return res
      .status(200)
      .json({ tarea: data, message: "Tarea creada correctamente" });
  } catch (err) {
    console.error("Error en updateClass:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function updateAlumnos(req, res) {
  const { user_id } = req.body;

  if (!user_id)
    return res.status(400).json({ error: "El user id es requerido" });

  try {
    const { data, error } = await supabase.from("cursos").select();

    const { data: updated, error: updateError } = await supabase
      .from("cursos")
      .update({
        alumnos:
          data?.alumnos?.length > 0 ? [...data?.alumnos, user_id] : [user_id],
      });

    if (updateError)
      return res.status(400).json({ error: "Eerror actualizando" });

    if (error)
      return res.status(500).json({ error: "Error actualizando alumnos" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(error);
  }
}
