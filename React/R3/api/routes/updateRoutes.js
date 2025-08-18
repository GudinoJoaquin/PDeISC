//Importar modulo express y controlador para actualizar usuarios
import express from "express";
import { updateUser } from "../controllers/updateControllers.js";

//Iniciar enrutador de express
const router = express.Router();

//Definir ruta para actualizar por dni
router.put("/users/:dni", updateUser);

//Exportar enrutador por defecto
export default router;
