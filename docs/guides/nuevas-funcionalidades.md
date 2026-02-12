# Nuevas Funcionalidades — Guía de Configuración y Uso

Esta guía cubre las 7 nuevas funcionalidades agregadas al sitio web de la Universidad Frontera Norte.

---

## 1. Página de Preguntas Frecuentes (FAQ)

**Ruta:** `/preguntas-frecuentes`

**Qué hace:** Muestra preguntas frecuentes organizadas por categoría (Admisiones, Costos y Pagos, Vida Académica, Documentos y Trámites) usando acordeones expandibles.

**Configuración:** No requiere configuración adicional. Funciona inmediatamente.

**Cómo agregar/editar preguntas:** Editar el archivo `src/data/faq.ts`. Cada pregunta tiene la estructura:

```ts
{
  question: "¿Pregunta aquí?",
  answer: "Respuesta aquí.",
  category: "Admisiones", // Debe coincidir con una categoría de faqCategories
}
```

Para agregar una nueva categoría, agregarla al array `faqCategories` en el mismo archivo.

---

## 2. Feed de Instagram / Redes Sociales

**Ubicación:** Sección "Síguenos en Redes" en la página de inicio (entre "¿Por qué elegir UFN?" y el CTA).

**Qué hace:** Muestra publicaciones de Instagram y Facebook embebidas directamente en la página usando los scripts oficiales de cada plataforma.

**Configuración:** No requiere API keys ni tokens. Solo URLs de publicaciones.

**Cómo actualizar las publicaciones mostradas:**

1. Abrir `src/data/social-feed.ts`
2. Reemplazar las URLs de ejemplo con URLs reales:

   **Instagram:**
   ```ts
   export const instagramPosts: string[] = [
     "https://www.instagram.com/p/ABC123/",
     "https://www.instagram.com/p/DEF456/",
   ];
   ```
   Para obtener la URL: abrir la publicación > tres puntos > "Enlace" o copiar URL.

   **Facebook:**
   ```ts
   export const facebookPosts: string[] = [
     "https://www.facebook.com/ceaborNorte/posts/123456789",
     "https://www.facebook.com/ceaborNorte/photos/987654321",
   ];
   ```
   Para obtener la URL: abrir la publicación > tres puntos > "Copiar enlace".

3. Se pueden mezclar publicaciones de ambas plataformas en la misma sección.
4. Si un array está vacío, solo se muestran las publicaciones de la otra plataforma.

**Nota:** Si las publicaciones no cargan, puede ser porque el navegador del usuario bloquea scripts de terceros. En ese caso, se muestra un enlace de respaldo.

---

## 3. Tarjetas de Analíticas en el Dashboard Admin

**Ubicación:** Panel de administración (`/admin`), arriba de la tabla de solicitudes.

**Qué hace:** Muestra 6 tarjetas con métricas:
- Total de solicitudes
- Solicitudes este mes
- Nuevas (status: nueva)
- Aceptadas (status: aceptada)
- En Revisión (status: en_revision)
- Rechazadas (status: rechazada)

**Configuración:** No requiere configuración. Se alimenta automáticamente de la tabla `applications` existente.

---

## 4. Mensajes Pre-llenados de WhatsApp por Carrera

**Ubicación:** Página de detalle de cada carrera (`/carreras/[slug]`), en la barra lateral.

**Qué hace:** Agrega un botón "Consultar por WhatsApp" que abre WhatsApp con un mensaje pre-llenado que incluye el nombre de la carrera: _"Hola, me interesa la carrera de [nombre]. ¿Podrían darme más información?"_

**Configuración:** No requiere configuración adicional. El número de WhatsApp se toma del existente (528991604645).

**Nota:** El componente `WhatsAppButton` ahora acepta un prop opcional `message` para personalizar el mensaje en cualquier página.

---

## 5. CMS de Noticias (Supabase)

**Ubicación:**
- Público: `/noticias` — muestra noticias publicadas
- Admin: `/admin/noticias` — gestionar noticias (crear, editar, eliminar)

