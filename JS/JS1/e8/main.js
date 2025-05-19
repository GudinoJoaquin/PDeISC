const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const PALABRAS = [
  "montaña",
  "río",
  "sol",
  "luz",
  "cielo",
  "nube",
  "flor",
  "mariposa",
  "estrella",
  "fuego",
  "tierra",
  "árbol",
  "viento",
  "noche",
  "día",
  "piedra",
  "camino",
  "hoja",
  "lluvia",
  "nieve",
  "admin",
];

const COLORES = [
  "rojo",
  "azul",
  "verde",
  "amarillo",
  "naranja",
  "violeta",
  "rosado",
  "celeste",
  "marrón",
  "gris",
  "negro",
  "blanco",
  "turquesa",
  "beige",
  "lila",
  "cian",
  "magenta",
  "ocre",
  "esmeralda",
  "coral",
];

const NUMEROS = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json("Api key necesaria");
  }

  if (apiKey !== "dffjonfnovwnovwfnovfjnodfwkmofmp") {
    return res.status(403).json("Api key invalid");
  }

  next();
});

app.get("/", (req, res) => {});

app.post("/buscarPalabra", (req, res) => {
  const { palabra } = req.body;

  const search = palabra.toLowerCase();

  const resultados = PALABRAS.filter((nombre) =>
    nombre.toLowerCase().includes(search)
  );

  const indices = resultados.map((resultado) => PALABRAS.indexOf(resultado));

  res.status(200).json({ palabra: resultados, indice: indices });
});

app.post("/buscarColor", (req, res) => {
  const { color } = req.body;

  const search = color.toLowerCase();

  const resultados = COLORES.filter((nombre) =>
    nombre.toLowerCase().includes(search)
  );

  const indices = resultados.map((resultado) => COLORES.indexOf(resultado));

  res.status(200).json({ color: resultados, indice: indices });
});

app.post("/agregarNumero", (req, res) => {
  const { numero } = req.body;

  if (NUMEROS.length === 0) {
    NUMEROS.push(numero);
    return res.status(200).send({ message: "Numero agregado" });
  }

  if (NUMEROS.includes(numero)) {
    return res.status(406).send({ message: "Numero repetido" });
  } else {
    NUMEROS.push(numero);
    return res.status(200).send({ message: "Numero agregado" });
  }
});

app.get("/obtenerNumeros", (req, res) => {
  res.send(NUMEROS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
