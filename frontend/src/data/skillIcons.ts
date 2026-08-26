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
   // Nuevos iconos corregidos:
  SiIntellijidea,
  SiPostman,
  SiGithub,
  SiNpm,
  SiFirebase,
  SiXcode,
} from 'react-icons/si';
import { FiDatabase } from 'react-icons/fi';

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
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
   // Herramientas de desarrollo
  'IntelliJ IDEA': { icon: SiIntellijidea, color: '#fe2857' },
  'Android Studio': { icon: DiAndroid, color: '#3DDC84' },
  Xcode: { icon: SiXcode, color: '#147EFB' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  GitHub: { icon: SiGithub, color: '#FFFFFF' },
  XAMPP: { icon: FaServer, color: '#FB3E04' },
  npm: { icon: SiNpm, color: '#CB3837' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' }
};

export function getSkillIcon(name: string): IconConfig {
  return skillIconMap[name] ?? { icon: FiDatabase, color: '#71717A' };
}