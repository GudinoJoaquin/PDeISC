import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import { supabase } from "./config/supabase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api funcionando");
});

app.get("/auth/google", (req, res) => {
  const { data, error } = supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) return res.status(500).json({ error: error.message });
  console.log(data);
  res.send(data); // Redirige al usuario a Google
});

app.get("/auth/callback", async (req, res) => {
  const { access_token } = req.query;

  const { data, error } = await supabase.auth.getUser(access_token);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data.user);
});

app.listen(PORT, "0.0.0.0", () => {
  const interfaces = os.networkInterfaces();
  let addresses = [];

  for (let iface in interfaces) {
    for (let i = 0; i < interfaces[iface].length; i++) {
      const addr = interfaces[iface][i];
      if (addr.family === "IPv4" && !addr.internal) {
        addresses.push(addr.address);
      }
    }
  }

  console.log(`Servidor corriendo en:`);
  console.log(`- Localhost: http://localhost:${PORT}`);
  addresses.forEach((ip) =>
    console.log(`- En red local: http://${ip}:${PORT}`)
  );
});
