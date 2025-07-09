import express from "express";
import { page, checkWord } from "./game.js";
import {
  deleteFromDatabase,
  getUsers,
  saveUserData,
  searchUser,
} from "./db.js";

const router = express.Router();

//Endpoints para ciente
router.get("/", page);
router.post("/checkWord", checkWord);

//Endpoints para db
router.get("/users", getUsers);
router.get("/users/:id", searchUser);
router.post("/users", saveUserData);
router.delete("/users/:id", deleteFromDatabase);

export default router;
