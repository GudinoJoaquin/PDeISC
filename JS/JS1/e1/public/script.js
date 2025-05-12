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

    if (response.ok) {
      console.log(response);
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchFrutas() {
  try {
    const response = await fetch("http://localhost:3000/getFrutas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const $frutas = document.getElementById("frutas");

      $frutas.innerHTML = data.map((fruta) => `<p>${fruta.fruta}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

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
    "focus:outline-red-400",
    "placeholder:text-red-500"
  );
  return;
}

document.getElementById("form-frutas").addEventListener("submit", (e) => {
  e.preventDefault();

  const $fruta = document.getElementById("fruta");

  if ($fruta.value.trim() === "") {
    showAlert("Ingrese una fruta valida", "error");
    invalidInput($fruta);
    return;
  }

  sendData({ fruta: $fruta.value }, "http://localhost:3000/sendFruta");
  showAlert("Fruta agregada con exito", "success");
  fetchFrutas();

  $fruta.value = "";
});
fetchFrutas();

async function fetchAmigos() {
  try {
    const response = await fetch("http://localhost:3000/getAmigos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const $amigos = document.getElementById("amigos");
      $amigos.innerHTML = data.map((amigo) => `<p>${amigo.amigo}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("form-amigos").addEventListener("submit", (e) => {
  e.preventDefault();
  const $amigo = document.getElementById("amigo");

  if ($amigo.value.trim() === "" || $amigo.value.trim() < 4) {
    showAlert("Ingrese un nombre de amigo valido", "error");
    invalidInput($amigo);
    return;
  }
  sendData({ amigo: $amigo.value }, "http://localhost:3000/sendAmigo");
  showAlert("Amigo ingresado con exito", "success");
  fetchAmigos();

  $amigo.value = "";
});
fetchAmigos();

async function fetchNumeros() {
  try {
    const response = await fetch("http://localhost:3000/getNumeros", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      console.log(response);
      const data = await response.json();
      const $numeros = document.getElementById("numeros");
      $numeros.innerHTML = data.map((numero) => `<p>${numero.numero}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("form-numeros").addEventListener("submit", (e) => {
  e.preventDefault();
  const $numero = document.getElementById("numero");

  if (isNaN($numero.value) || $numero.value === "") {
    showAlert("Ingrese un numero valido", "error");
    invalidInput($numero);
    return;
  }

  const serverResponse = sendData(
    { numero: $numero.value },
    "http://localhost:3000/sendNumero"
  );

  fetchNumeros();

  $numero.value = "";
});

fetchNumeros();
