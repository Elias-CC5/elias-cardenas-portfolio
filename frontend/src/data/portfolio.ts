import type { Profile, Skill, Project, ExperienceItem, EducationItem, Stat } from '@/types';

export const profile: Profile = {
  fullName: 'Elías Salomón Cárdenas Cuellar',
  firstName: 'Elías',
  role: 'Desarrollador Full Stack',
  tagline: 'Construyo APIs, sistemas y UIs que no se caen a las 3 a.m.',
  shortAbout:
    'Estudiante de Diseño y Desarrollo de Software en TECSUP con experiencia construyendo aplicaciones web full-stack enfocadas en autenticación, gestión de datos y arquitectura backend limpia.',
  about:
    'Soy desarrollador backend apasionado por crear sistemas que resuelven problemas reales. Con un enfoque en arquitecturas limpias y APIs confiables, transformo requisitos complejos en servicios que escalan sin volverse imposibles de mantener. Trabajo cómodo en el stack completo: desde APIs REST con NestJS/Node.js hasta interfaces modernas con React y Astro. La seguridad y el testing son parte del diseño desde el primer commit, no un parche al final.',
  location: 'Villa El Salvador, Lima, Perú',
  email: 'failocdns871@gmail.com',
  phone: '+51 925832943',
  availability: 'Disponible para proyectos',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Elias-CC5', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/elias-salomon-cardenas', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:failocdns871@gmail.com', icon: 'email' },
    { label: 'Teléfono', url: 'tel:+51925832943', icon: 'phone' },
  ],
};

export const stats: Stat[] = [
  { value: '3', label: 'Proyectos completados' },
  { value: '2+', label: 'Años de experiencia' },
  { value: '5', label: 'Tech stack core' },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Astro', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript (ES6+)', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Bootstrap', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Axios', category: 'frontend' },
  { name: 'C++', category: 'frontend' },
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'NestJS', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'PHP', category: 'backend' },
  // Database
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'SQL Server', category: 'database' },
  { name: 'Supabase', category: 'database' },
  // Tools
  { name: 'GitHub', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'npm', category: 'tools' },
  { name: 'Vite', category: 'tools' },
  { name: 'Firebase', category: 'tools' },
  { name: 'IntelliJ IDEA', category: 'tools' },
  { name: 'Android Studio', category: 'tools' },
  { name: 'XAMPP', category: 'tools' },
];

