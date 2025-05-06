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

app.post("/enviar", (req, res) => {
  const { user, password } = req.body;
  const persona = { user, password };
  personas.push(persona);
  res.send(`
    <h1>Agregado correctamente</h1>
    <a href="/">Volver al formulario</a>  
    <a href="/ver">Ver personas</a>  
  `);
});

app.get("/ver", (req, res) => {
  res.send(`
    <ul>
      ${personas.map((p) => `<li>${p.user}, ${p.password}</li>`)}
    </ul>
    <a href="/">Volver al formulario</a>
  `);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
