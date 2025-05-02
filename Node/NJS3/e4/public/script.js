//Definir botones y links para poder cambiar
const $generateBtn = document.getElementById("generateBtn");
const $modifyBtn = document.getElementById("modifyBtn");
const $removeBtn = document.getElementById("removeBtn");
const $container = document.getElementById("container");
const $tableBody = document.getElementById("tableBody");
const $cambios = document.getElementById("cambios");
const LINKS = [
  "https://google.com",
  "https://youtube.com",
  "https://x.com",
  "https://github.com",
  "https://gmail.com",
];

//Inicializar contador de clicks
let click = 0;

//Escucha el evento de click en el boton para generar links
$generateBtn.addEventListener("click", () => {
  //Verifica si hay menos de 5 hijos en la tabla
  if ($tableBody.children.length < 5) {
    const $tr = document.createElement("tr"); // Crea una fila

    //Agrega columnas y les agrega contenido y clases para estilos
    const $tdName = document.createElement("td");
    $tdName.classList.add("px-4", "py-2");
    $tdName.textContent = "Facebook";  // Nombre inicial del link

    const $tdLink = document.createElement("td");
    $tdLink.classList.add("px-4", "py-2");
    const $a = document.createElement("a");
    $a.href = "https://facebook.com";  // Enlace inicial
    $a.textContent = $a.href;
    $tdLink.appendChild($a);

    $tr.appendChild($tdName);
    $tr.appendChild($tdLink);

    $tableBody.appendChild($tr);
  } else {
    console.log("No se puede agregar más enlaces.");
  }
});

$modifyBtn.addEventListener("click", () => {
  if (click < $tableBody.children.length) {
    const $row = $tableBody.children[click];
    const linkCell = $row.children[1]; // La celda con el enlace
    const nameCell = $row.children[0]; // La celda con el nombre
    const $a = linkCell.querySelector("a");

    // Actualizar el enlace y el nombre
    $a.href = LINKS[click];
    $a.textContent = LINKS[click];
    nameCell.textContent = LINKS[click].replace('https://', '').replace('.com', ''); // Extrae el nombre de la URL

    click++;
  }
});

$removeBtn.addEventListener("click", () => {
  if (click > 0) {
    click--;
    const $row = $tableBody.children[click];
    const linkCell = $row.children[1]; // La celda con el enlace
    const nameCell = $row.children[0]; // La celda con el nombre
    const $a = linkCell.querySelector("a");

    // Restaurar el enlace a "Facebook" y el nombre
    $a.href = "https://facebook.com";
    $a.textContent = "https://facebook.com";
    nameCell.textContent = "Facebook";
  }
});
