// src/api/supabase.ts
import { createClient } from "@supabase/supabase-js";

interface SignUpResult {
    email?: string;
    error?: any;
  }
  

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function signUp(email: string, password: string): Promise<SignUpResult> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
  
    if (!error && data.user) {
      return { email: data.user.email };
    } else {
      return { error };
    }
  }