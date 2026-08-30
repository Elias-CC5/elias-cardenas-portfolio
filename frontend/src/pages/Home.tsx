import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Hero from '@/components/sections/Hero';
import ContactCta from '@/components/sections/ContactCta';
import SectionHeading from '@/components/ui/SectionHeading';
import SEO from '@/components/layout/SEO';
import { profile, projects } from '@/data/portfolio';

/**
 * La versión anterior de la home era únicamente el Hero: el visitante
 * llegaba, leía una frase y tenía que ir a buscar el trabajo a otra página.
 * En un portafolio, el trabajo tiene que estar sobre la primera pantalla de
 * scroll.
 */
export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <SEO title={`${profile.fullName} — ${profile.role}`} description={profile.tagline} />

      <Hero />

      <section className="shell section">
        <SectionHeading
          index="01"
          eyebrow="Trabajo seleccionado"
          title="Proyectos que llegaron a producción"
          action={
            <Link
              to="/proyectos"
              className="group inline-flex items-center gap-2 text-sm text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
            >
              <span className="link-underline">Ver los {projects.length}</span>
              <FiArrowRight
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
              />
            </Link>
          }
        />

        <div className="mt-14 md:mt-16">
        </div>
      </section>

      <ContactCta />
    </>
  );
}
