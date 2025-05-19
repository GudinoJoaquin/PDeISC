async function sendData(data, endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");
    const body =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    return {
      status: response.status,
      ok: response.ok,
      body: body,
    };
  } catch (err) {
    console.log(err);
  }
}

async function fetchData(endpoint, HTMLDisplay) {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      const data = await response.json();
      HTMLDisplay.innerHTML = data.map((prop) => `<p>${prop}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

const $palabraInput = document.getElementById("palabra");

$palabraInput.addEventListener("input", async () => {
  const search = $palabraInput.value.toLowerCase();

  const response = await sendData(
    { palabra: search },
    "http://localhost:3000/buscarPalabra"
  );

  console.log(response); // acá ves el objeto { status, ok, body }

  if (response.ok) {
    const { palabra, indice } = response.body;

    const palabrasHTML = palabra
      .map((palabra, i) => {
        return `
        <div class="bg-teal-200 flex-wrap text-teal-900 px-3 py-1 rounded-md border border-teal-600 shadow-sm">
          <span class="font-semibold">#${indice[i]}:</span> ${palabra}
        </div>`;
      })
      .join("");

    document.getElementById("palabras").innerHTML = palabrasHTML;
  } else {
    document.getElementById("palabras").innerHTML = `
      <p class="text-red-500">No se encontraron coincidencias</p>
    `;
  }
});

const $colorInput = document.getElementById("color");

$colorInput.addEventListener("input", async () => {
  const search = $colorInput.value.toLowerCase();

  const response = await sendData(
    { color: search },
    "http://localhost:3000/buscarColor"
  );

  console.log(response); // acá ves el objeto { status, ok, body }

  if (response.ok) {
    const { color, indice } = response.body;

    const coloresHTML = color
      .map((color, i) => {
        return `
        <div class="bg-teal-200 flex-wrap text-teal-900 px-3 py-1 rounded-md border border-teal-600 shadow-sm">
          <span class="font-semibold">#${indice[i]}:</span> ${color}
        </div>`;
      })
      .join("");

    document.getElementById("colores").innerHTML = coloresHTML;
  } else {
    document.getElementById("colores").innerHTML = `
      <p class="text-red-500">No se encontraron coincidencias</p>
    `;
  }
});

document
  .getElementById("agregarNumerosBtn")
  .addEventListener("click", async () => {
    const $numeroInput = document.getElementById("numero");

    if ($numeroInput.value == "") {
      showAlert("No", "error");
      return;
    }

    const serverResponse = await sendData(
      { numero: Number($numeroInput.value) },
      "http://localhost:3000/agregarNumero"
    );
    console.log(serverResponse);
    showAlert(
      serverResponse.body.message,
      serverResponse.status === 200 ? "success" : "warning"
    );

    fetchData(
      "http://localhost:3000/obtenerNumeros",
      document.getElementById("numeros")
    );
  });

fetchData(
  "http://localhost:3000/obtenerNumeros",
  document.getElementById("numeros")
);

function showAlert(msg, type) {
  const $alerta = document.getElementById("alerta");
  const $mensaje = document.getElementById("mensaje");

  $mensaje.textContent = msg;

  // Limpiar estilos anteriores
  $alerta.classList.remove(
    "bg-red-200",
    "border-red-500",
    "bg-green-200",
    "border-green-500",
    "bg-yellow-200",
    "border-yellow-500"
  );
  $mensaje.classList.remove(
    "text-red-500",
    "text-green-500",
    "text-yellow-500"
  );

  // Aplicar nuevos estilos según tipo
  if (type === "error") {
    $alerta.classList.add("bg-red-200", "border-red-500");
    $mensaje.classList.add("text-red-500");
  }

  if (type === "success") {
    $alerta.classList.add("bg-green-200", "border-green-500");
    $mensaje.classList.add("text-green-500");
  }

  if (type === "warning") {
    $alerta.classList.add("bg-yellow-100", "border-yellow-500");
    $mensaje.classList.add("text-yellow-500");
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
