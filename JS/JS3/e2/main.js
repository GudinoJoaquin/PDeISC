//Importacion de modulos
const express = require("express");
const path = require("path");
const fs = require("node:fs");

//Inicializar app de express y puerto
const app = express();
const PORT = 3000;
const NUMEROS_VALIDOS = [];
const NUMEROS_INVALIDOS = [];

//Middleware para servir archivos estaticos y manejar json
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Ruta raiz
app.get("/", (req, res) => {
  res.sendFile(path.join());
});

//Endpoint para guardar archivo
app.post("/sendFile", (req, res) => {
  const { file } = req.body;
  const array = file.split(" ");
  console.log(array);
  array.map((num) => {
    if (num[0] === num[num.length - 1]) {
      NUMEROS_VALIDOS.push(Number(num));
    } else {
      NUMEROS_INVALIDOS.push(Number(num));
    }
  });

  fs.writeFileSync(
    "numeros.txt",
    `Validos: ${JSON.stringify(NUMEROS_VALIDOS)} \nInivalidos: ${JSON.stringify(
      NUMEROS_INVALIDOS
    )}\nCantidad validos: ${NUMEROS_VALIDOS.length}\nCantidad invalidos: ${
      NUMEROS_INVALIDOS.length
    }`,
    (err) => console.log(err)
  );

  res.status(200).json({
    message: "Operacion finalizada",
    numValidos: NUMEROS_VALIDOS,
    numInvalidos: NUMEROS_INVALIDOS,
  });
});

//Inicializar servidor en el puerto indicado
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
