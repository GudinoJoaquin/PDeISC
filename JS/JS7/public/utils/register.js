//Importar la clase DOM y la funcion para mostrar el juego
import { $ } from "./dom.js";

import { showGame } from "../script.js";

//Obtener el formulario y el input
const $userForm = $.get("#user-form");
const $playerName = $.get("#player-name");

//Al enviarse el formulario
$userForm.on("submit", (e) => {
  e.preventDefault();
  //Toma el nombre del jugador y lo guarda en localstorage, seguido muestra el juego
  const name = $playerName.getValue();

  localStorage.setItem("username", name);

  showGame();
});

export async function saveData(puntaje) {
  const username = localStorage.getItem("username");

  try {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, puntaje }),
    });

    const data = await res.json();

    return { status: res.status, data };
  } catch (err) {
    console.error("Error al guardar:", err);
    return { status: 500, data: { message: "Error de red" } };
  }
}
