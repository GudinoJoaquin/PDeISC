// Importación de modulos
import express from "express";

// Inicializar app de express y puerto
const app = express();
const PORT = 3000;
const USERS = [];

// Middlewares
app.use(express.json());
app.use(express.static("public"));

//Endpoints
//Ruta para fetch
app.get("/fetch", (req, res) => {
  res.sendFile("./public/fetch/index.html", { root: "." });
});

//Ruta para axios
app.get("/axios", (req, res) => {
  res.sendFile("./public/axios/index.html", { root: "." });
});

//Crear usuarios y guardarlos en USERS
app.post("/users", (req, res) => {
  try {
    const { name, email } = req.body;

    //Crear el usuario, date.now para el id
    const newUser = { id: Date.now(), name: name, email: email };

    USERS.push(newUser);

    res
      .status(201)
      .json({ message: "Saved succesfully", createdUser: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error saving user" });
  }
});

//Inicializar server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
