const express = require("express");
const path = require("path");
const app = express();
const personas = [];
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join());
});

app.post("/sendData", (req, res) => {
  const { name, surname } = req.body;
  console.log(`Name: ${name}, Surname: ${surname}`);
  console.log(req.body.name);
  const persona = { name, surname };
  personas.push(persona);
  res.send(`
    <h1>Agregado correctamente</h1>
    <a href="/">Volver al formulario</a>  
    <a href="/obtener">Ver personas</a>  
  `);
});

app.get("/obtener", (req, res) => {
  res.send(personas);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
