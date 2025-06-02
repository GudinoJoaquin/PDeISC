//Recuperamos elementos del DOM
const $form = document.getElementById("form");
const $display = document.getElementById("display");
const $alert = document.getElementById("alert");

//Funcion para enviar data el servidor
async function sendData(data, endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //si el contenido es json, formatear a json sino formatear a texto plano
    const contentType = response.headers.get("content-type");
    const body =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    //Retorna la respuesta
    return {
      status: response.status,
      ok: response.ok,
      body: body,
    };
  } catch (err) {
    console.log(err);
  }
}

//Obtenemos los datos del servidor
async function fetchData(endpoint, display) {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      //Muestra en el display correspondiente los datos
      display.innerHTML = data.map((el) => `<p>${el}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

//Al enviar el formulario
$form.addEventListener("submit", async (e) => {
  //Evita que se recargue la pagina
  e.preventDefault();

  //Tomar input y boton para aplicar estilos
  const $input = document.getElementById("numero");
  const $btn = document.getElementById("btn");
  const numero = $input.value;

  //Si no hay numero
  if (!numero) {
    showAlert("error", "Ingrese un numero valido");
    return;
  }

  //Esperar la respuesta del servidor
  const response = await sendData(
    { numero: numero },
    "http://localhost:3000/saveNumber"
  );

  //Aplicar estilos si salio bien
  if (response.status === 200) {
    $input.classList.remove("border-[#202020]", "text-[#202020]");
    $input.classList.add("border-[#bba712]", "text-[#bba712]");
    $btn.classList.remove("border-[#202020]", "text-[#202020]");
    $btn.classList.add("border-[#bba712]", "text-[#bba712]");
    showAlert("success", "Numero agregado con exito");
    //Borrarlos luego de 2 segundos
    setTimeout(() => {
      $input.classList.add("border-[#202020]", "text-[#202020]");
      $input.classList.remove("border-[#bba712]", "text-[#bba712]");
      $btn.classList.add("border-[#202020]", "text-[#202020]");
      $btn.classList.remove("border-[#bba712]", "text-[#bba712]");
    }, 2000);
  }

  //Mostrar datos y reiniciar el input
  $display.innerHTML = response.body.numeros.map((el) => `<p>${el}</p>`);
  $input.value = "";
});

//Funcion para mostrar una alerta
function showAlert(type, msg) {
  //Aplica estilos generales y el mensaje
  $alert.classList.remove("-translate-y-10");
  $alert.classList.add("translate-y-5");
  $alert.textContent = msg;
  //Dependiendo el tipo de alerta cambia el color de fondo
  if (type === "error") {
    $alert.classList.add("bg-red-500");
  }
  if (type == "success") {
    $alert.classList.add("bg-[#bba712]");
  }

  //Los elimina luego de 2 segundos
  setTimeout(() => {
    $alert.classList.remove("translate-y-5", "bg-red-500", "bg-[#bba712]");
    $alert.classList.add("-translate-y-10");
  }, 2000);
}

//Obtener datos la primera vez que se carga la pagina
fetchData("http://localhost:3000/getNumbers", $display);
