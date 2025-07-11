//Definir la palabra que se tiene que adivinar

//TODO: hacer que sea un array la palabra se genere aleatoriamente
const palabra = "perro";

//Funcion que envia el intento al servidor para obtener el resultado
export async function validate(intento) {
  try {
    const response = await fetch("http://192.168.1.37:3000/checkWord", {
      //Envia una peticion al endpoint /checkWord
      method: "POST", //Metodo POST para enviar datos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ palabra, intento }),
    });
    //Espera el resultado y lo devuelve
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al hacer fetch: ${error}`);
  }
}
export function checkValue(item, el, i) {
  const element = el.getEl();
  const letra = item.slice(1).toUpperCase();
  let bgColor = "#a4aec4";

  if (item.startsWith("1")) bgColor = "#79b851";
  else if (item.startsWith("2")) bgColor = "#f3c237";

  el.text(letra).style(["text-black"]);

  gsap.to(element, {
    backgroundColor: bgColor,
    color: "#e2e8f0",
    delay: i * 0.2,
    duration: 0.3,
    onStart: () => {
      el.text(letra);
    },
  });
}

//Detecta si gana o pierde el jugador
export function checkWin(intento, filaActual) {
  if (intento === palabra) return "Ganaste";
  if (filaActual >= 5) return "Perdiste";
  return null;
}
