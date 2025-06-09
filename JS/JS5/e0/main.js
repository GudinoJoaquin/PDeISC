import express from "express";
import Estudiante from "./estudiante.js";

const app = express();
const PORT = 3000;

const felipe = new Estudiante("Felipe", "Coltrinari", 18);
felipe.saludar();

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
