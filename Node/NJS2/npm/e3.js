//Importación de modulos
import express from "express"; // <-- Express para crear el servidor
import validator from "validator"; // <-- Validator para metodos de validación

//Creación del servidor HTTP
const app = express();

//Definición de la ruta / (raiz)
app.get("/", (req, res) => {
  //Definimos emails de prueba
  const email = "algouno@gmail.com";
  const email2 = "adfadf.com";
  //Enviamos el contenido y usamos el metodo isEmail de validator para verificar si son emails
  res.send(`
    <p>algouno@gmail.com: isEmail? ${validator.isEmail(email)}</p>
    <p>adfadf.com: isEmail? ${validator.isEmail(email2)}</p>
    `);
});

//Servidor HTTP alojandose en el localhost en el puerto 3000
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
