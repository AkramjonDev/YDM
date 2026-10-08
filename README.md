# YDM

Landing page and admin panel built with Next.js 16 (App Router), Tailwind CSS 4 and Supabase.

## Setup

1. **Create a Supabase project** at https://supabase.com/dashboard.
2. **Run the schema**: open the SQL Editor and run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
   (or `npx supabase db push` if you use the Supabase CLI).
3. **Environment variables**: copy `.env.example` to `.env.local` and fill in the values from
   Project Settings → API.
4. **Create an admin user**: Authentication → Users → *Add user* (email + password), then in the SQL Editor:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'you@example.com');
   ```
5. **Run it**:
   ```bash
   npm install
   npm run dev
   ```
   - Landing page: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## Structure

```
src/
  proxy.ts                  # Refreshes Supabase session, redirects signed-out users away from /admin
  lib/
    auth.ts                 # requireAdmin(): checks the user has role 'admin'
    supabase/
      client.ts             # Browser client (Client Components)
      server.ts             # Server client (Server Components / Actions)
      proxy.ts              # Session refresh logic used by src/proxy.ts
  app/
    (site)/                 # Public landing page (header, sections, contact form -> leads table)
    admin/
      login/                # Sign-in page
      (panel)/              # Protected admin pages: dashboard, leads
      actions.ts            # login, logout, update/delete lead
supabase/migrations/        # Database schema + row level security policies
```

## Security model

- `src/proxy.ts` only checks that a user is signed in.
- Every admin page and server action calls `requireAdmin()`, which checks `profiles.role = 'admin'`.
- Row level security in Postgres is the final guard: anonymous visitors can only *insert* leads;
  only admins can read, update or delete them.
