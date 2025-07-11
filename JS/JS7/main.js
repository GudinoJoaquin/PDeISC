// Aca importación de modulos de express, el puerto, las rutas y el modulo os de node
import express from "express";
import { PORT } from "./config/config.js";
import routes from "./routes.js";
import os from "node:os";

//Inicializar app de express
const app = express();

//Middleware para manejar json y archivos estaticos
app.use(express.json());
app.use(express.static("public"));

//Middleware para usar las rutas
app.use(routes);

//Inicializar el servidor con el puerto y "0.0.0.0" para poder acceder desde fuera estando en la misma red
//El modulo os es utilizado para saber la ip y el puerto a la hora de iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        console.log(
          `Tu servidor está disponible en: http://${iface.address}:${PORT}` // <-- Tu servidor está disponible en: http://192.168.1.37:3000
        );
      }
    }
  }
});
