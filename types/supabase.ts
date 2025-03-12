export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone_number: string
          address: string | null
          id_number: string | null
          occupation: string | null
          bio: string | null
          profile_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone_number: string
          address?: string | null
          id_number?: string | null
          occupation?: string | null
          bio?: string | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone_number?: string
          address?: string | null
          id_number?: string | null
          occupation?: string | null
          bio?: string | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      loans: {
        Row: {
          id: string
          user_id: string
          loan_type: string
          amount: number
          term_months: number
          purpose: string
          status: string
          date_approved: string | null
          remaining_balance: number | null
          next_payment_date: string | null
          interest_rate: number | null
          monthly_payment: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          loan_type: string
          amount: number
          term_months: number
          purpose: string
          status: string
          date_approved?: string | null
          remaining_balance?: number | null
          next_payment_date?: string | null
          interest_rate?: number | null
          monthly_payment?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          loan_type?: string
          amount?: number
          term_months?: number
          purpose?: string
          status?: string
          date_approved?: string | null
          remaining_balance?: number | null
          next_payment_date?: string | null
          interest_rate?: number | null
          monthly_payment?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      loan_payments: {
        Row: {
          id: string
          loan_id: string
          amount: number
          principal: number
          interest: number
          date: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          loan_id: string
          amount: number
          principal: number
          interest: number
          date: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          loan_id?: string
          amount?: number
          principal?: number
          interest?: number
          date?: string
          status?: string
          created_at?: string
        }
      }
      loan_documents: {
        Row: {
          id: string
          loan_id: string
          name: string
          file_path: string
          file_url: string
          date_uploaded: string
          created_at: string
        }
        Insert: {
          id?: string
          loan_id: string
          name: string
          file_path: string
          file_url: string
          date_uploaded: string
          created_at?: string
        }
        Update: {
          id?: string
          loan_id?: string
          name?: string
          file_path?: string
          file_url?: string
          date_uploaded?: string
          created_at?: string
        }
      }
      savings_accounts: {
        Row: {
          id: string
          user_id: string
          account_type: string
          balance: number
          interest_rate: number
          goal_amount: number | null
          maturity_date: string | null
          last_transaction_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_type: string
          balance: number
          interest_rate: number
          goal_amount?: number | null
          maturity_date?: string | null
          last_transaction_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_type?: string
          balance?: number
          interest_rate?: number
          goal_amount?: number | null
          maturity_date?: string | null
          last_transaction_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      savings_transactions: {
        Row: {
          id: string
          user_id: string
          savings_account_id: string
          type: string
          amount: number
          method: string | null
          reference: string | null
          notes: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          savings_account_id: string
          type: string
          amount: number
          method?: string | null
          reference?: string | null
          notes?: string | null
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          savings_account_id?: string
          type?: string
          amount?: number
          method?: string | null
          reference?: string | null
          notes?: string | null
          date?: string
          created_at?: string
        }
      }
      investments: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          initial_amount: number
          current_value: number
          start_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          initial_amount: number
          current_value: number
          start_date: string
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string
          initial_amount?: number
          current_value?: number
          start_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

