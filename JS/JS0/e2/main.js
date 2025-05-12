const express = require("express");
const path = require("path");
const app = express();
const personas = []; // Arreglo para almacenar los datos enviados
const PORT = 3000;

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para interpretar solicitudes con JSON
app.use(express.json());

// Middleware para validar la clave API en cada solicitud
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  // Si no se proporciona una API key, se devuelve error 401
  if (!apiKey) {
    return res.status(401).json({ error: "Api key necesaria" });
  }

  // Si la API key es incorrecta, se devuelve error 403
  if (
    apiKey !==
    "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1"
  ) {
    return res.status(403).json({ error: "Api key invalida" });
  }

  // Si la API key es válida, continúa con la siguiente función
  next();
});

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join());
});

// Ruta para recibir datos por POST y guardarlos en el arreglo
app.post("/sendData", (req, res) => {
  const { jugador, nacionalidad, posicion, precio } = req.body;
  const persona = { jugador, nacionalidad, posicion, precio };
  personas.push(persona);
});

// Ruta para obtener todos los datos almacenados
app.get("/obtener", (req, res) => {
  res.send(personas);
});

// Inicia el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
