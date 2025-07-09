import { DOM } from "./dom.js";
export async function validate(palabra, intento) {
  try {
    const response = await fetch("http://192.168.1.37:3000/checkWord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ palabra, intento }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al hacer fetch: ${error}`);
  }
}

export function checkValue(item, el) {
  if (item.startsWith("1")) {
    el.text(item.slice(1)).style(["bg-green-600"]);
  } else if (item.startsWith("2")) {
    el.text(item.slice(1)).style(["bg-yellow-500"]);
  } else if (item.startsWith("3")) {
    el.text(item.slice(1)).style(["bg-gray-800"]);
  }
}

let intentos = 0;

export function checkWin(intento, palabra, display, input) {
  intentos++;
  const lose = intentos >= 6;
  const win = intento === palabra;
  DOM.create("p")
    .text(lose ? "Perdiste" : win ? "Ganaste" : "")
    .style([
      `${lose ? `text-red-500` : win ? "text-green-400" : "text-red-500"}`,
      "font-bold",
      "mt-2",
    ])
    .appendTo(display);

  input.setValue("");

  (win || lose) && input.disable();
}
