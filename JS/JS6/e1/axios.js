//Importar axios para fetching
import axios from "axios"

//Funcion para obtener usuarios
async function fetchUsers(endpoint, callback) {
  try {
    //Axios con metodo get
    const response = await axios.get(endpoint);
    const data = response.data;
    callback(data, response);
  } catch (err) {
    console.error(`Error fetching data: ${err}`);
  }
}

//Funcion para crear usuario
async function createUser(endpoint, user, callback) {
  try {
    //Axios con metodo post y objeto a enviar
    const response = await axios.post(endpoint, user);
    const data = response.data;
    callback(data, response);
  } catch (err) {
    console.error(`Error creating user: ${err}`);
  }
}

//Invocacion de funciones
fetchUsers("https://jsonplaceholder.typicode.com/users", (data, response) => {
  //Crear tabla para mostrar datos
  const table = data.map((user) => ({
    Name: user.name,
    Email: user.email,
  }));

  console.table(table);
});

//Usuario de prueba
const user = {
  name: "Felipe Coltrinari",
  email: "epilson@gmail.com",
};

createUser(
  "https://jsonplaceholder.typicode.com/users",
  user,
  (data, response) => {
    console.log(data);
  }
);
