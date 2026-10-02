# Prakash Chaurasia Portfolio

This portfolio uses Supabase for portfolio data, admin authentication, and file storage.

## Highlights

- Public portfolio UI retained with the existing design and responsive layout.
- Supabase-backed profile, project, experience, education, skills, certificates, and settings data.
- Supabase Auth used for admin login/logout.
- Resume uploads stored in a Supabase Storage bucket.
- No custom backend database or JWT system is used.

## Tech Stack

Frontend
- React
- Vite
- JavaScript
- CSS
- Supabase client

## Project Structure

```text
Prakash-Chaurasia-Portfolio/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   ├── .env.example
│   └── .env.local
├── supabase/
│   ├── schema.sql
│   └── seed.sql
├── SUPABASE_SETUP.md
├── README.md
├── .gitignore
└── package.json
```

## Supabase setup

1. Create a Supabase project.
2. Copy the project URL and publishable key into `frontend/.env`.
3. Run the SQL from `supabase/schema.sql` in the Supabase SQL editor.
4. Run `supabase/seed.sql` to load the default portfolio data.
5. Create storage buckets such as `resumes` and `profile-images` as needed.
6. Create a matching admin user in Supabase Auth, then insert the auth UID into `public.admin_users`.

Example frontend env:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## Local development

```bash
cd frontend
npm install
npm run dev
```

## Admin login

Use the Supabase Auth login page from the portfolio app.

The admin dashboard is protected by Supabase session state and secure RLS policies.

## Security notes

- Never commit `.env` files.
- Keep the publishable key in environment variables only.
- Never use a service role or secret key in the frontend.
- Use RLS policies in Supabase for admin-only writes.

For the exact database and RLS setup, see [SUPABASE_SETUP.md](SUPABASE_SETUP.md).
