'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { Publication, categoryLabels } from '@/lib/types';
import { getPublications, deletePublicationById } from '@/lib/firebase-publications';

export default function AdminPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    const pubs = await getPublications();
    setPublications(pubs);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deletePublicationById(id);
      await loadPublications();
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setDeleteId(null);
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="animate-fade-in max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Manuscritos & Publicaciones
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
              {publications.length} {publications.length === 1 ? 'obra registrada' : 'obras registradas'}
            </p>
          </div>
          <Link href="/admin/nueva" className="btn-primary">
            + Nueva obra
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-[var(--text-muted)] font-mono text-xs">
            Cargando catálogo...
          </div>
        ) : publications.length === 0 ? (
          <div className="indie-card p-12 text-center max-w-md mx-auto">
            <h3 className="text-lg font-serif font-semibold text-[var(--text-primary)] mb-2">
              Sin publicaciones aún
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Comienza a redactar tu primera historia, cuento o ensayo.
            </p>
            <Link href="/admin/nueva" className="btn-primary">
              Comenzar a escribir
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="indie-card p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[var(--border-strong)] transition-all"
              >
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`badge badge-${pub.category}`}>
                      {categoryLabels[pub.category]}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {new Date(pub.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">•</span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {pub.readingTime} min
                    </span>
                  </div>
                  <h2 className="text-base md:text-lg font-serif font-bold text-[var(--text-primary)] mb-1 truncate">
                    {pub.title}
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                    {pub.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[var(--border-subtle)]">
                  <Link
                    href={`/publicacion/${pub.slug}`}
                    className="btn-ghost text-xs"
                    target="_blank"
                    title="Ver cómo la ven los lectores"
                  >
                    Ver ↗
                  </Link>
                  <Link
                    href={`/admin/editar/${pub.id}/editor`}
                    className="btn-primary text-xs py-1.5 px-3"
                    title="Escribir en el editor"
                  >
                    Editar contenido
                  </Link>
                  <Link
                    href={`/admin/editar/${pub.id}`}
                    className="btn-secondary text-xs py-1.5 px-3"
                    title="Modificar metadatos (título, categoría, etc.)"
                  >
                    Metadatos
                  </Link>
                  {deleteId === pub.id ? (
                    <div className="flex items-center gap-1.5 ml-2">
                      <button
                        onClick={() => handleDelete(pub.id)}
                        disabled={isDeleting}
                        className="px-2.5 py-1 text-xs rounded-md bg-[var(--accent-burdeo)] text-white hover:opacity-90 transition-opacity"
                      >
                        {isDeleting ? '...' : 'Confirmar'}
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="btn-ghost text-xs py-1"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(pub.id)}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-burdeo)] px-2 py-1 transition-colors"
                      title="Eliminar publicación"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
