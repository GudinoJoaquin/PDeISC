import jwt from "jsonwebtoken";
import { supabase } from "../../config/supabase.js";
import dotenv from "dotenv";

dotenv.config();

export default async function getSession(req, res) {
  const { access_token } = req.body;

  if (!access_token)
    return res.status(400).json({ error: "access_token es requerido" });

  try {
    const { data: userData, error: userError } = await supabase.auth.getUser(
      access_token
    );

    if (userError) return res.status(400).json({ error: userError.message });

    const token = jwt.sign(
      {
        user_id: userData.user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user_id: userData.user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching session" });
  }
}
