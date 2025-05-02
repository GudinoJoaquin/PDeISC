//Importar modulos Express y Path con require para que funcione __dirname
const express = require("express");
const path = require("path");

const app = express(); //Inicialización del servidor http

//Middleware para poder usar el contenido de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

//Ruta raiz para el index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // <- Enviamos como respuesta del endpoint un archivo que se encuentra en la carpeta public
});

//Diferentes rutas para cada pagina
app.get("/pagina1", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pagina1.html"));
});

app.get("/pagina2", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pagina2.html"));
});

app.get("/pagina3", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pagina3.html"));
});

app.get("/pagina4", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pagina4.html"));
});

//Iniciar el servidor http en el puerto 3000 del localhost
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
