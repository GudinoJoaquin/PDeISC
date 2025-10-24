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

// Endpoint para mostrar la IP del servidor
app.get("/ip", (req, res) => {
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

  res.json({
    localIPs: addresses,
    publicIP: req.ip, // IP desde donde llega la petición (útil si estás en red externa)
  });
});

app.get("/auth/google", (req, res) => {
  const { data, error } = supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:${PORT}/auth/callback`,
    },
  });

  if (error) return res.status(500).json({ error: error.message });
  res.redirect(data.url); // Redirige al usuario a Google
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
