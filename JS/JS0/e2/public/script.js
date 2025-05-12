const $lista = document.getElementById("lista");

let data = null;

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/obtener", {
      method: "GET",
      headers: {
        "Contenty-type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
    });
    if (response.ok) {
      data = await response.json();
      console.log(data);

      // Limpiamos la tabla
      $lista.innerHTML = "";

      // Agregamos cada usuario como fila
      data.forEach((user) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td class="border border-violet-300 px-2 py-2 text-center">${user.jugador}</td>
          <td class="border border-violet-300 px-2 py-2 text-center">${user.nacionalidad}</td>
          <td class="border border-violet-300 px-2 py-2 text-center">${user.precio}</td>
          <td class="border border-violet-300 px-2 py-2 text-center">${user.posicion}</td>
        `;
        $lista.appendChild(fila);
      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

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
    console.log(err);
  }
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const $jugador = document.getElementById("jugador");
  const $nacionalidad = document.getElementById("nacionalidad");
  const $posicion = document.getElementById("posicion");
  const $precio = document.getElementById("precio");

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

  const data = {
    jugador: $jugador.value,
    nacionalidad: $nacionalidad.value,
    posicion: $posicion.value,
    precio: $precio.value,
  };

  sendData(data);

  showAlert("Registro almacenado con exito", "success");

  fetchData();

  $jugador.value = "";
  $nacionalidad.value = "";
  $posicion.value = "";
  $precio.value = "";
});

fetchData();

function showAlert(msg, type) {
  const $alerta = document.getElementById("alerta");
  const $mensaje = document.getElementById("mensaje");

  // Setea el mensaje
  $mensaje.textContent = msg;

  // Limpia clases anteriores (por si ya se mostró antes)
  $alerta.classList.remove("bg-red-200", "border-red-500");
  $mensaje.classList.remove("text-red-500");

  $alerta.classList.remove("bg-green-200", "border-green-500");
  $mensaje.classList.remove("text-green-500");

  if (type === "error") {
    $alerta.classList.add("bg-red-200", "border-red-500");
    $mensaje.classList.add("text-red-500");
  }

  if (type === "success") {
    $alerta.classList.add("bg-green-200", "border-green-500");
    $mensaje.classList.add("text-green-500");
  }

  // Muestra la alerta (bajándola a visible)
  $alerta.classList.remove("translate-y-[-50px]");
  $alerta.classList.add("translate-y-[10px]");

  // Oculta la alerta después de 3 segundos
  setTimeout(() => {
    $alerta.classList.remove("translate-y-[10px]");
    $alerta.classList.add("translate-y-[-50px]");
  }, 3000);
}

function invalidInput(input) {
  input.focus();
  input.classList.remove("bg-violet-200");
  input.classList.remove("border-violet-400");
  input.classList.remove("text-violet-500");
  input.classList.remove("focus:outline-violet-400");

  input.classList.add("bg-red-200");
  input.classList.add("border-red-400");
  input.classList.add("text-red-500");
  input.classList.add("focus:outline-red-400");

  showAlert("El nombre debe tener 4 caracteres", "error");
  return;
}
