-- Update the handle_new_user function to include phone_number
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, phone_number)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, ''); -- Add empty string for phone_number
  
  -- Create default savings accounts for new users
  insert into public.savings_accounts (user_id, account_type, interest_rate)
  values 
    (new.id, 'regular', 3.5),
    (new.id, 'fixed', 5.0),
    (new.id, 'goal', 2.5);
  
  return new;
end;
$$ language plpgsql security definer;

