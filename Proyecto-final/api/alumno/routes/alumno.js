import express from "express";
import { addCurso } from "../controllers/addCurso.js";
import {
  getCursoById,
  getCursos,
  getAddedCursos,
} from "../controllers/getCursos.js";
import { getContents } from "../controllers/getContents.js";

const router = express.Router();

router.get("/cursos/get", getCursos);
router.get("/cursos/getAdded/:user_id", getAddedCursos);
router.get("/cursos/getCursosByID/:curso_id", getCursoById);
router.get("/cursos/contents/get/:curso_id", getContents);

router.post("/cursos/add", addCurso);

export default router;
