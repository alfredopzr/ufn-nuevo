create table if not exists fechas_importantes (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  fecha date not null,
  descripcion text,
  activo boolean not null default true,
  created_at timestamptz default now()
);

alter table fechas_importantes enable row level security;

create policy "Public can read active fechas"
  on fechas_importantes for select
  using (activo = true);

create policy "Authenticated users full access to fechas"
  on fechas_importantes for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
