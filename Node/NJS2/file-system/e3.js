//Importación de modulos de node
import fs from "node:fs";
import { createServer } from "node:http";

//Creación del servidor HTTP
const server = createServer((req, res) => {
  //Escribe en el archivo file3.txt el texto "Texto agregado desde node"
  fs.writeFile(
    "./file-system/file3.txt",
    "Texto agregado desde node",
    (err, data) => {
      //Recupera el error en caso de existir
      if (err) {
        res.writeHead(500, { "Content-type": "text/plain" });
        res.write("Error escribiendo el archivo");
        console.log(err.message);
        return res.end();
      }
      //Envia un mensaje de que todo salio bien
      res.writeHead(200, { "Content-type": "text/plain" });
      res.write("Archivo escrito correctamente");
    }
  );
});

//El servidor se aloja en el localhost en el puerto 3000
server.listen(3000, () => {
  console.log("http://localhost:3000");
});
