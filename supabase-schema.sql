-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  phone text,
  address text,
  id_number text,
  occupation text,
  bio text,
  profile_image text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create loans table
create table public.loans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  loan_type text not null,
  amount numeric not null,
  term_months integer not null,
  purpose text not null,
  collateral text,
  status text not null,
  date_applied timestamp with time zone default now() not null,
  date_approved timestamp with time zone,
  remaining_balance numeric,
  next_payment_date date,
  interest_rate numeric,
  monthly_payment numeric,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create loan_payments table
create table public.loan_payments (
  id uuid default gen_random_uuid() primary key,
  loan_id uuid references public.loans on delete cascade not null,
  amount numeric not null,
  principal numeric not null,
  interest numeric not null,
  date timestamp with time zone default now() not null,
  status text not null,
  created_at timestamp with time zone default now() not null
);

-- Create loan_documents table
create table public.loan_documents (
  id uuid default gen_random_uuid() primary key,
  loan_id uuid references public.loans on delete cascade not null,
  name text not null,
  file_path text not null,
  file_url text not null,
  date_uploaded timestamp with time zone default now() not null,
  created_at timestamp with time zone default now() not null
);

-- Create savings_accounts table
create table public.savings_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  account_type text not null,
  balance numeric not null default 0,
  interest_rate numeric not null,
  goal_amount numeric,
  maturity_date date,
  last_transaction_date timestamp with time zone,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create savings_transactions table
create table public.savings_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  savings_account_id uuid references public.savings_accounts on delete cascade not null,
  type text not null,
  amount numeric not null,
  method text,
  reference text,
  notes text,
  date timestamp with time zone default now() not null,
  created_at timestamp with time zone default now() not null
);

-- Create investments table
create table public.investments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  type text not null,
  initial_amount numeric not null,
  current_value numeric not null,
  start_date timestamp with time zone not null,
  status text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Set up Row Level Security policies
-- Profiles: Users can only view and update their own profiles
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Loans: Users can only view and manage their own loans
create policy "Users can view own loans"
  on loans for select
  using (auth.uid() = user_id);

create policy "Users can insert own loans"
  on loans for insert
  with check (auth.uid() = user_id);

create policy "Users can update own loans"
  on loans for update
  using (auth.uid() = user_id);

-- Loan Payments: Users can only view their own loan payments
create policy "Users can view own loan payments"
  on loan_payments for select
  using (auth.uid() = (select user_id from loans where id = loan_id));

-- Loan Documents: Users can only view their own loan documents
create policy "Users can view own loan documents"
  on loan_documents for select
  using (auth.uid() = (select user_id from loans where id = loan_id));

create policy "Users can insert own loan documents"
  on loan_documents for insert
  with check (auth.uid() = (select user_id from loans where id = loan_id));

-- Savings Accounts: Users can only view and manage their own savings accounts
create policy "Users can view own savings accounts"
  on savings_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own savings accounts"
  on savings_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own savings accounts"
  on savings_accounts for update
  using (auth.uid() = user_id);

-- Savings Transactions: Users can only view their own savings transactions
create policy "Users can view own savings transactions"
  on savings_transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own savings transactions"
  on savings_transactions for insert
  with check (auth.uid() = user_id);

-- Investments: Users can only view and manage their own investments
create policy "Users can view own investments"
  on investments for select
  using (auth.uid() = user_id);

create policy "Users can insert own investments"
  on investments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own investments"
  on investments for update
  using (auth.uid() = user_id);

-- Create storage buckets for file uploads
insert into storage.buckets (id, name, public) values ('profile_images', 'profile_images', true);
insert into storage.buckets (id, name, public) values ('loan_documents', 'loan_documents', true);

-- Set up storage policies
create policy "Anyone can view profile images"
  on storage.objects for select
  using (bucket_id = 'profile_images');

create policy "Users can upload their own profile images"
  on storage.objects for insert
  with check (bucket_id = 'profile_images' AND auth.uid() = (storage.foldername(name))[1]::uuid);

create policy "Anyone can view loan documents"
  on storage.objects for select
  using (bucket_id = 'loan_documents');

create policy "Users can upload their own loan documents"
  on storage.objects for insert
  with check (bucket_id = 'loan_documents' AND auth.uid() = (storage.foldername(name))[1]::uuid);

-- Create functions for automatic profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  
  -- Create default savings accounts for new users
  insert into public.savings_accounts (user_id, account_type, interest_rate)
  values 
    (new.id, 'regular', 3.5),
    (new.id, 'fixed', 5.0),
    (new.id, 'goal', 2.5);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to update the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_loans_updated_at
  before update on public.loans
  for each row execute procedure public.handle_updated_at();

create trigger set_savings_accounts_updated_at
  before update on public.savings_accounts
  for each row execute procedure public.handle_updated_at();

create trigger set_investments_updated_at
  before update on public.investments
  for each row execute procedure public.handle_updated_at();

