const { createSecretKey } = require("crypto");
const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const ANIMALES = [
  "perro",
  "pato",
  "gato",
  "ganzo",
  "pelado",
  "gallina",
  "hormiga",
  "lechuza",
  "halcon",
  "gaviota",
  "ballena",
  "tortuga",
  "peludo",
  "oso hormiguero",
];

const CIUDADES = ["barcelona", "madrid", "mar del plata"];

const NUMEROS = [1, 2, 3, 42534, 35, 26536, 50, 123];

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

app.get("/", (req, res) => {
  res.sendFile(path.join());
});

app.post("/buscarAnimal", (req, res) => {
  const { animal } = req.body;

  const search = animal.toLowerCase();

  const resultados = ANIMALES.filter((nombre) =>
    nombre.toLowerCase().includes(search)
  );

  const indices = resultados.map((resultado) => ANIMALES.indexOf(resultado));

  console.log(resultados, indices);
  res.status(200).json({ animal: resultados, indice: indices });
});

app.post("/buscarNumero", (req, res) => {
  const { numero } = req.body;
  if (NUMEROS.indexOf(numero) === -1) {
    return res.status(406).json({ message: "No esta el numero" });
  }
  res.status(200).json({ numero: numero, indice: NUMEROS.indexOf(numero) });
});

app.post("/buscarCiudad", (req, res) => {
  const { ciudad } = req.body;
  if (CIUDADES.indexOf(ciudad) === -1) {
    return res.status(406).json({ indice: CIUDADES.indexOf(ciudad) });
  }
  res.status(200).json({ indice: CIUDADES.indexOf(ciudad) });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