export const projects: Project[] = [
  {
    id: 'gestion-pedidos',
    slug: 'gestion-pedidos',
    title: 'Sistema Web de Gestión de Pedidos',
    period: '2025 - 2025',
    description: 'Aplicación Full Stack para administrar pedidos y clientes, con autenticación segura y arquitectura REST.',
    bullets: [
      'Desarrollé una aplicación Full Stack para administrar pedidos y clientes',
      'Implementé autenticación JWT',
      'Diseñé APIs REST con Node.js y NestJS',
      'Base de datos PostgreSQL',
    ],
    tech: ['React', 'Node.js', 'NestJS', 'PostgreSQL'],
    status: 'completed',
    teamType: 'individual',
    myRole: 'Desarrollo Full Stack',
    context: 'Proyecto académico — TECSUP',
  },
  {
    id: 'apuestas-jwv',
    slug: 'apuestas-jwv',
    title: 'Plataforma de Apuestas Internas (JWV)',
    period: '2026',
    description:
      'Plataforma de apuestas internas para la red de estudiantes de TECSUP, donde los usuarios se registran y apuestan entre ellos usando puntos en lugar de dinero real.',
    longDescription:
      'JWV es una plataforma social pensada para la comunidad de TECSUP: los estudiantes se registran y pueden apostar puntos (no dinero real) en distintos eventos, compitiendo entre ellos dentro de la misma red. Mi responsabilidad fue el diseño de la arquitectura backend que soporta el registro de usuarios, la gestión de apuestas y el sistema de puntos, trabajando en equipo con otros compañeros de TECSUP.',
    bullets: [
      'Diseño de la arquitectura backend del sistema de apuestas',
      'Sistema de puntos en lugar de dinero real',
      'Registro y gestión de usuarios dentro de la red de TECSUP',
    ],
    tech: ['React', 'Vite', 'JavaScript', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'docker'],
    status: 'completed',
    teamType: 'team',
    myRole: 'Diseño de backend',
    context: 'Proyecto en equipo — TECSUP',
    repoUrl: 'https://github.com/FAILO123/apuestas_jwv',
    gallery: [
      { src: '/images/Apuestas%20JWV/LOGIN.png', label: 'Login' },
      { src: '/images/Apuestas%20JWV/register.png', label: 'Registro' },
      { src: '/images/Apuestas%20JWV/Dashboardadmin.png', label: 'Dashboard admin' },
      { src: '/images/Apuestas%20JWV/SALAS.png', label: 'Salas' },
      { src: '/images/Apuestas%20JWV/ELIMINATORIAS.png', label: 'Eliminatorias' },
      { src: '/images/Apuestas%20JWV/Fase%20de%20Grupos.png', label: 'Fase de grupos' },
      { src: '/images/Apuestas%20JWV/Jugadores.png', label: 'Jugadores' },
      { src: '/images/Apuestas%20JWV/Partidos(ADMIN).png', label: 'Partidos (admin)' },
      { src: '/images/Apuestas%20JWV/PREDICE.png', label: 'Predice' },
      { src: '/images/Apuestas%20JWV/Mis%20Apuestas.png', label: 'Mis apuestas' },
      { src: '/images/Apuestas%20JWV/Mi%20perfil.png', label: 'Mi perfil' },
      { src: '/images/Apuestas%20JWV/Ranking%20.png', label: 'Ranking' },
      { src: '/images/Apuestas%20JWV/Torneo(ADMIN).png', label: 'Torneo (admin)' },
      { src: '/images/Apuestas%20JWV/Torneo2(admin).png', label: 'Torneo — vista 2' },
      { src: '/images/Apuestas%20JWV/Partido%20globa.png', label: 'Partido global' },
    ],
  },
  {
    id: 'coffee-vibes',
    slug: 'coffee-vibes',
    title: 'Coffee Vibes — E-commerce de Café',
    period: '2026',
    description:
      'E-commerce de café de especialidad desarrollado para una empresa real, con catálogo, checkout y pagos integrados mediante Mercado Pago.',
    longDescription:
      'Coffee Vibes es una tienda en línea para una empresa real de café de especialidad, donde los clientes pueden explorar el catálogo de café molido, bebidas preparadas y accesorios, armar su pedido, elegir entre recojo en tienda o delivery, y pagar de forma segura con Mercado Pago (Checkout Pro). Incluye un panel de administración para gestionar productos, categorías y pedidos. Desarrollé el proyecto de forma individual: base de datos, backend y frontend.',
    features: [
      'Catálogo de productos con filtros por categoría y tipo',
      'Carrito de compras y checkout completo',
      'Seguimiento de pedidos con estados (pendiente, pagado, en preparación, listo, entregado)',
      'Pago en línea integrado con Mercado Pago (Checkout Pro)',
      'Autenticación de usuarios con roles (cliente, dueño, administrador)',
      'Panel de administración para productos, categorías y pedidos',
      'Gestión de direcciones de entrega',
    ],
    bullets: [
      'Diseño y modelado de la base de datos con Prisma + PostgreSQL',
      'Desarrollo del backend con Node.js + Express',
      'Desarrollo del frontend con Next.js + Tailwind CSS',
      'Integración de pagos con Mercado Pago SDK',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    status: 'completed',
    teamType: 'individual',
    myRole: 'Base de datos, backend y frontend',
    context: 'Proyecto para empresa real de café',
    repoUrl: 'https://github.com/FAILO123/Coffee-shop-with-Mercado-Pago',
    gallery: [
      { src: '/images/Coffee%20Vibes/Paginaprincipal.png', label: 'Página principal' },
      { src: '/images/Coffee%20Vibes/Catálogo.png', label: 'Catálogo' },
      { src: '/images/Coffee%20Vibes/CATEGORIAS.png', label: 'Categorías' },
      { src: '/images/Coffee%20Vibes/Ingresa%20a%20tu%20cuenta.png', label: 'Inicio de sesión' },
      { src: '/images/Coffee%20Vibes/pedidosuser.png', label: 'Pedidos del usuario' },
      { src: '/images/Coffee%20Vibes/ver%20pedidos.png', label: 'Ver pedidos' },
      { src: '/images/Coffee%20Vibes/Confirma%20tu%20pedido.png', label: 'Confirmar pedido' },
      { src: '/images/Coffee%20Vibes/Cómo%20quieres%20pagar.png', label: 'Método de pago' },
      { src: '/images/Coffee%20Vibes/Checkout.png', label: 'Checkout' },
      { src: '/images/Coffee%20Vibes/Resumen%20.png', label: 'Resumen del pedido' },
      { src: '/images/Coffee%20Vibes/Avanzar%20estado%20del%20pedido.png', label: 'Estado del pedido (admin)' },
      { src: '/images/Coffee%20Vibes/Crear%20Producto(Admin).png', label: 'Crear producto (admin)' },
    ],
  },
  {
    id: 'tesis-catering',
    slug: 'tesis-catering',
    title: 'E-commerce para Empresa de Catering (Tesis)',
    period: '2026',
    description:
      'E-commerce desarrollado como proyecto de tesis para una empresa real de catering, donde los usuarios exploran productos y hacen reservas, con un panel de administración completo y chatbot integrado.',
    longDescription:
      'Como proyecto de tesis, el equipo buscó una empresa real de catering para desarrollar su tienda en línea. Los usuarios pueden explorar los productos y hacer reservas directamente con la empresa. Lo más destacado es el panel de administración, donde se puede verificar el stock, agregar o eliminar productos, gestionar usuarios y crear promociones. El sitio incluye además un chatbot integrado para responder preguntas sobre los productos, y el checkout utiliza Culqi como billetera digital de pago. Mi responsabilidad fue el diseño del frontend: una interfaz confiable, clara y fácil de entender para el usuario final.',
    features: [
      'Catálogo de productos y sistema de reservas con la empresa',
      'Panel de administración: stock, productos, usuarios y promociones',
      'Chatbot integrado para consultas sobre productos',
      'Checkout con Culqi como billetera digital de pago',
    ],
    bullets: [
      'Diseño de un frontend confiable y fácil de entender para el usuario',
      'Maquetado y experiencia de usuario del catálogo y checkout',
      'Trabajo en equipo dentro de un proyecto de tesis',
    ],
    tech: ['Astro', 'TypeScript', 'CSS', 'React', 'Vite', 'Axios', 'Tailwind CSS', 'NestJS', 'Node.js', 'TypeORM', 'PostgreSQL', 'JWT (JSON Web Token)', 'Bcrypt', 'OpenRouter (SDK de OpenAI)', 'ST APIRE'],
    status: 'completed',
    teamType: 'team',
    myRole: 'Diseño de frontend',
    context: 'Proyecto de tesis — Empresa de catering',
    repoUrl: 'https://github.com/Jefferson-BA/TesisFrontend',
    gallery: [
      { src: '/images/E-COMMERCE/INICIO.png', label: 'Inicio' },
      { src: '/images/E-COMMERCE/MENU.png', label: 'Menú' },
      { src: '/images/E-COMMERCE/MENU2.png', label: 'Menú — vista 2' },
      { src: '/images/E-COMMERCE/Catálogo%20de%20Productos.png', label: 'Catálogo de productos' },
      { src: '/images/E-COMMERCE/LOGIN.png', label: 'Inicio de sesión' },
      { src: '/images/E-COMMERCE/REGISTER.png', label: 'Registro' },
      { src: '/images/E-COMMERCE/RESERVA.png', label: 'Reserva' },
      { src: '/images/E-COMMERCE/RESERVA2.png', label: 'Reserva — vista 2' },
      { src: '/images/E-COMMERCE/Reservas%20Eventos.png', label: 'Reservas de eventos' },
      { src: '/images/E-COMMERCE/VISTA.png', label: 'Vista del producto' },
      { src: '/images/E-COMMERCE/Gestión%20de%20Pedidos.png', label: 'Gestión de pedidos (admin)' },
      { src: '/images/E-COMMERCE/Gestión%20de%20Pedidos2.png', label: 'Gestión de pedidos — vista 2' },
      { src: '/images/E-COMMERCE/Gestión%20de%20Productos.png', label: 'Gestión de productos (admin)' },
      { src: '/images/E-COMMERCE/Panel%20de%20Administración.png', label: 'Panel de administración' },
      { src: '/images/E-COMMERCE/Promociones.png', label: 'Promociones' },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'fullstack-actual',
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
  },
];

export const education: EducationItem[] = [
  {
    id: 'tecsup',
    institution: 'Instituto de Educación Superior Privado TECSUP',
    period: '2024 – 2026',
    description: 'Diseño y Desarrollo de Software',
  },
];

export const certificates = [
  {
    id: 'cisco-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    issueDate: 'Octubre 2024',
    category: 'Ciberseguridad',
    description: 'Conocimientos fundamentales en seguridad digital...',
    credentialId: 'dcb4ac6b-c369-45cd-b8a0-64aad2e4deb5',
    credentialUrl: '/certificados/certificado-cisco.pdf',
    logo: '/images/Logo/CISCO.png', // <-- CORREGIDO AQUÍ
    color: '#049FD9'
  },
  {
    id: 'aws-billing',
    title: 'AWS Billing and Cost Management',
    issuer: 'Amazon Web Services',
    issueDate: 'Julio 2025',
    category: 'Cloud',
    description: 'Gestión de costos y facturación en servicios de AWS.',
    credentialId: '',
    credentialUrl: '/certificados/AWS Billing and Cost Management (Español LATAM).pdf',
    logo: '/images/Logo/AWS.png', // <-- CORREGIDO AQUÍ
    color: '#FF9900'
  },
  {
    id: 'aws-generative-ai',
    title: 'AWS Partner Generative AI',
    issuer: 'Amazon Web Services',
    issueDate: 'Julio 2026',
    category: 'Cloud / IA',
    description: 'Fundamentos de inteligencia artificial generativa...',
    credentialId: '',
    credentialUrl: '/certificados/AWS Partner Generative AI.pdf',
    logo: '/images/Logo/AWS.png', // <-- CORREGIDO AQUÍ
    color: '#FF9900'
  },
  {
    id: 'curso-poo',
    title: 'Programación Orientada a Objetos',
    issuer: 'EDteam',
    issueDate: 'Julio 2026',
    category: 'Programación',
    description: 'Principios de POO aplicados al desarrollo de software moderno.',
    credentialId: '',
    credentialUrl: '/certificados/certificado-curso-poo (1).pdf',
    logo: '/images/Logo/EDTEAM.png', // <-- CORREGIDO AQUÍ
    color: '#00BC71'
  },
  {
    id: 'fundamentals-ml',
    title: 'Fundamentals of Machine Learning',
    issuer: 'Amazon Web Services',
    issueDate: 'Julio 2026',
    category: 'Cloud / IA',
    description: 'Fundamentos de machine learning...',
    credentialId: '',
    credentialUrl: '/certificados/Fundamentals of Machine Learning and Artificial Intelligence.pdf',
    logo: '/images/Logo/AWS.png', // <-- CORREGIDO AQUÍ
    color: '#FF9900'
  },
  {
    id: 'intro-generative-ai',
    title: 'Introduction to Generative AI',
    issuer: 'Amazon Web Services',
    issueDate: 'Julio 2026',
    category: 'Cloud / IA',
    description: 'Introducción a los modelos de IA generativa...',
    credentialId: '',
    credentialUrl: '/certificados/Introduction to Generative AI (Español LATAM.pdf',
    logo: '/images/Logo/AWS.png', // <-- CORREGIDO AQUÍ
    color: '#FF9900'
  },
];
export const techStackCore = ['React', 'Astro', 'Node.js', 'NestJS', 'PostgreSQL', 'MySQL', 'MongoDB', 'Git'];