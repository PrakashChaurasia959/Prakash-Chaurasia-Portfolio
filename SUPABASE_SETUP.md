# Supabase setup guide

This portfolio is connected to Supabase for portfolio data, authentication, storage, and contact messages.

## 1. Create a Supabase project

1. Open https://supabase.com and create a project.
2. Copy the project URL and the publishable key.
3. Add the values to the frontend environment file.

## 2. Configure frontend environment

Create `frontend/.env` with exactly:

```env
VITE_SUPABASE_URL=https://iomeoigfsftuatvqblkg.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_uPDzzy54KNGWDvb9Jkl42Q_DCJnrr63
```

The example file is also available at `frontend/.env.example`.

## 3. Apply the database schema

Open the Supabase SQL editor and run the contents of `supabase/schema.sql`.

After the tables are created, run the `supabase/seed.sql` file to insert the portfolio content.

## 4. Set up storage

Create the storage buckets required for this portfolio, such as:

- `profile-images`
- `project-images`
- `certificates`
- `documents`
- `resumes`

Use the Supabase Storage UI to configure each bucket as required, then grant public access only to content meant to be viewed publicly.

## 5. Create the admin user

Use the Supabase Auth UI or CLI to create an admin login.

Then insert the matching auth user ID into `public.admin_users`:

```sql
insert into public.admin_users (user_id, email)
values ('<auth-user-uuid>', 'your-email@example.com');
```

## 6. Enable RLS and policies

The schema file enables row-level security for every table and creates public read and admin-only write policies.

Do not disable RLS.

## 7. Run the app

```bash
cd frontend
npm install
npm run dev
```

The portfolio loads public data from Supabase, the admin dashboard uses Supabase Auth, and the contact form writes messages to the `messages` table.
