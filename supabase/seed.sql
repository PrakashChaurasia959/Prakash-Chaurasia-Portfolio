insert into public.profiles (
  id,
  name,
  headline,
  bio,
  location,
  email,
  phone,
  linkedin_url,
  github_url,
  profile_image_url,
  resume_url
)
values (
  '11111111-1111-4111-8111-111111111111',
  'Prakash Chaurasia',
  'B.Tech CSE | Software Developer',
  'I build modern web applications and software solutions using Java, React, Spring Boot, JavaScript and modern full-stack technologies.',
  'Kushinagar, Uttar Pradesh, India',
  'prakashchaurasia959@gmail.com',
  '9369962154',
  'https://linkedin.com/in/prakash-chaurasia-a629132a1/',
  'https://github.com/PrakashChaurasia959',
  '/profile-photo.png.jpeg',
  ''
)
on conflict (id) do update set
  name = excluded.name,
  headline = excluded.headline,
  bio = excluded.bio,
  location = excluded.location,
  email = excluded.email,
  phone = excluded.phone,
  linkedin_url = excluded.linkedin_url,
  github_url = excluded.github_url,
  profile_image_url = excluded.profile_image_url,
  resume_url = excluded.resume_url;

insert into public.projects (
  id,
  title,
  short_description,
  description,
  technologies,
  live_url,
  github_url,
  featured,
  sort_order
)
values (
  '22222222-2222-4222-8222-222222222222',
  'Used Car Price Prediction',
  'A real used-car price prediction web app that estimates vehicle values using machine learning.',
  'A real used-car price prediction web application that uses a machine-learning model to estimate vehicle prices based on relevant vehicle information, with a FastAPI backend and React/Vite frontend.',
  array['Python', 'Machine Learning', 'FastAPI', 'React', 'Vite'],
  'https://used-car-price-prediction-project-4.onrender.com',
  'https://github.com/PrakashChaurasia959/Used-Car-Price-Prediction',
  true,
  1
), (
  '33333333-3333-4333-8333-333333333333',
  'Shramik-Seva Portal',
  'A service-oriented platform for labour and worker support access built with React and Supabase.',
  'Shramik-Seva Portal is a worker-support platform designed to connect people with available labour and service assistance in a clean, responsive digital experience. It was designed around service accessibility, usability, and a simple user journey inspired by reference platforms in public service portals.',
  array['React', 'JavaScript', 'Supabase', 'Vite'],
  'https://shramik-seva-portal-fqnu.vercel.app',
  '',
  true,
  2
)
on conflict (id) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  description = excluded.description,
  technologies = excluded.technologies,
  live_url = excluded.live_url,
  github_url = excluded.github_url,
  featured = excluded.featured,
  sort_order = excluded.sort_order;

insert into public.experience (
  id,
  company,
  role,
  start_date,
  end_date,
  description,
  technologies
)
values (
  '44444444-4444-4444-8444-444444444444',
  'UPTEC',
  'Full Stack MERN Intern',
  '2025-09-09',
  '2025-11-29',
  'Worked on full stack development tasks during the internship period.',
  array['Node.js', 'Express.js', 'React', 'JavaScript']
), (
  '55555555-5555-4555-8555-555555555555',
  'Cyvanta',
  'Summer Internship 2026',
  '2026-08-02',
  '2026-08-02',
  'Summer internship experience in 2026.',
  array['JavaScript', 'React', 'REST APIs']
)
on conflict (id) do update set
  company = excluded.company,
  role = excluded.role,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  description = excluded.description,
  technologies = excluded.technologies;

insert into public.education (
  id,
  institution,
  degree,
  field,
  start_year,
  end_year,
  location,
  description
)
values (
  '66666666-6666-4666-8666-666666666666',
  'Bansal Institute of Engineering & Technology (BIET), Lucknow',
  'B.Tech CSE',
  'Computer Science & Engineering',
  2023,
  2027,
  'Lucknow, Uttar Pradesh, India',
  'Pursuing B.Tech in Computer Science & Engineering.'
)
on conflict (id) do update set
  institution = excluded.institution,
  degree = excluded.degree,
  field = excluded.field,
  start_year = excluded.start_year,
  end_year = excluded.end_year,
  location = excluded.location,
  description = excluded.description;

