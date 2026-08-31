import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Terminal que se escribe sola.
 *
 * Adaptada del componente original en cuatro puntos:
 *
 * 1. Se eliminó todo el sistema de audio — unas 150 líneas de mapas de
 *    sonido por tecla más un `AudioContext`. Pedía `/sounds/sound.ogg`, un
 *    archivo que no existe en el proyecto, así que abría un contexto de
 *    audio en cada visita para nada.
 * 2. Usaba la clase `no-visible-scrollbar`, que tampoco existe acá. La del
 *    proyecto se llama `hide-scrollbar`.
 * 3. Los colores salían de `neutral-*` sueltos. Ahora usa los tokens del
 *    sistema, así la terminal pertenece al sitio en vez de parecer pegada.
 * 4. Respeta `prefers-reduced-motion`: con esa preferencia el contenido
 *    aparece completo de una vez, sin tipeo.
 */

function useInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [inView, setInView] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && triggered.current)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          setInView(true);
          if (once) {
            triggered.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

type TokenType =
  | 'command'
  | 'flag'
  | 'string'
  | 'number'
  | 'operator'
  | 'path'
  | 'variable'
  | 'comment'
  | 'default';

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = [];
  const words = text.split(/(\s+)/);
  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: 'default', value: word });
      continue;
    }
    if (word.startsWith('#')) {
      tokens.push({ type: 'comment', value: word });
      continue;
    }
    if (word.startsWith('$')) {
      tokens.push({ type: 'variable', value: word });
      isFirstWord = false;
      continue;
    }
    if (word.startsWith('-')) {
      tokens.push({ type: 'flag', value: word });
      isFirstWord = false;
      continue;
    }
    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: 'string', value: word });
      isFirstWord = false;
      continue;
    }
    if (/^\d+$/.test(word)) {
      tokens.push({ type: 'number', value: word });
      isFirstWord = false;
      continue;
    }
    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: 'operator', value: word });
      isFirstWord = true;
      continue;
    }
    if (word.includes('/') || word.startsWith('.') || word.startsWith('~')) {
      tokens.push({ type: 'path', value: word });
      isFirstWord = false;
      continue;
    }
    if (isFirstWord) {
      tokens.push({ type: 'command', value: word });
      isFirstWord = false;
      continue;
    }
    tokens.push({ type: 'default', value: word });
  }
  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  command: 'text-emerald-400',
  flag: 'text-sky-400',
  string: 'text-amber-300',
  number: 'text-violet-400',
  operator: 'text-rose-400',
  path: 'text-cyan-300',
  variable: 'text-pink-400',
  comment: 'text-[var(--color-muted)]',
  default: 'text-[var(--color-paper-dim)]',
};

function Highlighted({ text }: { text: string }) {
  return (
    <>
      {tokenizeBash(text).map((token, i) => (
        <span key={i} className={tokenColors[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
}

interface TerminalLine {
  type: 'command' | 'output';
  content: string;
}

export interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  username?: string;
  className?: string;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  initialDelay?: number;
}

export function Terminal({
  commands,
  outputs = {},
  username = 'elias',
  className,
  typingSpeed = 45,
  delayBetweenCommands = 900,
  initialDelay = 400,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outputIdx, setOutputIdx] = useState(-1);
  const [phase, setPhase] = useState<
    'idle' | 'typing' | 'executing' | 'outputting' | 'pausing' | 'done'
  >('idle');
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentCommand = commands[commandIdx] || '';
  const currentOutputs = useMemo(() => outputs[commandIdx] || [], [outputs, commandIdx]);
  const isLastCommand = commandIdx === commands.length - 1;

  // Arranque. Con movimiento reducido se vuelca todo de una vez.
  useEffect(() => {
    if (!inView || phase !== 'idle') return;

    if (reduced) {
      const all: TerminalLine[] = [];
      commands.forEach((command, i) => {
        all.push({ type: 'command', content: command });
        (outputs[i] || []).forEach((out) => all.push({ type: 'output', content: out }));
      });
      setLines(all);
      setPhase('done');
      return;
    }

    const t = setTimeout(() => setPhase('typing'), initialDelay);
    return () => clearTimeout(t);
  }, [inView, phase, initialDelay, reduced, commands, outputs]);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (charIdx < currentCommand.length) {
      const t = setTimeout(
        () => {
          setCurrentText(currentCommand.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        },
        typingSpeed + Math.random() * 30,
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('executing'), 120);
    return () => clearTimeout(t);
  }, [phase, charIdx, currentCommand, typingSpeed]);

  useEffect(() => {
    if (phase !== 'executing') return;
    setLines((prev) => [...prev, { type: 'command', content: currentCommand }]);
    setCurrentText('');
    if (currentOutputs.length > 0) {
      setOutputIdx(0);
      setPhase('outputting');
    } else {
      setPhase(isLastCommand ? 'done' : 'pausing');
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand]);

  useEffect(() => {
    if (phase !== 'outputting') return;
    if (outputIdx >= 0 && outputIdx < currentOutputs.length) {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, { type: 'output', content: currentOutputs[outputIdx] }]);
        setOutputIdx((i) => i + 1);
      }, 150);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase(isLastCommand ? 'done' : 'pausing'), 300);
    return () => clearTimeout(t);
  }, [phase, outputIdx, currentOutputs, isLastCommand]);

  useEffect(() => {
    if (phase !== 'pausing') return;
    const t = setTimeout(() => {
      setCharIdx(0);
      setOutputIdx(-1);
      setCommandIdx((c) => c + 1);
      setPhase('typing');
    }, delayBetweenCommands);
    return () => clearTimeout(t);
  }, [phase, delayBetweenCommands]);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, [reduced]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [lines, phase]);

  const prompt = (
    <span className="text-[var(--color-muted)]">
      <span className="text-sky-400">{username}</span>
      <span className="text-emerald-500">@</span>
      <span className="text-sky-400">macbook</span>
      <span className="text-[var(--color-muted)]">:</span>
      <span className="text-cyan-300">~</span>
      <span className="text-[var(--color-muted)]">$</span>{' '}
    </span>
  );

  return (
    <div ref={containerRef} className={cn('mx-auto w-full max-w-2xl font-mono text-xs', className)}>
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-ink-2)] shadow-[var(--shadow-raised)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="t-label truncate text-[var(--color-muted)]">{username} — bash</span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div ref={contentRef} className="hide-scrollbar h-80 overflow-y-auto p-4">
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed whitespace-pre-wrap">
              {line.type === 'command' ? (
                <span>
                  {prompt}
                  <Highlighted text={line.content} />
                </span>
              ) : (
                <span className="text-[var(--color-paper-dim)]">{line.content}</span>
              )}
            </div>
          ))}

          {phase === 'typing' && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <Highlighted text={currentText} />
              <span className="ml-0.5 inline-block h-4 w-2 bg-[var(--color-paper)] align-middle" />
            </div>
          )}

          {(phase === 'done' || phase === 'pausing' || phase === 'outputting') && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <span
                className={cn(
                  'inline-block h-4 w-2 bg-[var(--color-paper)] align-middle transition-opacity duration-100',
                  !cursorVisible && 'opacity-0',
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
