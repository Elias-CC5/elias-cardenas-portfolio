import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiDownload, FiMail } from 'react-icons/fi';
import SEO from '@/components/layout/SEO';
import Button from '@/components/ui/Button';
import ScrollStack, { PanelBody } from '@/components/ui/ScrollStack';
import Photo3D from '@/components/ui/Photo3D';
import CertificateRail from '@/components/sections/CertificateRail';
import { profile, projects, education, certificates, techStackCore } from '@/data/portfolio';
import { getSkillIcon } from '@/data/skillIcons';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Sobre mí.
 *
 * Cinco paneles apilados por scroll (`ScrollStack`): cada uno se fija y el
 * siguiente se le monta encima. Toda la página habla de una sola persona —
 * no hay grilla de proyectos ni capturas: para eso están /proyectos y
 * /habilidades.
 *
 *   1. Quién soy    — retrato, nombre, dos párrafos en primera persona.
 *   2. Qué hago     — tres cosas concretas, con la segunda foto al lado.
 *   3. Herramientas — el stack favorito, con el color real de cada marca.
 *   4. Certificados — tarjetas cuadradas con el logo grande.
 *   5. Formación y contacto.
 *
 * Cada panel está pensado para caber en una pantalla, que es la condición
 * para que el apilado funcione: lo que sobresale de un `sticky` queda por
 * debajo del pliegue sin forma de llegar. Por eso los certificados van en
 * una fila que se arrastra y no en dos filas de grilla, y por eso las fotos
 * tienen un ancho máximo en lugar de ocupar toda su columna.
 *
 * El stack sale de `techStackCore`, los certificados de `certificates` y las
 * cifras se calculan sobre `projects`.
 */

const QUE_HAGO = [
  {
    n: '01',
    title: 'APIs que aguantan',
    body: 'Modelo de datos, autenticación con JWT, roles y permisos. NestJS o Node sobre PostgreSQL, con las validaciones puestas antes de que lleguen los datos raros.',
  },
  {
    n: '02',
    title: 'Interfaces que se entienden',
    body: 'React y TypeScript. Me importa más que un formulario diga por qué falló a que tenga una animación de más.',
  },
  {
    n: '03',
    title: 'Y lo pongo en producción',
    body: 'Render, Vercel, Neon. Un proyecto no está terminado hasta que alguien que no soy yo lo puede usar desde su teléfono.',
  },
];

/**
 * Etiqueta de sección. Toma el color de primer plano del panel, así que se
 * lee negra sobre los paneles blancos y clara sobre los negros sin que el
 * marcado cambie.
 */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-[var(--fg)]" />
      <span className="t-label text-[var(--fg)]">{children}</span>
    </span>
  );
}

