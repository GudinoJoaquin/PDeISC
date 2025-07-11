//Importar la calse DOM
import { $ } from "./dom.js";

//Tomar la alerta del html
const $alert = $.get("#alert").getEl();

//Fujncion para mostrar la alerta`
export function showAlert(estado) {
  //Obtiene el texto que tiene que escribir
  const $sign = $.get("#sign");
  $alert.classList.remove("hidden"); //Le quita la className hidden a la alerta

  $sign.rmStyle(["text-[#79b851]", "text-red-500"]); //Le quita los colores al texto para reiniciarlos

  //Le escribe el resultado al texto (Ganaste o Perdiste) y aplica estilos, si ganaste verde, si perdiste rojo
  $sign
    .text(estado)
    .style([
      "font-bold",
      estado === "Ganaste" ? "text-[#79b851]" : "text-red-500",
      "text-3xl",
    ]);

  // Gsap para una pequeña animacion que hace bajar la alerta
  gsap.fromTo(
    $alert,
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
  );
}

//Funcion para ocultar la alerta
export function hiddenAlert() {
  //Hace subir la alerta
  gsap.to($alert, {
    y: -50, //Sube la alerta -50px
    opacity: 0, //Le asigna 0 de opacidad
    duration: 0.4, //Dura 0.4 segundos
    ease: "power2.in",
    onComplete: () => {
      //Al completarse le agrega la className hidden a la alerta y settea su posicion a 0
      $alert.classList.add("hidden");
      gsap.set($alert, { y: 0 });
    },
  });
}
