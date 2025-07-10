import { DOM } from "./dom.js";

const $alert = DOM.get("#alert").getEl();

export function showAlert(estado) {
  const $sign = DOM.get("#sign");
  $alert.classList.remove("hidden");

  $sign.rmStyle(["text-[#79b851]", "text-red-500"]);

  $sign
    .text(estado)
    .style([
      "font-bold",
      estado === "Ganaste" ? "text-[#79b851]" : "text-red-500",
      "text-3xl",
    ]);

  // Animación: de y=-50 y opacity=0 a y=0 y opacity=1
  gsap.fromTo(
    $alert,
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
  );
}

export function hiddenAlert() {
  gsap.to($alert, {
    y: -50,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => {
      $alert.classList.add("hidden");
      // Resetear posición para la próxima vez
      gsap.set($alert, { y: 0 });
    },
  });
}
