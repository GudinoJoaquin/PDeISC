export const resolvente = (a, b, c) => {
  const raiz = Math.sqrt((b**b) - (4 * a * c)) // <-- Utiliza el metodo sqrt de la clase Math para hacer el calculo
  //Devuelve un objeto con dos propiedades, x1 y x2
  return {
    x1: (((-b) + raiz)/(2*a)),
    x2: (((-b) - raiz)/(2*a))
  }
}

export const tiempo = (d, v) => {
  return d / v // <-- Hace una division con los parametros recibidos
}

export const contar_vocales = (texto) => {
  let vocales = 0;
  for (let i = 0; i <= texto.length; i++) { // <-- Recorre el texto que ingreso como parametro de la función
    if (texto[i] == "a" || texto[i] == "e" || texto[i] == "i" || texto[i] == "o" || texto[i] == "u") {
      vocales++; // <-- Aumenta en 1 el contador de vocales si hay una vocal en las palabras
    }
  }
  return vocales; // <-- Devuelve la cantidad de vocales
};
