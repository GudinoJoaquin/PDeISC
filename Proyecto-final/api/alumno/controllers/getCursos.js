import { supabase, supabaseAdmin } from "../../config/supabase.js";

export async function getAddedCursos(req, res) {
  try {
    const { user_id, curso_id } = req.params; // o también podrías obtenerlo del token si usás auth middleware

    // 1️⃣ Obtener usuario
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.admin.getUserById(user_id);

    if (userError || !user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const cursosUsuario = user.user_metadata?.cursos || [];

    if (cursosUsuario.length === 0) {
      return res.status(200).json([]);
    }

    // 2️⃣ Obtener información completa de los cursos
    const cursosIds = cursosUsuario.map((c) => c.curso_id);

    const { data: cursos, error: cursosError } = await supabase
      .from("cursos")
      .select("*")
      .in("id", cursosIds);

    if (cursosError) {
      throw cursosError;
    }

    // 3️⃣ Obtener contenidos de cada curso
    const { data: contenidos, error: contenidosError } = await supabase
      .from("contenidos")
      .select("*")
      .in("curso_id", cursosIds);

    if (contenidosError) {
      throw contenidosError;
    }

    // 4️⃣ Unir cursos + contenidos + progreso del usuario
    const cursosCompletos = cursos.map((curso) => {
      const cursoUsuario = cursosUsuario.find((c) => c.curso_id === curso.id);
      const contenidosCurso = contenidos.filter(
        (ct) => ct.curso_id === curso.id
      );

      // añadir estado de completado a cada contenido
      const contenidosConEstado = contenidosCurso.map((ct) => {
        const progreso = cursoUsuario.contents?.find(
          (p) => p.content_id === ct.id
        );
        return {
          ...ct,
          completed: progreso ? progreso.completed : false,
        };
      });

      return {
        ...curso,
        contenidos: contenidosConEstado,
      };
    });

    res.status(200).json(cursosCompletos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los cursos del usuario" });
  }
}

export async function getCursoById(req, res) {
  const { curso_id } = req.params;

  if (!curso_id) return res.status(400).json({ error: "El id es requerido" });

  try {
    const { data, error } = await supabase
      .from("cursos")
      .select()
      .eq("id", curso_id)
      .single();

    if (error) {
      return res.status(500).json({ error });
    }

    if (!data) {
      return res.status(404).json({ error: "No se encontro la clase" });
    }

    res.status(200).json({data});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

export async function getCursos(req, res) {
  try {
    const { data, error } = await supabase.from("cursos").select();

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener la clase" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
