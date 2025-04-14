//Imporatción de modulos
import URL from "node:url";
import { createServer } from "node:http";

const addres = "http://localhost:3000"; // <-- Definimos una URL
const data = URL.parse(addres); // <-- Obtenemos los datos con el metodo parse

//Creación de servidor
const server = createServer((req, res) => {
  res.writeHead(200, {"Content-type": "text/html"})
  res.write(`<h1>Hostname: ${data.hostname}</h1>`) // <-- Mostramos el hostname de la url 
  console.log(data);
  res.end()
})

//El servidor HTTP se aloja en el localhost en el puerto 3000
server.listen(3000, () => {
  console.log("http://localhost:3000")
})
