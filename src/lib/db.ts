import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function dbConnect() {
  // Returns Supabase admin client for server-side operations
  return supabaseAdmin;
}

export { supabase, supabaseAdmin };
export default dbConnect;
