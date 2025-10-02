import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://ppqekxihghufggqjbqym.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcWVreGloZ2h1ZmdncWpicXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MjgyNTQsImV4cCI6MjA3NTAwNDI1NH0.Thn9631OpoIr50r_lJ4nQMcFn4wf-ffsKjCuZdx_A6w';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
