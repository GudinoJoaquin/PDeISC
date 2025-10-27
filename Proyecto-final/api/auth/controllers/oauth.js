import { supabase } from "../../config/supabase.js";

export async function googleOauth(req, res) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "exp://192.168.1.37:8081",
    },
  });

  if (error) return res.status(400).json({ error: error.message });
  res.redirect(data.url);
}

