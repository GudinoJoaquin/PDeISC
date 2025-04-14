import express from "express" // <-- importación del modulo express para crear un servidor HTTP
const app = express() // <-- Creación del servidor HTTP con el metodo express()

//Definimos la ruta de tipo get / (raiz)
app.get("/", (req, res) => {
  //Enviamos un texto como pagina web
  res.send("Hola mundo desde nodejs con express")
})

//El servidor HTTP se aloja en el localhost en el puerto 3000
app.listen(3000, () => {
  console.log("http://localhost:3000")
})