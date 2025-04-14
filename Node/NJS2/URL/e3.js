//Importación de modulos
import URL from "node:url";
import { createServer } from "node:http";

const addres = "http://localhost:3000"; // <-- Elegimos una URL
const data = URL.parse(addres); // <-- Obtenemos los datos de la URL

//Creación del servidor HTTP
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.write(`<h1>Port: ${data.port}</h1>`); // <-- Mostramos el puerto de la url que obtunimos de los datos
  console.log(data);
  res.end();
});

//El servidor HTTP se aloja en el localhost en el puerto 3000
server.listen(3000, () => {
  console.log("http://localhost:3000");
});
