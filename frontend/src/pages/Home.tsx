import Hero from '@/components/sections/Hero';
import ContactCta from '@/components/sections/ContactCta';
import SEO from '@/components/layout/SEO';
import { profile, projects } from '@/data/portfolio';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import FloatingTech from '@/components/sections/FloatingTech';

export default function Home() {
  const featured = projects.slice(0, 3);

  // `featured[0].image` no existe en el tipo Project, así que este valor
  // caía SIEMPRE en la imagen de ejemplo de Aceternity: la home mostraba
  // la plantilla "Deploy your website in seconds" de otra empresa
  // presentada como si fuera su proyecto. Ahora usa su captura real.
  const macbookShot = featured[0]?.coverImage ?? featured[0]?.gallery?.[0]?.src;

  return (
    <>
      <SEO title={`${profile.fullName} — ${profile.role}`} description={profile.tagline} />

      <Hero />

      {/* El componente ya define su propia altura (min-h-[100vh]) y su
          animación depende de recorrerla entera. Envolverlo en una sección
          con altura fija, `flex items-center` y `overflow-hidden` rompía el
          cálculo del scroll y recortaba la tapa. Acá sólo se le da aire. */}
      <section className="relative z-20 w-full pb-24 md:pb-40">
        <FloatingTech />
        <MacbookScroll
          title={
            <span className="t-h2 block text-[var(--color-paper)]">
              {featured[0]?.title.split('—')[0].trim()}
              <span className="block text-[var(--color-muted)]">en acción</span>
            </span>
          }
          src={macbookShot}
          showGradient={false}
        />
      </section>

      <ContactCta />
    </>
  );
}