//Importar express para inicializar un enrutador
import express from "express";

//Importar todos los controladores que se utilicen
import { page, checkWord } from "./controllers/game.js";
import {
  deleteFromDatabase,
  getUsers,
  saveUserData,
  searchUser,
  updateUser,
} from "./controllers/db.js";

//Definir enrutador
const router = express.Router();

//Endpoints para ciente
router.get("/", page); //Se define tipo de endpoint (GET, POST, etc) y controlador a utilizar en ese endpoint
router.post("/checkWord", checkWord);

//Endpoints para db
router.get("/users", getUsers);
router.get("/users/:id", searchUser); // /:id para poder pasar un id como queryparam
router.post("/users", saveUserData);
router.delete("/users/:id", deleteFromDatabase);
router.put("/users/:id", updateUser);

//Exportar el enrutador para poder usar las rutas
export default router;
