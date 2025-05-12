const $lista = document.getElementById("lista");

let data = null;

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/obtener");
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
  const $alert = document.getElementById("alerta");
  const $text = document.getElementById("texto");

  // Limpiamos clases previas
  $alert.className = "";
  $text.className = "";

  // Clases base + animación de entrada
  $alert.classList.add(
    "px-24",
    "py-2",
    "fixed-bottom",
    "rounded-sm",
    "opacity-0",
    "translate-y-4",
    "transition-all",
    "duration-500"
  );

  // Forzamos reflow para que se aplique la animación
  void $alert.offsetWidth;

  $alert.classList.remove("opacity-0", "translate-y-4");
  $alert.classList.add("opacity-100", "translate-y-0");

  // Tipo de alerta
  if (type === "error") {
    $alert.classList.add("bg-red-500/40", "border-2", "border-red-500");
    $text.classList.add("text-red-500", "font-semibold");
  } else if (type === "success") {
    $alert.classList.add("bg-green-500/40", "border-2", "border-green-500");
    $text.classList.add("text-green-500", "font-semibold");
  }

  $text.textContent = msg;

  // Ocultar después de 3 segundos con animación de salida
  setTimeout(() => {
    $alert.classList.remove("opacity-100", "translate-y-0");
    $alert.classList.add("opacity-0", "translate-y-4");

    setTimeout(() => {
      $alert.classList.add("hidden");
    }, 500); // espera a que termine la animación
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
