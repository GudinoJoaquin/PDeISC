import express from "express";
import { createClass } from "../controllers/createClass.js";
import { getClass, getClassByID } from "../controllers/getClass.js";

const router = express.Router();

router.get("/class/get/:profesor_id", getClass);
router.get("/class/getByID/:class_id", getClassByID);
router.post("/class/create", createClass);

export default router;
