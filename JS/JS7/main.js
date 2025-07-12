// Aca importación de modulos de express, el puerto, las rutas y el modulo os de node
import express from "express";
import { PORT } from "./config/config.js";
import routes from "./routes.js";
import cors from "cors";

//Inicializar app de express
const app = express();

//Middleware para manejar json y archivos estaticos
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

//Middleware para usar las rutas
app.use(routes);

//Inicializar el servidor con el puerto y "0.0.0.0" para poder acceder desde fuera estando en la misma red
//El modulo os es utilizado para saber la ip y el puerto a la hora de iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`http://localhost:${PORT}`);
});
