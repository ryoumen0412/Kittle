'use client';

import { useState, useEffect } from 'react';
import { Publication, Category, categoryLabels } from '@/lib/types';
import { generateSlug } from '@/lib/firebase-publications';

interface PublicationFormProps {
    publication?: Publication;
    onSubmit: (data: Omit<Publication, 'id'>) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

const categories: Category[] = ['historia', 'cuento', 'novela', 'blog'];

export default function PublicationForm({
    publication,
    onSubmit,
    onCancel,
    isSubmitting = false
}: PublicationFormProps) {
    const [title, setTitle] = useState(publication?.title || '');
    const [slug, setSlug] = useState(publication?.slug || '');
    const [category, setCategory] = useState<Category>(publication?.category || 'historia');
    const [excerpt, setExcerpt] = useState(publication?.excerpt || '');
    const [content, setContent] = useState(publication?.content || '');
    const [author, setAuthor] = useState(publication?.author || '');
    const [readingTime, setReadingTime] = useState(publication?.readingTime || 5);
    const [autoSlug, setAutoSlug] = useState(!publication);

    useEffect(() => {
        if (autoSlug && title) {
            setSlug(generateSlug(title));
        }
    }, [title, autoSlug]);

    // Calculate reading time based on content
    useEffect(() => {
        if (content) {
            const wordsPerMinute = 200;
            const words = content.trim().split(/\s+/).length;
            const time = Math.max(1, Math.ceil(words / wordsPerMinute));
            setReadingTime(time);
        }
    }, [content]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            title,
            slug,
            category,
            excerpt,
            content,
            author,
            readingTime,
            publishedAt: publication?.publishedAt || new Date().toISOString().split('T')[0],
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                >
                    Titulo
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--navy-800)] border border-[var(--navy-700)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-neon)] transition-colors"
                    placeholder="El titulo de tu publicacion"
                    required
                />
            </div>

            {/* Slug */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-[var(--text-secondary)]"
                    >
                        URL (slug)
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <input
                            type="checkbox"
                            checked={autoSlug}
                            onChange={(e) => setAutoSlug(e.target.checked)}
                            className="rounded border-[var(--navy-700)]"
                        />
                        Generar automaticamente
                    </label>
                </div>
                <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => {
                        setSlug(e.target.value);
                        setAutoSlug(false);
                    }}
                    className="w-full px-4 py-3 bg-[var(--navy-800)] border border-[var(--navy-700)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-neon)] transition-colors font-mono text-sm"
                    placeholder="url-de-la-publicacion"
                    required
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                    URL: /publicacion/{slug || 'mi-publicacion'}
                </p>
            </div>

            {/* Category & Author Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                    >
                        Categoria
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full px-4 py-3 bg-[var(--navy-800)] border border-[var(--navy-700)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-neon)] transition-colors"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {categoryLabels[cat]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Author */}
                <div>
                    <label
                        htmlFor="author"
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                    >
                        Autor
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full px-4 py-3 bg-[var(--navy-800)] border border-[var(--navy-700)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-neon)] transition-colors"
                        placeholder="Tu nombre"
                        required
                    />
                </div>
            </div>

            {/* Excerpt */}
            <div>
                <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                >
                    Extracto / Descripcion breve
                </label>
                <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--navy-800)] border border-[var(--navy-700)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-neon)] transition-colors resize-none"
                    placeholder="Un breve resumen que aparecera en las tarjetas de preview"
                    required
                />
            </div>

            {/* Content */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-[var(--text-secondary)]"
                    >
                        Contenido
                    </label>
                    <span className="text-xs text-[var(--text-muted)]">
                        Tiempo de lectura estimado: {readingTime} min
                    </span>
                </div>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="w-full px-4 py-3 bg-[var(--navy-800)] border border-[var(--navy-700)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-neon)] transition-colors resize-y font-mono text-sm leading-relaxed"
                    placeholder="Escribe tu historia aqui...

Separa los parrafos con lineas en blanco para mejor formato."
                    required
                />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-[var(--navy-700)]">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-secondary"
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : (publication ? 'Guardar cambios' : 'Publicar')}
                </button>
            </div>
        </form>
    );
}
