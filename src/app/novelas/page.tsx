'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getPublicationsByCategory } from '@/lib/firebase-publications';
import PublicationGrid from '@/components/PublicationGrid';

export default function NovelasPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPublicationsByCategory('novela').then((pubs) => {
            setPublications(pubs);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="animate-fadeIn">
            <section className="py-12 md:py-16">
                <div className="container">
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-pixel)] uppercase text-[#b388ff] mb-4" style={{ textShadow: '0 0 10px #b388ff' }}>
                            Novelas
                        </h1>
                        <p className="text-base text-[var(--text-secondary)] max-w-2xl">
                            Proyectos largos. Algunos terminados, otros en progreso. La mayoría abandonados.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12 text-[var(--arcade-cyan)] font-[family-name:var(--font-pixel)] text-sm flicker">
                            Cargando...
                        </div>
                    ) : (
                        <PublicationGrid
                            publications={publications}
                            emptyMessage="No hay novelas. Sorpresa."
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
