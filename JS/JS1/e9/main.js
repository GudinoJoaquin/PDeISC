const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const NOMBRES = [
  "Lucas",
  "Valentina",
  "Mateo",
  "Sofía",
  "Benjamín",
  "Martina",
  "Thiago",
  "Isabella",
  "Joaquín",
  "Camila",
];

const NUMEROS = [
  47, 13, 88, 2, 59, 73, 21, 36, 94, 67, 8, 30, 99, 52, 11
];

const PERSONAS = [
  { nombre: "Lucía", edad: 25 },
  { nombre: "Mateo", edad: 30 },
  { nombre: "Sofía", edad: 22 },
  { nombre: "Tomás", edad: 28 },
  { nombre: "Valentina", edad: 35 },
  { nombre: "Julián", edad: 19 },
  { nombre: "Camila", edad: 27 },
  { nombre: "Lautaro", edad: 33 }
];


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

app.get("/getNombres", (req, res) => {
  res.send(NOMBRES);
});

app.get('/getPersonas', (req, res) => {
  res.send(PERSONAS)
})

app.get("/getNumeros", (req, res) => {
  res.send(NUMEROS);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
