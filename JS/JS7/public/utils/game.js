import { DOM } from "./dom.js";
import { checkValue, checkWin, validate } from "./gameLogic.js";

const $gameForm = DOM.get("#game-form");
const $input = DOM.get("#word");
const $palabra = DOM.get("#palabra");

const palabra = "perro";

$gameForm.on("submit", async (e) => {
  e.preventDefault();
  const intento = $input.getValue();
  if (intento.length !== palabra.length) {
    alert(`La palabra debe tener ${palabra.length} letras.`);
    return;
  }

  const resultado = await validate(palabra, intento);

  const p = DOM.create("p").style(["mb-2", "flex", "justify-center"]);

  resultado.forEach((item) => {
    const span = DOM.create("span")
      .style([
        "inline-block",
        "w-8",
        "h-8",
        "text-center",
        "font-bold",
        "uppercase",
        "rounded",
        "text-white",
        "mx-0.5",
        "select-none",
        "leading-8",
        "font-mono",
      ])
      .appendTo(p);

    checkValue(item, span);
  });

  p.appendTo($palabra);

  checkWin(intento, palabra, $palabra, $input);
});
