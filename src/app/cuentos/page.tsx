'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getPublicationsByCategory } from '@/lib/firebase-publications';
import PublicationGrid from '@/components/PublicationGrid';

export default function CuentosPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPublicationsByCategory('cuento').then((pubs) => {
      setPublications(pubs);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="animate-fade-in py-12 md:py-16">
      <div className="container">
        <header className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--cat-cuento-bg)] text-[var(--cat-cuento)] text-xs font-mono mb-3">
            <span>Colección • Cuentos</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-primary)] mb-3">
            Cuentos Breves
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
            Ficciones concentradas, imágenes y destellos concebidos para ser leídos de una sola sentada.
          </p>
        </header>

        {isLoading ? (
          <div className="text-center py-16 text-xs text-[var(--text-muted)] font-mono">
            Cargando cuentos...
          </div>
        ) : (
          <PublicationGrid
            publications={publications}
            emptyMessage="No hay cuentos publicados por ahora."
          />
        )}
      </div>
    </div>
  );
}
