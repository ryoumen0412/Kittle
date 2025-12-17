'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getStoredPublicationsByCategory } from '@/lib/publications';
import PublicationGrid from '@/components/PublicationGrid';

export default function HistoriasPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPublications(getStoredPublicationsByCategory('historia'));
        setIsLoading(false);
    }, []);

    return (
        <div className="animate-fadeIn">
            <section className="py-12 md:py-16">
                <div className="container">
                    {/* Header */}
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4">
                            Historias
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                            Relatos que capturan momentos y emociones. Cada historia es una ventana
                            a experiencias que resuenan con nuestra humanidad compartida.
                        </p>
                    </div>

                    {/* Publications Grid */}
                    {isLoading ? (
                        <div className="text-center py-12 text-[var(--text-muted)]">
                            Cargando historias...
                        </div>
                    ) : (
                        <PublicationGrid
                            publications={publications}
                            emptyMessage="No hay historias disponibles en este momento."
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
