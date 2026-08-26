/** Fuente única de la navegación. Antes vivía duplicada en Navbar y Footer. */
export interface NavLink {
  to: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { to: '/', label: 'Inicio' },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/experiencia', label: 'Experiencia' },
  { to: '/habilidades', label: 'Skills' },
  { to: '/contacto', label: 'Contacto' },
];
