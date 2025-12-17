'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getPublicationsByCategory } from '@/lib/firebase-publications';
import PublicationGrid from '@/components/PublicationGrid';

export default function HistoriasPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPublicationsByCategory('historia').then((pubs) => {
            setPublications(pubs);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="animate-fadeIn">
            <section className="py-12 md:py-16">
                <div className="container">
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4">
                            Historias
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                            Relatos. A veces cortos, a veces no tanto.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12 text-[var(--text-muted)]">
                            Cargando...
                        </div>
                    ) : (
                        <PublicationGrid
                            publications={publications}
                            emptyMessage="No hay historias. Todavia."
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
