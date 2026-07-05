import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // --- Admin user ---
  const adminEmail = process.env.ADMIN_EMAIL ?? 'failocdns871@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'changeme123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: process.env.ADMIN_NAME ?? 'Elías Cárdenas',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Usuario admin listo: ${adminEmail}`);

  // --- Projects ---
  await prisma.project.upsert({
    where: { slug: 'gestion-pedidos' },
    update: {},
    create: {
      title: 'Sistema Web de Gestión de Pedidos',
      slug: 'gestion-pedidos',
      description:
        'Aplicación Full Stack para administrar pedidos y clientes, con autenticación segura y arquitectura REST.',
      bullets: [
        'Desarrollé una aplicación Full Stack para administrar pedidos y clientes',
        'Implementé autenticación JWT',
        'Diseñé APIs REST con Node.js y NestJS',
        'Base de datos PostgreSQL',
      ],
      tech: ['React', 'Node.js', 'NestJS', 'PostgreSQL'],
      period: '2025 - 2025',
      status: 'COMPLETED',
      featured: true,
      order: 1,
    },
  });

  await prisma.project.upsert({
    where: { slug: 'seguridad-rbac-abac-mfa' },
    update: {},
    create: {
      title: 'Sistema de Seguridad con RBAC, ABAC y MFA',
      slug: 'seguridad-rbac-abac-mfa',
      description:
        'Implementación de control de acceso basado en roles y atributos, junto con autenticación multifactor, sobre una arquitectura Node.js + React + PostgreSQL.',
      bullets: [
        'Autenticación JWT',
        'Control de acceso basado en roles (RBAC)',
        'Control de acceso basado en atributos (ABAC)',
        'Autenticación multifactor (MFA)',
      ],
      tech: ['Node.js', 'React', 'PostgreSQL'],
      period: '2025',
      status: 'COMPLETED',
      featured: true,
      order: 2,
    },
  });
  console.log('✅ Proyectos creados');

  // --- Skills ---
  const skills: { name: string; category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS'; order: number }[] = [
    { name: 'React', category: 'FRONTEND', order: 1 },
    { name: 'Astro', category: 'FRONTEND', order: 2 },
    { name: 'TypeScript', category: 'FRONTEND', order: 3 },
    { name: 'JavaScript (ES6+)', category: 'FRONTEND', order: 4 },
    { name: 'HTML5', category: 'FRONTEND', order: 5 },
    { name: 'Tailwind CSS', category: 'FRONTEND', order: 6 },
    { name: 'Bootstrap', category: 'FRONTEND', order: 7 },
    { name: 'Vite', category: 'FRONTEND', order: 8 },
    { name: 'Axios', category: 'FRONTEND', order: 9 },
    { name: 'C++', category: 'FRONTEND', order: 10 },
    { name: 'Node.js', category: 'BACKEND', order: 1 },
    { name: 'NestJS', category: 'BACKEND', order: 2 },
    { name: 'Express.js', category: 'BACKEND', order: 3 },
    { name: 'Python', category: 'BACKEND', order: 4 },
    { name: 'PHP', category: 'BACKEND', order: 5 },
    { name: 'PostgreSQL', category: 'DATABASE', order: 1 },
    { name: 'MySQL', category: 'DATABASE', order: 2 },
    { name: 'MongoDB', category: 'DATABASE', order: 3 },
    { name: 'SQL Server', category: 'DATABASE', order: 4 },
    { name: 'Supabase', category: 'DATABASE', order: 5 },
    { name: 'Git', category: 'TOOLS', order: 1 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name_category: { name: skill.name, category: skill.category } },
      update: {},
      create: skill,
    });
  }
  console.log(`✅ ${skills.length} habilidades creadas`);

  // --- Experience ---
  await prisma.experience.create({
    data: {
      role: 'Desarrollador Full Stack',
      organization: 'Proyectos académicos — TECSUP',
      period: '2025 - Actualidad',
      current: true,
      bullets: [
        'Desarrollo de APIs REST con NestJS y Node.js',
        'Implementación de JWT y control de acceso',
        'Diseño de bases de datos PostgreSQL',
        'Desarrollo de interfaces con React y Astro',
      ],
      order: 1,
    },
  });
  console.log('✅ Experiencia creada');

  // --- Education ---
  await prisma.education.create({
    data: {
      institution: 'Instituto de Educación Superior Privado TECSUP',
      period: '2024 – 2026',
      description: 'Diseño y Desarrollo de Software',
      order: 1,
    },
  });
  console.log('✅ Educación creada');

  // --- Social Links ---
  const socials = [
    { label: 'GitHub', url: 'https://github.com/Elias-CC5', icon: 'github', order: 1 },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/elias-salomon-cardenas', icon: 'linkedin', order: 2 },
    { label: 'Email', url: 'mailto:failocdns871@gmail.com', icon: 'email', order: 3 },
  ];
  for (const social of socials) {
    const existing = await prisma.socialLink.findFirst({ where: { url: social.url } });
    if (!existing) {
      await prisma.socialLink.create({ data: social });
    }
  }
  console.log('✅ Enlaces sociales creados');

  console.log('🌱 Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
