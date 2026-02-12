# Guía de Administración — Sistema de Admisiones UFN

Esta guía explica cómo usar el panel de administración para gestionar las solicitudes de inscripción de la Universidad Frontera Norte.

---

## Acceder al Panel

1. Abre tu navegador y ve a: **tudominio.com/admin/login**
2. Ingresa tu correo electrónico y contraseña
3. Haz clic en **Iniciar Sesión**

> Si olvidaste tu contraseña, contacta al administrador técnico para restablecerla.

---

## Panel Principal — Lista de Solicitudes

Al iniciar sesión verás la lista de todas las solicitudes de inscripción.

### Qué ves en la tabla

| Columna | Descripción |
|---------|-------------|
| **Nombre** | Nombre completo del solicitante y su correo electrónico |
| **Programa** | La carrera a la que aplicó |
| **Fecha** | Cuándo envió su solicitud |
| **Estado** | En qué paso del proceso se encuentra (ver sección de Estados) |

### Buscar solicitudes

Usa la barra de búsqueda en la parte superior para encontrar un solicitante por:
- Nombre
- CURP
- Correo electrónico

Escribe tu búsqueda y presiona **Enter** o el botón de lupa.

### Filtrar solicitudes

Usa los menús desplegables para filtrar por:
- **Estado** — ver solo solicitudes nuevas, aceptadas, etc.
- **Programa** — ver solo solicitudes de una carrera específica

Para quitar los filtros, haz clic en **Limpiar**.

### Exportar datos

En la esquina superior derecha de la tabla encontrarás dos botones:
- **CSV** — descarga un archivo que puedes abrir en Excel o Google Sheets
- **Excel** — descarga un archivo .xlsx con formato

Los archivos exportados incluyen todas las solicitudes que se muestran actualmente (después de aplicar filtros).

---

## Detalle de una Solicitud

Haz clic en el nombre de cualquier solicitante para ver su información completa.

### Información del Solicitante

Aquí verás todos los datos que proporcionó el solicitante:
- Nombre, correo, teléfono, CURP, preparatoria, domicilio
- Programa al que aplicó
- Cómo se enteró de la universidad

**Para contactar por WhatsApp:** Haz clic en el número de teléfono (aparece en verde con el texto "WhatsApp"). Se abrirá una conversación directa en WhatsApp.

### Estado de la Solicitud

En el panel derecho verás el estado actual. Para cambiarlo:

1. Haz clic en el menú desplegable de estado
2. Selecciona el nuevo estado
3. El cambio se guarda automáticamente

#### Estados disponibles

| Estado | Color | Significado |
|--------|-------|-------------|
| **Nueva** | Azul | Solicitud recién recibida, sin revisar |
| **En Revisión** | Amarillo | Se está revisando la documentación |
| **Docs. Pendientes** | Naranja | Faltan documentos por entregar |
| **Aceptada** | Verde | Solicitud aprobada |
| **Rechazada** | Rojo | Solicitud no aprobada |

#### Flujo recomendado

```
Nueva → En Revisión → Docs. Pendientes (si faltan documentos)
                     → Aceptada (si todo está completo)
                     → Rechazada (si no procede)
```

### Documentos

En esta sección verás la lista de documentos requeridos y el estado de cada uno.

Para cada documento puedes:

1. **Ver/Descargar** — si el solicitante lo subió por la página, aparece un botón "Descargar"
2. **Cambiar estado** — usa el menú desplegable:
   - **Pendiente** — aún no se ha recibido
   - **Subido** — el solicitante lo subió por la página
   - **Recibido Externo** — se recibió en persona, por WhatsApp, o por otro medio
   - **Aprobado** — el documento fue revisado y es válido
   - **Rechazado** — el documento no es válido (borroso, incompleto, etc.)
3. **Agregar notas** — escribe observaciones (ej: "Copia borrosa, solicitar de nuevo")
4. Haz clic en **Guardar** para guardar los cambios

