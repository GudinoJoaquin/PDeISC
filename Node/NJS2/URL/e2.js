//Importación de modulos
import URL from "node:url";
import { createServer } from "node:http";

const addres = "http://localhost:3000"; // <-- Se define una URL
const data = URL.parse(addres); // <-- Obtenemos los datos de la URL

//Creación del servidor HTTP
const server = createServer((req, res) => {
  res.writeHead(200, {"Content-type": "text/html"})
  res.write(`<h1>Pathname: ${data.pathname}</h1>`) // <-- Muestra el pathname de la url
  console.log(data);
  res.end()
})

//El servidor HTTP se aloja en el localhost en el puerto 3000
server.listen(3000, () => {
  console.log("http://localhost:3000")
})
