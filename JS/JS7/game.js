export function page(req, res) {
  res.sendFile("./public/index.html", { root: "." });
}

export function checkWord(req, res) {
  const { palabra, intento } = req.body;

  const resultado = [];
  const palabraArray = palabra.split("");
  const intentoArray = intento.split("");
  const letrasUsadas = [...palabraArray];

  for (let i = 0; i < intentoArray.length; i++) {
    if (intentoArray[i] === palabraArray[i]) {
      resultado[i] = `1${intentoArray[i]}`;
      letrasUsadas[i] = null;
    } else {
      resultado[i] = null;
    }
  }

  for (let i = 0; i < intentoArray.length; i++) {
    if (resultado[i]) continue;

    if (letrasUsadas.includes(intentoArray[i])) {
      resultado[i] = `2${intentoArray[i]}`;
      letrasUsadas[letrasUsadas.indexOf(intentoArray[i])] = null;
    } else {
      resultado[i] = `3${intentoArray[i]}`;
    }
  }

  res.send(resultado);
}
