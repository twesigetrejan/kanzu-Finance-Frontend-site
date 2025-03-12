import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
};

export type Loan = {
  id: string;
  user_id: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  status: "pending" | "approved" | "rejected" | "paid";
  purpose: string;
  created_at: string;
  updated_at: string;
};

// Database tables
export const TABLES = {
  PROFILES: "profiles",
  LOANS: "loans",
} as const;
