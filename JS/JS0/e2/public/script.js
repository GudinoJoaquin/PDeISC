// Selecciona el elemento con id "lista" (donde se mostrará la tabla de datos)
const $lista = document.getElementById("lista");

// Variable para guardar los datos obtenidos del servidor
let data = null;

// Función para obtener los datos desde el servidor
async function fetchData() {
  try {
    // Realiza una solicitud GET al endpoint /obtener
    const response = await fetch("http://localhost:3000/obtener", {
      method: "GET",
      headers: {
        "Contenty-Type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
    });

    // Si la respuesta fue exitosa
    if (response.ok) {
      data = await response.json(); // Guarda los datos como JSON
      console.log(data);

      // Limpia la tabla antes de volver a llenarla
      $lista.innerHTML = "";

      // Por cada usuario recibido, crea una fila de tabla
      data.forEach((user) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td class="border border-violet-300 px-2 py-2 text-center">${user.jugador}</td>
          <td class="border border-violet-300 px-2 py-2 text-center">${user.nacionalidad}</td>
          <td class="border border-violet-300 px-2 py-2 text-center">${user.precio}</td>
          <td class="border border-violet-300 px-2 py-2 text-center">${user.posicion}</td>
        `;
        $lista.appendChild(fila); // Agrega la fila a la tabla
      });
    }

    console.log(response); // Muestra la respuesta completa
  } catch (err) {
    console.log(err); // Muestra errores en consola si algo sale mal
  }
}

// Función para enviar datos al servidor (POST)
async function sendData(data) {
  try {
    const response = await fetch("/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
      body: JSON.stringify({
        jugador: data.jugador,
        nacionalidad: data.nacionalidad,
        posicion: data.posicion,
        precio: data.precio,
      }),
    });
  } catch (err) {
    console.log(err); // Muestra errores si la solicitud falla
  }
}

// Agrega evento al formulario cuando se envía
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Previene que se recargue la página

  // Toma los valores de los inputs
  const $jugador = document.getElementById("jugador");
  const $nacionalidad = document.getElementById("nacionalidad");
  const $posicion = document.getElementById("posicion");
  const $precio = document.getElementById("precio");

  // Validaciones básicas de cada campo
  if ($jugador.value.trim().length < 4) {
    invalidInput($jugador);
    return;
  }

  if ($nacionalidad.value == "") {
    invalidInput($nacionalidad);
    return;
  }

  if ($posicion.value == "") {
    invalidInput($posicion);
    return;
  }

  if (
    $precio.value === "" ||
    isNaN($precio.value) ||
    Number($precio.value) <= 0
  ) {
    invalidInput($precio);
    return;
  }

  // Crea objeto con los datos del formulario
  const data = {
    jugador: $jugador.value,
    nacionalidad: $nacionalidad.value,
    posicion: $posicion.value,
    precio: $precio.value,
  };

  // Envía los datos al servidor
  sendData(data);

  // Muestra una alerta de éxito
  showAlert("Registro almacenado con exito", "success");

  // Actualiza la tabla con los nuevos datos
  fetchData();

  // Limpia los campos del formulario
  $jugador.value = "";
  $nacionalidad.value = "";
  $posicion.value = "";
  $precio.value = "";
});

// Llama a fetchData al cargar la página
fetchData();

// Función para mostrar una alerta en pantalla
function showAlert(msg, type) {
  const $alerta = document.getElementById("alerta");
  const $mensaje = document.getElementById("mensaje");

  // Establece el mensaje
  $mensaje.textContent = msg;

  // Limpia estilos anteriores
  $alerta.classList.remove("bg-red-200", "border-red-500");
  $mensaje.classList.remove("text-red-500");
  $alerta.classList.remove("bg-green-200", "border-green-500");
  $mensaje.classList.remove("text-green-500");

  // Aplica estilos según tipo de mensaje
  if (type === "error") {
    $alerta.classList.add("bg-red-200", "border-red-500");
    $mensaje.classList.add("text-red-500");
  }

  if (type === "success") {
    $alerta.classList.add("bg-green-200", "border-green-500");
    $mensaje.classList.add("text-green-500");
  }

  // Muestra la alerta (transición hacia abajo)
  $alerta.classList.remove("translate-y-[-50px]");
  $alerta.classList.add("translate-y-[10px]");

  // La oculta luego de 3 segundos
  setTimeout(() => {
    $alerta.classList.remove("translate-y-[10px]");
    $alerta.classList.add("translate-y-[-50px]");
  }, 3000);
}

// Función para marcar un input como inválido
function invalidInput(input) {
  input.focus(); // Coloca el foco en el input

  // Elimina clases previas (por si ya tenía estilo válido)
  input.classList.remove(
    "bg-violet-200",
    "border-violet-400",
    "text-violet-500",
    "focus:outline-violet-400"
  );

  // Agrega clases de error
  input.classList.add(
    "bg-red-200",
    "border-red-400",
    "text-red-500",
    "focus:outline-red-400"
  );

  // Muestra mensaje de error
  showAlert("El nombre debe tener 4 caracteres", "error");
  return;
}
