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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] mb-6 font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-burdeo)]" />
            <span>Biblioteca y Bitácora Literaria</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] mb-6 leading-[1.15] tracking-tight">
            Escribir con pausa. <br className="hidden sm:inline" />
            <span className="italic font-normal text-[var(--text-secondary)]">Leer sin algoritmos.</span>
          </h1>

          <p className="text-base md:text-lg text-[var(--text-secondary)] font-serif max-w-xl mx-auto mb-8 leading-relaxed">
            Historias extensas, cuentos breves y reflexiones dispersas. Un espacio digital diseñado exclusivamente para el deleite de la lectura.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/historias" className="btn-primary">
              Explorar historias →
            </Link>
            <Link href="/acerca" className="btn-secondary">
              Sobre este espacio
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Read Section (If available) */}
      {featured && !isLoading && (
        <section className="py-12 md:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/40">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] font-mono">
                Lectura Destacada
              </span>
              <span className={`badge badge-${featured.category}`}>
                {featured.category}
              </span>
            </div>

            <div className="indie-card p-6 md:p-10 bg-[var(--bg-surface)] border-[var(--border-strong)]">
              <div className="max-w-3xl">
                <span className="text-xs text-[var(--text-muted)] font-mono block mb-2">
                  {new Date(featured.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  • {featured.readingTime} min de lectura
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)] mb-3">
                  <Link
                    href={`/publicacion/${featured.slug}`}
                    className="hover:text-[var(--accent-burdeo)] transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-sm md:text-base text-[var(--text-secondary)] font-serif leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-[var(--text-muted)]">
                    Por <strong className="text-[var(--text-primary)]">{featured.author}</strong>
                  </span>
                  <Link href={`/publicacion/${featured.slug}`} className="btn-primary text-xs py-1.5 px-3">
                    Comenzar a leer →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Bento Grid */}
      <section className="py-14 md:py-20 border-b border-[var(--border-subtle)]">
        <div className="container">
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] font-mono block mb-1">
              Colecciones
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Explorar por formato
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Historias - Burdeo */}
            <Link
              href="/historias"
              className="indie-card indie-card-interactive p-6 flex flex-col justify-between group hover:border-[var(--cat-historia)]"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[var(--cat-historia-bg)] border border-[var(--cat-historia-border)] flex items-center justify-center text-[var(--cat-historia)] mb-4 text-sm font-serif font-bold">
                  H
                </div>
                <h3 className="text-lg font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-historia)] transition-colors mb-1.5">
                  Historias
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Relatos estructurados, dramas y narraciones de largo aliento.
                </p>
              </div>
              <span className="mt-6 text-xs text-[var(--cat-historia)] font-medium inline-flex items-center gap-1">
                Ver historias →
              </span>
            </Link>

            {/* Cuentos - Cactus */}
            <Link
              href="/cuentos"
              className="indie-card indie-card-interactive p-6 flex flex-col justify-between group hover:border-[var(--cat-cuento)]"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[var(--cat-cuento-bg)] border border-[var(--cat-cuento-border)] flex items-center justify-center text-[var(--cat-cuento)] mb-4 text-sm font-serif font-bold">
                  C
                </div>
                <h3 className="text-lg font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-cuento)] transition-colors mb-1.5">
                  Cuentos
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Ficciones breves, estampas e instantes capturados.
                </p>
              </div>
              <span className="mt-6 text-xs text-[var(--cat-cuento)] font-medium inline-flex items-center gap-1">
                Ver cuentos →
              </span>
            </Link>

            {/* Novelas - Navy */}
            <Link
              href="/novelas"
              className="indie-card indie-card-interactive p-6 flex flex-col justify-between group hover:border-[var(--cat-novela)]"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[var(--cat-novela-bg)] border border-[var(--cat-novela-border)] flex items-center justify-center text-[var(--cat-novela)] mb-4 text-sm font-serif font-bold">
                  N
                </div>
                <h3 className="text-lg font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-novela)] transition-colors mb-1.5">
                  Novelas
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Obras mayores por entregas o capítulos continuos.
                </p>
              </div>
              <span className="mt-6 text-xs text-[var(--cat-novela)] font-medium inline-flex items-center gap-1">
                Ver novelas →
              </span>
            </Link>

            {/* Blog - Ochre */}
            <Link
              href="/blog"
              className="indie-card indie-card-interactive p-6 flex flex-col justify-between group hover:border-[var(--cat-blog)]"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[var(--cat-blog-bg)] border border-[var(--cat-blog-border)] flex items-center justify-center text-[var(--cat-blog)] mb-4 text-sm font-serif font-bold">
                  B
                </div>
                <h3 className="text-lg font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--cat-blog)] transition-colors mb-1.5">
                  Diario & Blog
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Apuntes sobre escritura, notas al margen y divagaciones.
                </p>
              </div>
              <span className="mt-6 text-xs text-[var(--cat-blog)] font-medium inline-flex items-center gap-1">
                Ver entradas →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Works Grid */}
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] font-mono block mb-1">
                Índice
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
                Últimas publicaciones
              </h2>
            </div>
            <Link
              href="/historias"
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-burdeo)] transition-colors font-mono hidden sm:inline-flex items-center gap-1"
            >
              Ver catálogo completo →
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-16 text-xs text-[var(--text-muted)] font-mono">
              Cargando obras...
            </div>
          ) : (
            <PublicationGrid
              publications={recents.length > 0 ? recents : publications}
              emptyMessage="Aún no hay obras publicadas."
            />
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link href="/historias" className="btn-secondary w-full">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
