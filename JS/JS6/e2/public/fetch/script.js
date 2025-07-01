// Obtener el formulario y el contenedor donde se mostrará el usuario creado
const $form = document.getElementById("form");
const $createdUserContainer = document.getElementById("created-user");

// Función para enviar datos a la API mediante POST
async function sendData(endpoint, objectData, callback) {
  try {
    // Hacer la petición con fetch usando JSON en el cuerpo
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectData),
    });

    // Convertir la respuesta en JSON
    const data = await response.json();

    // Ejecutar el callback pasando respuesta y datos
    callback(response, data);
  } catch (err) {
    // Capturar errores de red o del servidor
    console.error(`Error enviando data ${err}`);
  } finally {
    console.info("Fetching finalizado");
  }
}

// Agregar evento al enviar el formulario
$form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Obtener los inputs del formulario
  const $nameInput = document.getElementById("name");
  const $emailInput = document.getElementById("email");

  // Expresión regular para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Obtener valores de los inputs
  const name = $nameInput.value;
  const email = $emailInput.value;

  // Validaciones
  if (!name || name.trim() == "") {
    console.error("Name is required");
    return;
  }

  if (!email || email.trim() == "") {
    console.error("Email is required");
    return;
  }

  if (!emailRegex.test(email)) {
    console.error("Invalid email");
    return;
  }

  // Enviar datos si pasó las validaciones
  sendData(
    "http://localhost:3000/users", // Endpoint de la API
    { name: name, email: email },  // Datos a enviar
    (response, data) => {
      if (!data || !response) {
        console.error("Error fetching data");
        return;
      }

      // Mostrar en pantalla el ID del usuario creado
      $createdUserContainer.innerHTML = `Id del usuario creado: ${data.createdUser.id}`;
    }
  );
});
