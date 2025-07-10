import express from "express";
import { page, checkWord } from "./controllers/game.js";
import {
  deleteFromDatabase,
  getUsers,
  saveUserData,
  searchUser,
  updateUser,
} from "./controllers/db.js";

const router = express.Router();

//Endpoints para ciente
router.get("/", page);
router.post("/checkWord", checkWord);

//Endpoints para db
router.get("/users", getUsers);
router.get("/users/:id", searchUser);
router.post("/users", saveUserData);
router.delete("/users/:id", deleteFromDatabase);
router.put("/users/:id", updateUser);

export default router;
