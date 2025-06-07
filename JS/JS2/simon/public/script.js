const $form = document.getElementById("form");
const $input = document.getElementById("name");
const $board = document.getElementById("board");
const $tablaContainer = document.getElementById("tablaPuntajes");

let secuence = [];
let playerSecuence = [];
let level = 1;
let isPlayingSequence = false;

const $middleBtn = document.getElementById("start");

function generateSecuence() {
  const color = Math.floor(Math.random() * 4);
  switch (color) {
    case 0:
      secuence.push("green");
      break;
    case 1:
      secuence.push("red");
      break;
    case 2:
      secuence.push("yellow");
      break;
    case 3:
      secuence.push("blue");
      break;
  }
}

function flash(btn) {
  const color = btn.getAttribute("color");
  let shadowColor;

  switch (color) {
    case "green":
      shadowColor = "#22c55e";
      break;
    case "red":
      shadowColor = "#ef4444";
      break;
    case "yellow":
      shadowColor = "#eab308";
      break;
    case "blue":
      shadowColor = "#0ea5e9";
      break;
  }

  btn.classList.add("scale-110");
  btn.style.boxShadow = `0 0 15px 5px ${shadowColor}`;

  setTimeout(() => {
    btn.classList.remove("scale-110");
    btn.style.boxShadow = "";
  }, 400);
}

function playSecuence() {
  let i = 0;
  isPlayingSequence = true;
  const interval = setInterval(() => {
    const color = secuence[i];
    const btn = document.getElementById(color);
    flash(btn);
    i++;
    if (i >= secuence.length) {
      clearInterval(interval);
      isPlayingSequence = false;
    }
  }, 800);
}

function handlePlayerInput(color) {
  const currentIndex = playerSecuence.length;
  playerSecuence.push(color);

  if (color !== secuence[currentIndex]) {
    $middleBtn.innerHTML = `Perdiste <br> Presiona para reiniciar`;

    const nombre = $input.value;
    const nivelAlcanzado = secuence.length;

    sendData(
      { nombre, nivel: nivelAlcanzado },
      "http://localhost:3000/agregarNivel"
    ).then(() => {
      mostrarTablaPuntajes();
    });

    $middleBtn.addEventListener(
      "click",
      () => {
        resetGame();
        generateSecuence();
        playSecuence();
      },
      { once: true }
    );
    return;
  }

  if (playerSecuence.length === secuence.length) {
    level++;
    $middleBtn.innerHTML = `Nivel <br> ${level}`;
    playerSecuence = [];
    generateSecuence();
    setTimeout(() => playSecuence(), 1000);
  }
}

function resetGame() {
  level = 1;
  secuence = [];
  playerSecuence = [];
  $middleBtn.innerHTML = `Nivel <br> ${level}`;
}

$middleBtn.addEventListener("click", () => {
  resetGame();
  generateSecuence();
  playSecuence();
});

const $colorsBtn = document.querySelectorAll(".colorBtn");
$colorsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (isPlayingSequence) return;
    const selectedColor = btn.getAttribute("color");
    btn.classList.add("scale-110");
    setTimeout(() => btn.classList.remove("scale-110"), 400);
    handlePlayerInput(selectedColor);
  });
});

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = $input.value;

  const response = await sendData(
    { nombre: nombre },
    "http://localhost:3000/signin"
  );

  if (response.ok) {
    $form.classList.remove("flex");
    $form.classList.add("hidden");
    $board.classList.remove("hidden");
    $board.classList.add("flex");
    mostrarTablaPuntajes();
  }
});

async function sendData(data, endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");
    const body =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    return {
      status: response.status,
      ok: response.ok,
      body: body,
    };
  } catch (err) {
    console.log(err);
  }
}

function mostrarTablaPuntajes() {
  fetch("http://localhost:3000/usuarios")
    .then((res) => res.json())
    .then((usuarios) => {
      let tabla = `
        <table class="mt-8 min-w-[320px] bg-slate-900 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-sky-500 text-sky-950 text-lg font-bold border-b-4 border-sky-400">Nombre</th>
              <th class="px-6 py-3 bg-sky-500 text-sky-950 text-lg font-bold border-b-4 border-sky-400">Racha</th>
            </tr>
          </thead>
          <tbody>
      `;
      usuarios.forEach((user, i) => {
        tabla += `
          <tr class="${i % 2 === 0 ? "bg-slate-800" : "bg-slate-700"} hover:bg-sky-700 transition">
            <td class="px-6 py-2 text-center font-semibold text-sky-200">${user.nombre}</td>
            <td class="px-6 py-2 text-center font-semibold text-sky-200">${user.racha}</td>
          </tr>
        `;
      });
      tabla += `
          </tbody>
        </table>
      `;
      $tablaContainer.innerHTML = tabla;
    });
}
