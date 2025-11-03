import express from "express";
import { createClass } from "../controllers/createClass.js";
import { getClass, getClassByID } from "../controllers/getClass.js";
import {
  updateAlumnos,
  updateClass,
  uploadMiddleware,
} from "../controllers/updateClass.js";
import { getContents } from "../controllers/getContents.js";
import { getTareas } from "../controllers/getTareas.js";
import { createInstitution } from "../controllers/createInstitution.js";
import {
  listInstitutions,
  getInstitutionByOwner,
  getInstitutionByID,
} from "../controllers/getInstitutions.js";
import { createClase } from "../controllers/createClase.js";
import {
  getClasesByInstitucion,
  getClaseByID,
} from "../controllers/getClases.js";

const router = express.Router();

router.get("/curso/get/:profesor_id", getClass);
router.get("/curso/getByID/:class_id", getClassByID);
router.post("/curso/create", createClass);
router.post("/register", createInstitution);

router.get("/list", listInstitutions);
router.get("/owner/:owner_id", getInstitutionByOwner);
router.get("/institucion/get/:insti_id", getInstitutionByID);

router.post("/clases/create", createClase);
router.get("/clases/get/:institucion_id", getClasesByInstitucion);
router.get("/clases/getByID/:clase_id", getClaseByID);

router.get("/curso/tareas/get/:class_id", getTareas);

router.put("/curso/update", uploadMiddleware, updateClass);
router.put("/curso/addAlumno", updateAlumnos);

router.get("/curso/contents/get/:class_id", getContents);

export default router;
