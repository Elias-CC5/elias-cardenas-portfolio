import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import SEO from '@/components/layout/SEO';
import Reveal from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { sendContactMessage } from '@/lib/api';
import { profile } from '@/data/portfolio';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiAlertCircle, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  function validate() {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Ingresa tu nombre completo';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Ingresa un correo válido';
    if (form.message.trim().length < 10) errs.message = 'Tu mensaje debe tener al menos 10 caracteres';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    const res = await sendContactMessage(form);

    if (res.success) {
      setStatus('success');
      setFeedback(res.message || '¡Mensaje enviado! Te responderé pronto.');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
      setFeedback(res.message || 'Algo salió mal. Intenta de nuevo.');
      if (res.errors) setErrors(res.errors);
    }
  }

  return (
    <>
      <SEO title={`Contacto — ${profile.fullName}`} description="Hablemos sobre tu próximo proyecto." />
      <PageHeader
        eyebrow="Hablemos"
        title="Contacto"
        description="¿Tienes un proyecto, una idea o simplemente quieres conectar? Escríbeme."
      />

      <section className="px-6 pb-28 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact info */}
          <div>
            <Reveal>
              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor-pointer
                  className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-bright)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent-bright)]">
                    <FiMail size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-muted)]">Correo</p>
                    <p className="font-medium text-[var(--color-paper)]">{profile.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  data-cursor-pointer
                  className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-bright)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent-bright)]">
                    <FiPhone size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-muted)]">Teléfono</p>
                    <p className="font-medium text-[var(--color-paper)]">{profile.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent-bright)]">
                    <FiMapPin size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-muted)]">Ubicación</p>
                    <p className="font-medium text-[var(--color-paper)]">{profile.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-6 flex gap-3">
              <a
                href="https://github.com/Elias-CC5"
                target="_blank"
                rel="noreferrer"
                data-cursor-pointer
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-paper-dim)] transition-all hover:border-[var(--color-accent-bright)] hover:text-[var(--color-accent-bright)]"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://linkedin.com/in/elias-salomon-cardenas"
                target="_blank"
                rel="noreferrer"
                data-cursor-pointer
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-paper-dim)] transition-all hover:border-[var(--color-accent-bright)] hover:text-[var(--color-accent-bright)]"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 md:p-9">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--color-paper)]">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre completo"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-paper)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent-bright)]"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--color-paper)]">
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@correo.com"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-paper)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent-bright)]"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--color-paper)]">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Cuéntame sobre tu proyecto..."
                  className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-paper)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent-bright)]"
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <MagneticButton variant="primary" className="w-full justify-center py-3.5">
                {status === 'loading' ? (
                  'Enviando...'
                ) : (
                  <>
                    Enviar mensaje <FiSend size={15} />
                  </>
                )}
              </MagneticButton>

              <AnimatePresence>
                {(status === 'success' || status === 'error') && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm ${
                      status === 'success' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {status === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
