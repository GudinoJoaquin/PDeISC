const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const NUMEROS = [1, 2, 3, 4, 5, 6, 7, 8];
const PELICULAS = [
  "Star wars",
  "El padrino",
  "ET",
  "Space Jam",
  "Iron Man",
  "Shrek",
  "Avatar",
];
const ELEMENTOS = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"];

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

app.post("/copiarNumeros", (req, res) => {
  const nuevosNumeros = NUMEROS.slice(0, 3);
  res.status(200).json({ nuevosNumeros: nuevosNumeros });
});

app.post("/copiarPeliculas", (req, res) => {
  const nuevasPeliculas = PELICULAS.slice(2, 5);
  res.status(200).json({ nuevasPeliculas: nuevasPeliculas });
});

app.post("/copiarElementos", (req, res) => {
  const nuevosElementos = ELEMENTOS.slice(
    ELEMENTOS.length - 3,
    ELEMENTOS.length
  );
  res.status(200).json({ nuevosElementos: nuevosElementos });
});

app.get("/getNumeros", (req, res) => {
  res.send(NUMEROS);
});

app.get("/getPeliculas", (req, res) => {
  res.send(PELICULAS);
});

app.get("/getElementos", (req, res) => {
  res.send(ELEMENTOS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
