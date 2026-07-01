# Portafolio — Elías Salomón Cárdenas Cuellar

Portafolio web profesional full-stack para Elías Cárdenas, Desarrollador Full Stack. Sitio multi-página con animaciones premium, panel de administración y backend propio conectado a PostgreSQL.

![Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Stack](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Stack](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Stack](https://img.shields.io/badge/PostgreSQL-Prisma-336791?logo=postgresql&logoColor=white)

##  Características

- **7 páginas independientes**: Inicio, Sobre mí, Proyectos, Experiencia, Skills, Certificados, Contacto
- **Animaciones premium**: scroll reveal, parallax, text reveal, stagger, glassmorphism, tilt 3D, cursor personalizado, smooth scroll (Lenis)
- **Backend REST completo** con Express + TypeScript + Prisma + PostgreSQL
- **Autenticación JWT** con roles (ADMIN / EDITOR)
- **Formulario de contacto funcional**, conectado a base de datos, con rate-limiting anti-spam
- **Totalmente responsive**: móvil, tablet, laptop, desktop

##  Estructura del proyecto

```
portfolio-elias/
├── frontend/          # React + TypeScript + Vite + Tailwind + Framer Motion + GSAP
├── backend/           # Node.js + Express + TypeScript + Prisma
├── database/          # Schema, migraciones y seed (referencia — vive también en backend/prisma)
├── docs/              # Toda la documentación detallada
└── assets/            # Recursos compartidos
```

##  Inicio rápido

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env        # edita DATABASE_URL y JWT_SECRET
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev                 # http://localhost:4000

# 2. Frontend (en otra terminal)
cd frontend
npm install
cp .env.example .env
npm run dev                 # http://localhost:5173
```

 **Guía detallada paso a paso:** [`docs/manual-instalacion.md`](docs/manual-instalacion.md)
 **Cómo desplegar a producción:** [`docs/manual-despliegue.md`](docs/manual-despliegue.md)
 **Referencia completa de la API:** [`docs/api-documentation.md`](docs/api-documentation.md)
 **Variables de entorno:** [`docs/variables-entorno.md`](docs/variables-entorno.md)

##  Stack tecnológico

**Frontend**
- React 19 + TypeScript
- React Router (multi-página)
- Tailwind CSS v4
- Framer Motion (animaciones de componentes)
- GSAP (animaciones avanzadas de scroll)
- Lenis (smooth scroll)
- React Icons

**Backend**
- Node.js + Express 5 + TypeScript
- Prisma ORM + PostgreSQL
- JWT (jsonwebtoken) + bcryptjs
- Zod (validación de esquemas)
- Helmet, CORS, express-rate-limit (seguridad)

##  Modelo de datos

| Tabla | Descripción |
|---|---|
| `users` | Usuarios admin con acceso al panel |
| `projects` | Proyectos del portafolio |
| `skills` | Habilidades técnicas por categoría |
| `experience` | Experiencia laboral/académica |
| `education` | Formación académica |
| `certificates` | Certificaciones (vacío por ahora — el CV fuente no incluía certificados) |
| `messages` | Mensajes recibidos vía formulario de contacto |
| `social_links` | Enlaces a redes sociales |
| `settings` | Configuración general del sitio |

