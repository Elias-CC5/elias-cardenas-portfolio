import type { IconType } from 'react-icons';
import {
  SiReact,
  SiAstro,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiBootstrap,
  SiVite,
  SiAxios,
  SiCplusplus,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiGit,
  SiNextdotjs,
  SiFramer,
  SiVercel,
   // Nuevos iconos corregidos:
  SiIntellijidea,
  SiPostman,
  SiGithub,
  SiNpm,
  SiFirebase,
  SiXcode,
  SiPrisma,
  SiDocker,
  SiRedis,
  SiSwagger,
  SiZod,
  SiJsonwebtokens,
  SiCloudinary,
  SiRender,
  SiGreensock,
  SiTypeorm,
  SiMercadopago,
  SiFigma,
  SiEslint,
  SiCss,
} from 'react-icons/si';
import { FiDatabase, FiPackage, FiZap, FiFeather } from 'react-icons/fi';
import { VscVscode } from 'react-icons/vsc';

import { DiAndroid } from 'react-icons/di'; 
import { FaServer } from 'react-icons/fa';   
interface IconConfig {
  icon: IconType;
  color: string;
}

// Colores oficiales de marca de cada tecnología — usados como acento sutil en hover
export const skillIconMap: Record<string, IconConfig> = {
  React: { icon: SiReact, color: '#61DAFB' },
  Astro: { icon: SiAstro, color: '#FF5D01' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'JavaScript (ES6+)': { icon: SiJavascript, color: '#F7DF1E' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  Vite: { icon: SiVite, color: '#BD34FE' },
  Axios: { icon: SiAxios, color: '#5A29E4' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  NestJS: { icon: SiNestjs, color: '#E0234E' },
  'Express.js': { icon: SiExpress, color: '#FFFFFF' },
  Python: { icon: SiPython, color: '#3776AB' },
  PHP: { icon: SiPhp, color: '#777BB4' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  'SQL Server': { icon: FiDatabase, color: '#CC2927' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E' },
  Git: { icon: SiGit, color: '#F05032' },
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  'Framer Motion': { icon: SiFramer, color: '#0055FF' },
  Vercel: { icon: SiVercel, color: '#FFFFFF' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
   // Herramientas de desarrollo
  'IntelliJ IDEA': { icon: SiIntellijidea, color: '#fe2857' },
  'Android Studio': { icon: DiAndroid, color: '#3DDC84' },
  Xcode: { icon: SiXcode, color: '#147EFB' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  GitHub: { icon: SiGithub, color: '#FFFFFF' },
  XAMPP: { icon: FaServer, color: '#FB3E04' },
  npm: { icon: SiNpm, color: '#CB3837' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' },

  // Backend y datos
  Prisma: { icon: SiPrisma, color: '#5A67D8' },
  TypeORM: { icon: SiTypeorm, color: '#FE0803' },
  Redis: { icon: SiRedis, color: '#FF4438' },
  Swagger: { icon: SiSwagger, color: '#85EA2D' },
  Zod: { icon: SiZod, color: '#3E67B1' },
  JWT: { icon: SiJsonwebtokens, color: '#D63AFF' },
  'JWT (JSON Web Token)': { icon: SiJsonwebtokens, color: '#D63AFF' },
  // Neon no tiene icono propio en react-icons: se usa el genérico de base
  // de datos con su verde de marca, en lugar de inventar otro logo.
  Neon: { icon: FiDatabase, color: '#00E599' },

  // Infraestructura y despliegue
  Docker: { icon: SiDocker, color: '#2496ED' },
  docker: { icon: SiDocker, color: '#2496ED' },
  Render: { icon: SiRender, color: '#46E3B7' },
  Cloudinary: { icon: SiCloudinary, color: '#3448C5' },

  // Frontend y movimiento
  Motion: { icon: SiFramer, color: '#0055FF' },
  GSAP: { icon: SiGreensock, color: '#88CE02' },
  Lenis: { icon: FiFeather, color: '#B8B8C0' },
  Zustand: { icon: FiPackage, color: '#C4802A' },
  CSS: { icon: SiCss, color: '#663399' },
  CSS3: { icon: SiCss, color: '#663399' },

  // Herramientas
  'VS Code': { icon: VscVscode, color: '#0098FF' },
  'Visual Studio Code': { icon: VscVscode, color: '#0098FF' },
  ESLint: { icon: SiEslint, color: '#4B32C3' },
  Figma: { icon: SiFigma, color: '#F24E1E' },

  // Pagos
  'Mercado Pago': { icon: SiMercadopago, color: '#00B1EA' },
  Culqi: { icon: FiZap, color: '#00A19B' },
  'OpenRouter (SDK de OpenAI)': { icon: FiZap, color: '#8B8BF5' }
};

export function getSkillIcon(name: string): IconConfig {
  return skillIconMap[name] ?? { icon: FiPackage, color: '#71717A' };
}