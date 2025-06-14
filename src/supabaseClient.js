// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Grab these from your Supabase dashboard
const SUPABASE_URL = "https://hwunhtvgospygkcsbcbl.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3dW5odHZnb3NweWdrY3NiY2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTAxMDMsImV4cCI6MjA2NTQ2NjEwM30.tk4Iy0Bq7Z3msigBI_EaF7KsNpM8Y9JFehtJturMdQw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
