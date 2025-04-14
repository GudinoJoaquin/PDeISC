//Imporación de modulos
import { createServer } from "node:http";
import { resolvente, tiempo, contar_vocales } from "./modulo.js";

//Creación de servidor
const server = createServer((req, res) => {
  const results = resolvente(1, 2, -3) // <-- Guarda el resultado de la función en una variable
  res.writeHead(200, { "Content-type": "text/html" });
  //Escribe un texto html con los resultados de los modulos
  res.write(`
    <h1>Modulos</h1>
    <p>Resolvente: x1: ${results.x1}, x2: ${results.x2}</p>
    <p>Ecuacion de tiempo: ${tiempo(50, 3)}</p>
    <p>Contador de vocales: Palabra: "Hola mundo" ${contar_vocales("Hola mundo")}</p>`);
  res.end();
});

//El servidor HTTP se aloja en el localhost en el puerto 3000
server.listen(3000, () => {
  console.log("http://localhost:3000")
})