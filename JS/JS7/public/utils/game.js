//Importar funciones para mostrar la alerta de victoria
import { hiddenAlert, showAlert } from "./winAlert.js";
import { $ } from "./dom.js"; //Importar la clase dom
import {
  checkValue,
  checkWin,
  getPalabraAleatoria,
  validate,
} from "./gameLogic.js"; //Importar la logica del juego
import { saveData } from "./register.js";

//Obtener elementos del dom con la clase DOM
const $filas = $.getAll(".row").getEl();
const $keys = $.getAll(".key").getEl();
const $restartBtn = $.getAll(".restartBtn").getEl();
const $saveBtn = $.get("#save");
const $game = $.get("#game").getEl();

let palabra = getPalabraAleatoria();

const regex = /^[a-zA-Z]$/; //Regex para validar que las entradas sean letras de a-z y mayusculas
let intento = ""; //Definir el intento que hace el jugador
let filaActual = 0; //Fila en la que se encuentra actualmente
let finished = false; //Si termino o no el juego
let puntaje = 6;

//Funcion para cambiar la fila actual hasta la 6ta fila
function updateRow(animateIndex = -1) {
  const fila = $filas[filaActual];
  const $celdas = fila.querySelectorAll(".cell");

  // Limpiar texto
  $celdas.forEach((celda) => $.wrap(celda).text(""));

  //Recorre todas las celdas de cada fila y escribe el intento del jugador en las celdas
  for (let i = 0; i < intento.length; i++) {
    const celda = $.wrap($celdas[i]);
    celda.text(intento[i].toUpperCase());

    if (i === animateIndex) {
      //Gsap para una pequeñá animacion cuando se ingresa una letra
      gsap.fromTo(
        celda.getEl(),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }
}

//Funcion para manejar el input del enter del jugador
async function handleEnter() {
  const fila = $filas[filaActual];
  const $celdas = fila.querySelectorAll(".cell");
  //Si no ingreso 5 letras
  if (intento.length !== 5) {
    gsap.fromTo(
      fila,
      { x: -10 },
      {
        x: 10,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        onStart: () => {
          document.removeEventListener("keydown", handleTry);
        },
        onComplete: () => {
          gsap.to(fila, { x: 0 }); // Asegurarse de que vuelva al centro
          document.addEventListener("keydown", handleTry);
        },
      }
    );
    return;
  }

  //Obtener la fila actual y las celdas que esten en esa fila

  const result = await validate(intento.toLowerCase(), palabra.toLowerCase()); //Esperar un resultado enviando el intento del jugador

  //Para cada posicion del resultado lo valida con la funcion checkValue
  result.forEach((res, i) => {
    checkValue(res, $.wrap($celdas[i]), i);
  });

  //Define si gano o perdio
  const estado = checkWin(
    intento.toLowerCase(),
    filaActual,
    palabra.toLowerCase()
  );

  //Si gano detiene el juego y muestra la alerta de victoria o derrota
  if (estado) {
    finished = true;
    const totalDelay = (5 * 0.2 + 0.5) * 1000;
    setTimeout(() => {
      showAlert(estado);
      $.get("#board").style(["opacity-25"]);
    }, totalDelay);
    if (estado === "Perdiste") puntaje = 0;
  } else {
    //Si no gano continua el juego, reincia el intento y aumenta la fila actual
    intento = "";
    filaActual++;
    puntaje--;
  }
}

//Funcion para obtener las letras que ingresa el jugador
function handleKey(letra) {
  if (intento.length < 5) {
    intento += letra;
    updateRow(intento.length - 1);
  }
}

//Funcion para borrar la ultima letra que ingreso el jugador
function handleDelete() {
  intento = intento.slice(0, -1);
  updateRow(intento.length - 1);
}

export async function handleTry(e) {
  if (finished) return; //Si el juego ya termino no hace nada
  if ($game.classList.contains("hidden")) return;

  const tecla = e.key; //Toma la tecla presionada

  //Si es el backspace borra, si es enter envia el intento y si es otra tecla la guarda en el intento
  if (tecla === "Backspace") {
    handleDelete();
  } else if (tecla === "Enter") {
    await handleEnter();
  } else if (regex.test(tecla)) {
    handleKey(tecla);
  }
}

//Funcion para limpiar el tablero si se desea volver a jugar
//Reinicia los estilos de las celdas y vuelve a aplicar los originales
function clearBoard() {
  $filas.forEach((fila) => {
    const $celdas = fila.querySelectorAll(".cell");
    $celdas.forEach((celda) => {
      celda.style.backgroundColor = "";
      celda.style.color = "";

      $.wrap(celda)
        .text("")
        .rmStyle([
          "bg-[#79b851]",
          "bg-[#f3c237]",
          "bg-[#a4aec4]",
          "text-black",
          "text-slate-200",
        ]);

      $.wrap(celda).style(["bg-slate-300", "text-slate-800"]);
    });
  });
}

//Escuchar si el jugador presiona una tecla estando en la pagina
document.addEventListener("keydown", handleTry);

//Logica del teclado tactil
//Para cada tecla:
$keys.forEach((k) => {
  //Convierte la tecla en una instancia de la clase DOM
  const key = $.wrap(k);

  //Escucha el evento de click y compara el boton que se presiono
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

$restartBtn.forEach((b) => {
  const btn = $.wrap(b);
  btn.on("click", () => {
    $.get("#board").rmStyle(["opacity-25"]);
    hiddenAlert();
    clearBoard();
    intento = "";
    palabra = getPalabraAleatoria();
    filaActual = 0;
    finished = false;
    puntaje = 6;
    $saveBtn.getEl().removeAttribute("disabled");
  });
});

$saveBtn.on("click", async () => {
  $saveBtn.text("Guardando..."); // Mostrar "Guardando..."
  const { status } = await saveData(puntaje);

  // Esperar 1.5 segundos, luego mostrar resultado
  setTimeout(() => {
    if (status === 200) {
      $saveBtn.text("✔ Guardado");
    } else if (status === 400) {
      $saveBtn.text("❌ Datos inválidos");
    } else {
      $saveBtn.text("❌ Error al guardar");
    }

    // Luego de mostrar el mensaje final, esperar otros 1.5s y cerrar
    setTimeout(() => {
      $saveBtn.text("Guardar");
      $saveBtn.setAttribute({ disabled: true });
      hiddenAlert();
      $.get("#board").rmStyle(["opacity-25"]);
    }, 1500); // Tiempo visible del mensaje final
  }, 1500); // Tiempo de espera de "Guardando..."
});
