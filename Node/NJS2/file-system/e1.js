//Importar modulos File System y HTTP
import fs from "node:fs";
import { createServer } from "node:http";

//Creacion del servidor HTTP
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" }); // <-- Escribe la cabecera de la pagina. El codigo de respuesta (200: Ok)  el tipo de contenido
  fs.open("./file-system/file1.txt", "w", (err, file) => { // <-- Crea el archivo file1.txt en modo escritura
    //Si hay un error
    if (err) {
      console.log(err);
      return err;
    }
    res.write("Archivo guardado con exito!!"); // <-- Escribe un mensaje si no hay errores
  });
  res.end(); // <-- Finaliza la petición de la pagina
});


//El servidor HTTP se aloja en el localhost en el puerto 3000
server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
