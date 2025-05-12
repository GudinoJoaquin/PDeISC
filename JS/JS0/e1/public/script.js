// Obtener referencia al elemento UL donde se mostrarán los usuarios
const $lista = document.getElementById("lista");

// Función para obtener los datos dinámicamente desde el backend
async function fetchData() {
  try {
    // Realiza una petición GET al endpoint /obtener con encabezados necesarios
    const response = await fetch("http://localhost:3000/obtener", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
    });

    // Si la respuesta es exitosa (status 200)
    if (response.ok) {
      const data = await response.json(); // Convierte la respuesta a JSON
      console.log(data); // Muestra los datos por consola

      // Crea y muestra la lista de usuarios en el DOM
      $lista.innerHTML = data
        .map(
          (user) =>
            `<li class="border-b-2 border-violet-300 px-6 py-2 text-center w-full">${user.name}, ${user.surname}</li>`
        )
        .join("");
    }

    console.log(response); // Muestra la respuesta completa
  } catch (err) {
    console.log(err); // Captura y muestra errores si ocurren
  }
}

// Función para enviar nuevos datos al backend
async function sendData(data) {
  try {
    const response = await fetch("/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
      }),
    });

    if (response.ok) {
      console.log(response); // Muestra la respuesta si se envió correctamente
    }
  } catch (err) {
    console.log(err); // Captura y muestra errores si ocurren
  }
}

// Evento al enviar el formulario
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto del formulario (recargar la página)

  const $name = document.getElementById("name");
  const $surname = document.getElementById("surname");

  // Validación básica: el nombre debe tener al menos 4 caracteres
  if ($name.value.trim().length < 4) {
    showAlert("Ingrese un nombre valido", "error");
    invalidInput($name);
    return;
  }

  // Validación básica: el apellido debe tener al menos 4 caracteres
  if ($surname.value.trim().length < 4) {
    showAlert("Ingrese un apellido valido", "error");
    return;
  }

  // Crea el objeto con los datos ingresados
  const data = { name: $name.value, surname: $surname.value };

  // Muestra mensaje de éxito
  showAlert("Datos ingresados con exito", "success");

  // Envía los datos al servidor
  sendData(data);

  // Vuelve a cargar la lista para ver el nuevo usuario
  fetchData();
});

// Llama a fetchData() una vez al cargar la página
fetchData();

// Función para marcar un campo de entrada como inválido (aplica estilos de error)
function invalidInput(input) {
  input.focus(); // Coloca el cursor en el campo
  input.classList.remove("bg-violet-200", "border-violet-400", "text-violet-500", "focus:outline-violet-400");
  input.classList.add("bg-red-200", "border-red-400", "text-red-500", "focus:outline-red-400");
  return;
}

// Función para mostrar alertas visuales (éxito o error)
function showAlert(msg, type) {
  const $alerta = document.getElementById("alerta");
  const $mensaje = document.getElementById("mensaje");

  // Asigna el texto del mensaje
  $mensaje.textContent = msg;

  // Quita clases de estilos anteriores
  $alerta.classList.remove("bg-red-200", "border-red-500", "bg-green-200", "border-green-500");
  $mensaje.classList.remove("text-red-500", "text-green-500");

  // Aplica estilos según el tipo de mensaje
  if (type === "error") {
    $alerta.classList.add("bg-red-200", "border-red-500");
    $mensaje.classList.add("text-red-500");
  }

  if (type === "success") {
    $alerta.classList.add("bg-green-200", "border-green-500");
    $mensaje.classList.add("text-green-500");
  }

  // Muestra la alerta (animación hacia abajo)
  $alerta.classList.remove("translate-y-[-50px]");
  $alerta.classList.add("translate-y-[10px]");

  // Oculta la alerta después de 3 segundos
  setTimeout(() => {
    $alerta.classList.remove("translate-y-[10px]");
    $alerta.classList.add("translate-y-[-50px]");
  }, 3000);
}
