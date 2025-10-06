import express from "express";
import cors from "cors";
import { conn } from "./conn.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/select/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(422).json({ error: "El nombre de usuario es requerido" });
  }
  if (!password) {
    return res.status(422).json({ error: "La contraseña es requerida" });
  }
  if (password.length < 8) {
    return res
      .status(411)
      .json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  try {
    const sql = "SELECT * FROM registro_usuarios WHERE username = ?;";
    conn.query(sql, [username], async (err, result) => {
      if (err) {
        return res.status(400).json({ error: "Error al ingresar en la db" });
      }
      if (!result) {
        return res.status(404).json({ error: "El usuario no existe" });
      }

      const checkPass = await bcrypt.compare(password, result[0].pass);
      if (!checkPass) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
      res.status(200).json({ ok: true, data: result[0] });
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/create/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(422).json({ error: "El nombre de usuario es requerido" });
  }
  if (!password) {
    return res.status(422).json({ error: "La contraseña es requerida" });
  }
  if (password.length < 8) {
    return res
      .status(411)
      .json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  const hashPass = await bcrypt.hash(password, 10);

  try {
    const sql = "INSERT INTO registro_usuarios(username, pass) VALUES (?, ?);";
    conn.query(sql, [username, hashPass], (err, result) => {
      if (err) {
        return res.status(400).json({ error: "Error al ingresar en la db" });
      }
      if (err?.errno === 1062) {
        return res.status(406).json({ error: "El usuario ya existe" });
      }
      res.status(201).json({ ok: true, data: result });
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`http://localhost:${PORT}`);
});
