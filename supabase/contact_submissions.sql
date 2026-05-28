create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Optional: enable RLS + insertion policy for anon users.
alter table public.contact_submissions enable row level security;

drop policy if exists "Allow public inserts to contact submissions" on public.contact_submissions;
create policy "Allow public inserts to contact submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);
