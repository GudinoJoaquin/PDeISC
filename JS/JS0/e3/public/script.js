// Referencia al elemento UL donde se mostrarán los datos
const $lista = document.getElementById("lista");

let data = null;

// Función asincrónica para obtener datos del servidor
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/obtener", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1", // Clave API para autenticación
      },
    });

    // Si la respuesta es exitosa, procesar datos
    if (response.ok) {
      data = await response.json(); // Convertir respuesta a JSON
      console.log(data);

      // Renderizar datos como elementos <li> dentro de la lista
      $lista.innerHTML = data
        .map(
          (user) =>
            `<li class="border-b-2 border-violet-300 px-6 py-2 text-center w-full">${user.nombre}, ${user.apellido}</li>`
        )
        .join("");
    }

    console.log(response); // Mostrar objeto de respuesta en consola
  } catch (err) {
    console.log(err); // Mostrar errores de red o fetch
  }
}

// Función asincrónica para enviar datos al servidor
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
        nombre: data.nombre,
        apellido: data.apellido,
        edad: data.edad,
        nacimiento: data.nacimiento,
        sexo: data.sexo,
        estadoCivil: data.estadoCivil,
        documento: data.documento,
        nacionalidad: data.nacionalidad,
        telefono: data.telefono,
        email: data.email,
        hijos: data.hijos,
        cantidadHijos: data.cantidadHijos,
      }),
    });

    // Podrías manejar la respuesta aquí si fuera necesario
  } catch (err) {
    console.log(err); // Mostrar error si falla el envío
  }
}

// Evento al enviar el formulario
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir recarga de página

  // Obtener todos los campos del formulario
  const $nombre = document.getElementById("nombre");
  const $apellido = document.getElementById("apellido");
  const $edad = document.getElementById("edad");
  const $nacimiento = document.getElementById("nacimiento");
  const $sexoMasculino = document.getElementById("sexo-masculino");
  const $sexoFemenino = document.getElementById("sexo-femenino");
  const $estadoCivil = document.getElementById("estado-civil");
  const $documento = document.getElementById("documento");
  const $nacionalidad = document.getElementById("nacionalidad");
  const $telefono = document.getElementById("telefono");
  const $email = document.getElementById("email");
  const $hijos = document.getElementById("hijos");
  const $cantidadHijos = document.getElementById("cantidad-hijos");

  // Validaciones
  if ($nombre.value.trim().length < 4) {
    invalidInput($nombre);
    showAlert("Ingrese un nombre valido", "error");
    return;
  }

  if ($apellido.value.trim().length < 4) {
    invalidInput($apellido);
    showAlert("Ingrese un apellido valido", "error");
    return;
  }

  if ($edad.value === "" || isNaN($edad.value) || Number($edad.value) <= 0) {
    invalidInput($edad);
    showAlert("Ingrese una edad valida", "error");
    return;
  }

  if ($nacimiento.value === "") {
    invalidInput($nacimiento);
    showAlert("Ingrese una fecha de nacimiento valida", "error");
    return;
  }

  if (!$sexoMasculino.checked && !$sexoFemenino.checked) {
    invalidInput($sexoMasculino);
    invalidInput($sexoFemenino);
    showAlert("Ingrese una opcion valida", "error");
    return;
  }

  if ($documento.value.trim() === "") {
    invalidInput($documento);
    showAlert("Ingrese un documento valido", "error");
    return;
  }

  if ($nacionalidad.value.trim() === "") {
    invalidInput($nacionalidad);
    showAlert("Ingrese una nacionalidad valida", "error");
    return;
  }

  if ($telefono.value.trim() === "") {
    invalidInput($telefono);
    showAlert("Ingrese un telefono valido", "error");
    return;
  }

  if ($email.value.trim() === "") {
    invalidInput($email);
    showAlert("Ingrese un email valido", "error");
    return;
  }

  if ($hijos.checked && $cantidadHijos.value.length <= 0) {
    invalidInput($cantidadHijos);
    showAlert("Ingrese una cantidad de hijos valida", "error");
    return;
  }

  // Crear objeto con los datos del formulario
  const data = {
    nombre: $nombre.value,
    apellido: $apellido.value,
    edad: $edad.value,
    nacimiento: $nacimiento.value,
    sexo: $sexoMasculino.checked ? "masculino" : "femenino",
    estadoCivil: $estadoCivil.value,
    documento: $documento.value,
    nacionalidad: $nacionalidad.value,
    telefono: $telefono.value,
    email: $email.value,
    hijos: $hijos.checked,
    cantidadHijos: $hijos.checked ? $cantidadHijos.value : 0,
  };

  sendData(data); // Enviar los datos al backend

  showAlert("Datos ingresados con exito", "success"); // Mostrar alerta de éxito

  fetchData(); // Actualizar la lista con los nuevos datos

  // Limpiar campos del formulario
  $nombre.value = "";
  $apellido.value = "";
  $edad.value = "";
  $nacimiento.value = "";
  $sexoMasculino.checked = false;
  $sexoFemenino.checked = false;
  $estadoCivil.value = "soltero";
  $documento.value = "";
  $telefono.value = "";
  $email.value = "";
  $hijos.checked = false;
  $cantidadHijos.value = "";
});

// Llamar a la función para obtener datos al cargar la página
fetchData();

// Función para marcar inputs como inválidos visualmente
function invalidInput(input) {
  input.focus();
  input.classList.remove(
    "bg-violet-200",
    "border-violet-400",
    "text-violet-500",
    "focus:outline-violet-400"
  );
  input.classList.add(
    "bg-red-200",
    "border-red-400",
    "text-red-500",
    "focus:outline-red-400"
  );
  return;
}

// Mostrar alertas con distintos estilos dependiendo del tipo
function showAlert(msg, type) {
  const $alerta = document.getElementById("alerta");
  const $mensaje = document.getElementById("mensaje");

  $mensaje.textContent = msg;

  // Limpiar estilos anteriores
  $alerta.classList.remove(
    "bg-red-200",
    "border-red-500",
    "bg-green-200",
    "border-green-500"
  );
  $mensaje.classList.remove("text-red-500", "text-green-500");

  // Aplicar nuevos estilos según tipo
  if (type === "error") {
    $alerta.classList.add("bg-red-200", "border-red-500");
    $mensaje.classList.add("text-red-500");
  }

  if (type === "success") {
    $alerta.classList.add("bg-green-200", "border-green-500");
    $mensaje.classList.add("text-green-500");
  }

  // Mostrar la alerta
  $alerta.classList.remove("translate-y-[-50px]");
  $alerta.classList.add("translate-y-[10px]");

  // Ocultar después de 3 segundos
  setTimeout(() => {
    $alerta.classList.remove("translate-y-[10px]");
    $alerta.classList.add("translate-y-[-50px]");
  }, 3000);
}

// Habilitar o deshabilitar el campo cantidad de hijos según el checkbox
const checkbox = document.getElementById("hijos");
const cantidadInput = document.getElementById("cantidad-hijos");

checkbox.addEventListener("change", () => {
  cantidadInput.disabled = !checkbox.checked;
});
