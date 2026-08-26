export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | 'phone';
}

export interface Profile {
  fullName: string;
  firstName: string;
  role: string;
  tagline: string;
  about: string;
  shortAbout: string;
  location: string;
  email: string;
  phone: string;
  socials: SocialLink[];
  availability: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  level?: number; // 1-5, optional visual weight
}

export interface GalleryImage {
  src: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  period?: string;
  description: string;
  longDescription?: string;
  bullets: string[];
  features?: string[];
  tech: string[];
  status: 'completed' | 'in-progress';
  teamType: 'individual' | 'team';
  myRole: string;
  context?: string; // e.g. "Proyecto de tesis", "Proyecto académico TECSUP"
  /**
   * true cuando el proyecto se hizo para una empresa real (no académico).
   * Es un campo propio a propósito: la cabecera de /proyectos afirma
   * "N de estos 5 los usa una empresa de verdad", y esa cifra no puede
   * depender de buscar la palabra "TECSUP" dentro de un texto libre que
   * cambia cada vez que se reescribe una descripción.
   */
  realClient?: boolean;
  coverImage?: string;
  gallery?: GalleryImage[];
  repoUrl?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Stat {
  value: string;
  label: string;
}
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  description?: string;
  credentialId?: string;
  credentialUrl: string;
  /** Ruta al logo del emisor, relativa a /public. */
  logo?: string;
  /** Color de marca del emisor. Es el único sitio del sitio donde entra
      color ajeno a la paleta, y se usa sólo dentro de la tarjeta. */
  color?: string;
}
