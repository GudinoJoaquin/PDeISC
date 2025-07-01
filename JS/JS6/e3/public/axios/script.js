// Obtener elementos del DOM
const $input = document.getElementById("name");
const $userContainer = document.getElementById("user");

// Función para buscar usuario por nombre
async function searchUsers(endpoint, callback) {
  try {
    const response = await axios.get(endpoint);
    const data = response.data; // CNo hace falta convertir a JSON, axios maneja JSON nativamente
    callback(data, response);
  } catch (err) {
    console.error(`Error fetching  ${err}`);
  } finally {
    console.info("Fetch finalizado");
  }
}

// Cuando el input recibe un nuevo valor
$input.addEventListener("input", () => {
  const searchTerm = $input.value.toLowerCase(); // Parsear valor del input

  // Invocar a la función searchUsers para buscar cada vez que se asigne un nuevo valor al input
  searchUsers(
    "https://jsonplaceholder.typicode.com/users",
    (data, response) => {
      // Usuarios que coinciden con las letras ingresadas en el input
      const filteredUsers = data.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
      );
      $userContainer.innerHTML = filteredUsers
        .map((user) => `<p>${user.name}</p>`)
        .join("");
    }
  );
});
