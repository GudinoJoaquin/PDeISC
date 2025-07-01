//Importación de modulso
import express from "express";

//Inicializar app de express y puerto
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());
app.use(express.static("public"));

//Endpoints
app.get("/", (req, res) => {});

//Ruta para fetch
app.get("/fetch", (req, res) => {
  res.sendFile("./public/fetch/index.html", { root: "." });
});

//Ruta para post
app.get("/axios", (req, res) => {
  res.sendFile("./public/axios/index.html", { root: "." });
});


//Inicializar server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
