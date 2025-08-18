import express from "express";
import {
  deleteUser,
  softDeleteUser,
} from "../controllers/deleteControllers.js";

const router = express.Router();

router.delete("/users/:dni", deleteUser);
router.patch("/users/:dni", softDeleteUser);

export default router;
