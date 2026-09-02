import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import Hero from '@/components/sections/Hero';
import SEO from '@/components/layout/SEO';
import Button from '@/components/ui/Button';
import ScrollStack, { PanelBody, TONE_LIGHT } from '@/components/ui/ScrollStack';
import { profile, projects } from '@/data/portfolio';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import FloatingTech from '@/components/sections/FloatingTech';
import TerminalSection from '@/components/sections/TerminalSection';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Portada.
 *
 * Dos bloques que van sueltos y tres que se apilan:
 *
 *   Hero            a sangre, con su propio parallax de scroll.
 *   MacbookScroll    su animación depende de recorrer una altura entera,
 *                    así que no puede vivir dentro de un panel `sticky`.
 *   ── pila ──────────────────────────────────────────────────────────
 *   1. Ficha técnica  (negro)
 *   2. Proyectos      (blanco)
 *   3. Contacto       (negro)
 *
 * Los tres paneles alternan blanco y negro igual que /sobre-mi, y por el
 * mismo mecanismo: `ScrollStack` publica `--fg`, `--bg`, `--line` y `--surf`
 * en cada panel, y el marcado de dentro los lee en lugar de fijar un color.
 *
 * Lo que se apila tiene que caber en una pantalla — lo que sobresale de un
 * `sticky` queda por debajo del pliegue sin forma de llegar. Por eso el panel
 * de proyectos son tres filas y no una grilla.
 */

export default function Home() {
  const featured = projects.slice(0, 3);
  const realClients = projects.filter((p) => p.realClient).length;

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
      {/* `z-0` y no `z-20`: la tapa del Macbook crece con `transform: scale` y
          baja con `translate`, y ninguna de las dos cosas cambia su caja de
          layout — la tapa se sale de la seccion por abajo. Con z-20 esa parte
          sobrante se pintaba ENCIMA del primer panel apilado. Ahora la seccion
          queda por debajo de la pila, y el `padding-bottom` reserva el alto que
          el `transform` no reserva solo. */}
      <section
        style={TONE_LIGHT as unknown as CSSProperties}
        className="relative z-0 w-full bg-[var(--bg)] pt-10 pb-[34vh] md:pt-16 md:pb-[44vh]"
      >
        {/* Banda blanca a sangre, sin `overflow-hidden` ni esquinas
            redondeadas: la tapa se sale de su caja por abajo, y recortarla
            o dejarla caer sobre el fondo oscuro se ve peor que darle una
            banda entera para aterrizar. */}
        <FloatingTech />
        <MacbookScroll
          title={
            <span className="t-h2 block text-[var(--fg)]">
              {featured[0]?.title.split('—')[0].trim()}
              <span className="block text-[var(--fg-mute)]">en acción</span>
            </span>
          }
          src={macbookShot}
          showGradient={false}
        />
      </section>

      <div className="relative z-10 pb-32 md:pb-40">
        <ScrollStack>
          {/* ── 1. Ficha técnica ─────────────────────────────────── */}
          <PanelBody>
            <TerminalSection />
          </PanelBody>

          {/* ── 2. Proyectos ─────────────────────────────────────── */}
          <PanelBody>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.07)}
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
                <div>
                  <span className="t-label block text-[var(--fg-mute)]">Trabajo</span>
                  <h2 className="t-h2 mt-4 max-w-xl text-[var(--fg)]">
                    {projects.length} proyectos,
                    <span className="block text-[var(--fg-mute)]">
                      {realClients} para empresas reales.
                    </span>
                  </h2>
                </div>
                <span className="t-num hidden shrink-0 text-[var(--fg-mute)] md:block">
                  {String(projects.length).padStart(2, '0')}
                </span>
              </motion.div>

              <ul className="mt-10 border-t border-[var(--line)]">
                {featured.map((project, i) => {
                  const cover = project.coverImage ?? project.gallery?.[0]?.src;
                  return (
                    <motion.li key={project.id} variants={fadeUp}>
                      <Link
                        to={`/proyectos/${project.slug}`}
                        className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-[var(--line)] py-5 transition-colors duration-[var(--duration-quick)] hover:bg-[var(--surf)] sm:gap-7"
                      >
                        <span className="flex items-center gap-5">
                          <span className="t-label hidden text-[var(--fg-mute)] tabular-nums sm:block">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="block h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-[var(--line)] bg-[#09090a] sm:h-[4.5rem] sm:w-28">
                            {cover ? (
                              <img
                                src={cover}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
                              />
                            ) : null}
                          </span>
                        </span>

                        <span className="min-w-0">
                          <span className="t-h3 block truncate text-[var(--fg)]">
                            {project.title.split('—')[0].trim()}
                          </span>
                          <span className="t-label mt-2 block truncate text-[var(--fg-mute)]">
                            {project.tech.slice(0, 4).join(' · ')}
                          </span>
                        </span>

                        <span className="flex shrink-0 items-center gap-4">
                          {project.realClient ? (
                            <span className="t-label hidden rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[var(--fg-dim)] lg:block">
                              Cliente real
                            </span>
                          ) : null}
                          <FiArrowUpRight
                            aria-hidden="true"
                            className="size-4 text-[var(--fg-mute)] transition-[color,transform] duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]"
                          />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.p variants={fadeUp} className="mt-6">
                <Link
                  to="/proyectos"
                  className="t-label inline-flex items-center gap-1.5 text-[var(--fg-mute)] transition-colors duration-[var(--duration-quick)] hover:text-[var(--fg)]"
                >
                  Ver los {projects.length} proyectos
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
              </motion.p>
            </motion.div>
          </PanelBody>

          {/* ── 3. Contacto ──────────────────────────────────────── */}
          <PanelBody>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              <motion.span variants={fadeUp} className="t-label block text-[var(--fg-mute)]">
                Contacto
              </motion.span>

              <motion.h2 variants={fadeUp} className="t-h1 mt-6 max-w-2xl text-[var(--fg)]">
                Estoy disponible.
                <span className="block text-[var(--fg-mute)]">Escribime y lo vemos.</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
                <Button to="/contacto" variant="primary">
                  Hablemos
                  <FiArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
                  />
                </Button>
                <Button href="/cv-elias-cardenas.pdf" download external variant="secondary">
                  Descargar CV <FiDownload aria-hidden="true" />
                </Button>
              </motion.div>

              <motion.dl
                variants={fadeUp}
                className="mt-14 grid grid-cols-2 border-t border-[var(--line)] md:grid-cols-4"
              >
                {[
                  { label: 'Base', value: 'Lima, Perú' },
                  { label: 'Email', value: profile.email },
                  { label: 'Estado', value: 'Disponible' },
                  { label: 'Respuesta', value: 'Mismo día' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-[var(--line)] py-5 pr-6 md:border-b-0"
                  >
                    <dt className="t-label text-[var(--fg-mute)]">{item.label}</dt>
                    <dd className="t-body mt-2 truncate text-[var(--fg)]">{item.value}</dd>
                  </div>
                ))}
              </motion.dl>
            </motion.div>
          </PanelBody>
        </ScrollStack>
      </div>
    </>
  );
}
