'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Publication, categoryLabels } from '@/lib/types';
import { getPublicationBySlug } from '@/lib/firebase-publications';
import StarRating from '@/components/StarRating';
import Link from 'next/link';

export default function PublicationPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [publication, setPublication] = useState<Publication | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getPublicationBySlug(slug).then((pub) => {
            if (pub) {
                setPublication(pub);
            } else {
                setNotFound(true);
            }
            setIsLoading(false);
        });
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-[var(--text-muted)]">Cargando...</div>
            </div>
        );
    }

    if (notFound || !publication) {
        return (
            <div className="animate-fadeIn min-h-[60vh] flex items-center justify-center">
                <div className="container text-center">
                    <h1 className="text-6xl md:text-8xl font-serif font-bold gradient-text mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-serif text-[var(--text-primary)] mb-4">
                        No existe
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                        Quiza estuvo aca. Quiza nunca. Ya no importa.
                    </p>
                    <Link href="/" className="btn-primary">
                        Volver
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(publication.publishedAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const categoryRoutes: Record<string, string> = {
        historia: '/historias',
        cuento: '/cuentos',
        novela: '/novelas',
        blog: '/blog',
    };

    const backLink = categoryRoutes[publication.category] || '/';

    return (
        <div className="animate-fadeIn">
            <article className="py-8 md:py-12 lg:py-16">
                <div className="container max-w-4xl">
                    {/* Back Link */}
                    <Link
                        href={backLink}
                        className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors mb-8"
                    >
                        <svg
                            className="mr-2 w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Volver
                    </Link>

                    {/* Header */}
                    <header className="mb-8 md:mb-12">
                        <span className={`badge badge-${publication.category} mb-4`}>
                            {categoryLabels[publication.category]}
                        </span>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] mb-6 leading-tight">
                            {publication.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-6">
                            <span>{publication.author}</span>
                            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]"></span>
                            <span>{formattedDate}</span>
                            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]"></span>
                            <span>{publication.readingTime} min</span>
                        </div>

                        <p className="text-lg text-[var(--text-secondary)] leading-relaxed border-l-4 border-[var(--pink-neon)] pl-4">
                            {publication.excerpt}
                        </p>
                    </header>

                    {/* Content */}
                    <div className="card p-6 md:p-10 lg:p-12 mb-8 md:mb-12">
                        <div className="prose prose-lg prose-invert max-w-none">
                            {publication.content.split('\n\n').map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-[var(--text-secondary)] leading-relaxed mb-6"
                                >
                                    {paragraph.trim()}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Rating Section */}
                    <section className="card p-6 md:p-8">
                        <h2 className="text-xl font-serif font-semibold text-[var(--text-primary)] mb-4">
                            Puntuar
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6">
                            Si llegaste hasta aca, podes dejar una opinion.
                        </p>
                        <StarRating publicationId={publication.id} readonly={false} size="lg" showCount={true} />
                    </section>

                    {/* Navigation */}
                    <div className="mt-8 md:mt-12 pt-8 border-t border-[var(--navy-700)]">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <Link href={backLink} className="btn-secondary w-full sm:w-auto text-center">
                                Ver mas
                            </Link>
                            <Link href="/" className="btn-primary w-full sm:w-auto text-center">
                                Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
