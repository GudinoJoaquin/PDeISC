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

async function fetchColor() {
  try {
    const response = await fetch("http://localhost:3000/getColores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $colores = document.getElementById("colores");
      $colores.innerHTML = data.map((color) => `<p>${color}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchTarea() {
  try {
    const response = await fetch("http://localhost:3000/getTareas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $tareas = document.getElementById("tareas");
      $tareas.innerHTML = data.map((tarea) => `<p>${tarea}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchUsuarios() {
  try {
    const response = await fetch("http://localhost:3000/getUsuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $usuarios = document.getElementById("usuarios");
      $usuarios.innerHTML = data.map((usuario) => `<p>${usuario}</p>`);
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

document.getElementById("form-color").addEventListener("submit", (e) => {
  e.preventDefault();

  const $color = document.getElementById("color");

  if ($color.value.trim() === "") {
    showAlert("Ingrese una color valida", "error");
    invalidInput($color);
    return;
  }

  sendData({ color: $color.value }, "http://localhost:3000/sendColor");
  showAlert("Color agregada con exito", "success");
  fetchColor();

  $color.value = "";
});
fetchColor();

document.getElementById("form-tarea").addEventListener("submit", (e) => {
  e.preventDefault();

  const $tarea = document.getElementById("tarea");

  if ($tarea.value.trim() === "") {
    showAlert("Ingrese una color valida", "error");
    invalidInput($tarea);
    return;
  }

  sendData({ tarea: $tarea.value }, "http://localhost:3000/sendTarea");
  showAlert("Color agregada con exito", "success");
  fetchTarea();

  $tarea.value = "";
});
fetchTarea();

document.getElementById("form-usuario").addEventListener("submit", (e) => {
  e.preventDefault();

  const $usuario = document.getElementById("usuario");

  if ($usuario.value.trim() === "") {
    showAlert("Ingrese una color valida", "error");
    invalidInput($usuario);
    return;
  }

  sendData({ usuario: $usuario.value }, "http://localhost:3000/sendUsuario");
  showAlert("Color agregada con exito", "success");
  fetchUsuarios();

  $usuario.value = "";
});
fetchUsuarios();
