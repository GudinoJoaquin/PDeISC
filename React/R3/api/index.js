//Importar modulo express y rutas de endpoints
import express from "express";
import getRoutes from "./routes/getRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import deleteRoutes from "./routes/deleteRoutes.js";
import updateRoutes from "./routes/updateRoutes.js";
import cors from "cors";
//Inicializar app de express y puerto
const app = express();
const PORT = 3000;

//Middleware para manejar json y permitir cors
app.use(express.json());
app.use(cors());

//Middleware para usar rutas
app.use(getRoutes);
app.use(postRoutes);
app.use(deleteRoutes);
app.use(updateRoutes);

//Endpoint raiz
app.get("/", (req, res) => {
  res.send("Hola");
});

//Inicializar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
