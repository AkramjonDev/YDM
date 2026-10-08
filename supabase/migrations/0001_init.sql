-- Profiles: one row per auth user, holds the role used by the admin panel.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- security definer so RLS policies can call it without recursing into profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create policy "Users read own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id or public.is_admin());

create policy "Admins update profiles"
  on public.profiles for update
  to authenticated
  using (public.is_admin());

-- Create a profile automatically when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Leads: submissions from the landing page contact form.
create table public.leads (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  message text check (char_length(message) <= 5000),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone (including anonymous visitors) may submit; only admins may read or change.
create policy "Anyone can submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

create policy "Admins read leads"
  on public.leads for select
  to authenticated
  using (public.is_admin());

create policy "Admins update leads"
  on public.leads for update
  to authenticated
  using (public.is_admin());

create policy "Admins delete leads"
  on public.leads for delete
  to authenticated
  using (public.is_admin());

-- After creating your first user in Supabase Auth, promote them:
--   update public.profiles set role = 'admin' where id = '<user-uuid>';
