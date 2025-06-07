const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

let USERS = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public"));
});

app.post("/signin", (req, res) => {
  const { nombre } = req.body;

  if (USERS.some((u) => u.nombre === nombre)) {
    return res.status(406).json({ msg: "Usuario existente" });
  }

  USERS.push({ nombre, racha: 0 });
  res.status(200).json({ msg: "Usuario agregado" });
});

app.post("/agregarNivel", (req, res) => {
  const { nombre, nivel } = req.body;
  if (!nombre || typeof nombre !== "string" || typeof nivel !== "number") {
    return res.status(400).json({ msg: "Datos inválidos" });
  }

  const nombreNormalized = nombre.trim().toLowerCase();

  const usuario = USERS.find(
    (u) => u.nombre.trim().toLowerCase() === nombreNormalized
  );

  if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

  usuario.racha = Math.max(usuario.racha, nivel); // reemplazar si el nuevo nivel es mayor
  console.log(`Racha actualizada: ${usuario.nombre} -> ${usuario.racha}`);

  res.status(200).json({
    msg: `Racha actualizada para ${usuario.nombre}`,
    racha: usuario.racha,
  });
});

app.get("/usuarios", (req, res) => {
  res.status(200).json(USERS.sort((a, b) => b.racha - a.racha));
});

app.listen(PORT, () => {
  console.log(`Servidor en: http://localhost:${PORT}`);
});
