import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://jficdgcydhamqruvgkpt.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaWNkZ2N5ZGhhbXFydXZna3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NDM1NTEsImV4cCI6MjEwNDUxOTU1MX0.ATdCsx5mIhSAL2kCypT6hK0EWK0nqreUzS2ps5prIhE";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaWNkZ2N5ZGhhbXFydXZna3B0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODk0MzU1MSwiZXhwIjoyMTA0NTE5NTUxfQ.y8n2Mtb5dK3AutgapOwwPK6WaA9GEPAVggJX91BHb8o";

// Standard client for public / browser queries
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elevated admin client for server-side API routes & bypassing RLS
export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default supabase;
