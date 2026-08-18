import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Acerca de Kittle — Manifiesto y Autor',
  description: 'El espacio, la filosofía y el autor detrás de Kittle.',
};

export default function AcercaPage() {
  return (
    <div className="animate-fade-in py-12 md:py-18">
      <div className="container max-w-3xl">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-[var(--border-subtle)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] font-mono mb-4">
            <span>Nota de Autor</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4 leading-tight">
            Sobre este rincón y quien lo escribe
          </h1>
          <p className="text-base text-[var(--text-secondary)] font-serif leading-relaxed italic">
            Un espacio concebido para la lentitud en tiempos de inmediatez.
          </p>
        </header>

        {/* Story / Manifesto */}
        <div className="space-y-8 text-[var(--text-primary)] font-serif text-base md:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--text-primary)]">
              El propósito
            </h2>
            <p className="text-[var(--text-secondary)]">
              Kittle nació de una necesidad elemental: tener un refugio digital sobrio y libre de distracciones donde verter ficciones, relatos y apuntes sin la presión del algoritmo, el recuento de visitas o la urgencia del feed infinito.
            </p>
            <p className="text-[var(--text-secondary)]">
              Aquí el texto es el protagonista. La tipografía, el aire entre los párrafos y la tranquilidad de una interfaz minimalista están pensadas para que cada historia se lea como quien abre un libro de tapa dura en una tarde tranquila.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--text-primary)]">
              Qué encontrarás aquí
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="indie-card p-5 border-l-3 border-l-[var(--accent-burdeo)]">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-burdeo)] mb-1">
                  Historias
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Narraciones con desarrollo amplio de personajes, conflicto y atmósfera.
                </p>
              </div>

              <div className="indie-card p-5 border-l-3 border-l-[var(--accent-cactus)]">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-cactus)] mb-1">
                  Cuentos
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Piezas concisas donde cada palabra cuenta. Para lecturas de cinco a diez minutos.
                </p>
              </div>

              <div className="indie-card p-5 border-l-3 border-l-[var(--accent-navy)]">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-navy)] mb-1">
                  Novelas
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Capítulos seriados y manuscritos extensos en constante evolución.
                </p>
              </div>

              <div className="indie-card p-5 border-l-3 border-l-[var(--accent-ochre)]">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-ochre)] mb-1">
                  Diario & Blog
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Reflexiones sobre el proceso creativo, lecturas recomendadas y notas de viaje.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--text-primary)] mb-3">
              Una experiencia a tu medida
            </h2>
            <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6">
              Cada lector tiene sus propios hábitos. Por eso, al entrar a cualquier lectura puedes elegir entre la lectura tradicional continua o el <strong>modo paginado estilo libro</strong>, cambiar el tamaño de letra, la tipografía y seleccionar ambientes cálidos como <em>Burdeo</em>, <em>Cactus</em>, o modos oscuros y claros con un solo toque.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/historias" className="btn-primary text-xs">
                Comenzar a explorar obras →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
