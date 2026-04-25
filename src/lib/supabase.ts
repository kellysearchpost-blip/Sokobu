import { createClient } from '@supabase/supabase-js'

// These variables are usually already set up in Lovable/Vite projects
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)