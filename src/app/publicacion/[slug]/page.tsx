'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Publication, categoryLabels } from '@/lib/types';
import { getPublicationBySlug } from '@/lib/firebase-publications';
import ReaderToolbar from '@/components/ReaderToolbar';
import PaginatedReader from '@/components/PaginatedReader';
import { useReaderPreferences } from '@/components/ReaderPreferencesProvider';
import Link from 'next/link';

export default function PublicationPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const {
    readingMode,
    fontSize,
    fontFamily,
    lineHeight,
    textAlign,
    contentWidth,
    isZenMode,
  } = useReaderPreferences();

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent-burdeo)] animate-spin" />
        <span className="text-xs text-[var(--text-muted)]">Abriendo manuscrito...</span>
      </div>
    );
  }

  if (notFound || !publication) {
    return (
      <div className="animate-fade-in min-h-[60vh] flex items-center justify-center py-20">
        <div className="container max-w-md text-center">
          <span className="text-4xl font-serif block mb-3 text-[var(--accent-burdeo)]">404</span>
          <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-3">
            Página no encontrada
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
            El texto que buscas no existe o ha sido trasladado a otro rincón.
          </p>
          <Link href="/" className="btn-primary">
            ← Volver al inicio
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

  const widthClasses = {
    narrow: 'max-w-[62ch]',
    medium: 'max-w-[74ch]',
    wide: 'max-w-[88ch]',
  }[contentWidth];

  const fontClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  }[fontFamily];

  const lineHeightValue = {
    normal: 1.6,
    relaxed: 1.85,
    loose: 2.1,
  }[lineHeight];

  return (
    <div className={`animate-fade-in ${isZenMode ? 'zen-active' : ''}`}>
      <article className="py-8 md:py-16">
        <div className="container max-w-4xl">
          {/* Top back navigation */}
          {!isZenMode && (
            <div className="mb-8">
              <Link
                href={backLink}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>Volver a {categoryLabels[publication.category]}</span>
              </Link>
            </div>
          )}

          {/* Reader Header */}
          <header className={`mb-10 ${isZenMode ? 'mt-4' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge badge-${publication.category}`}>
                {categoryLabels[publication.category]}
              </span>
              <span className="text-xs text-[var(--text-muted)]">•</span>
              <span className="text-xs text-[var(--text-muted)]">{formattedDate}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--text-primary)] leading-tight mb-6 tracking-tight">
              {publication.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span>Por</span>
                <strong className="text-[var(--text-primary)] font-semibold text-sm">{publication.author}</strong>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <span>⏱ {publication.readingTime} min de lectura estimada</span>
              </div>
            </div>

            {/* Excerpt / Lead */}
            {publication.excerpt && (
              <div className="mt-8 p-6 rounded-xl bg-[var(--bg-surface)] border-l-4 border-[var(--accent-burdeo)] shadow-xs">
                <p className="text-base sm:text-lg font-serif italic text-[var(--text-secondary)] leading-relaxed">
                  {publication.excerpt}
                </p>
              </div>
            )}
          </header>

          {/* Reader Toolbar */}
          <ReaderToolbar readingTimeMinutes={publication.readingTime} />

          {/* Reader Content Body */}
          {readingMode === 'paginated' ? (
            <div className="p-6 md:p-12 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-card my-8">
              <PaginatedReader content={publication.content} title={publication.title} />
            </div>
          ) : (
            <div className={`mx-auto w-full ${widthClasses} my-10`}>
              <div
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeightValue,
                  textAlign: textAlign === 'justify' ? 'justify' : 'left',
                }}
              >
                {publication.content.includes('<') ? (
                  <div
                    className={`reader-prose ${fontClass}`}
                    dangerouslySetInnerHTML={{ __html: publication.content }}
                  />
                ) : (
                  <div className={`reader-prose ${fontClass}`}>
                    {publication.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* End of Publication Footer */}
          {!isZenMode && (
            <footer className="mt-20 pt-8 border-t border-[var(--border-subtle)]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[var(--text-muted)]">
                  Publicado por <strong className="text-[var(--text-primary)]">{publication.author}</strong> en{' '}
                  <span className="capitalize font-medium text-[var(--text-secondary)]">{categoryLabels[publication.category]}</span>.
                </div>
                <div className="flex items-center gap-3">
                  <Link href={backLink} className="btn-secondary text-xs">
                    Ver más {categoryLabels[publication.category].toLowerCase()}
                  </Link>
                  <Link href="/" className="btn-primary text-xs">
                    Explorar todo →
                  </Link>
                </div>
              </div>
            </footer>
          )}
        </div>
      </article>
    </div>
  );
}
