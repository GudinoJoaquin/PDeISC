import express from "express";
import { createClass } from "../controllers/createClass.js";

const router = express.Router();

router.post("/class/create", createClass);

export default router;
