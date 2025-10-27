import express from "express";
import getSession from "../controllers/session.js";
import { signOut, signUp, signIn } from "../controllers/sign.js";

const router = express.Router();

router.post("/session", getSession);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signout", signOut);

export default router;
