'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { Publication, categoryLabels } from '@/lib/types';
import { getStoredPublications, deletePublication } from '@/lib/publications';

export default function AdminPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        loadPublications();
    }, []);

    const loadPublications = () => {
        const pubs = getStoredPublications();
        setPublications(pubs);
        setIsLoading(false);
    };

    const handleDelete = (id: string) => {
        if (deletePublication(id)) {
            loadPublications();
            setDeleteId(null);
        }
    };

    return (
        <AdminLayout>
            <div className="animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
                            Mis Publicaciones
                        </h1>
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                            {publications.length} publicaciones en total
                        </p>
                    </div>
                    <Link href="/admin/nueva" className="btn-primary">
                        Nueva Publicacion
                    </Link>
                </div>

                {/* Publications List */}
                {isLoading ? (
                    <div className="text-center py-12 text-[var(--text-muted)]">
                        Cargando publicaciones...
                    </div>
                ) : publications.length === 0 ? (
                    <div className="card p-12 text-center">
                        <h3 className="text-lg font-serif text-[var(--text-primary)] mb-2">
                            No hay publicaciones aun
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] mb-6">
                            Comienza creando tu primera historia
                        </p>
                        <Link href="/admin/nueva" className="btn-primary">
                            Crear publicacion
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {publications.map((pub) => (
                            <div
                                key={pub.id}
                                className="card p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`badge badge-${pub.category}`}>
                                            {categoryLabels[pub.category]}
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)]">
                                            {new Date(pub.publishedAt).toLocaleDateString('es-ES')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-serif font-medium text-[var(--text-primary)] mb-1">
                                        {pub.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)] line-clamp-1">
                                        {pub.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                                    <Link
                                        href={`/publicacion/${pub.slug}`}
                                        className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                        target="_blank"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        href={`/admin/editar/${pub.id}`}
                                        className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--pink-neon)] transition-colors"
                                    >
                                        Editar
                                    </Link>
                                    {deleteId === pub.id ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(pub.id)}
                                                className="px-3 py-2 text-sm text-[var(--pink-neon)] hover:text-white transition-colors"
                                            >
                                                Confirmar
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(null)}
                                                className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteId(pub.id)}
                                            className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
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
