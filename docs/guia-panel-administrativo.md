# Guia del Panel Administrativo — Universidad Frontera Norte

Esta guia describe las funcionalidades del panel administrativo, el flujo de trabajo recomendado, y los beneficios de cada herramienta.

---

## 1. Inicio de Sesion

**Ruta:** `/admin/login`

Para acceder al panel, ingresa tu correo y contrasena. Solo cuentas autorizadas pueden entrar.

**Beneficio:** Protege la informacion de los estudiantes y solicitantes. Solo personal autorizado tiene acceso.

---

## 2. Panel Principal (Dashboard)

**Ruta:** `/admin`

Al entrar, veras un resumen con seis indicadores:

| Indicador | Que muestra |
|---|---|
| Total de Solicitudes | Cuantas solicitudes se han recibido en total |
| Este Mes | Solicitudes recibidas en el mes actual |
| Nuevas | Solicitudes que aun no han sido revisadas |
| Aceptadas | Solicitudes aprobadas |
| En Revision | Solicitudes que estan siendo evaluadas |
| Rechazadas | Solicitudes que no fueron aprobadas |

Debajo esta la **tabla de solicitudes** con todas las solicitudes recibidas.

### Que puedes hacer aqui:

- **Buscar** por nombre, CURP o correo electronico
- **Filtrar** por estado (Nueva, En Revision, Aceptada, etc.) o por carrera
- **Exportar** la lista filtrada como archivo CSV o Excel para tener un respaldo o compartir con otros departamentos
- **Hacer clic** en cualquier solicitud para ver su detalle completo

**Beneficio:** Tienes un panorama inmediato de todas las solicitudes y su estado. No necesitas buscar en diferentes lugares — todo esta en una sola pantalla con filtros y busqueda.

---

## 3. Detalle de Solicitud

**Ruta:** `/admin/aplicaciones/[id]`

Al hacer clic en una solicitud, se abre su expediente completo con tres secciones principales:

### 3.1 Informacion del Solicitante

Aqui ves todos los datos personales: nombre, correo, telefono, CURP, preparatoria de procedencia, domicilio, carrera seleccionada, y como se entero de la universidad.

Junto al telefono hay un boton de WhatsApp que abre una conversacion directa con el solicitante.

### 3.2 Estado de la Solicitud

En la barra lateral puedes cambiar el estado de la solicitud seleccionando una opcion del menu:

| Estado | Significado |
|---|---|
| Nueva | Acaba de llegar, no se ha revisado |
| En Revision | Se esta evaluando la solicitud |
| Documentos Pendientes | Faltan documentos por entregar |
| Aceptada | El solicitante fue aceptado |
| Rechazada | La solicitud no fue aprobada |

**Importante:** Cuando cambias el estado a **Aceptada**, el sistema automaticamente crea un registro de estudiante con los datos del solicitante (nombre, correo, telefono, carrera) y le asigna una matricula (ejemplo: UFN-2026-001). El nuevo estudiante aparecera en la seccion de Estudiantes.

### 3.3 Checklist de Documentos

Muestra una lista de los documentos requeridos (INE, certificado de preparatoria, etc.) con su estado actual:

- **Pendiente** — Aun no se ha recibido
- **Subido** — El solicitante lo subio en linea
- **Recibido externo** — Se entrego fisicamente en oficinas
- **Aprobado** — El documento fue revisado y aceptado
- **Rechazado** — El documento tiene problemas y debe corregirse

Puedes cambiar el estado de cada documento, agregar notas (por ejemplo: "Entregado en oficina el 15 de marzo"), y descargar los archivos subidos.

### 3.4 Comunicacion con el Solicitante

Desde aqui puedes enviar correos electronicos directamente al solicitante. Hay tres plantillas predefinidas:

1. **Documentos Pendientes** — Se llena automaticamente con la lista de documentos faltantes
2. **Solicitud Aceptada** — Mensaje de felicitacion con los siguientes pasos
3. **Solicitud Rechazada** — Notificacion respetuosa con espacio para agregar el motivo

Tambien puedes escribir correos personalizados con tu propio asunto y mensaje. Todos los correos enviados quedan registrados en el historial de comunicaciones, visible en la parte inferior.

### 3.5 Notas Internas

Un espacio para notas que solo el equipo administrativo puede ver. Util para registrar observaciones, acuerdos internos, o recordatorios sobre un solicitante en particular.

### 3.6 Exportar PDF

