async function sendData(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
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

fetchData(
  "http://localhost:3000/getNumeros",
  document.getElementById("numeros")
);
fetchData(
  "http://localhost:3000/getPeliculas",
  document.getElementById("peliculas")
);
fetchData(
  "http://localhost:3000/getElementos",
  document.getElementById("elementos")
);

document
  .getElementById("copiarNumerosBtn")
  .addEventListener("click", async () => {
    const { body } = await sendData("http://localhost:3000/copiarNumeros");
    fetchData(
      "http://localhost:3000/getNumeros",
      document.getElementById("numeros")
    );
    document.getElementById("nuevosNumeros").innerHTML = body.nuevosNumeros.map(
      (numero) => `<p>${numero}</p>`
    );
  });

document
  .getElementById("copiarPeliculasBtn")
  .addEventListener("click", async () => {
    const { body } = await sendData("http://localhost:3000/copiarPeliculas");
    fetchData(
      "http://localhost:3000/getPeliculas",
      document.getElementById("peliculas")
    );
    document.getElementById("nuevasPeliculas").innerHTML =
      body.nuevasPeliculas.map((pelicula) => `<p>${pelicula}</p>`);
  });

document
  .getElementById("copiarElementosBtn")
  .addEventListener("click", async () => {
    const { body } = await sendData("http://localhost:3000/copiarElementos");
    fetchData(
      "http://localhost:3000/getElementos",
      document.getElementById("elementos")
    );
    document.getElementById("nuevasElementos").innerHTML =
      body.nuevosElementos.map((elemeto) => `<p>${elemeto}</p>`);
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
