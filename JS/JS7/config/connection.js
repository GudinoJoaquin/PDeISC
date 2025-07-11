// Imporar el metodo createConnection de mysql2
import { createConnection } from "mysql2";

//Exportar el objeto de conexion como variable conn
export const conn = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "score",
});
