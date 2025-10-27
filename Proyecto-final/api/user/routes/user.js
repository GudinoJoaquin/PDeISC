import express from "express";
import { getUser } from "../controllers/getUser.js";

const router = express.Router();

router.get("/get/:user_id", getUser);

export default router;
