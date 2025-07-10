const palabra = "perro";

export async function validate(intento) {
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

export function checkValue(item, el, i) {
  const element = el.getEl();
  const letra = item.slice(1).toUpperCase();
  let bgColor = "#a4aec4"; 

  if (item.startsWith("1")) bgColor = "#79b851"; 
  else if (item.startsWith("2")) bgColor = "#f3c237"; 
  el.text(letra).style(["text-black"]);

  gsap.to(element, {
    backgroundColor: bgColor,
    color: "#e2e8f0", // text-slate-200
    delay: i * 0.2,
    duration: 0.3,
    onStart: () => {
      el.text(letra);
    },
  });
}

export function checkWin(intento, filaActual) {
  if (intento === palabra) return "Ganaste";
  if (filaActual >= 5) return "Perdiste";
  return null;
}
