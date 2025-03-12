-- Create loans table
create table public.loans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  loan_type text not null,
  amount numeric not null,
  term_months integer not null,
  purpose text not null,
  -- Removed collateral field as it doesn't exist in the schema
  status text not null,
  date_approved timestamp with time zone,
  remaining_balance numeric,
  next_payment_date date,
  interest_rate numeric,
  monthly_payment numeric,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