El boton "Exportar PDF" genera un documento con todo el expediente del solicitante: datos personales, estado de documentos, y historial de comunicaciones. Util para archivar o compartir con otros departamentos.

**Beneficio:** Cada solicitud tiene su expediente completo en un solo lugar. No necesitas cambiar entre sistemas para revisar documentos, enviar correos, o tomar notas. Todo queda registrado y disponible para consulta posterior.

---

## 4. Gestion de Estudiantes

**Ruta:** `/admin/estudiantes`

Esta seccion maneja a los estudiantes inscritos en la universidad.

### Como llegan los estudiantes aqui:

1. **Automaticamente** — Cuando una solicitud se marca como "Aceptada", se crea un registro de estudiante con matricula asignada, cuatrimestre 1, y estado "Activo"
2. **Manualmente** — Para estudiantes que se inscribieron antes de que existiera el sistema, o por otros canales. Usa el boton "Agregar Estudiante"

### Tabla de Estudiantes

Muestra: matricula, nombre, correo, carrera, cuatrimestre, estado y fecha de ingreso.

Puedes:

- **Buscar** por nombre, matricula, CURP o correo
- **Filtrar** por carrera, cuatrimestre (1 al 9), o estado (Activo, Egresado, Baja)
- **Exportar** la lista como CSV o Excel
- **Hacer clic** en un estudiante para ver y editar su informacion

### Detalle del Estudiante (`/admin/estudiantes/[id]`)

Aqui puedes:

- Editar datos de contacto (nombre, correo, telefono, CURP)
- Cambiar de carrera si el estudiante se transfiere
- Avanzar el cuatrimestre (del 1 al 9)
- Cambiar el estado: Activo, Egresado, o Baja
- Ver la solicitud original (si el estudiante vino del proceso de admision)
- Contactar por WhatsApp con un clic
- Eliminar el registro si fue creado por error

**Beneficio:** Centraliza la informacion de todos los estudiantes. Permite dar seguimiento a su avance academico (cuatrimestre), mantener datos de contacto actualizados, y tener trazabilidad desde la solicitud original hasta su situacion actual.

---

## 5. Mensajes Dirigidos

**Ruta:** `/admin/mensajes`

Esta es la herramienta para enviar comunicaciones a grupos especificos de estudiantes o solicitantes.

### Paso 1: Seleccionar Audiencia

Usa las pestanas para elegir si quieres contactar a **Estudiantes** o **Aplicantes** (solicitantes).

### Paso 2: Aplicar Filtros

Segun la pestana seleccionada, puedes filtrar por:

**Para Estudiantes:**
- Carrera (por ejemplo, solo estudiantes de Administracion de Empresas)
- Cuatrimestre (por ejemplo, solo los de cuatrimestre 3)
- Estado (Activo, Egresado, Baja)

**Para Aplicantes:**
- Carrera
- Estado de la solicitud (Nueva, En Revision, Aceptada, etc.)
- Solo los que tienen documentos pendientes

El sistema muestra en tiempo real cuantas personas cumplen con los filtros seleccionados.

### Paso 3: Revisar y Ajustar Destinatarios

Haz clic en "Ver destinatarios" para ver la lista completa de personas que recibiran el mensaje. Aqui puedes:

- **Deseleccionar** a alguien que no debe recibir el mensaje
- **Agregar manualmente** a alguien que no aparece en los filtros usando el buscador
- Ver el conteo actualizado de destinatarios seleccionados

### Paso 4: Componer el Mensaje

- **Vincular a una noticia o fecha importante** (opcional): Si seleccionas una noticia publicada o una fecha importante, el sistema llena automaticamente el asunto. En el correo se incluye un boton que lleva al contenido en el sitio web.
- **Asunto**: El titulo del mensaje
- **Mensaje**: El cuerpo del texto

### Paso 5: Elegir Canal

- **Email**: Envia el correo electronico a todos los destinatarios seleccionados. Los correos se envian en lotes y tienen el diseno institucional de la universidad.
- **Lista WhatsApp**: En lugar de enviar automaticamente, genera una lista con los nombres y numeros de telefono de los destinatarios. Puedes copiar los numeros con un clic para usarlos en una difusion de WhatsApp.

### Historial de Envios

En la parte inferior se muestra un registro de todos los mensajes enviados anteriormente, incluyendo: fecha, canal (Email o WhatsApp), asunto, filtros usados, y cantidad de destinatarios.

