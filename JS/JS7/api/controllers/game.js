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
