import { DOM } from "./dom.js";

import { showGame } from "../script.js";

const $userForm = DOM.get("#user-form");
const $playerName = DOM.get("#player-name");

$userForm.on("submit", (e) => {
  e.preventDefault();
  const name = $playerName.getValue();;

  localStorage.setItem("username", name);

  showGame();
});