**Beneficio:** Permite comunicacion segmentada y eficiente. En lugar de enviar un correo generico a todos, puedes dirigir mensajes especificos a los grupos que necesitan recibirlos. Ejemplos practicos:

- Recordar a los solicitantes con documentos pendientes que deben entregarlos
- Avisar a todos los estudiantes de Ingenieria Industrial sobre un cambio de horario
- Notificar a los estudiantes de cuatrimestre 9 sobre el proceso de titulacion
- Enviar una noticia o evento solo a las carreras relevantes
- Informar a todos los solicitantes aceptados sobre la fecha de inscripcion

---

## 6. Noticias y Comunicados

**Ruta:** `/admin/noticias`

Un gestor de contenido para crear y publicar articulos en el sitio web de la universidad.

### Crear un Articulo

1. Haz clic en "Nueva Noticia"
2. Llena los campos:
   - **Titulo**: El encabezado del articulo
   - **Slug**: La direccion web del articulo (se genera automaticamente a partir del titulo)
   - **Fecha**: Fecha de publicacion
   - **Categoria**: General, Eventos, Academico, o Comunicado
   - **Extracto**: Un resumen corto que aparece en la lista de noticias
   - **Contenido**: El texto completo del articulo
   - **Publicado**: Marca esta casilla cuando quieras que el articulo sea visible en el sitio web

### Enviar Noticia por Email

Para articulos publicados, puedes enviarlos por correo a los solicitantes usando el icono de correo en la tabla. Selecciona los filtros (carrera y/o estado) y el sistema envia el articulo con el diseno institucional.

Para un envio mas personalizado con seleccion individual de destinatarios, usa la seccion de **Mensajes** y vincula la noticia desde ahi.

**Beneficio:** Mantiene el sitio web actualizado con informacion relevante y permite difundir las noticias directamente a los solicitantes y estudiantes por correo, sin depender de que visiten el sitio.

---

## 7. Fechas Importantes

**Ruta:** `/admin/fechas`

Administra las fechas clave del calendario academico y administrativo.

### Agregar una Fecha

Llena el formulario en la parte superior: titulo, fecha, y descripcion (opcional). Haz clic en "Agregar".

### Administrar Fechas Existentes

- **Editar**: Haz clic en el icono de lapiz para modificar cualquier campo directamente en la tabla
- **Activar/Desactivar**: Marca o desmarca la casilla "Activo" para controlar si la fecha aparece en el sitio web publico
- **Eliminar**: Haz clic en el icono de basura (pide confirmacion antes de eliminar)

Las fechas activas se muestran automaticamente en el sitio web publico para que los solicitantes y estudiantes las consulten.

**Beneficio:** Centraliza y actualiza las fechas clave (inicio de inscripciones, examenes, periodos de pago, etc.) en un solo lugar. Los cambios se reflejan inmediatamente en el sitio web.

---

## 8. Exportacion de Datos

El sistema ofrece tres formatos de exportacion:

| Formato | Donde se usa | Para que sirve |
|---|---|---|
| **CSV** | Solicitudes y Estudiantes | Archivo de texto separado por comas. Se abre en Excel, Google Sheets, o cualquier programa de datos |
| **Excel (XLSX)** | Solicitudes y Estudiantes | Archivo nativo de Excel con formato y columnas ajustadas |
| **PDF** | Detalle de cada solicitud | Documento formal con el expediente completo del solicitante |

Todos los archivos se descargan directamente a tu computadora.

**Beneficio:** Facilita compartir informacion con otros departamentos (contabilidad, direccion academica) sin necesidad de darles acceso al sistema. Tambien sirve como respaldo de la informacion.

---

## Flujo de Trabajo Recomendado

```
1. Revisar el Dashboard
   → Ver nuevas solicitudes y el resumen general

2. Evaluar cada solicitud
   → Revisar datos y documentos
   → Cambiar estado segun corresponda
   → Enviar correo si faltan documentos

3. Aceptar solicitantes
   → Cambiar estado a "Aceptada"
   → El estudiante se crea automaticamente

4. Gestionar estudiantes
   → Actualizar cuatrimestre al inicio de cada periodo
   → Registrar cambios de estado (egresado, baja)

5. Comunicar
   → Usar Mensajes para avisos segmentados
   → Publicar noticias y enviarlas por correo
   → Mantener fechas importantes actualizadas

6. Exportar cuando sea necesario
   → Generar reportes en Excel o CSV
   → Exportar expedientes individuales en PDF
```
