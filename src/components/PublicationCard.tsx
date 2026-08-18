import Link from 'next/link';
import { Publication, categoryLabels } from '@/lib/types';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const formattedDate = new Date(publication.publishedAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="indie-card indie-card-interactive p-6 flex flex-col h-full group">
      {/* Category Badge & Date */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`badge badge-${publication.category}`}>
          {categoryLabels[publication.category]}
        </span>
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          {formattedDate}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-serif font-bold text-[var(--text-primary)] mb-2.5 leading-snug group-hover:text-[var(--accent-burdeo)] transition-colors">
        <Link href={`/publicacion/${publication.slug}`} className="line-clamp-2">
          {publication.title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p className="text-xs md:text-sm text-[var(--text-secondary)] font-serif leading-relaxed mb-5 flex-grow line-clamp-3">
        {publication.excerpt}
      </p>

      {/* Card Footer: Reading time & author */}
      <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="truncate">
          Por <strong className="font-medium text-[var(--text-secondary)]">{publication.author}</strong>
        </span>
        <span className="font-mono text-[11px] flex-shrink-0">
          {publication.readingTime} min
        </span>
      </div>
    </article>
  );
}
