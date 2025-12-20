'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { Publication } from '@/lib/types';
import { getPublicationById, updatePublication } from '@/lib/firebase-publications';
import Link from 'next/link';

export default function EditorPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [publication, setPublication] = useState<Publication | null>(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [readingTime, setReadingTime] = useState(1);

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

    // Calculate reading time from content
    useEffect(() => {
        if (content) {
            // Strip HTML tags for word count
            const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            const words = text.split(' ').filter(w => w.length > 0).length;
            const time = Math.max(1, Math.ceil(words / 200));
            setReadingTime(time);
        }
    }, [content]);

    const handleSave = useCallback(async (publish: boolean = false) => {
        if (!publication) return;

        setIsSaving(true);
        try {
            await updatePublication(id, {
                ...publication,
                content,
                readingTime,
            });
            setLastSaved(new Date());

            if (publish) {
                router.push('/admin');
            }
        } catch (error) {
            console.error('Error saving:', error);
        } finally {
            setIsSaving(false);
        }
    }, [publication, content, readingTime, id, router]);

    // Auto-save every 30 seconds
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
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-[var(--arcade-cyan)] font-[family-name:var(--font-pixel)] text-sm flicker">
                        Cargando...
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!publication) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <h1 className="text-lg font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-red)] mb-4">
                        No encontrado
                    </h1>
                    <Link href="/admin" className="btn-primary">
                        ◀ Volver
                    </Link>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="animate-fadeIn">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <Link
                            href={`/admin/editar/${id}`}
                            className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-muted)] hover:text-[var(--arcade-cyan)] transition-colors mb-2 inline-block"
                        >
                            ◀ Metadatos
                        </Link>
                        <h1 className="text-sm md:text-base font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-cyan)]">
                            {publication.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Status indicators */}
                        <div className="text-xs text-[var(--text-muted)]">
                            {isSaving ? (
                                <span className="text-[var(--arcade-yellow)]">Guardando...</span>
                            ) : lastSaved ? (
                                <span>Guardado: {lastSaved.toLocaleTimeString()}</span>
                            ) : null}
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                            ⏱ {readingTime} min lectura
                        </div>
                    </div>
                </div>

                {/* Editor */}
                <div className="mb-6">
                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                        placeholder="Empieza a escribir tu historia..."
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t-2 border-[var(--navy-700)]">
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/publicacion/${publication.slug}`}
                            target="_blank"
                            className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-muted)] hover:text-[var(--arcade-cyan)] transition-colors"
                        >
                            Vista previa ↗
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => handleSave(false)}
                            className="btn-secondary"
                            disabled={isSaving}
                        >
                            Guardar borrador
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSave(true)}
                            className="btn-primary"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Guardando...' : '▶ Publicar'}
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
