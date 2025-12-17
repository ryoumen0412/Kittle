import Link from 'next/link';
import { Publication, categoryLabels } from '@/lib/types';
import StarRating from './StarRating';

interface PublicationCardProps {
    publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
    const formattedDate = new Date(publication.publishedAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="card p-6 flex flex-col h-full">
            {/* Category Badge */}
            <div className="mb-4">
                <span className={`badge badge-${publication.category}`}>
                    {categoryLabels[publication.category]}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-[var(--text-primary)] mb-3 line-clamp-2">
                <Link
                    href={`/publicacion/${publication.slug}`}
                    className="hover:text-[var(--pink-neon)] transition-colors"
                >
                    {publication.title}
                </Link>
            </h3>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
                <span>{formattedDate}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]"></span>
                <span>{publication.readingTime} min lectura</span>
            </div>

            {/* Excerpt */}
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                {publication.excerpt}
            </p>

            {/* Rating and Author */}
            <div className="mt-auto pt-4 border-t border-[var(--navy-700)]">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <StarRating publicationId={publication.id} readonly size="sm" showCount={true} />
                    <span className="text-xs text-[var(--text-muted)]">
                        Por {publication.author}
                    </span>
                </div>
            </div>

            {/* Read More Link */}
            <Link
                href={`/publicacion/${publication.slug}`}
                className="mt-4 inline-flex items-center text-sm font-medium text-[var(--pink-neon)] hover:text-[var(--orange-neon)] transition-colors"
            >
                Leer mas
                <svg
                    className="ml-1 w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </Link>
        </article>
    );
}
