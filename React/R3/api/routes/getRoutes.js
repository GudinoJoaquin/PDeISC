//Importar modulo express y controladores
import express from "express";
import { getUserByDNI, getUsers } from "../controllers/getControllers.js";

//Inicializar enrutador express
const router = express.Router();

//Definir rutas
router.get("/users", getUsers);
router.get("/users/:dni", getUserByDNI)

//Exportar el enrutador por defecto
export default router;
