//Importar el metodo createConnection de mysql2
import { createConnection } from "mysql2";

//Crear y exportar la conexion
export const conn = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usuarios",
});
