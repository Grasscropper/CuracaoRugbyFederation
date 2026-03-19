-- Curaçao Rugby Federation – Supabase Schema
-- Run this in your Supabase SQL editor to set up the database.

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- EVENTS
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  date        timestamptz not null,
  location    text,
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- NEWS
create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  content      text not null,
  image_url    text,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- TRAINING SESSIONS
create table if not exists public.training_sessions (
  id           uuid primary key default gen_random_uuid(),
  day_of_week  text not null,
  start_time   time not null,
  end_time     time not null,
  location     text not null,
  category     text not null,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- SIGNUPS
create table if not exists public.signups (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null,
  last_name        text not null,
  email            text not null,
  phone            text,
  date_of_birth    date,
  experience_level text,
  message          text,
  created_at       timestamptz not null default now()
);

-- PAGE CONTENT (key-value store for editable text blocks)
create table if not exists public.page_content (
  id         uuid primary key default gen_random_uuid(),
  key        text not null unique,
  value      text not null,
  updated_at timestamptz not null default now()
);

-- Updated-at trigger function
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Attach trigger to tables with updated_at
do $$
declare
  t text;
begin
  foreach t in array array['events','news','training_sessions','page_content'] loop
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute function public.set_updated_at()', t
    );
  end loop;
end;
$$;

-- ROW LEVEL SECURITY
alter table public.events           enable row level security;
alter table public.news             enable row level security;
alter table public.training_sessions enable row level security;
alter table public.signups          enable row level security;
alter table public.page_content     enable row level security;

-- Public read for events, news, training, page_content
create policy "public can read events"            on public.events            for select using (true);
create policy "public can read news"              on public.news              for select using (true);
create policy "public can read training"          on public.training_sessions for select using (true);
create policy "public can read page_content"      on public.page_content      for select using (true);

-- Anyone can insert signups (website form)
create policy "public can insert signups"         on public.signups           for insert with check (true);

-- Authenticated users (admins) can do everything
create policy "admins can all events"             on public.events            for all using (auth.role() = 'authenticated');
create policy "admins can all news"               on public.news              for all using (auth.role() = 'authenticated');
create policy "admins can all training"           on public.training_sessions for all using (auth.role() = 'authenticated');
create policy "admins can read signups"           on public.signups           for select using (auth.role() = 'authenticated');
create policy "admins can all page_content"       on public.page_content      for all using (auth.role() = 'authenticated');

-- Seed default training sessions
insert into public.training_sessions (day_of_week, start_time, end_time, location, category, notes) values
  ('Tuesday',  '17:30', '19:30', 'Saliña Terrain, Willemstad', 'Senior Men & Women', 'All levels welcome'),
  ('Thursday', '17:30', '19:30', 'Saliña Terrain, Willemstad', 'Senior Men & Women', null),
  ('Saturday', '08:00', '10:00', 'Saliña Terrain, Willemstad', 'Youth & Minis',       'Ages 6–16, parents welcome to watch')
on conflict do nothing;
