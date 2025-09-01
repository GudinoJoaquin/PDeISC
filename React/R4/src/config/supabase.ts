//Importar modulo para crear cliente de supabase
import { createClient } from '@supabase/supabase-js';

//Definir url y api key en base a variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

//Instanciár el cliente de supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
