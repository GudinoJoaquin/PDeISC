import { DOM } from "./utils/dom.js";

const $game = DOM.get("#game");
const $register = DOM.get("#register");

const username = localStorage.getItem("username");

export const showGame = () => {
  const board = $game.getEl();
  const reg = $register.getEl();
  reg.classList.add("hidden");
  board.classList.remove("hidden");
  board.classList.add("flex");
};

export const showRegister = () => {
  const board = $game.getEl();
  const reg = $register.getEl();
  reg.classList.remove("hidden");
  board.classList.add("hidden");
};

if (username) {
  showGame();
} else {
  showRegister();
}

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
