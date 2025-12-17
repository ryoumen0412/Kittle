'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getStoredPublicationsByCategory } from '@/lib/publications';
import PublicationGrid from '@/components/PublicationGrid';

export default function NovelasPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPublications(getStoredPublicationsByCategory('novela'));
        setIsLoading(false);
    }, []);

    return (
        <div className="animate-fadeIn">
            <section className="py-12 md:py-16">
                <div className="container">
                    {/* Header */}
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4">
                            Novelas
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                            Aventuras extensas y mundos por descubrir. Historias que se desarrollan
                            capitulo tras capitulo, llevandote a lugares que solo existen en la imaginacion.
                        </p>
                    </div>

                    {/* Publications Grid */}
                    {isLoading ? (
                        <div className="text-center py-12 text-[var(--text-muted)]">
                            Cargando novelas...
                        </div>
                    ) : (
                        <PublicationGrid
                            publications={publications}
                            emptyMessage="No hay novelas disponibles en este momento."
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
