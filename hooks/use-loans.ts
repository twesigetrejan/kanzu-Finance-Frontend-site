import { useState, useEffect } from "react";
import { supabase, Loan, TABLES } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

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
        .from(TABLES.LOANS)
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLoans(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const applyForLoan = async (
    loanData: Omit<
      Loan,
      "id" | "user_id" | "created_at" | "updated_at" | "status"
    >
  ) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.LOANS)
        .insert([
          {
            ...loanData,
            user_id: user?.id,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setLoans((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateLoanStatus = async (loanId: string, status: Loan["status"]) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.LOANS)
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", loanId)
        .select()
        .single();

      if (error) throw error;
      setLoans((prev) =>
        prev.map((loan) => (loan.id === loanId ? { ...loan, status } : loan))
      );
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    loans,
    loading,
    error,
    applyForLoan,
    updateLoanStatus,
    refreshLoans: fetchLoans,
  };
}
