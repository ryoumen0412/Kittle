'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { Publication, categoryLabels } from '@/lib/types';
import { getPublicationById, updatePublication } from '@/lib/firebase-publications';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [publication, setPublication] = useState<Publication | null>(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [readingTime, setReadingTime] = useState(1);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  useEffect(() => {
    loadPublication();
  }, [id]);

  const loadPublication = async () => {
    const pub = await getPublicationById(id);
    if (pub) {
      setPublication(pub);
      setContent(pub.content || '');
      setReadingTime(pub.readingTime || 1);
    }
    setIsLoading(false);
  };

  const handleStatsChange = (stats: { wordCount: number; charCount: number; readingTimeMinutes: number }) => {
    setReadingTime(stats.readingTimeMinutes);
  };

  const handleSave = useCallback(
    async (publishAndExit: boolean = false) => {
      if (!publication) return;

      setIsSaving(true);
      try {
        await updatePublication(id, {
          ...publication,
          content,
          readingTime,
        });
        setLastSaved(new Date());

        if (publishAndExit) {
          router.push('/admin');
        }
      } catch (error) {
        console.error('Error saving publication:', error);
      } finally {
        setIsSaving(false);
      }
    },
    [publication, content, readingTime, id, router]
  );

  // Auto-save every 30 seconds if modified
  useEffect(() => {
    if (!content || !publication) return;

    const timer = setTimeout(() => {
      handleSave(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [content, publication, handleSave]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent-burdeo)] animate-spin" />
          <span className="text-xs text-[var(--text-muted)] font-mono">Cargando manuscrito...</span>
        </div>
      </AdminLayout>
    );
  }

  if (!publication) {
    return (
      <AdminLayout>
        <div className="indie-card p-12 text-center max-w-md mx-auto">
          <h2 className="text-lg font-serif font-bold text-[var(--text-primary)] mb-3">
            Obra no encontrada
          </h2>
          <Link href="/admin" className="btn-primary">
            Volver a manuscritos
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="animate-fade-in max-w-5xl mx-auto">
        {/* Editor Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/admin/editar/${id}`}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-mono"
              >
                ← Editar metadatos
              </Link>
              <span className="text-xs text-[var(--text-muted)]">•</span>
              <span className={`badge badge-${publication.category}`}>
                {categoryLabels[publication.category]}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[var(--text-primary)]">
              {publication.title}
            </h1>
          </div>

          {/* Right Status & Preview Controls */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Write vs Live Preview */}
            <div className="inline-flex rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-surface)]">
              <button
                type="button"
                onClick={() => setIsPreviewActive(false)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  !isPreviewActive
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                ✏️ Escribir
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewActive(true)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  isPreviewActive
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                👁️ Vista previa
              </button>
            </div>

            <div className="text-xs text-[var(--text-muted)] font-mono hidden sm:block">
              {isSaving ? (
                <span className="text-[var(--accent-burdeo)]">Guardando...</span>
              ) : lastSaved ? (
                <span>Guardado {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              ) : (
                <span>Listo</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isPreviewActive ? (
          <div className="indie-card p-6 md:p-12 mb-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 pb-6 border-b border-[var(--border-subtle)]">
                <span className={`badge badge-${publication.category} mb-3`}>
                  {categoryLabels[publication.category]}
                </span>
                <h1 className="text-3xl font-serif font-bold text-[var(--text-primary)] mb-2">
                  {publication.title}
                </h1>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  Por {publication.author} • {readingTime} min de lectura estimada
                </p>
                {publication.excerpt && (
                  <p className="mt-4 p-4 rounded-lg bg-[var(--bg-surface)] border-l-2 border-[var(--accent-burdeo)] font-serif italic text-sm text-[var(--text-secondary)]">
                    {publication.excerpt}
                  </p>
                )}
              </div>

              <div
                className="reader-prose font-serif"
                dangerouslySetInnerHTML={{ __html: content || '<p><em>El texto está vacío...</em></p>' }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Escribe aquí tu relato, cuento o artículo..."
              onStatsChange={handleStatsChange}
            />
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
          <Link
            href={`/publicacion/${publication.slug}`}
            target="_blank"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-mono transition-colors"
          >
            Abrir vista de lector ↗
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="btn-secondary text-xs"
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar borrador'}
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="btn-primary text-xs"
              disabled={isSaving}
            >
              {isSaving ? 'Publicando...' : 'Publicar y salir →'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
