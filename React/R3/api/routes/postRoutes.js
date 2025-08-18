//Importar modulo express y controladores
import express from "express";
import { createUser } from "../controllers/postController.js";

//Definir enrutador de express
const router = express.Router();

//Definir ruta con controlador
router.post("/users", createUser);

//Exportar enrutador por defecto
export default router;
