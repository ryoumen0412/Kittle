import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Acerca de Kittle — Manifiesto y Autor',
  description: 'El espacio, la filosofía y el autor detrás de Kittle.',
};

export default function AcercaPage() {
  return (
    <div className="animate-fade-in py-16 md:py-24">
      <div className="container max-w-3xl">
        {/* Header */}
        <header className="mb-12 pb-8 border-b border-[var(--border-subtle)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-burdeo)]" />
            <span className="font-medium">Manifiesto & Nota de Autor</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4 leading-tight">
            Sobre este rincón y quien lo escribe
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-serif leading-relaxed italic">
            Un espacio concebido para la lentitud en tiempos de inmediatez.
          </p>
        </header>

        {/* Story / Manifesto */}
        <div className="space-y-10 text-[var(--text-primary)] font-serif text-base sm:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
              El propósito
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Kittle nació de una necesidad elemental: tener un refugio digital sobrio y libre de distracciones donde verter ficciones, relatos y apuntes sin la presión del algoritmo, el recuento de visitas o la urgencia del feed infinito.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Aquí el texto es el protagonista. La tipografía, el aire entre los párrafos y la tranquilidad de una interfaz minimalista están pensadas para que cada historia se lea como quien abre un libro de tapa dura en una tarde tranquila.
            </p>
          </section>

          <section className="space-y-6 pt-8 border-t border-[var(--border-subtle)]">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
              Qué encontrarás aquí
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="indie-card p-6 border-l-4 border-l-[var(--accent-burdeo)] rounded-xl">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-burdeo)] mb-2">
                  Historias
                </h3>
                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  Narraciones con desarrollo amplio de personajes, conflicto y atmósfera.
                </p>
              </div>

              <div className="indie-card p-6 border-l-4 border-l-[var(--accent-cactus)] rounded-xl">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-cactus)] mb-2">
                  Cuentos
                </h3>
                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  Piezas concisas donde cada palabra cuenta. Para lecturas de cinco a diez minutos.
                </p>
              </div>

              <div className="indie-card p-6 border-l-4 border-l-[var(--accent-navy)] rounded-xl">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-navy)] mb-2">
                  Novelas
                </h3>
                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  Capítulos seriados y manuscritos extensos en constante evolución.
                </p>
              </div>

              <div className="indie-card p-6 border-l-4 border-l-[var(--accent-ochre)] rounded-xl">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--accent-ochre)] mb-2">
                  Diario & Blog
                </h3>
                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  Reflexiones sobre el proceso creativo, lecturas recomendadas y notas de viaje.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-[var(--border-subtle)] space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)]">
              Una experiencia de lectura a tu medida
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
              Cada lector tiene sus propios hábitos. Por eso, al entrar a cualquier lectura puedes elegir entre la lectura tradicional continua o el <strong>modo paginado estilo libro</strong>, cambiar el tamaño de letra, la tipografía y seleccionar ambientes cálidos como <em>Burdeo</em>, <em>Cactus</em>, o modos oscuros y claros con un solo toque.
            </p>
            <div className="pt-4">
              <Link href="/historias" className="btn-primary">
                Comenzar a explorar obras →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
