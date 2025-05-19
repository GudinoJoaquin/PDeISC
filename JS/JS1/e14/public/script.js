// Datos para reverse
const letras = ["a", "b", "c", "d", "e"];
const numerosReverse = [10, 20, 30, 40, 50];
const texto = "Hola Mundo";

// Función para mostrar array en el contenedor, con mismo estilo que antes
function mostrarArraySimple(containerId, arr) {
  const cont = document.getElementById(containerId);
  cont.innerHTML = "";
  arr.forEach((el) => {
    const span = document.createElement("span");
    span.textContent = el;
    span.className = "bg-white rounded px-2 py-1 shadow-sm";
    cont.appendChild(span);
  });
}

// Función para mostrar string invertido (cada letra como span)
function mostrarStringInvertido(containerId, str) {
  const cont = document.getElementById(containerId);
  cont.innerHTML = "";
  [...str].forEach((ch) => {
    const span = document.createElement("span");
    span.textContent = ch;
    span.className = "bg-teal-100 border-2 border-teal-500 rounded-sm px-2 py-1 shadow-sm";
    cont.appendChild(span);
  });
}

// Mostrar inicialmente los datos originales
mostrarArraySimple("letras", letras);
mostrarArraySimple("numeros-reverse", numerosReverse);
mostrarStringInvertido("string-reverse", texto);

// Eventos botones para invertir
document.getElementById("btn-reverse-letras").addEventListener("click", () => {
  mostrarArraySimple("letras", [...letras].reverse());
});

document.getElementById("btn-reverse-numeros").addEventListener("click", () => {
  mostrarArraySimple("numeros-reverse", [...numerosReverse].reverse());
});

document.getElementById("btn-reverse-string").addEventListener("click", () => {
  mostrarStringInvertido("string-reverse", [...texto].reverse().join(""));
});
