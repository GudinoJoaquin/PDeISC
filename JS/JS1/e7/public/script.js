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

const $animalInput = document.getElementById("animal");

$animalInput.addEventListener("input", async () => {
  const search = $animalInput.value.toLowerCase();

  const response = await sendData(
    { animal: search },
    "http://localhost:3000/buscarAnimal"
  );

  console.log(response); // acá ves el objeto { status, ok, body }

  if (response.ok) {
    const { animal, indice } = response.body;

    const animalesHTML = animal
      .map((nombre, i) => {
        return `
        <div class="bg-teal-200 flex-wrap text-teal-900 px-3 py-1 rounded-md border border-teal-600 shadow-sm">
          <span class="font-semibold">#${indice[i]}:</span> ${nombre}
        </div>`;
      })
      .join("");

    document.getElementById("animales").innerHTML = animalesHTML;
  } else {
    document.getElementById("animales").innerHTML = `
      <p class="text-red-500">No se encontraron coincidencias</p>
    `;
  }
});

document
  .getElementById("enviarNumeroBtn")
  .addEventListener("click", async () => {
    const $numeroInput = document.getElementById("numero");

    if (isNaN(Number($numeroInput.value))) {
      showAlert("Ingrese un numero valido", "error");
      return;
    }

    const serverResponse = await sendData(
      { numero: Number($numeroInput.value) },
      "http://localhost:3000/buscarNumero"
    );

    if (serverResponse.ok) {
      const { numero, indice } = serverResponse.body;

      document.getElementById("numeros").innerHTML = `
          <span class="font-semibold">#${indice}:</span> ${numero}
        `;
    } else {
      document.getElementById("numeros").innerHTML = `
          <span class="font-semibold">No se encontro el numero</span>
        `;
    }
  });

document
  .getElementById("buscarCiudadBtn")
  .addEventListener("click", async () => {
    const serverResponse = await sendData(
      { ciudad: "madrid" },
      "http://localhost:3000/buscarCiudad"
    );
    console.log(serverResponse);

    if (serverResponse.status === 200) {
      const { indice } = serverResponse.body;

      document.getElementById("ciudades").innerHTML = `
         Madrid esta en el indice <span class="font-semibold">#${indice}:</span>
        `;
    } else {
      document.getElementById("ciudades").innerHTML = `
          <span class="font-semibold">No se encontro Nadrud</span>
        `;
    }
  });

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
