// Obtener el formulario del DOM y el contenedor donde se mostrará el resultado
const $form = document.getElementById("form");
const $createdUserContainer = document.getElementById("created-user");

// Función para enviar datos a la API usando axios
async function sendData(endpoint, objectData, callback) {
  try {
    // Realiza una petición POST con axios enviando los datos
    const response = await axios.post(endpoint, objectData);

    // Extrae la data de la respuesta
    const data = response.data;

    // Ejecuta el callback pasando la respuesta completa y los datos
    callback(response, data);
  } catch (err) {
    // Muestra el error si la petición falla
    console.error(`Error fetching data: ${err}`);
  } finally {
    // Mensaje informativo de que la petición terminó
    console.info("Fetch finalizado");
  }
}

// Agrega un evento al enviar el formulario
$form.addEventListener("submit", (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto (recargar la página)

  // Obtiene los inputs de nombre y email
  const $nameInput = document.getElementById("name");
  const $emailInput = document.getElementById("email");

  // Expresión regular para validar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Obtiene los valores ingresados
  const name = $nameInput.value;
  const email = $emailInput.value;

  // Validación: el nombre no debe estar vacío
  if (!name || name.trim() == "") {
    console.error("Name is required");
    return;
  }

  // Validación: el email no debe estar vacío
  if (!email || email.trim() == "") {
    console.error("Email is required");
    return;
  }

  // Validación: el email debe tener un formato correcto
  if (!emailRegex.test(email)) {
    console.error("Invalid email");
    return;
  }

  // Si las validaciones pasan, se llama a la función para enviar los datos
  sendData(
    "http://localhost:3000/users", // URL de la API
    { name: name, email: email }, // Objeto con los datos del usuario
    (response, data) => {
      // Si no hay respuesta o datos, se muestra un error
      if (!data || !response) {
        console.error("Error fetching data");
        return;
      }

      // Muestra en pantalla el ID del usuario creado, que vino en la respuesta
      $createdUserContainer.innerHTML = `Id del usuario creado: ${data.createdUser.id}`;
    }
  );
});
