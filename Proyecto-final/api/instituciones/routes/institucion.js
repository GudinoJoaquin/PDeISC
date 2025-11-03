import express from "express";
import { createClass } from "../controllers/createClass.js";
import { getClass, getClassByID } from "../controllers/getClass.js";
import {
  updateAlumnos,
  updateClass,
  uploadMiddleware,
} from "../controllers/updateClass.js";
import { getContents } from "../controllers/getContents.js";
import { createInstitution } from "../controllers/createInstitution.js";
import {
  listInstitutions,
  getInstitutionByOwner,
} from "../controllers/getInstitutions.js";

const router = express.Router();

router.get("/curso/get/:profesor_id", getClass);
router.get("/curso/getByID/:class_id", getClassByID);
router.post("/curso/create", createClass);
router.post("/register", createInstitution);

router.get("/list", listInstitutions);
router.get("/owner/:owner_id", getInstitutionByOwner);

router.put("/curso/update", uploadMiddleware, updateClass);
router.put("/curso/addAlumno", updateAlumnos);

router.get("/curso/contents/get/:class_id", getContents);

export default router;
