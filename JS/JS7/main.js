// Aca importación de modulos
import express from "express";
import { PORT } from "./config/config.js";
import routes from "./routes.js";
import os from "node:os";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(routes);

app.listen(PORT, "0.0.0.0", () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        console.log(
          `Tu servidor está disponible en: http://${iface.address}:${PORT}`
        );
      }
    }
  }
});
