import { conn } from "../connection.js";

//Definir controlador para borrar usuario permanentemente
export function deleteUser(req, res) {
  try {
    //Obtener el dni del usuario por los query params
    const { dni } = req.params;
    //Definir consulta de borrado buscando donde coincida el dni
    const SQL = "DELETE FROM registro_usuarios WHERE dni = ?";
    conn.query(SQL, [dni], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      res.status(200).json({ data: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export function softDeleteUser(req, res) {
  try {
    const { dni } = req.params;
    const SQL = "UPDATE registro_usuarios SET shown = false WHERE dni = ?;";
    conn.query(SQL, [dni], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      res.status(200).json({ data: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