**Qué hace:** Reemplaza el archivo estático de noticias con una tabla en Supabase. El personal puede publicar noticias desde el panel de administración sin tocar código.

### Configuración necesaria (Supabase):

**Ejecutar el siguiente SQL en el SQL Editor de Supabase:**

```sql
-- Tabla de noticias
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

-- Políticas de seguridad (RLS)
alter table noticias enable row level security;

create policy "Public can read published noticias"
  on noticias for select
  using (publicado = true);

create policy "Authenticated users full access to noticias"
  on noticias for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Trigger para actualizar updated_at automáticamente
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
```

**Cómo usar el CMS de noticias:**

1. Ir a `/admin/noticias`
2. Click en "Nueva Noticia"
3. Llenar los campos:
   - **Título:** Se genera automáticamente el slug (URL amigable)
   - **Fecha:** Fecha de publicación
   - **Categoría:** General, Eventos, Académico, o Comunicado
   - **Extracto:** Resumen corto (se muestra en la tarjeta de noticias)
   - **Contenido:** Texto completo de la noticia
   - **Publicado:** Marcar para que sea visible en el sitio público
4. Click en "Crear Noticia"

**Nota:** Las noticias con `publicado = false` solo son visibles en el panel de admin, no en la página pública.

---

## 6. Widget de Fechas Importantes

**Ubicación:**
- Público: Página de inicio, entre StatsBar y la sección de carreras
- Admin: `/admin/fechas` — gestionar fechas

**Qué hace:** Muestra las próximas fechas importantes (inscripciones, eventos, exámenes) en la página principal. Las fechas pasadas se ocultan automáticamente.

### Configuración necesaria (Supabase):

**Ejecutar el siguiente SQL en el SQL Editor de Supabase:**

```sql
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
```

**Cómo gestionar fechas:**

1. Ir a `/admin/fechas`
2. Usar el formulario en la parte superior para agregar nuevas fechas (título, fecha, descripción)
3. Editar o eliminar fechas existentes con los botones de acción en la tabla
4. Desactivar una fecha (activo = false) para ocultarla sin eliminarla

**Comportamiento automático:**
- Solo se muestran fechas con `fecha >= hoy` y `activo = true`
- Máximo 5 fechas en la página de inicio, ordenadas por fecha ascendente
- Si no hay fechas próximas, la sección no se muestra en la página de inicio

---

## 7. Meta Tags SEO (Open Graph)

**Qué hace:** Agrega etiquetas Open Graph y Twitter Card a todas las páginas para que las URLs compartidas en redes sociales muestren título, descripción e imagen de forma profesional.

**Configuración:** No requiere configuración. Los meta tags se generan automáticamente:

- **Páginas generales:** Usan los valores por defecto del layout raíz
- **Páginas de carrera:** Usan el nombre y descripción específica de cada programa

**Para agregar una imagen OG personalizada:** Colocar una imagen en `public/og-image.jpg` (recomendado: 1200x630px) y agregar la referencia en `src/app/layout.tsx`:

```ts
openGraph: {
  // ... campos existentes
  images: ["/og-image.jpg"],
},
```

---

## Resumen de Configuración

| Funcionalidad | ¿Requiere config? | Acción necesaria |
|---|---|---|
| FAQ | No | Funciona inmediatamente |
| Feed Instagram/Facebook | No | Reemplazar URLs de ejemplo en `src/data/social-feed.ts` |
| Analytics Admin | No | Funciona inmediatamente |
| WhatsApp por Carrera | No | Funciona inmediatamente |
| CMS Noticias | Sí | Ejecutar SQL de la tabla `noticias` en Supabase |
| Fechas Importantes | Sí | Ejecutar SQL de la tabla `fechas_importantes` en Supabase |
| SEO Open Graph | No | Funciona inmediatamente (opcionalmente agregar imagen OG) |

## Navegación Admin Actualizada

El panel de administración ahora tiene 3 secciones en la barra de navegación:
- **Solicitudes** — Panel principal de solicitudes de inscripción
- **Noticias** — Gestión de noticias y eventos
- **Fechas** — Gestión de fechas importantes
