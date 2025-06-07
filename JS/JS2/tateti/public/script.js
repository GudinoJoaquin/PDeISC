const $buttons = document.querySelectorAll(".board");
const $winnerDisplay = document.getElementById("winnerDisplay");
const $selectBoard = document.getElementById("select-board");
const $gameBoard = document.querySelector("section");
const $singleplayer = document.getElementById("singleplayer");
const $multiplayer = document.getElementById("multiplayer");
const $form = document.getElementById("form");
const $inputsContainer = document.getElementById("inputs-container");
const $tablaContainer = document.getElementById("tablaPuntajes");

let gameMode = ""; // "cpu" o "1v1"
let player1 = "";
let player2 = "";

const WINCOMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = "X";
let xPos = [];
let oPos = [];
let win = false;
let isCPU = false;

function showBoard() {
  $selectBoard.classList.add("hidden");
  $gameBoard.classList.remove("hidden");
  $gameBoard.classList.add("flex");
}

function showForm() {
  $selectBoard.classList.add("hidden");
  $form.classList.remove("hidden");
  $form.classList.add("flex");
  $inputsContainer.innerHTML = "";

  if (gameMode === "cpu") {
    $inputsContainer.innerHTML = `
      <input
        type="text"
        id="name"
        placeholder="Nombre"
        class="border-4 font-semibold border-sky-500 bg-sky-300 text-sky-950 rounded-md text-xl placeholder:italic pl-2 pr-8 py-1 focus:outline-none focus:shadow-lg shadow-sky-500"
      />
    `;
  } else {
    $inputsContainer.innerHTML = `
      <input
        type="text"
        id="name1"
        placeholder="Jugador 1 (X)"
        class="border-4 font-semibold border-sky-500 bg-sky-300 text-sky-950 rounded-md text-xl placeholder:italic pl-2 pr-8 py-1 focus:outline-none focus:shadow-lg shadow-sky-500"
      />
      <input
        type="text"
        id="name2"
        placeholder="Jugador 2 (O)"
        class="border-4 font-semibold border-sky-500 bg-sky-300 text-sky-950 rounded-md text-xl placeholder:italic pl-2 pr-8 py-1 focus:outline-none focus:shadow-lg shadow-sky-500"
      />
    `;
  }
}

function checkWin() {
  for (const [a, b, c] of WINCOMBO) {
    if (xPos.includes(a) && xPos.includes(b) && xPos.includes(c)) {
      setWin("¡Gana X!");
    }
    if (oPos.includes(a) && oPos.includes(b) && oPos.includes(c)) {
      setWin("¡Gana O!");
    }
  }

  if (xPos.length + oPos.length === 9 && !win) {
    setWin("¡Empate!");
  }
}

function resetGame() {
  $buttons.forEach((btn) => {
    btn.textContent = "";
    btn.disabled = false;
    btn.classList.remove(
      "from-red-500",
      "to-red-900",
      "from-sky-500",
      "to-sky-700"
    );
    btn.classList.add("from-violet-500", "to-violet-700");
  });
  win = false;
  turn = "X";
  xPos = [];
  oPos = [];
  $winnerDisplay.textContent = "";
}

function changeTurn() {
  turn = turn === "X" ? "O" : "X";
  return turn;
}

function setWin(ganador) {
  win = true;
  $winnerDisplay.textContent = ganador;
  $buttons.forEach((btn) => (btn.disabled = true));

  let ganadorNombre = "";

  if (ganador.includes("X")) {
    ganadorNombre = player1; // X siempre es el jugador humano
  } else if (ganador.includes("O") && gameMode === "1v1") {
    ganadorNombre = player2;
  }

  if (ganadorNombre) {
    sendData(
      { nombre: ganadorNombre },
      "http://localhost:3000/agregarVictoria"
    ).then((response) => {
      if (response) {
        actualizarRanking();
        console.log(response);
      }
    });
  } else {
    actualizarRanking(); // Empate o CPU gana, solo actualiza
  }
}

