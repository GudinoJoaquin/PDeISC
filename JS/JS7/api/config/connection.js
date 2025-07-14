// Imporar el metodo createConnection de mysql2
import { createConnection } from "mysql2";

//Exportar el objeto de conexion como variable conn en localhost
// export const conn = createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "score",
// });

//Exportar el objeto de conexion como variable conn en railway
export const conn = createConnection({
  host: "metro.proxy.rlwy.net",
  port: 17269,
  user: "root",
  password: "KFlHZkqfRqtVtKtVMaffdAoiWhJDrfDm",
  database: "railway",
});
