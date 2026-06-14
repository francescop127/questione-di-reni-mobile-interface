create table if not exists public.app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

drop policy if exists "Public read app state" on public.app_state;
create policy "Public read app state"
on public.app_state
for select
to anon, authenticated
using (true);

drop policy if exists "Public write app state" on public.app_state;
create policy "Public write app state"
on public.app_state
for all
to anon, authenticated
using (true)
with check (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_state'
  ) then
    alter publication supabase_realtime add table public.app_state;
  end if;
end $$;

insert into storage.buckets (id, name, public)
values ('regia-media', 'regia-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read regia media" on storage.objects;
create policy "Public read regia media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'regia-media');

drop policy if exists "Public upload regia media" on storage.objects;
create policy "Public upload regia media"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'regia-media');

drop policy if exists "Public update regia media" on storage.objects;
create policy "Public update regia media"
on storage.objects
for update
to anon, authenticated
using (bucket_id = 'regia-media')
with check (bucket_id = 'regia-media');
