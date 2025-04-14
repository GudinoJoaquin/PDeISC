//Definición de modulos
import { upperCase } from "upper-case"; // <-- upper-case para usar el metodo upperCase
import express from "express"; // <-- Express para crear el servidor HTTP

//Creación del servidor HTTP
const app = express();

//Definición de la ruta / (raiz)
app.get("/", (req, res) => {
  //Enviando contenido con la función upperCase de upper-case
  res.send(upperCase("Hola mundo con upperCase"));
});

//Servidor HTTP alojandose en el localhost en el puerto 3000
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
