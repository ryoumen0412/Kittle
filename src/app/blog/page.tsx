'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getPublicationsByCategory } from '@/lib/firebase-publications';
import PublicationGrid from '@/components/PublicationGrid';

export default function BlogPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPublicationsByCategory('blog').then((pubs) => {
      setPublications(pubs);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="animate-fade-in py-12 md:py-16">
      <div className="container">
        <header className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--cat-blog-bg)] text-[var(--cat-blog)] text-xs font-mono mb-3">
            <span>Bitácora • Diario & Blog</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-primary)] mb-3">
            Diario de Escritura & Notas
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
            Reflexiones al margen sobre el oficio, lecturas comentadas, procesos creativos y apuntes de vida.
          </p>
        </header>

        {isLoading ? (
          <div className="text-center py-16 text-xs text-[var(--text-muted)] font-mono">
            Cargando entradas...
          </div>
        ) : (
          <PublicationGrid
            publications={publications}
            emptyMessage="No hay apuntes en el blog por ahora."
          />
        )}
      </div>
    </div>
  );
}
