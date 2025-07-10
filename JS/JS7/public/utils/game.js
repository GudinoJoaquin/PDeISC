import { hiddenAlert, showAlert } from "./winAlert.js";
import { DOM } from "./dom.js";
import { checkValue, checkWin, validate } from "./gameLogic.js";

const $filas = DOM.getAll(".row").getEl();
const $keys = DOM.getAll(".key").getEl();
const $restartBtn = DOM.get("#restart");

const regex = /^[a-zA-Z]$/;
let intento = "";
let filaActual = 0;
let finished = false;

function updateRow(animateIndex = -1) {
  const fila = $filas[filaActual];
  const $celdas = fila.querySelectorAll(".cell");

  // Limpiar texto
  $celdas.forEach((celda) => DOM.wrap(celda).text(""));

  for (let i = 0; i < intento.length; i++) {
    const celda = DOM.wrap($celdas[i]);
    celda.text(intento[i].toUpperCase());

    if (i === animateIndex) {
      gsap.fromTo(
        celda.getEl(),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }
}

async function handleEnter() {
  if (intento.length !== 5) {
    alert(`La palabra debe tener 5 letras.`);
    return;
  }

  const fila = $filas[filaActual];
  const $celdas = fila.querySelectorAll(".cell");

  const result = await validate(intento.toLowerCase());

  result.forEach((res, i) => {
    checkValue(res, DOM.wrap($celdas[i]), i);
  });

  const estado = checkWin(intento.toLowerCase(), filaActual);

  if (estado) {
    finished = true;
    const totalDelay = (5 * 0.2 + 0.5) * 1000;
    setTimeout(() => {
      showAlert(estado);
      DOM.get("#board").style(["opacity-25"]);
    }, totalDelay);
  } else {
    intento = "";
    filaActual++;
  }
}

function handleKey(letra) {
  if (intento.length < 5) {
    intento += letra;
    updateRow(intento.length - 1);
  }
}

function handleDelete() {
  intento = intento.slice(0, -1);
  updateRow(intento.length - 1);
}

function clearBoard() {
  $filas.forEach((fila) => {
    const $celdas = fila.querySelectorAll(".cell");
    $celdas.forEach((celda) => {
      celda.style.backgroundColor = "";
      celda.style.color = "";

      DOM.wrap(celda)
        .text("")
        .rmStyle([
          "bg-[#79b851]",
          "bg-[#f3c237]",
          "bg-[#a4aec4]",
          "text-black",
          "text-slate-200",
        ]);

      DOM.wrap(celda).style(["bg-slate-300", "text-slate-800"]);
    });
  });
}

// Soporte teclado físico
document.addEventListener("keydown", async (e) => {
  if (finished) return;

  const tecla = e.key;

  if (tecla === "Backspace") {
    handleDelete();
  } else if (tecla === "Enter") {
    await handleEnter();
  } else if (regex.test(tecla)) {
    handleKey(tecla);
  }
});

// Soporte teclado táctil
$keys.forEach((k) => {
  const key = DOM.wrap(k);

  key.on("click", async () => {
    if (finished) return;

    const tecla = key.getText().trim();

    if (tecla === "Borrar") {
      handleDelete();
    } else if (tecla === "Enter") {
      await handleEnter();
    } else {
      handleKey(tecla);
    }
  });
});

$restartBtn.on("click", () => {
  DOM.get("#board").rmStyle(["opacity-25"]);
  hiddenAlert();
  clearBoard();
  intento = "";
  filaActual = 0;
  finished = false;
});
