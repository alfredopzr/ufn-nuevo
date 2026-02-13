-- Track email sends for noticias
create table if not exists noticia_envios (
  id uuid default gen_random_uuid() primary key,
  noticia_id uuid not null references noticias(id) on delete cascade,
  filtros jsonb not null default '{}',
  total_destinatarios int not null,
  enviado_por text not null,
  created_at timestamptz default now()
);

-- RLS: only authenticated users can read/write
alter table noticia_envios enable row level security;

create policy "Authenticated users can read envios"
  on noticia_envios for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert envios"
  on noticia_envios for insert
  with check (auth.role() = 'authenticated');
