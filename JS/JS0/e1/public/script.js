const $lista = document.getElementById("lista");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/obtener", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      $lista.innerHTML = data
        .map(
          (user) =>
            `<li class="border-b-2 border-violet-300 px-6 py-2 text-center w-full">${user.name}, ${user.surname}</li>`
        )
        .join("");
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function sendData(data) {
  try {
    const response = await fetch("/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
      }),
    });
    if (response.ok) {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const $name = document.getElementById("name");
  const $surname = document.getElementById("surname");

  if ($name.value.trim() < 4) {
    showAlert("Ingrese un nombre valido", "error");
    invalidInput($name);
    return;
  }
  if ($surname.value.trim() < 4) {
    showAlert("Ingrese un apellido valido", "error");
    return;
  }

  const data = { name: $name.value, surname: $surname.value };

  showAlert("Datos ingresados con exito", "success");

  sendData(data);

  fetchData();
});

fetchData();

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
  return;
}

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