> **Ejemplo:** Un solicitante entrega su INE en las oficinas. Cambia el estado a "Recibido Externo" y agrega una nota: "Entregado en oficina el 15 de marzo".

### Notas Internas

En el panel derecho hay un espacio para escribir notas que **solo el equipo administrativo puede ver**. El solicitante nunca verá estas notas.

Usa este espacio para:
- Anotar detalles de llamadas telefónicas
- Registrar acuerdos o compromisos
- Cualquier observación relevante

Haz clic en **Guardar** después de escribir.

### Enviar Correos

En la sección de **Comunicación** puedes enviar correos electrónicos directamente al solicitante.

#### Usar una plantilla

1. Haz clic en el menú **"Usar plantilla..."**
2. Selecciona una opción:
   - **Documentos pendientes** — informa qué documentos faltan
   - **Solicitud aceptada** — felicita y explica los siguientes pasos
   - **Solicitud rechazada** — notifica que no procede (incluye espacio para el motivo)
3. La plantilla llena automáticamente el asunto y el mensaje
4. **Revisa y edita** el mensaje antes de enviarlo
5. Haz clic en **Enviar**

#### Escribir un correo personalizado

1. Escribe el **Asunto**
2. Escribe el **Mensaje**
3. Haz clic en **Enviar**

Todos los correos enviados aparecen en el **Historial** debajo del formulario, con la fecha, asunto y quién lo envió.

### Exportar PDF

Para generar un expediente imprimible de una solicitud individual:

1. En la vista de detalle, haz clic en el botón **Exportar PDF** (esquina superior derecha)
2. Se descargará un archivo PDF con:
   - Encabezado de la Universidad Frontera Norte
   - Datos completos del solicitante
   - Estado de cada documento
   - Historial de comunicación

Este PDF es útil para archivo físico o para compartir la información de un solicitante con otros miembros del equipo.

---

## Flujo de Trabajo Recomendado

### Cuando llega una solicitud nueva

1. Abre la solicitud (estado: **Nueva**)
2. Revisa los datos personales
3. Cambia el estado a **En Revisión**
4. Revisa los documentos:
   - Si están completos y válidos → marca cada uno como **Aprobado**
   - Si faltan documentos → cambia el estado a **Docs. Pendientes** y envía el correo de "Documentos pendientes"
5. Si todo está en orden → cambia el estado a **Aceptada** y envía el correo de "Solicitud aceptada"

### Cuando un solicitante entrega documentos en persona

1. Busca al solicitante en la lista
2. Abre su solicitud
3. En la sección de documentos, cambia el estado del documento a **Recibido Externo**
4. Agrega una nota con la fecha y cualquier observación
5. Haz clic en **Guardar**
6. Si ya tiene todos los documentos, actualiza el estado general de la solicitud

### Cuando necesitas un reporte

1. En la lista de solicitudes, aplica los filtros que necesites
2. Haz clic en **CSV** o **Excel** para descargar
3. El archivo incluye solo las solicitudes filtradas

---

## Preguntas Frecuentes

**¿Puedo tener varios usuarios administradores?**
Sí. Cada miembro del equipo puede tener su propia cuenta. Contacta al administrador técnico para crear nuevas cuentas.

**¿El solicitante puede ver el estado de su solicitud?**
No. El solicitante solo recibe los correos que tú le envíes. No tiene acceso al panel.

**¿Qué pasa si envío un correo con error?**
El correo ya fue enviado y no se puede retirar. Envía un correo de seguimiento con la corrección.

**¿Puedo agregar nuevos tipos de documentos requeridos?**
Sí, pero esto lo debe hacer el administrador técnico desde la base de datos. Contacta a tu equipo técnico.

**¿Los datos están seguros?**
Sí. La información se almacena en Supabase con políticas de seguridad. Solo los usuarios autenticados pueden ver las solicitudes. Los documentos están en un almacenamiento privado.

**¿Puedo acceder desde mi celular?**
Sí. El panel funciona en cualquier navegador, incluyendo dispositivos móviles, aunque se recomienda usar una computadora para mayor comodidad.
