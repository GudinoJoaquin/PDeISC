//Textos para mostrar los datos
const $textData = document.getElementById("textData");
const $selectData = document.getElementById("selectData");
const $radioData = document.getElementById("radioData");
const $checkboxData = document.getElementById("checkboxData");
const $numeroData = document.getElementById("numeroData");
const $emailData = document.getElementById("emailData");

//Evento caundo se envia el formulario
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault(); // <- Evita el comportamiento por defecto del formulario, el cual hace que se recargue la pagina

  //Obtiene todos los campos
  const $text = document.getElementById("text");
  const $select = document.getElementById("select");
  const $num = document.getElementById("num");
  const $email = document.getElementById("email");

  //Obtener todos los campos de radio y checkbox
  const $radio = document.querySelector('input[name="opcion"]:checked');
  const $checks = document.querySelectorAll('input[name="checkbox"]:checked');

  // Mostrar en el div los resultados
  $textData.textContent = `Texto: ${$text.value}`;
  $radioData.textContent = $radio
    ? `Radio seleccionado: ${$radio.value}`
    : "Radio seleccionado: Ninguno";

  $selectData.textContent = `Opción seleccionada: ${$select.value}`;

  //Muestra todos los valores de checkbox que se hayan clickeado
  if ($checks.length > 0) {
    const values = Array.from($checks).map((check) => check.value);
    $checkboxData.textContent = `Checkboxes marcados: ${values.join(", ")}`;
  } else {
    $checkboxData.textContent = "Checkboxes marcados: Ninguno";
  }
  $numeroData.textContent = `Número: ${$num.value}`;
  $emailData.textContent = `Email: ${$email.value}`;
});
