'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getRecentPublications } from '@/lib/firebase-publications';
import PublicationGrid from '@/components/PublicationGrid';
import Link from 'next/link';

export default function Home() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecentPublications(6).then((pubs) => {
      setPublications(pubs);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] mb-6">
            Escribo cosas.{' '}
            <span className="gradient-text">A veces las publico.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Historias, cuentos, novelas. Algunas terminadas, otras no.
            Lee si quieres. O no. El mundo sigue girando.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/historias" className="btn-primary">
              Ver historias
            </Link>
            <Link href="/acerca" className="btn-secondary">
              Quien soy
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Lo mas reciente
            </h2>
            <Link
              href="/historias"
              className="text-sm font-medium text-[var(--pink-neon)] hover:text-[var(--orange-neon)] transition-colors hidden sm:inline-flex items-center"
            >
              Todo
              <svg
                className="ml-1 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-[var(--text-muted)]">
              Cargando...
            </div>
          ) : (
            <PublicationGrid publications={publications} />
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link href="/historias" className="btn-secondary">
              Ver todo
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)] text-center mb-8 md:mb-12">
            Por si te interesa clasificar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/historias" className="card group p-6 text-center hover:border-[var(--pink-neon)]">
              <h3 className="text-xl font-serif font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--pink-neon)] transition-colors">
                Historias
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Relatos cortos
              </p>
            </Link>

            <Link href="/cuentos" className="card group p-6 text-center hover:border-[var(--orange-neon)]">
              <h3 className="text-xl font-serif font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--orange-neon)] transition-colors">
                Cuentos
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Narrativas breves
              </p>
            </Link>

            <Link href="/novelas" className="card group p-6 text-center hover:border-[#8a7ab0]">
              <h3 className="text-xl font-serif font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[#8a7ab0] transition-colors">
                Novelas
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Cosas largas
              </p>
            </Link>

            <Link href="/blog" className="card group p-6 text-center hover:border-[var(--text-secondary)]">
              <h3 className="text-xl font-serif font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--text-secondary)] transition-colors">
                Blog
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Divagaciones
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
