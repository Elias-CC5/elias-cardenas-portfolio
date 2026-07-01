# Documentación de la API

Base URL local: `http://localhost:4000/api`

Todas las respuestas siguen este formato consistente:

```json
{
  "success": true,
  "data": { },
  "message": "Texto opcional"
}
```

En caso de error:

```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": { "campo": "Detalle de validación" }
}
```

---

## Autenticación

La mayoría de rutas de escritura (`POST`, `PUT`, `DELETE`) requieren un JWT. Envíalo como:

```
Authorization: Bearer <token>
```

o automáticamente vía cookie `token` (se setea al hacer login).

### `POST /api/auth/login`

Inicia sesión como administrador.

**Body:**
```json
{ "email": "failocdns871@gmail.com", "password": "tu-contraseña" }
```

**Respuesta 200:**
```json
{ "success": true, "data": { "token": "...", "user": { "id": "...", "name": "...", "role": "ADMIN" } } }
```

### `POST /api/auth/logout`
Cierra sesión (limpia la cookie).

### `GET /api/auth/me` 
Devuelve el usuario autenticado actual.

---

## Salud del servidor

### `GET /api/health`
Verifica que la API esté corriendo. No requiere autenticación.

---

## Proyectos

### `GET /api/projects`
Lista todos los proyectos, ordenados por `order`. Público.

### `GET /api/projects/:slug`
Obtiene un proyecto por su slug. Público.

### `POST /api/projects` 
Crea un proyecto. Requiere rol `ADMIN` o `EDITOR`.

**Body:**
```json
{
  "title": "Mi Proyecto",
  "slug": "mi-proyecto",
  "description": "Descripción breve",
  "bullets": ["Punto 1", "Punto 2"],
  "tech": ["React", "Node.js"],
  "status": "COMPLETED",
  "featured": true,
  "order": 1
}
```

### `PUT /api/projects/:id` 
Actualiza un proyecto existente. Mismo body que arriba (todos los campos opcionales).

### `DELETE /api/projects/:id`
Elimina un proyecto. Requiere rol `ADMIN`.

---

## Habilidades (Skills)

### `GET /api/skills`
Lista todas las habilidades agrupadas por categoría. Público.

### `POST /api/skills` 
```json
{ "name": "Docker", "category": "TOOLS", "order": 5 }
```
Categorías válidas: `FRONTEND`, `BACKEND`, `DATABASE`, `CLOUD`, `TOOLS`, `SOFT_SKILLS`.

### `PUT /api/skills/:id` 
### `DELETE /api/skills/:id`  (rol ADMIN)

---

## Experiencia

### `GET /api/experience`
Lista la experiencia laboral/académica. Público.

### `POST /api/experience` 
```json
{
  "role": "Desarrollador Backend",
  "organization": "Empresa S.A.",
  "period": "2026 - Actualidad",
  "current": true,
  "bullets": ["Logro 1", "Logro 2"],
  "order": 1
}
```

### `PUT /api/experience/:id` 
### `DELETE /api/experience/:id`  (rol ADMIN)

---

## Certificados

### `GET /api/certificates`
Público.

### `POST /api/certificates` 
```json
{
  "title": "AWS Certified Developer",
  "issuer": "Amazon Web Services",
  "issueDate": "2026-03-15",
  "credentialUrl": "https://...",
  "category": "Cloud",
  "order": 1
}
```

### `PUT /api/certificates/:id` 
### `DELETE /api/certificates/:id`  (rol ADMIN)

---

## Mensajes de contacto

### `POST /api/contact`
Endpoint público del formulario de contacto. Limitado a 5 solicitudes cada 15 minutos por IP.

```json
{ "name": "Juan Pérez", "email": "juan@email.com", "message": "Hola, quiero hablar sobre un proyecto..." }
```

### `GET /api/contact` 
Lista todos los mensajes recibidos. Requiere rol `ADMIN` o `EDITOR`.

### `PATCH /api/contact/:id` 
Actualiza el estado de un mensaje.
```json
{ "status": "READ" }
```
Valores válidos: `UNREAD`, `READ`, `ARCHIVED`.

### `DELETE /api/contact/:id` 
Elimina un mensaje. Requiere rol `ADMIN`.

---

## Perfil

### `GET /api/profile/social-links`
Lista los enlaces sociales activos. Público.

### `GET /api/profile/education`
Lista la formación académica. Público.

---

## Códigos de estado

| Código | Significado |
|---|---|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 401 | No autenticado (falta o token inválido) |
| 403 | Autenticado pero sin permisos suficientes |
| 404 | Recurso no encontrado |
| 422 | Error de validación en el body |
| 429 | Demasiadas solicitudes (rate limit) |
| 500 | Error interno del servidor |
