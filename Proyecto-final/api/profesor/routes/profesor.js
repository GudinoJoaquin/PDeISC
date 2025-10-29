import express from "express";
import { createClass } from "../controllers/createClass.js";
import { getClass } from "../controllers/getClass.js";

const router = express.Router();

router.get("/class/get/:profesor_id", getClass);
router.post("/class/create", createClass);

export default router;
