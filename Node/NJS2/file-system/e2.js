//Importación de modulos
import fs from "node:fs";
import { createServer } from "node:http";

//Creación de servidor
const server = createServer((req, res) => {
  fs.readFile("./file-system/file2.txt", (err, data) => { // <-- Lee el archivo file2.txt y recupera el error y la data
    //Si hay un error muestra el mensaje de error y un codigo 500 (Error del servidor)
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.write(err.message);
      return res.end();
    }

    //Envie la data. En este caso el texto que está dentro del txt
    res.writeHead(200, { "Content-type": "text/plain" });
    res.write(data)
    return res.end();
  });
});

//El servidor se aloja en el localhost en puerto 3000
server.listen(3000, () => {
  console.log("http://localhost:3000");
});