insert into public.skills (id, name, category, proficiency, sort_order)
values
  ('77777777-7777-4777-8777-777777777777', 'Java', 'Programming', 90, 1),
  ('88888888-8888-4888-8888-888888888888', 'JavaScript', 'Programming', 90, 2),
  ('99999999-9999-4999-8999-999999999999', 'Python', 'Programming', 80, 3),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'React', 'Frontend', 90, 4),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'HTML', 'Frontend', 85, 5),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'CSS', 'Frontend', 85, 6),
  ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'Vite', 'Frontend', 75, 7),
  ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 'Node.js', 'Backend', 80, 8),
  ('ffffffff-ffff-4fff-8fff-ffffffffffff', 'Express.js', 'Backend', 75, 9),
  ('12121212-1212-4121-8121-121212121212', 'Spring Boot', 'Backend', 80, 10),
  ('13131313-1313-4131-8131-131313131313', 'REST API', 'Backend', 80, 11),
  ('14141414-1414-4141-8141-141414141414', 'SQL', 'Database', 75, 12),
  ('15151515-1515-4151-8151-151515151515', 'MySQL', 'Database', 70, 13),
  ('16161616-1616-4161-8161-161616161616', 'Supabase', 'Database', 80, 14),
  ('17171717-1717-4171-8171-171717171717', 'Machine Learning', 'AI / ML', 75, 15),
  ('18181818-1818-4181-8181-181818181818', 'FastAPI', 'AI / ML', 70, 16),
  ('19191919-1919-4191-8191-191919191919', 'OpenCV', 'AI / ML', 60, 17),
  ('20202020-2020-4202-8202-202020202020', 'MediaPipe', 'AI / ML', 60, 18),
  ('21212121-2121-4212-8212-212121212121', 'Git', 'Tools', 85, 19),
  ('22222222-2222-4222-8222-222222222221', 'GitHub', 'Tools', 85, 20)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  proficiency = excluded.proficiency,
  sort_order = excluded.sort_order;

insert into public.certificates (
  id,
  title,
  issuer,
  issue_date,
  description
)
values (
  '23232323-2323-4232-8232-232323232323',
  'UPTEC Full Stack MERN Internship',
  'UPTEC',
  '2025-11-29',
  'Full Stack MERN internship certificate.'
), (
  '24242424-2424-4242-8242-242424242424',
  'Angels Foundation 7-Day AI Class',
  'Angels Foundation',
  '2026-04-28',
  'Completed a 7-day AI learning program.'
), (
  '25252525-2525-4252-8252-252525252525',
  'Cyvanta Summer Internship 2026',
  'Cyvanta',
  '2026-08-02',
  'Summer internship ceremony and completion.'
)
on conflict (id) do update set
  title = excluded.title,
  issuer = excluded.issuer,
  issue_date = excluded.issue_date,
  description = excluded.description;

insert into public.site_settings (
  id,
  site_name,
  site_description,
  hero_title,
  hero_subtitle,
  resume_url,
  profile_image_url,
  email,
  phone,
  linkedin_url,
  github_url
)
values (
  '26262626-2626-4262-8262-262626262626',
  'Prakash Chaurasia',
  'Prakash Chaurasia | B.Tech CSE | Software Developer',
  'Prakash Chaurasia',
  'B.Tech CSE | Software Developer',
  '',
  '/profile-photo.png.jpeg',
  'prakashchaurasia959@gmail.com',
  '9369962154',
  'https://linkedin.com/in/prakash-chaurasia-a629132a1/',
  'https://github.com/PrakashChaurasia959'
)
on conflict (id) do update set
  site_name = excluded.site_name,
  site_description = excluded.site_description,
  hero_title = excluded.hero_title,
  hero_subtitle = excluded.hero_subtitle,
  resume_url = excluded.resume_url,
  profile_image_url = excluded.profile_image_url,
  email = excluded.email,
  phone = excluded.phone,
  linkedin_url = excluded.linkedin_url,
  github_url = excluded.github_url;
