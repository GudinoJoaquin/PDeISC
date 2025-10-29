import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import authRoutes from "./auth/routes/auth.js";
import oauthRoutes from "./auth/routes/oauth.js";
import userRoute from "./user/routes/user.js";
import profesorRoutes from "./profesor/routes/profesor.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/oauth", oauthRoutes);
app.use("/profesor", profesorRoutes);

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Api funcionando");
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
