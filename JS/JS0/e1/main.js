// Importa los módulos necesarios
const express = require("express");
const path = require("path");

// Crea una instancia de Express
const app = express();

// Array para almacenar las personas que se van registrando
const personas = [];

// Puerto donde se va a iniciar el servidor
const PORT = 3000;

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para interpretar JSON en el body de las peticiones
app.use(express.json());

// Middleware para validar la API Key en cada solicitud
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  // Si no se envió una API key, retorna error 401
  if (!apiKey) {
    return res.status(401).json({ error: "Api key necesaria" });
  }

  // Si la API key es incorrecta, retorna error 403
  if (
    apiKey !==
    "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1"
  ) {
    return res.status(403).json({ error: "Api key invalida" });
  }

  // Si la API key es válida, continúa con la solicitud
  next();
});

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join());
});

// Ruta para recibir los datos enviados desde el formulario (POST)
app.post("/enviar", (req, res) => {
  // Extrae name y surname del body de la solicitud
  const { name, surname } = req.body;

  // Imprime en consola los datos recibidos
  console.log(`Name: ${name}, Surname: ${surname}`);
  console.log(req.body.name);

  // Crea una persona y la guarda en el array
  const persona = { name, surname };
  personas.push(persona);

  // Responde con HTML confirmando que se agregó la persona
  res.send(`
    <h1>Agregado correctamente</h1>
    <a href="/">Volver al formulario</a>  
    <a href="/obtener">Ver personas</a>  
  `);
});

// Ruta para obtener la lista de personas registradas
app.get("/obtener", (req, res) => {
  res.send(personas);
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
