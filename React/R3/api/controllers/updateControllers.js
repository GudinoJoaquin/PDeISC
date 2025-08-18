import { conn } from "../connection.js";

export function updateUser(req, res) {
  try {
    const { dni } = req.params;
    const { nombre, apellido, email, direccion, telefono, celular } = req.body;
    const SQL =
      "UPDATE registro_usuarios SET nombre = ?, apellido = ?, email = ?, direccion = ?, telefono = ?, celular = ? WHERE dni = ?;";
    conn.query(
      SQL,
      [nombre, apellido, email, direccion, telefono, celular, dni],
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(result);
        res.status(200).json({ data: result });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
