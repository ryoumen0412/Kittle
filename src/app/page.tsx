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

  const featured = publications[0];
  const recents = publications.slice(1);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-28 border-b border-[var(--border-subtle)]">
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-burdeo)]" />
            <span className="font-medium tracking-wide">Biblioteca & Bitácora Literaria</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--text-primary)] mb-6 leading-[1.12] tracking-tight">
            Escribir con pausa. <br />
            <span className="italic font-normal text-[var(--text-secondary)]">Leer sin algoritmos.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-serif max-w-xl mx-auto mb-10 leading-relaxed">
            Historias extensas, cuentos breves y reflexiones dispersas. Un espacio digital concebido para la lectura sosegada y el texto cuidado.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/historias" className="btn-primary">
              Explorar historias →
            </Link>
            <Link href="/acerca" className="btn-secondary">
              Sobre este espacio
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Read Section */}
      {featured && !isLoading && (
        <section className="py-16 md:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-burdeo)]" />
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                  Lectura Destacada
                </span>
              </div>
              <span className={`badge badge-${featured.category}`}>
                {featured.category}
              </span>
            </div>

            <div className="indie-card p-8 md:p-12 pt-10 md:pt-14 bg-[var(--bg-surface)] border-[var(--border-strong)] rounded-2xl relative overflow-hidden">
              {/* Subtle accent bar at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-burdeo)]" />

              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                  <span>
                    {new Date(featured.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>{featured.readingTime} min de lectura</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[var(--text-primary)] mb-4 leading-snug">
                  <Link
                    href={`/publicacion/${featured.slug}`}
                    className="hover:text-[var(--accent-burdeo)] transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-base sm:text-lg text-[var(--text-secondary)] font-serif leading-relaxed mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
                  <span className="text-sm text-[var(--text-muted)]">
                    Escrito por <strong className="text-[var(--text-primary)] font-medium">{featured.author}</strong>
                  </span>
                  <Link href={`/publicacion/${featured.slug}`} className="btn-primary">
                    Comenzar a leer →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Bento Grid */}
      <section className="py-16 md:py-24 border-b border-[var(--border-subtle)]">
        <div className="container">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] block mb-2">
              Colecciones
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[var(--text-primary)]">
              Explorar por formato
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Historias - Burdeo */}
            <Link
              href="/historias"
              className="indie-card indie-card-interactive p-7 flex flex-col justify-between group rounded-2xl border-t-4 border-t-[var(--accent-burdeo)] min-h-[200px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--cat-historia-bg)] border border-[var(--cat-historia-border)] flex items-center justify-center text-[var(--cat-historia)] mb-5 text-base font-serif font-bold">
                  H
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-historia)] transition-colors mb-2">
                  Historias
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Relatos estructurados, dramas y narraciones de largo aliento.
                </p>
              </div>
              <span className="mt-6 text-xs font-medium text-[var(--cat-historia)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver historias →
              </span>
            </Link>

            {/* Cuentos - Cactus */}
            <Link
              href="/cuentos"
              className="indie-card indie-card-interactive p-7 flex flex-col justify-between group rounded-2xl border-t-4 border-t-[var(--accent-cactus)] min-h-[200px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--cat-cuento-bg)] border border-[var(--cat-cuento-border)] flex items-center justify-center text-[var(--cat-cuento)] mb-5 text-base font-serif font-bold">
                  C
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-cuento)] transition-colors mb-2">
                  Cuentos
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Ficciones breves, estampas e instantes capturados para leer en minutos.
                </p>
              </div>
              <span className="mt-6 text-xs font-medium text-[var(--cat-cuento)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver cuentos →
              </span>
            </Link>

            {/* Novelas - Navy */}
            <Link
              href="/novelas"
              className="indie-card indie-card-interactive p-7 flex flex-col justify-between group rounded-2xl border-t-4 border-t-[var(--accent-navy)] min-h-[200px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--cat-novela-bg)] border border-[var(--cat-novela-border)] flex items-center justify-center text-[var(--cat-novela)] mb-5 text-base font-serif font-bold">
                  N
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-novela)] transition-colors mb-2">
                  Novelas
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Obras mayores por entregas o manuscritos por capítulos continuos.
                </p>
              </div>
              <span className="mt-6 text-xs font-medium text-[var(--cat-novela)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver novelas →
              </span>
            </Link>

            {/* Blog - Ochre */}
            <Link
              href="/blog"
              className="indie-card indie-card-interactive p-7 flex flex-col justify-between group rounded-2xl border-t-4 border-t-[var(--accent-ochre)] min-h-[200px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--cat-blog-bg)] border border-[var(--cat-blog-border)] flex items-center justify-center text-[var(--cat-blog)] mb-5 text-base font-serif font-bold">
                  B
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-blog)] transition-colors mb-2">
                  Diario & Blog
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Apuntes sobre escritura, notas al margen y divagaciones de paso.
                </p>
              </div>
              <span className="mt-6 text-xs font-medium text-[var(--cat-blog)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver entradas →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Works Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] block mb-1">
                Catálogo
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[var(--text-primary)]">
                Últimas publicaciones
              </h2>
            </div>
            <Link
              href="/historias"
              className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-burdeo)] transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              Ver catálogo completo →
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-sm text-[var(--text-muted)] font-serif italic">
              Cargando obras...
            </div>
          ) : (
            <PublicationGrid
              publications={recents.length > 0 ? recents : publications}
              emptyMessage="Aún no hay obras publicadas en el catálogo."
            />
          )}

          <div className="mt-12 text-center sm:hidden">
            <Link href="/historias" className="btn-secondary w-full">
              Ver catálogo completo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
