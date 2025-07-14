//Controlador para renderizar la pagina
export function page(req, res) {
  res.sendFile("./public/index.html", { root: "." });
}

//Controlador para verificar las palabras enviadas
export function checkWord(req, res) {
  const { palabra, intento } = req.body;
  const resultado = Array(intento.length).fill(null);
  const letrasUsadas = palabra.split("");
  const intentoArray = intento.split("");

  // Primero marcamos las letras en la posición correcta (1)
  intentoArray.forEach((letra, i) => {
    if (letra === letrasUsadas[i]) {
      resultado[i] = `1${letra}`;
      letrasUsadas[i] = null;
    }
  });

  // Luego marcamos letras correctas en posición incorrecta (2) y letras incorrectas (3)
  intentoArray.forEach((letra, i) => {
    if (resultado[i]) return;

    const index = letrasUsadas.indexOf(letra);
    if (index !== -1) {
      resultado[i] = `2${letra}`;
      letrasUsadas[index] = null;
    } else {
      resultado[i] = `3${letra}`;
    }
  });

  res.send(resultado);
}
