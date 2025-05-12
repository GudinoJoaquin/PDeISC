async function deleteData(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}

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

async function fetchLetras() {
  try {
    const response = await fetch("http://localhost:3000/getLetras", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $letras = document.getElementById("letras");
      $letras.innerHTML = data.map((letra) => `<p>${letra}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchNombres() {
  try {
    const response = await fetch("http://localhost:3000/getNombres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $nombres = document.getElementById("nombres");
      $nombres.innerHTML = data.map((nombre) => `<p>${nombre}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchElementos() {
  try {
    const response = await fetch("http://localhost:3000/getElementos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $elementos = document.getElementById("elementos");
      $elementos.innerHTML = data.map((elemento) => `<p>${elemento}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("deleteLetrasBtn").addEventListener("click", () => {
  deleteData("http://localhost:3000/deleteLetras");
  fetchLetras();
});
fetchLetras();

document.getElementById("agregarNombresBtn").addEventListener("click", () => {
  const $nombre = document.getElementById("nombre");

  if ($nombre.value.length < 4) {
    showAlert("Ingrese un nombre valido", "error");
    invalidInput($nombre);
    return;
  }

  sendData({ nombre: $nombre.value }, "http://localhost:3000/sendNombre");
  showAlert("Nombre ingresado con exito", "success");
  fetchNombres();
});
fetchNombres();

document.getElementById("cambiarElementosBtn").addEventListener("click", () => {
  const $elemento = document.getElementById("elemento");
  const $posicion = document.getElementById("posicion");

  if ($elemento.value.length < 4) {
    showAlert("Ingrese un elemento valido", "error");
    invalidInput($elemento);
    return;
  }

  if ($posicion.value < 0) {
    showAlert("Ingrese una posicion valida", "error");
    invalidInput($posicion);
    return;
  }

  sendData(
    { elemento: $elemento.value, posicion: $posicion.value },
    "http://localhost:3000/sendElemento"
  );
  showAlert("Elemento ingresado con exito", "success");
  fetchElementos();
});
fetchElementos();

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
