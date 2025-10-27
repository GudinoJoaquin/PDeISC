import express from "express";
import { googleOauth } from "../controllers/oauth.js";

const router = express.Router();

router.get("/google", googleOauth);

export default router;
