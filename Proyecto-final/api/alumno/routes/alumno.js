import express from "express";
import { getCursos } from "../controllers/getClass.js";

const router = express.Router();

router.get("/cursos/get", getCursos);

export default router;
