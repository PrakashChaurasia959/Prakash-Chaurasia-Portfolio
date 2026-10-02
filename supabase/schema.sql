create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text,
  headline text,
  bio text,
  location text,
  email text,
  phone text,
  linkedin_url text,
  github_url text,
  profile_image_url text,
  resume_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  short_description text,
  description text,
  technologies text[] default '{}',
  image_url text,
  github_url text,
  live_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  company text,
  role text,
  start_date date,
  end_date date,
  description text,
  technologies text[] default '{}',
  certificate_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text,
  degree text,
  field text,
  start_year integer,
  end_year integer,
  location text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  proficiency integer default 0,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  issue_date date,
  description text,
  certificate_url text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text,
  site_description text,
  hero_title text,
  hero_subtitle text,
  resume_url text,
  profile_image_url text,
  email text,
  phone text,
  linkedin_url text,
  github_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_sort_order on public.projects(sort_order);
create index if not exists idx_experience_dates on public.experience(start_date, end_date);
create index if not exists idx_education_end_year on public.education(end_year);
create index if not exists idx_skills_category_sort on public.skills(category, sort_order);
create index if not exists idx_messages_status on public.messages(status);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.experience enable row level security;
alter table public.education enable row level security;
alter table public.skills enable row level security;
alter table public.certificates enable row level security;
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_users enable row level security;

create policy "Public can read profiles" on public.profiles for select using (true);
create policy "Public can read projects" on public.projects for select using (true);
create policy "Public can read experience" on public.experience for select using (true);
create policy "Public can read education" on public.education for select using (true);
create policy "Public can read skills" on public.skills for select using (true);
create policy "Public can read certificates" on public.certificates for select using (true);
create policy "Public can read site settings" on public.site_settings for select using (true);
create policy "Public can insert messages" on public.messages for insert with check (true);
create policy "Public cannot read messages" on public.messages for select using (false);
create policy "Public cannot update messages" on public.messages for update using (false);
create policy "Public cannot delete messages" on public.messages for delete using (false);

create policy "Admin users can manage profiles" on public.profiles for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can manage projects" on public.projects for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can manage experience" on public.experience for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can manage education" on public.education for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can manage skills" on public.skills for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can manage certificates" on public.certificates for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can manage site settings" on public.site_settings for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can read messages" on public.messages for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can update messages" on public.messages for update using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can delete messages" on public.messages for delete using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admin users can manage admin_users" on public.admin_users for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
) with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);