export default function About() {
  const completed = projects.filter((p) => p.status === 'completed').length;
  const realClients = projects.filter((p) => p.realClient).length;
  const school = education[0];

  return (
    <>
      <SEO title={`Sobre mí — ${profile.fullName}`} description={profile.shortAbout} />

      <div className="pt-24 pb-32 md:pt-28 md:pb-40">
        <ScrollStack>
          {/* ── 1. Quién soy ─────────────────────────────────────── */}
          <PanelBody>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.08)}
              className="grid items-center gap-10 md:grid-cols-12 md:gap-14"
            >
              <motion.div variants={fadeUp} className="order-1 md:order-2 md:col-span-5">
                <Photo3D
                  src="/images/retrato.jpg"
                  alt={profile.fullName}
                  width={900}
                  height={1199}
                  badge={profile.location}
                  priority
                  className="mx-auto w-full max-w-[24rem]"
                />
              </motion.div>

              <div className="order-2 md:order-1 md:col-span-7">
                <motion.div variants={fadeUp}>
                  <Eyebrow>Sobre mí</Eyebrow>
                </motion.div>

                <motion.h1 variants={fadeUp} className="t-display mt-6 text-[var(--fg)]">
                  Elías
                  <span className="block text-[var(--fg-mute)]">Cárdenas.</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="t-lead mt-8 max-w-xl text-[var(--fg-dim)]"
                >
                  Tengo {completed} proyectos terminados y {realClients} de ellos están corriendo
                  para empresas reales: un portal de alquileres, la web de una cafetería, la de
                  un catering. Estudio Diseño y Desarrollo de Software en TECSUP
                  {school?.period ? ` (${school.period})` : ''} y programo desde antes de entrar.
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="t-body mt-5 max-w-xl text-[var(--fg-mute)]"
                >
                  Trabajo de atrás hacia adelante. Primero el modelo de datos, la autenticación
                  y los permisos, y recién cuando eso aguanta, la interfaz. No es una preferencia
                  estética: una UI bonita sobre un backend flojo se cae sola a los dos meses.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
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
              </div>
            </motion.div>
          </PanelBody>

          {/* ── 2. Qué hago ──────────────────────────────────────── */}
          <PanelBody>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.07)}
              className="grid items-center gap-10 md:grid-cols-12 md:gap-14"
            >
              <motion.div variants={fadeUp} className="md:col-span-5">
                <Photo3D
                  src="/images/retrato-calle-2.jpg"
                  alt={`${profile.firstName} en Lima`}
                  width={880}
                  height={1100}
                  badge="Lima, 2026"
                  className="mx-auto w-full max-w-[22rem]"
                />
              </motion.div>

              <div className="md:col-span-7">
                <motion.div variants={fadeUp}>
                  <Eyebrow>Qué hago</Eyebrow>
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className="t-h2 mt-4 max-w-lg text-[var(--fg)]"
                >
                  Tres cosas, en este orden.
                </motion.h2>

                <ul className="mt-8 border-t border-[var(--line)]">
                  {QUE_HAGO.map((item) => (
                    <motion.li
                      key={item.n}
                      variants={fadeUp}
                      className="grid grid-cols-[auto_1fr] gap-5 border-b border-[var(--line)] py-5 sm:gap-8"
                    >
                      <span className="t-label pt-1 text-[var(--fg-mute)] tabular-nums">
                        {item.n}
                      </span>
                      <div>
                        <h3 className="t-h3 text-[var(--fg)]">{item.title}</h3>
                        <p className="t-body mt-2 max-w-lg text-[var(--fg-mute)]">
                          {item.body}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </PanelBody>

          {/* ── 3. Herramientas ──────────────────────────────────── */}
          <PanelBody>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.05)}
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
                <div>
                  <Eyebrow>Mis herramientas</Eyebrow>
                  <h2 className="t-h2 mt-4 max-w-xl text-[var(--fg)]">
                    El stack que elijo cuando puedo elegir.
                  </h2>
                </div>
                <span className="t-num hidden shrink-0 text-[var(--fg-mute)] md:block">
                  {String(techStackCore.length).padStart(2, '0')}
                </span>
              </motion.div>

              <motion.ul
                variants={staggerContainer(0.035)}
                className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4 lg:grid-cols-6"
              >
                {techStackCore.map((name) => {
                  const { icon: Icon, color } = getSkillIcon(name);
                  return (
                    <motion.li
                      key={name}
                      variants={fadeUp}
                      style={{ ['--brand' as string]: color }}
                      className="group flex flex-col items-center justify-center gap-3 bg-[var(--surf)] px-3 py-7 transition-colors duration-[var(--duration-quick)] hover:bg-[var(--surf-2)]"
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-7 text-[var(--fg-dim)] transition-[color,transform] duration-[var(--duration-normal)] ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:text-[var(--brand)]"
                      />
                      <span className="t-label text-center text-[var(--fg-mute)] transition-colors duration-[var(--duration-quick)] group-hover:text-[var(--fg)]">
                        {name}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.p variants={fadeUp} className="mt-6">
                <Link
                  to="/habilidades"
                  className="t-label inline-flex items-center gap-1.5 text-[var(--fg-mute)] transition-colors duration-[var(--duration-quick)] hover:text-[var(--fg)]"
                >
                  Ver todas las tecnologías
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
              </motion.p>
            </motion.div>
          </PanelBody>

          {/* ── 4. Certificados ──────────────────────────────────── */}
          <PanelBody>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.05)}
              className="mb-10"
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
                <div>
                  <Eyebrow>Certificaciones</Eyebrow>
                  <h2 className="t-h2 mt-4 max-w-xl text-[var(--fg)]">
                    Lo que estudié por fuera del instituto.
                  </h2>
                </div>
                <span className="t-num hidden shrink-0 text-[var(--fg-mute)] md:block">
                  {String(certificates.length).padStart(2, '0')}
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="t-label mt-5 text-[var(--fg-mute)]">
                Arrastrá para ver las {certificates.length}
              </motion.p>
            </motion.div>

            <CertificateRail items={certificates} />
          </PanelBody>

          {/* ── 5. Formación y contacto ──────────────────────────── */}
          <PanelBody>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.07)}
            >
              {school ? (
                <>
                  <motion.div variants={fadeUp}>
                    <Eyebrow>Formación</Eyebrow>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="mt-6 grid gap-3 border-b border-[var(--line)] pb-10 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
                  >
                    <div>
                      <h2 className="t-h3 text-[var(--fg)]">{school.institution}</h2>
                      {school.description ? (
                        <p className="t-body mt-2 text-[var(--fg-mute)]">
                          {school.description}
                        </p>
                      ) : null}
                    </div>
                    <span className="t-num text-[var(--fg-dim)] tabular-nums">
                      {school.period}
                    </span>
                  </motion.div>
                </>
              ) : null}

              <motion.h2
                variants={fadeUp}
                className="t-h1 mt-14 max-w-2xl text-[var(--fg)]"
              >
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
                <Button href={`mailto:${profile.email}`} external variant="secondary">
                  <FiMail aria-hidden="true" /> {profile.email}
                </Button>
              </motion.div>
            </motion.div>
          </PanelBody>
        </ScrollStack>
      </div>
    </>
  );
}
