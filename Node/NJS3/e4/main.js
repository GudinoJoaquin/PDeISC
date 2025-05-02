//Importar Express y Path con require para utilizar __dirname
const express = require("express");
const path = require("path");

const app = express(); //Inicializacion del servidor HTTP

//Middleware para usar archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//Ruta para la raiz
app.get("/", (req, res) => {
  res.sendFile(path.join());
});

//Iniciar servidor en localhost:3000
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
