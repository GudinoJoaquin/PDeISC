//Importar la conexion para usar
import { conn } from "../config/connection.js";

//Controlador para obtener a todos los usuarios
export function getUsers(req, res) {
  try {
    const sql = "SELECT * FROM score;"; //Definir consulta sql
    //Realizar la consulta y caputar el error y el resultaod
    conn.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: "Data from database", data: results });
    });
  } catch (error) {
    res.status(500).json({ message: "Error with server", error });
  }
}

//Controlador para buscar un usuario
export function searchUser(req, res) {
  const { id } = req.params; //Recibimos el id como query param
  try {
    const sql = "SELECT * FROM score WHERE id = ?;"; //Definir consulta sql (? para parametrizar la consulta y evitar inyecciones)
    conn.query(sql, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: `Error finding user`, error });
      if (!result) return res.status(404).json({ message: "User not found" }); // SI no existe un usuario con ese id devolver 404
      res.status(200).json({ message: "User found", result });
    });
  } catch (error) {
    res.status(500).json({ message: "Error finding user", error });
  }
}
//Controlador para guardar y actualizar los usuarios
export function saveUserData(req, res) {
  const { tiempo, puntos, nombre } = req.body; // Obtener el tiempo, los puntos y el nombre del usuario
  try {
    //Definir consulta sql, si hay una key duplicada (En este caso nombre) en vez de guardar actualiza los datos
    const sql =
      "INSERT INTO score (tiempo, puntos, nombre) VALUES (?, ?, ?) AS new ON DUPLICATE KEY UPDATE tiempo = new.tiempo, puntos = new.puntos;";
    //Enviar la consulta y esperar los resultados
    conn.query(sql, [tiempo, puntos, nombre], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error saving in database", error });
      }

      res.status(200).json({ message: "User saved succesfully", results });
    });
  } catch (error) {
    res.status(500).json({ message: "Error with server", error });
  }
}

//Controlador para borrar de la base de datos
export function deleteFromDatabase(req, res) {
  const { id } = req.params; //Obtener el id por query param
  try {
    const sql = "DELETE FROM score WHERE id = ?"; //Consulta sql para eliminar el registro que coincida con ese id
    conn.query(sql, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error deleting from database", error });
      }

      if (!results) return res.status(404).json({ message: "User not found" }); //Si no existe devolver 404

      res
        .status(200)
        .json({ message: "Deleted from database succesfully", data: results });
    });
  } catch (error) {
    res.status(500).json({ message: "Error with server", error });
  }
}

//Controlador para actualizar el nombre de los usuarios 
export function updateUser(req, res) {
  //Obteneoms id por query params y el nombre por el body de la peticion
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const sql = "UPDATE score SET nombre = ? WHERE id = ?;"; //Consulta para actualizar el nombre del usuario que coincida con el id
    conn.query(sql, [nombre, id], (error, result) => {
      if (error) {
        res.status(500).json({ message: "Error updating user", error });
      }
      if (!result) res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Updated succesfully", data: result });
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}
