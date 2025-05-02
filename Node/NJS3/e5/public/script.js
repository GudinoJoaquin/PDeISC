// Referencias a los botones del DOM
const $addTittleBtn = document.getElementById("addTittleBtn");
const $addTextBtn = document.getElementById("addTextBtn");
const $addImageBtn = document.getElementById("addImageBtn");
const $addButtonBtn = document.getElementById("addButtonBtn");
const $addInputBtn = document.getElementById("addInputBtn");

// Contenedor donde se agregarán o eliminarán los elementos dinámicos
const $container = document.getElementById("container");

// Evento para agregar/eliminar un título (h1)
$addTittleBtn.addEventListener("click", () => {
  const existing = $container.querySelector(".dynamic-title"); // Busca si ya hay un título
  if (existing) {
    existing.remove(); // Si existe, lo elimina
    $addTittleBtn.textContent = "Agregar título"; // Cambia el texto del botón
  } else {
    const h1 = document.createElement("h1"); // Crea un nuevo h1
    h1.textContent = "Título agregado"; // Asigna texto
    h1.className = "dynamic-title text-2xl font-bold"; // Asigna clase para estilo y referencia
    $container.appendChild(h1); // Lo agrega al contenedor
    $addTittleBtn.textContent = "Eliminar título"; // Cambia el texto del botón
  }
});

// Evento para agregar/eliminar un párrafo (texto)
$addTextBtn.addEventListener("click", () => {
  const existing = $container.querySelector(".dynamic-text");
  if (existing) {
    existing.remove();
    $addTextBtn.textContent = "Agregar texto";
  } else {
    const p = document.createElement("p");
    p.textContent = "Texto agregado";
    p.className = "dynamic-text text-gray-700";
    $container.appendChild(p);
    $addTextBtn.textContent = "Eliminar texto";
  }
});

// Evento para agregar/eliminar una imagen
$addImageBtn.addEventListener("click", () => {
  const existing = $container.querySelector(".dynamic-image");
  if (existing) {
    existing.remove();
    $addImageBtn.textContent = "Agregar imagen";
  } else {
    const img = document.createElement("img");
    img.src = "https://placehold.co/600x400"; // Imagen placeholder
    img.className = "dynamic-image w-full max-w-md"; // Estilos de Tailwind
    $container.appendChild(img);
    $addImageBtn.textContent = "Eliminar imagen";
  }
});

// Evento para agregar/eliminar un botón
$addButtonBtn.addEventListener("click", () => {
  const existing = $container.querySelector(".dynamic-button");
  if (existing) {
    existing.remove();
    $addButtonBtn.textContent = "Agregar botón";
  } else {
    const btn = document.createElement("button");
    btn.textContent = "Botón agregado";
    btn.className = "dynamic-button bg-blue-500 text-white px-4 py-2 rounded mt-2";
    $container.appendChild(btn);
    $addButtonBtn.textContent = "Eliminar botón";
  }
});

// Evento para agregar/eliminar un input de texto
$addInputBtn.addEventListener("click", () => {
  const existing = $container.querySelector(".dynamic-input");
  if (existing) {
    existing.remove();
    $addInputBtn.textContent = "Agregar input";
  } else {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Input agregado";
    input.className = "dynamic-input border border-gray-600 p-2 rounded w-full max-w-sm";
    $container.appendChild(input);
    $addInputBtn.textContent = "Eliminar input";
  }
});
