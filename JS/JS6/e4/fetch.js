//Funcion para obtener todos los pokemons
async function getPokemons(endpoint, callback) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    callback(data, response);
  } catch (err) {
    console.error(`Error fetching data: ${err}`);
  }
}

//Funcion para obtener pokemon por id
async function getPokemonById(endpoint, callback) {
  try {
    const response = await fetch(endpoint, {
      method: "POST", // Metodo de la peticion
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    //Callback para ejecutar una vez finalizado
    callback(data, response);
  } catch (err) {
    console.log(`Error fetching pokemon by id: ${err}`);
  }
}

//Funcion para crear pokemon
async function createPokemon(endpoint, pokemon, callback) {
  try {
    const response = await fetch(endpoint, {
      method: "POST", //Metodo post para enviar
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon), //Json parseado a string para enviar los datos al server
    });
    const data = await response.json();
    callback(data, response);
  } catch (err) {
    console.error(`Error sending pokemon ${err}`);
  }
}

//Funcion para borrar pokemon
async function deletePokemon(endpoint, callback) {
  try {
    const response = await fetch(endpoint, {
      method: "DELETE", //Metodo delete para borrar
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    callback(data, response);
  } catch (err) {
    console.error(`Error deleting pokemon: ${err}`);
  }
}

//Funcion para sobrescribir pokemon
async function updatePokemon(endpoint, pokemon, callback) {
  try {
    const response = await fetch(endpoint, {
      method: "PUT", //Metodo PUT para sobreesribir
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon), //Nueva informacion del pokemon a sobrescribir
    });
    const data = await response.json();
    callback(data, response);
  } catch (err) {
    console.error(`Error updating pokemon: ${err}`);
  }
}

//Funcion para modificar atributos de un pokemon
async function patchPokemon(endpoint, attributes, callback) {
  try {
    const response = await fetch(endpoint, {
      method: "PATCH", //Patch para "parchear" pokemon
      headers: {
        "COntent-Type": "application/json",
      },
      body: JSON.stringify(attributes), // Atributos en forma deo objeto que se modifican del pokemon
    });
    const data = await response.json();
    callback(data, response);
  } catch (err) {
    console.error(`Error patching pokemon: ${err}`);
  }
}

//Invocaciones de las funciones
getPokemons("http://localhost:3000/api/pokemons", (data, response) => {
  console.log(data);
});

getPokemonById("http://localhost:3000/api/pokemons/6", (data, response) => {
  console.log(data);
});

//Pokemon de prueba para crear
const pokemon = {
  id: 11,
  name: "Gengar",
  type: ["Ghost", "Poison"],
  hp: 60,
  attack: 65,
  defense: 60,
};

createPokemon(
  "http://localhost:3000/api/pokemons",
  pokemon,
  (data, response) => {
    console.log(data);
  }
);

deletePokemon("http://localhost:3000/api/pokemons/1", (data, response) => {
  console.log(data);
});

//Pokemon de prueba para acutalizar
const update = {
  id: 2,
  name: "Charmander",
  type: ["Fire"],
  hp: 1000,
  attack: 52,
  defense: 43,
};

updatePokemon(
  "http://localhost:3000/api/pokemons/2",
  update,
  (data, response) => {
    console.log(data);
  }
);

patchPokemon(
  "http://localhost:3000/api/pokemons/3",
  { defense: 1000 },
  (data, response) => {
    console.log(data);
  }
);
