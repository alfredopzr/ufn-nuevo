# Noticias Email Blast Feature — Design

## Summary

Allow admins to send published noticias as branded emails to applicants, with recipient filtering by programa and application status. Manual trigger from the admin noticias page with send logging.

## Decisions

- **Recipients:** Existing applicants from the `applications` table (no new subscriber system)
- **Trigger:** Manual — admin clicks "Enviar por Email" after publishing
- **Sending:** Resend batch API via Server Action (Approach A — direct send, no queue)
- **Filtering:** By programa and application status, with live recipient count preview
- **Tracking:** Basic send log in `noticia_envios` table

## Database

New table `noticia_envios`:

```sql
create table noticia_envios (
  id uuid default gen_random_uuid() primary key,
  noticia_id uuid not null references noticias(id) on delete cascade,
  filtros jsonb not null default '{}',
  total_destinatarios int not null,
  enviado_por text not null,
  created_at timestamptz default now()
);

-- RLS: only authenticated users can read/write
alter table noticia_envios enable row level security;

create policy "Authenticated users can manage envios"
  on noticia_envios for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
```

No changes to existing `noticias` or `applications` tables.

## Admin UI

### Send Button
On `/admin/noticias` list page, each **published** noticia row gets a mail icon button ("Enviar por Email").

### Send Dialog (Modal)
Opens `SendNoticiaEmailDialog` with:

1. **Noticia preview** — titulo and extracto at top
2. **Filters:**
   - Programa dropdown (Todos / specific programa)
   - Status dropdown (Todos / specific status)
3. **Live recipient count** — updates as filters change ("X destinatarios")
4. **Send history** — past sends for this noticia (date, count, filters used)
5. **Confirm button** — "Enviar a X destinatarios" (disabled if count is 0)

### Flow
1. Admin publishes noticia (existing flow)
2. Admin clicks mail icon on the published noticia
3. Dialog opens with filter controls and recipient count
4. Admin selects filters, reviews count
5. Clicks "Enviar" → confirmation toast → emails sent
6. Send logged to `noticia_envios`, visible in dialog for future reference

## Server Action

`sendNoticiaEmail(noticiaId, filters)`:

1. Verify admin authentication
2. Fetch noticia by ID (must be `publicado = true`)
3. Query `applications` with filters → get email list
4. Build HTML email from branded template
5. Send via Resend batch API (chunks of 100)
6. Insert log into `noticia_envios`
7. Return `{ success, count }` or `{ error }`

`getRecipientCount(filters)`:

1. Query `applications` count with filters
2. Return count for live preview

`getNoticiaEnvios(noticiaId)`:

1. Fetch send history for a noticia
2. Return list of past sends

## Email Template

Branded HTML matching existing email style:

- Dark blue header with university name
- Noticia titulo as h1
- Extracto as body text
- "Leer más" CTA button → `/noticias/{slug}`
- University footer with address

## Files

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/supabase/schema/noticia_envios.sql` | Create | Table schema + RLS |
| `src/types/database.ts` | Modify | Add `NoticiaEnvio` interface |
| `src/app/admin/(dashboard)/noticias/page.tsx` | Modify | Add send button per published row |
| `src/components/admin/SendNoticiaEmailDialog.tsx` | Create | Filter/send modal component |
| `src/app/admin/(dashboard)/noticias/actions.ts` | Create | Server actions (send, count, history) |
| `src/lib/email-templates/noticia.ts` | Create | HTML email template builder |
