import { createServer } from "node:http";
import { suma, resta, multiplicacion, division } from "./calculos.js";

const server = createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(`
    <table>
      <tr>
        <td>Suma</td>
        <td>Resta</td>
        <td>Multiplicacion</td>
        <td>Division</td>
      </tr>
      <tr>
        <td>${suma(3, 5)}</td>
        <td>${resta(8, 6)}</td>
        <td>${multiplicacion(3, 11)}</td>
        <td>${division(30, 5)}</td>
      </tr>
    </table>  
    
  `);
});

server.listen(3000, "127.0.0.1", () => {
  console.log(`Listening on http://localhost:3000`);
});
