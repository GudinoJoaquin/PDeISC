const express = require("express");
const path = require("path");
const app = express();
const personas = []; // Arreglo donde se almacenarán los datos recibidos
const PORT = 3000;

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para poder interpretar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para validar la API key en cada solicitud
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  // Si no se envía la API key, se responde con error 401 (no autorizado)
  if (!apiKey) {
    return res.status(401).json({ error: "Api key necesaria" });
  }

  // Si la API key es incorrecta, se responde con error 403 (prohibido)
  if (
    apiKey !==
    "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1"
  ) {
    return res.status(403).json({ error: "Api key invalida" });
  }

  // Si la API key es válida, se continúa con el siguiente middleware o ruta
  next();
});

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join());
});

// Ruta POST para recibir datos de una persona
app.post("/sendData", (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    nacimiento,
    sexo,
    estadoCivil,
    documento,
    nacionalidad,
    telefono,
    email,
    cantidadHijos,
  } = req.body;

  // Crear objeto persona con los datos recibidos
  const persona = {
    nombre,
    apellido,
    edad,
    nacimiento,
    sexo,
    estadoCivil,
    documento,
    nacionalidad,
    telefono,
    email,
    cantidadHijos,
  };

  // Agregar persona al array
  personas.push(persona);

  res.status(200).send("Datos recibidos correctamente");
});

// Ruta GET para obtener el listado de personas almacenadas
app.get("/obtener", (req, res) => {
  res.send(personas);
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
