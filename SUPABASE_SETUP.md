# Supabase setup guide

This portfolio has been migrated to use Supabase for data, authentication, and storage.

## 1. Create a Supabase project

1. Open https://supabase.com and create a new project.
2. Copy the project URL and anonymous key.
3. Add them to the frontend environment file.

## 2. Configure frontend environment

Create a `.env.local` file inside `frontend` with:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The example file is also available at `frontend/.env.example`.

## 3. Apply the database schema

Open the Supabase SQL editor and run the contents of `supabase/schema.sql`.

After the tables are created, run the seed file `supabase/seed.sql`.

## 4. Set up storage

Create a `resumes` bucket in Supabase Storage.

- Make the bucket public.
- Store PDF resumes there.
- The admin dashboard uploads resumes to this bucket.

## 5. Create the admin user

Use the Supabase Auth UI or the CLI to create an admin login.

Then insert the matched auth user ID into `public.admin_users`:

```sql
insert into public.admin_users (user_id, email)
values ('<auth-user-uuid>', 'your-email@example.com');
```

## 6. Run the app

```bash
cd frontend
npm install
npm run dev
```

The portfolio will load public data from Supabase and the admin login will use Supabase Auth.
