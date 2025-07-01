//Importacion de modulos
import express from "express";
import { POKEMONS } from "./pokemons.js";

//Inicializar express y puerto
const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());

//API

//Endpoint para obtener todos los pokemons
app.get("/api/pokemons", (req, res) => {
  res.status(200).json({ message: "All pokemons", pokemons: POKEMONS });
});

//Endpoint para guardar pokemon
app.post("/api/pokemons", (req, res) => {
  try {
    const pokemon = req.body;

    if (!pokemon) {
      return res.status(406).json({ message: "Pokemon is required" });
    }

    //Agregar pokemon
    POKEMONS.push(pokemon);
    res.status(201).json({ message: "Saved succesfully", pokemon: pokemon });
  } catch (err) {
    res.status(500).json({ message: "Error saving pokemon" });
  }
});


//Endpoint para buscar pokemon por id
app.post("/api/pokemons/:id", (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = POKEMONS.filter((poke) => poke.id === parseInt(id));
    if (!pokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }
    res.status(200).json({ message: "Pokemon found", pokemon: pokemon });
  } catch (err) {
    res.status(500).json({ message: "Error finding pokemon" });
  }
});

//Endpoint para eliminar pokemon por id
app.delete("/api/pokemons/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = POKEMONS.findIndex((poke) => poke.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    //Eliominar pokemon
    const deleted = POKEMONS.splice(index, 1);
    res
      .status(200)
      .json({ message: "Deleted succesfully", deleted: deleted[0] });
  } catch (err) {
    res.status(500).json({ message: "Error deleting pokemon" });
  }
});

//Endpoint para reescribir pokemon por id
app.put("/api/pokemons/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, hp, attack, defense } = req.body;

    const index = POKEMONS.findIndex((poke) => poke.id === parseInt(id));

    if (!name || !type || !hp || !attack || !defense) {
      return res.status(400).json({ message: "Missing fields" });
    }

    //Rescribir pokemon por completo
    POKEMONS[index] = { name, type, hp, attack, defense };
    res
      .status(200)
      .json({ message: "Updated succesfully", updated: POKEMONS[index] });
  } catch (err) {
    res.status(500).json({ message: "Error updating pokemon" });
  }
});

//Endpoint para modificar atributos de pokemon por id
app.patch("/api/pokemons/:id", (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = req.body;

    const index = POKEMONS.findIndex((poke) => poke.id === parseInt(id));

    if (!pokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    //Rescribir solo los campos que se envien en el body
    POKEMONS[index] = { ...POKEMONS[index], ...pokemon };

    res
      .status(200)
      .json({ message: "Updated succesfully", updated: POKEMONS[index] });
  } catch (err) {
    res.status(500).json({ message: "Error updating pokemon" });
  }
});

//Inicializar servidor
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
