//Importacion de modulos Express ,Path, FS
const express = require("express");
const path = require("path");
const fs = require("node:fs");

//Inicializar app de express, puerto y array de numeros
const app = express(); 
const PORT = 3000;
const NUMEROS = [];

//Middleware para servir archivos estaticos y manejar json
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Ruta raiz
app.get("/", (req, res) => {
  res.sendFile(path.join());
});

//Ruta para guardar numeros
app.post("/saveNumber", (req, res) => {
  const { numero } = req.body;
  console.log(numero);  

  if (!numero) return;

  //No permitir que ingrese más de 20
  if (NUMEROS.length >= 20) {
    res
      .status(406)
      .json({ message: "Cantidad de numeros alcanzada", numeros: NUMEROS });
    return;
  }

  //Mientras hay menos de 10 numeros
  if (NUMEROS.length < 10) {
    NUMEROS.push(numero);
    res
      .status(200)
      .json({ message: `Faltan ${10 - NUMEROS.length}`, numeros: NUMEROS });
    return;
  }

  //Si hay entre 10 y 20 numeros guarda el numero y actualiza el txt
  NUMEROS.push(numero);
  fs.writeFileSync("numeros.txt", JSON.stringify(NUMEROS), (err) => {
    if (err) console.log(err);
  });
  res
    .status(200)
    .json({ message: "Numero agregado con exito", numeros: NUMEROS });
});

//Endpoint para obtener numeros
app.get("/getNumbers", (req, res) => {
  res.send(NUMEROS);
});

//Inicializar el servidor en el puerto indicado
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
