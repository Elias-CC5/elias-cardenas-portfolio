import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { profile } from '@/data/portfolio';
import { NAV_LINKS } from '@/lib/nav';

const SOCIAL_ICONS: Record<string, IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
};

/**
 * Pie de página.
 *
 * Los enlaces de navegación se leen de `NAV_LINKS`: antes había una segunda
 * lista escrita a mano acá, así que añadir una página obligaba a acordarse
 * de tocar dos archivos.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] border-t border-[var(--color-border)] bg-[var(--color-ink)]">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--color-paper)]">
              {profile.fullName}
            </p>
            <p className="t-num mt-1 text-xs text-[var(--color-muted)]">
              {profile.role} · {profile.location}
            </p>

            <div className="mt-6 flex gap-2">
              {profile.socials
                .filter((social) => social.icon in SOCIAL_ICONS)
                .map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-paper-dim)] transition-colors duration-[var(--duration-quick)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-paper)]"
                    >
                      <Icon size={15} aria-hidden="true" />
                    </a>
                  );
                })}
            </div>
          </div>

          <nav aria-label="Pie de página">
            <p className="t-label text-[var(--color-muted)]">Navegación</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.filter((link) => link.to !== '/').map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-sm text-[var(--color-paper-dim)] transition-colors duration-[var(--duration-quick)] hover:text-[var(--color-paper)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-label text-[var(--color-muted)]">Contacto</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-underline text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="link-underline text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
                >
                  {profile.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-num text-[0.6875rem] text-[var(--color-muted)]">
            © {year} {profile.fullName}
          </p>
          <p className="t-num text-[0.6875rem] text-[var(--color-muted)]">
            React · TypeScript · Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
