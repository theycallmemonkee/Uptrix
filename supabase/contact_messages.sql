create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "Allow public inserts to contact messages" on public.contact_messages;
create policy "Allow public inserts to contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);
