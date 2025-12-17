'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/types';
import { getStoredPublicationsByCategory } from '@/lib/publications';
import PublicationGrid from '@/components/PublicationGrid';

export default function CuentosPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPublications(getStoredPublicationsByCategory('cuento'));
        setIsLoading(false);
    }, []);

    return (
        <div className="animate-fadeIn">
            <section className="py-12 md:py-16">
                <div className="container">
                    {/* Header */}
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4">
                            Cuentos
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                            Narrativas breves llenas de magia y fantasia. Pequenos mundos que
                            caben en pocas paginas pero que permanecen en la memoria para siempre.
                        </p>
                    </div>

                    {/* Publications Grid */}
                    {isLoading ? (
                        <div className="text-center py-12 text-[var(--text-muted)]">
                            Cargando cuentos...
                        </div>
                    ) : (
                        <PublicationGrid
                            publications={publications}
                            emptyMessage="No hay cuentos disponibles en este momento."
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
