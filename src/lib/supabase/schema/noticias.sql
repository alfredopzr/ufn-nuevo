-- Noticias (News/Blog) table
create table if not exists noticias (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  slug text unique not null,
  fecha date not null default current_date,
  extracto text not null,
  categoria text not null default 'General',
  contenido text not null,
  publicado boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table noticias enable row level security;

-- Public can read published news
create policy "Public can read published noticias"
  on noticias for select
  using (publicado = true);

-- Authenticated users can do everything
create policy "Authenticated users full access to noticias"
  on noticias for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Auto-update updated_at
create or replace function update_noticias_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger noticias_updated_at
  before update on noticias
  for each row execute function update_noticias_updated_at();
