import express from "express";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: "." });
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
