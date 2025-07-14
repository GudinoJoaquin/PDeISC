import fs from "node:fs";
import puppeteer from "puppeteer";

//Controlador para renderizar la pagina
export function page(req, res) {
  res.sendFile("./public/index.html", { root: "." });
}

//Controlador para verificar las palabras enviadas
export function checkWord(req, res) {
  const { palabra, intento } = req.body; //Obtiene la palabra y el intento por el cuerpo de la peticion

  const resultado = []; //Array vacio con el resultado del intento
  //Separar las letras de la palabra y el intento y convertirlo en un array
  const palabraArray = palabra.split("");
  const intentoArray = intento.split("");
  const letrasUsadas = [...palabraArray]; // Array para definir las letras usadas

  for (let i = 0; i < intentoArray.length; i++) {
    if (intentoArray[i] === palabraArray[i]) {
      //Si coinciden las letras de la palabra y del intento en la misma posicion se le agrega un 1 a la letra y se borra del array de letras usadas
      resultado[i] = `1${intentoArray[i]}`;
      letrasUsadas[i] = null;
    } else {
      resultado[i] = null;
    }
  }

  for (let i = 0; i < intentoArray.length; i++) {
    if (resultado[i]) continue; //Si el resultado no es nulo pasa a la siguiente iteración

    //Si el array de letras usadas incluye una letra del intento pero no concide su posicion
    if (letrasUsadas.includes(intentoArray[i])) {
      resultado[i] = `2${intentoArray[i]}`; //Le agrega un 2 a la letra y la borra del array de letras usadas
      letrasUsadas[letrasUsadas.indexOf(intentoArray[i])] = null;
    } else {
      //Sino le agrega un 3 y no hace nada
      resultado[i] = `3${intentoArray[i]}`;
    }
  }

  //Enviar el array resultado
  res.send(resultado); // <-- Por ejemplo
  //Intento = prroa, palabra = perro
  //Resultado -> ['1p', '2r', '2r', '2o', '3a']
}

// export async function download(req, res) {
//   const section = req.body; // HTML parcial (tabla)

//   const html = `
//     <!DOCTYPE html>
//     <html lang="es">
//     <head>
//       <meta charset="UTF-8" />
//       <title>PDF tabla</title>
//       <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">
//       <style>
//         /* Opcional: estilo para que no se imprima el botón si lo mandás en el HTML */
//         @media print {
//           #saveTable {
//             display: none;
//           }
//         }
//       </style>
//     </head>
//     <body>
//       ${section}
//     </body>
//     </html>
//   `;

//   try {
//     const browser = await puppeteer.launch({
//       args: ["--no-sandbox", "--disable-setuid-sandbox"], // recomendado para Vercel
//     });
//     const page = await browser.newPage();

//     await page.setContent(html, { waitUntil: "load" });

//     // Esperar un poco para asegurarse que CSS cargue bien
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//     });

//     await browser.close();

//     // Guardar PDF local (opcional, puede quitarse)
//     // fs.writeFileSync("tabla.pdf", pdfBuffer);

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=tabla.pdf");
//     res.send(pdfBuffer);
//   } catch (error) {
//     console.error("Error generando PDF:", error);
//     res.status(500).send("Error generando PDF");
//   }
// }
