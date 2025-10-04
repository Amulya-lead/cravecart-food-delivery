
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ppqekxihghufggqjbqym.supabase.co"; // replace with your URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcWVreGloZ2h1ZmdncWpicXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MjgyNTQsImV4cCI6MjA3NTAwNDI1NH0.Thn9631OpoIr50r_lJ4nQMcFn4wf-ffsKjCuZdx_A6w"; // replace with your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
