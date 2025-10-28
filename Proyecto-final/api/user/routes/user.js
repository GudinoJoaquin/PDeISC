import express from "express";
import { getUser } from "../controllers/getUser.js";

const router = express.Router();

router.post("/get", getUser);

export default router;
