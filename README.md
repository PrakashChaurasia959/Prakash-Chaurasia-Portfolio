# Prakash Chaurasia Portfolio

This portfolio uses Supabase for portfolio data, admin authentication, and file storage.

## Highlights

- Public portfolio UI retained with the existing design and responsive layout.
- Supabase-backed profile, project, experience, education, skills, certificates, and settings data.
- Supabase Auth used for admin login/logout.
- Resume uploads stored in a Supabase Storage bucket.

## Tech Stack

Frontend
- React
- Vite
- JavaScript
- CSS
- Supabase client

Backend
- Node.js
- Express health server
- Supabase-managed persistence and auth

## Project Structure

```text
Prakash-Chaurasia-Portfolio/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── .env.local
├── backend/
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── supabase/
│   ├── schema.sql
│   └── seed.sql
├── SUPABASE_SETUP.md
├── README.md
├── .env.example
├── .gitignore
└── package.json
```

## Supabase setup

1. Create a Supabase project.
2. Copy the project URL and anonymous key into `frontend/.env.local`.
3. Run the SQL from `supabase/schema.sql` in the Supabase SQL editor.
4. Run `supabase/seed.sql` to load the default portfolio data.
5. Create a Storage bucket named `resumes` and make it public.
6. Create a matching admin user in Supabase Auth, then insert its auth UID into `public.admin_users`.

Example frontend env:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Local development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

The backend is a lightweight Express health server and is only kept to avoid the old application wiring. The real data and auth live in Supabase.

```bash
cd backend
npm install
npm run dev
```

## Admin login

Use the Supabase Auth login page from the portfolio app.

The admin dashboard is protected by Supabase session state and secure RLS policies.

## Security notes

- Never commit `.env` or `.env.local` files.
- Keep Supabase keys in environment variables only.
- Only the service-role key should be kept server-side.
- Use RLS policies in Supabase for admin-only writes.

For the exact database and RLS setup, see [SUPABASE_SETUP.md](SUPABASE_SETUP.md).
