// Variables y elementos
const $singleplayer = document.getElementById("singleplayer");
const $multiplayer = document.getElementById("multiplayer");
const $gameBoard = document.getElementById("game-board");
const $selectBoard = document.getElementById("select-board");
const $form = document.getElementById("form");
const $inputsContainer = document.getElementById("inputs-container");
const $rankingList = document.getElementById("ranking-list");
const $tablaContainer = document.getElementById("tablaPuntajes");

const buttons = document.querySelectorAll("button[data-choise]");
const playerChoiceText = document.getElementById("choice-player");
const cpuChoiceText = document.getElementById("choice-CPU");
const winnerText = document.getElementById("winner");

let currentTurn = 1;
let player1Choice = "";
let player2Choice = "";
let gameMode = "cpu";

let player1 = "";
let player2 = "";

const choices = ["piedra", "papel", "tijera"];

function getCPUChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(player, cpu) {
  if (player === cpu) return "¡Empate!";
  if (
    (player === "piedra" && cpu === "tijera") ||
    (player === "papel" && cpu === "piedra") ||
    (player === "tijera" && cpu === "papel")
  )
    return "¡Ganaste!";
  return "Perdiste...";
}

function formatChoice(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function resetStyles(...elements) {
  elements.forEach((el) => {
    el.classList.remove(
      "bg-green-500",
      "shadow-green-500",
      "border-green-500",
      "text-green-800",
      "bg-red-500",
      "shadow-red-500",
      "border-red-500",
      "bg-sky-500",
      "shadow-sky-500",
      "border-sky-500",
      "text-sky-800"
    );
  });
}

function applyStyles(el, color) {
  const classes = {
    green: [
      "bg-green-500",
      "shadow-green-500",
      "border-green-500",
      "text-green-800",
    ],
    red: ["bg-red-500", "shadow-red-500", "border-red-500"],
    sky: ["bg-sky-500", "shadow-sky-500", "border-sky-500", "text-sky-800"],
    yellow: ["text-yellow-500"],
  };
  el.classList.remove("shadow-white", "border-white");
  el.classList.add(...(classes[color] || []));
}

$singleplayer.addEventListener("click", () => {
  gameMode = "cpu";
  showForm();
  $selectBoard.classList.add("hidden");

  buttons.forEach((button) => {
    button.onclick = async () => {
      resetStyles(playerChoiceText, cpuChoiceText);

      const playerChoice = button.dataset.choise;
      const cpuChoice = getCPUChoice();
      const result = getWinner(playerChoice, cpuChoice);

      playerChoiceText.textContent = `Vos: ${formatChoice(playerChoice)}`;
      cpuChoiceText.textContent = `CPU: ${formatChoice(cpuChoice)}`;

      if (result === "¡Ganaste!") {
        winnerText.textContent = result;
        winnerText.className = "mt-4 text-xl font-bold text-green-500";
        applyStyles(playerChoiceText, "green");
        applyStyles(cpuChoiceText, "red");
        await sendData(
          { nombre: player1 },
          "http://localhost:3000/agregarVictoria"
        );
        await fetchAndDisplayRanking();
      } else if (result === "Perdiste...") {
        winnerText.textContent = result;
        winnerText.className = "mt-4 text-xl font-bold text-red-500";
        applyStyles(cpuChoiceText, "green");
        applyStyles(playerChoiceText, "red");
      } else {
        winnerText.textContent = result;
        winnerText.className = "mt-4 text-xl font-bold text-sky-500";
        applyStyles(cpuChoiceText, "sky");
        applyStyles(playerChoiceText, "sky");
      }
    };
  });
});

$multiplayer.addEventListener("click", () => {
  gameMode = "1v1";
  showForm();
  $selectBoard.classList.add("hidden");

  playerChoiceText.textContent = `${player1}: `;
  cpuChoiceText.textContent = "Jugador 2: ";
  winnerText.textContent = "";

  currentTurn = 1;
  player1Choice = "";
  player2Choice = "";

  resetStyles(playerChoiceText, cpuChoiceText);

  buttons.forEach((btn) => {
    btn.onclick = async () => {
      const choice = btn.dataset.choise;

      if (currentTurn === 1) {
        player1Choice = choice;
        playerChoiceText.textContent = "Jugador 1: ...";
        cpuChoiceText.textContent = "Jugador 2: ...";
        winnerText.textContent = "";
        resetStyles(playerChoiceText, cpuChoiceText);
        currentTurn = 2;
      } else if (currentTurn === 2) {
        player2Choice = choice;

        const result = getWinner(player1Choice, player2Choice);

        playerChoiceText.textContent = `Jugador 1: ${formatChoice(
          player1Choice
        )}`;
        cpuChoiceText.textContent = `Jugador 2: ${formatChoice(player2Choice)}`;

        resetStyles(playerChoiceText, cpuChoiceText);

        if (result === "¡Ganaste!") {
          winnerText.textContent = "Jugador 1 ganó!";
          winnerText.className = "mt-4 text-xl font-bold text-white";
          applyStyles(playerChoiceText, "green");
          applyStyles(cpuChoiceText, "red");
          await sendData(
            { nombre: player1 },
            "http://localhost:3000/agregarVictoria"
          );
        } else if (result === "Perdiste...") {
          winnerText.textContent = "Jugador 2 ganó!";
          winnerText.className = "mt-4 text-xl font-bold text-white";
          applyStyles(playerChoiceText, "red");
          applyStyles(cpuChoiceText, "green");
          await sendData(
            { nombre: player2 },
            "http://localhost:3000/agregarVictoria"
          );
        } else {
          winnerText.textContent = "¡Empate!";
          winnerText.className = "mt-4 text-xl font-bold text-yellow-500";
          applyStyles(playerChoiceText, "yellow");
          applyStyles(cpuChoiceText, "yellow");
        }

        await fetchAndDisplayRanking();

        currentTurn = 1;
        player1Choice = "";
        player2Choice = "";
      }
    };
  });
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
    return await response.json();
  } catch (err) {
    console.error("Error en sendData:", err);
  }
}

function fetchAndDisplayRanking() {
  fetch("http://localhost:3000/usuarios")
    .then((res) => res.json())
    .then((usuarios) => {
      let tabla = `
        <table class="mt-8 min-w-[320px] bg-slate-900 rounded-lg shadow-lg overflow-hidden">
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
          <tr class="${
            i % 2 === 0 ? "bg-slate-800" : "bg-slate-700"
          } hover:bg-sky-700 transition">
            <td class="px-6 py-2 text-center font-semibold text-sky-200">${
              user.nombre
            }</td>
            <td class="px-6 py-2 text-center font-semibold text-sky-200">${
              user.victorias
            }</td>
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

function showForm() {
  $selectBoard.classList.add("hidden");
  $form.classList.remove("hidden");
  $form.classList.add("flex");
  $inputsContainer.innerHTML = "";

  if (gameMode === "cpu") {
    $inputsContainer.innerHTML = `<input type="text" id="name" placeholder="Nombre" class="border-4 font-semibold border-sky-500 bg-sky-300 text-sky-950 rounded-md text-xl placeholder:italic pl-2 pr-8 py-1 focus:outline-none focus:shadow-lg shadow-sky-500" />`;
  } else {
    $inputsContainer.innerHTML = `
      <input type="text" id="name1" placeholder="Jugador 1" class="border-4 font-semibold border-sky-500 bg-sky-300 text-sky-950 rounded-md text-xl placeholder:italic pl-2 pr-8 py-1 focus:outline-none focus:shadow-lg shadow-sky-500" />
      <input type="text" id="name2" placeholder="Jugador 2" class="border-4 font-semibold border-sky-500 bg-sky-300 text-sky-950 rounded-md text-xl placeholder:italic pl-2 pr-8 py-1 focus:outline-none focus:shadow-lg shadow-sky-500" />
    `;
  }
}

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (gameMode === "cpu") {
    const name = document.getElementById("name").value.trim();
    if (!name) return;
    player1 = name;
    await sendData({ nombre: player1 }, "http://localhost:3000/signin");
    playerChoiceText.textContent = `${player1}: `;
  } else {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();
    if (!name1 || !name2) return;
    player1 = name1;
    player2 = name2;
    await sendData({ nombre: player1 }, "http://localhost:3000/signin");
    await sendData({ nombre: player2 }, "http://localhost:3000/signin");

    playerChoiceText.textContent = `${player1}: `;
    cpuChoiceText.textContent = `${player2}: `;
    winnerText.textContent = "";
  }

  $form.classList.add("hidden");
  showBoard();
  await fetchAndDisplayRanking();
});

function showBoard() {
  $gameBoard.classList.remove("hidden");
  $gameBoard.classList.add("flex");
}
