//Importar el modulo de conexion
import { conn } from "../connection.js";

//Definir controlador con peticion y respuesta
export function getUsers(req, res) {
  //Intentar hacer peticion
  try {
    //Definir consulta sql y realizar la consulta
    const SQL = "SELECT * FROM registro_usuarios";
    conn.query(SQL, (err, result) => {
      //Mostrar el error y terminar la ejecucion si hay error
      if (err) {
        console.log(err);
        return;
      }
      //Mostrar resultados
      console.log(result);
      res.status(200).json({ data: result });
    });
  } catch (error) {
    //Capturar el error y mostrarlo
    console.log(error);
    res.status(500).json({ error });
  }
}

export function getUsersById(req, res) {
  try {
    const { dni } = req.params;
    const SQL = "SELECT * FROM registro_usuarios WHERE dni = ?";
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
