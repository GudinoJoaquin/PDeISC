import express from "express";
import { createClass } from "../controllers/createClass.js";
import { getClass, getClassByID } from "../controllers/getClass.js";
import { updateClass, uploadMiddleware } from "../controllers/updateClass.js";
import { getContents } from "../controllers/getContents.js";

const router = express.Router();

router.get("/curso/get/:profesor_id", getClass);
router.get("/curso/getByID/:class_id", getClassByID);
router.post("/curso/create", createClass);
router.put("/curso/update", uploadMiddleware, updateClass);

router.get("/curso/contents/get/:class_id", getContents);

export default router;