function cpuMove() {
  if (win) return;

  const emptyIndexes = [...$buttons]
    .map((b, i) => (b.textContent === "" ? i : -1))
    .filter((i) => i !== -1);

  for (const [a, b, c] of WINCOMBO) {
    const cpuMoves = [a, b, c].filter((p) => oPos.includes(p));
    const emptyMoves = [a, b, c].filter((p) => emptyIndexes.includes(p));
    if (cpuMoves.length === 2 && emptyMoves.length === 1) {
      placeMove(emptyMoves[0], "O");
      return;
    }
  }

  for (const [a, b, c] of WINCOMBO) {
    const playerMoves = [a, b, c].filter((p) => xPos.includes(p));
    const emptyMoves = [a, b, c].filter((p) => emptyIndexes.includes(p));
    if (playerMoves.length === 2 && emptyMoves.length === 1) {
      placeMove(emptyMoves[0], "O");
      return;
    }
  }

  if (emptyIndexes.includes(4)) {
    placeMove(4, "O");
    return;
  }

  const corners = [0, 2, 6, 8];
  const freeCorner = corners.find((c) => emptyIndexes.includes(c));
  if (freeCorner !== undefined) {
    placeMove(freeCorner, "O");
    return;
  }

  const random = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  if (random !== undefined) {
    placeMove(random, "O");
  }
}

function placeMove(index, symbol) {
  const btn = $buttons[index];
  btn.textContent = symbol;
  btn.disabled = true;
  btn.classList.remove("from-violet-500", "to-violet-700");

  if (symbol === "X") {
    xPos.push(index);
    btn.classList.add("from-sky-500", "to-sky-700");
  } else {
    oPos.push(index);
    btn.classList.add("from-red-500", "to-red-900");
  }

  checkWin();
  changeTurn();
}

$buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (win || btn.textContent !== "") return;

    btn.textContent = turn;
    btn.disabled = true;
    btn.classList.remove("from-violet-500", "to-violet-700");

    if (turn === "X") {
      xPos.push(i);
      btn.classList.add("from-sky-500", "to-sky-700");
    } else {
      oPos.push(i);
      btn.classList.add("from-red-500", "to-red-900");
    }

    checkWin();

    if (isCPU && !win && turn === "X") {
      changeTurn();
      setTimeout(cpuMove, 500);
    } else if (!isCPU) {
      changeTurn();
    }
  });
});

document.getElementById("reiniciar").addEventListener("click", resetGame);

$singleplayer.addEventListener("click", () => {
  gameMode = "cpu";
  isCPU = true;
  resetGame();
  showForm();
});

$multiplayer.addEventListener("click", () => {
  gameMode = "1v1";
  isCPU = false;
  resetGame();
  showForm();
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (gameMode === "cpu") {
    const name = document.getElementById("name").value.trim();
    if (name === "") return;
    player1 = name;
    sendData({ nombre: player1 }, "http://localhost:3000/signin");
  } else {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();
    if (name1 === "" || name2 === "") return;
    player1 = name1;
    player2 = name2;
    sendData({ nombre: player1 }, "http://localhost:3000/signin");
    sendData({ nombre: player2 }, "http://localhost:3000/signin");
  }

  actualizarRanking();
  $form.classList.add("hidden");
  showBoard();
});

async function sendData(data, endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
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

function actualizarRanking() {
  fetch("http://localhost:3000/ranking")
    .then((res) => res.json())
    .then((usuarios) => {
      if (!usuarios.length) {
        $tablaContainer.innerHTML = ""; // Oculta/limpia la tabla si no hay usuarios
        return;
      }

      let tabla = `
        <table class=" mt-8 min-w-[320px] bg-slate-900 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-sky-500 text-sky-950 text-lg font-bold border-b-4 border-sky-400">Nombre</th>
              <th class="px-6 py-3 bg-sky-500 text-sky-950 text-lg font-bold border-b-4 border-sky-400">Victorias</th>
            </tr>
          </thead>
          <tbody>
      `;

      usuarios.forEach((user, i) => {
        tabla += `
          <tr class="${i % 2 === 0 ? "bg-slate-800" : "bg-slate-700"} hover:bg-sky-700 transition">
            <td class="px-6 py-2 text-center font-semibold text-sky-200">${user.nombre}</td>
            <td class="px-6 py-2 text-center font-semibold text-sky-200">${user.victorias}</td>
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


actualizarRanking();
