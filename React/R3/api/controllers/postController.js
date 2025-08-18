//Importar modulo de conexion
import { conn } from "../connection.js";

//Definir controlador con peticion y respuesta
export function createUser(req, res) {
  try {
    //Recuperar el cuerpo de la peticion los datos de interes
    const {
      dni,
      nombre,
      apellido,
      email,
      direccion,
      telefono,
      celular,
      fecha_de_nacimiento,
    } = req.body;

    //Definir la consulta sql
    const SQL =
      "INSERT INTO registro_usuarios (dni, nombre, apellido, email, direccion, telefono, celular, fecha_de_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //Realizar consulta enviando los datos
    conn.query(
      SQL,
      [
        dni,
        nombre,
        apellido,
        email,
        direccion,
        telefono,
        celular,
        fecha_de_nacimiento,
      ],
      (err, result) => {
        //Mostrar y terminar ejecucion si hay error
        if (err) {
          console.log(err);
          return;
        }
        //Mostrar y enviar los datos en formato json
        console.log(result);
        res.status(200).json({ data: result });
      }
    );
  } catch (error) {
    //Capturar y mostrar el error
    console.log(error);
    res.status(500).json({ error });
  }
}
