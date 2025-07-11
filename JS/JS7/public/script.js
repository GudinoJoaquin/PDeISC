//IMportar la clase DOM
import { $ } from "./utils/dom.js";

//Tomar el tablero de juego y el de registro
const $game = $.get("#game");
const $register = $.get("#register");
const $keyboard = $.get("#keyboard");

//Obtener el usuario de localstorage
const username = localStorage.getItem("username");

//Funcion para mostrar el juego
export const showGame = () => {
  const board = $game.getEl();
  const reg = $register.getEl();
  const keyboard = $keyboard.getEl();
  //Oculta el formulario de registro y muestra el juego
  reg.classList.add("hidden");
  board.classList.remove("hidden");
  board.classList.add("flex");
  keyboard.classList.remove("hidden");
  keyboard.classList.add("grid");
};

//Funcion para mostrar el registro
export const showRegister = () => {
  const board = $game.getEl();
  const reg = $register.getEl();
  const keyboard = $keyboard.getEl();
  //Muestra el formulario de registro y oculta el juego
  reg.classList.remove("hidden");
  board.classList.add("hidden");
  keyboard.classList.add("hidden");
  keyboard.classList.remove("grid");
};

//Si existe un iteme con key "username" en localstorage muestra el juego y sino el registro
if (username) {
  showGame();
} else {
  showRegister();
}

//Evento para prevenir el menu contextual
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
