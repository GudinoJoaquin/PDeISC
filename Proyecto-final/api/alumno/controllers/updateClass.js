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


    // Guardar en Supabase (ejemplo)
    const { data, error } = await supabase.from("contenidos").insert([
      {
        clase_id: claseId,
        bucket_path: archivoUrl,
        url_path: link,
        titulo: titulo,
        mensaje: mensaje,
      },
    ]);

    if (error) {
      console.error("Error al guardar la clase:", error);
      return res
        .status(500)
        .json({ error: "Error al guardar la clase en la DB" });
    }

    return res
      .status(200)
      .json({ clase: data, message: "Clase actualizada correctamente" });
  } catch (err) {
    console.error("Error en updateClass:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
