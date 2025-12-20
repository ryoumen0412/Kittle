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
                        <h1 className="text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-cyan)] mb-4 neon-glow-cyan">
                            Historias
                        </h1>
                        <p className="text-base text-[var(--text-secondary)] max-w-2xl">
                            Relatos. A veces cortos, a veces no tanto.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12 text-[var(--arcade-cyan)] font-[family-name:var(--font-pixel)] text-sm flicker">
                            Cargando...
                        </div>
                    ) : (
                        <PublicationGrid
                            publications={publications}
                            emptyMessage="No hay historias. Todavía."
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
