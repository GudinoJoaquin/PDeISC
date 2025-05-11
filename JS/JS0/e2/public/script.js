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
          <td class="border border-violet-300 px-4 py-2 text-center">${user.jugador}</td>
          <td class="border border-violet-300 px-4 py-2 text-center">${user.nacionalidad}</td>
          <td class="border border-violet-300 px-4 py-2 text-center">${user.precio}</td>
          <td class="border border-violet-300 px-4 py-2 text-center">${user.posicion}</td>
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

    if (response.ok) {
      mostrarAlerta("Datos enviados correctamente", "success");
    } else {
      mostrarAlerta("Error al enviar los datos", "error");
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const $jugador = document.getElementById("jugador").value;
  const $nacionalidad = document.getElementById("nacionalidad").value;
  const $posicion = document.getElementById("posicion").value;
  const $precio = document.getElementById("precio").value;

  if ($jugador.trim().length < 4) {
    alert("Debe tener al menos 4 caracteres");
    $jugador.focus();
    return;
  }

  if ($nacionalidad == "") {
    alert("La nacionalidad es obligatoria");
    $nacionalidad.focus();
    return;
  }

  if ($posicion == "") {
    alert("La posicion es obligatoria");
    $posicion.focus();
    return;
  }

  if ($precio === "" || isNaN($precio) || Number($precio) <= 0) {
    alert("El precio debe ser un número positivo.");
    $precio.focus();
    return;
  }

  const data = {
    jugador: $jugador,
    nacionalidad: $nacionalidad,
    posicion: $posicion,
    precio: $precio,
  };

  sendData(data);

  fetchData();

  $jugador = "";
  $nacionalidad = "";
  $posicion = "";
  $precio = "";
});

fetchData();

function mostrarAlerta(mensaje, tipo = "success") {
  const $alerta = document.getElementById("alerta");
  $alerta.textContent = mensaje;

  // Cambiar color según tipo
  if (tipo === "success") {
    $alerta.classList.remove("bg-red-500");
    $alerta.classList.add("bg-green-500");
  } else {
    $alerta.classList.remove("bg-green-500");
    $alerta.classList.add("bg-red-500");
  }

  // Mostrar alerta
  $alerta.classList.remove("-translate-y-full");
  $alerta.classList.add("translate-y-0");

  // Ocultar después de 3 segundos
  setTimeout(() => {
    $alerta.classList.remove("translate-y-0");
    $alerta.classList.add("-translate-y-full");
  }, 3000);
}
