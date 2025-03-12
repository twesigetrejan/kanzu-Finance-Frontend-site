"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/lib/auth-context";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient<Database>());

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>;
}

export function useSupabase() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return context;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Loan = {
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

export function useLoans() {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchLoans();
    }
  }, [user]);

  const fetchLoans = async () => {
    try {
      const { data, error } = await supabase
        .from("loans")
        .select("*")
        .eq("user_id", user?.id ?? "")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setLoans(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { loans, loading, error, refreshLoans: fetchLoans };
}
