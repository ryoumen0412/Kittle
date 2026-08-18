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
    <article className="indie-card indie-card-interactive p-7 md:p-9 flex flex-col h-full group">
      {/* Top Meta: Category Badge & Published Date */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className={`badge badge-${publication.category}`}>
          {categoryLabels[publication.category]}
        </span>
        <time className="text-xs text-[var(--text-muted)]">
          {formattedDate}
        </time>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--text-primary)] mb-4 leading-snug group-hover:text-[var(--accent-burdeo)] transition-colors">
        <Link href={`/publicacion/${publication.slug}`} className="line-clamp-2">
          {publication.title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed mb-8 flex-grow line-clamp-3">
        {publication.excerpt}
      </p>

      {/* Footer Meta: Author & Reading Time */}
      <div className="mt-auto pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="truncate">
          Por <strong className="font-medium text-[var(--text-primary)]">{publication.author}</strong>
        </span>
        <span className="px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-medium text-[11px] flex-shrink-0">
          {publication.readingTime} min de lectura
        </span>
      </div>
    </article>
  );
}
