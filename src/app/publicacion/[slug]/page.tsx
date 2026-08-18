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
        <span className="text-xs text-[var(--text-muted)] font-mono">Abriendo manuscrito...</span>
      </div>
    );
  }

  if (notFound || !publication) {
    return (
      <div className="animate-fade-in min-h-[60vh] flex items-center justify-center py-16">
        <div className="container max-w-md text-center">
          <span className="text-4xl font-serif block mb-3 text-[var(--accent-burdeo)]">404</span>
          <h1 className="text-xl font-serif font-semibold text-[var(--text-primary)] mb-3">
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
      <article className="py-8 md:py-14">
        <div className="container max-w-4xl">
          {/* Top back navigation (hidden in Zen mode) */}
          {!isZenMode && (
            <div className="mb-6">
              <Link
                href={backLink}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group font-mono"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                <span>Volver a {categoryLabels[publication.category]}</span>
              </Link>
            </div>
          )}

          {/* Reader Header */}
          <header className={`mb-8 ${isZenMode ? 'mt-4' : ''}`}>
            <div className="flex items-center gap-2.5 mb-4">
              <span className={`badge badge-${publication.category}`}>
                {categoryLabels[publication.category]}
              </span>
              <span className="text-xs text-[var(--text-muted)]">•</span>
              <span className="text-xs text-[var(--text-muted)] font-mono">{formattedDate}</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[var(--text-primary)] leading-tight mb-4 tracking-tight">
              {publication.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span>Por</span>
                <span className="font-semibold text-[var(--text-primary)]">{publication.author}</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-muted)] font-mono">
                <span>{publication.readingTime} min de lectura</span>
              </div>
            </div>

            {/* Excerpt / Lead */}
            {publication.excerpt && (
              <div className="mt-6 p-4 md:p-5 rounded-lg bg-[var(--bg-surface)] border-l-2 border-[var(--accent-burdeo)]">
                <p className="text-sm md:text-base font-serif italic text-[var(--text-secondary)] leading-relaxed">
                  {publication.excerpt}
                </p>
              </div>
            )}
          </header>

          {/* Reader Toolbar (Sticky controls & customization) */}
          <ReaderToolbar readingTimeMinutes={publication.readingTime} />

          {/* Reader Content Body */}
          {readingMode === 'paginated' ? (
            <div className="p-6 md:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-subtle my-6">
              <PaginatedReader content={publication.content} title={publication.title} />
            </div>
          ) : (
            <div className={`mx-auto w-full ${widthClasses} my-8`}>
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

          {/* End of Publication Footer & Navigation */}
          {!isZenMode && (
            <footer className="mt-16 pt-8 border-t border-[var(--border-subtle)]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[var(--text-muted)]">
                  Publicado por <strong className="text-[var(--text-primary)]">{publication.author}</strong> en{' '}
                  <span className="capitalize">{categoryLabels[publication.category]}</span>.
                </div>
                <div className="flex items-center gap-3">
                  <Link href={backLink} className="btn-secondary text-xs">
                    Ver más {categoryLabels[publication.category].toLowerCase()}
                  </Link>
                  <Link href="/" className="btn-primary text-xs">
                    Explorar todo
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
