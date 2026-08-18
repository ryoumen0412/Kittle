'use client';

import { useState, useEffect } from 'react';
import { Publication, Category, categoryLabels } from '@/lib/types';
import { generateSlug } from '@/lib/firebase-publications';

interface PublicationFormProps {
  publication?: Publication;
  onSubmit: (data: Omit<Publication, 'id'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const categories: Category[] = ['historia', 'cuento', 'novela', 'blog'];

export default function PublicationForm({
  publication,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel,
}: PublicationFormProps) {
  const [title, setTitle] = useState(publication?.title || '');
  const [slug, setSlug] = useState(publication?.slug || '');
  const [category, setCategory] = useState<Category>(publication?.category || 'historia');
  const [excerpt, setExcerpt] = useState(publication?.excerpt || '');
  const [author, setAuthor] = useState(publication?.author || '');
  const [autoSlug, setAutoSlug] = useState(!publication);

  useEffect(() => {
    if (autoSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, autoSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      slug,
      category,
      excerpt,
      content: publication?.content || '',
      author,
      readingTime: publication?.readingTime || 1,
      publishedAt: publication?.publishedAt || new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
        >
          Título de la obra
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-burdeo)] font-serif text-lg transition-colors"
          placeholder="Ej. El sonido de las ramas secas"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="slug"
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
          >
            Dirección URL (slug)
          </label>
          <label className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] cursor-pointer">
            <input
              type="checkbox"
              checked={autoSlug}
              onChange={(e) => setAutoSlug(e.target.checked)}
              className="accent-[var(--accent-burdeo)]"
            />
            Autogenerar desde el título
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
          className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-burdeo)] font-mono text-xs transition-colors"
          placeholder="el-sonido-de-las-ramas-secas"
          required
        />
        <p className="mt-1 text-[11px] text-[var(--text-muted)] font-mono">
          Enlace público: /publicacion/{slug || 'mi-obra'}
        </p>
      </div>

      {/* Category & Author Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
          >
            Categoría literaria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-burdeo)] text-sm transition-colors"
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
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
          >
            Firma de Autor
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-burdeo)] text-sm transition-colors"
            placeholder="Tu nombre o seudónimo"
            required
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label
          htmlFor="excerpt"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
        >
          Sinopsis o descripción breve (Excerpt)
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-burdeo)] text-sm transition-colors resize-none font-serif leading-relaxed"
          placeholder="Un fragmento o sinopsis que servirá como introducción y vista previa en el catálogo..."
          required
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--border-subtle)]">
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
          {isSubmitting
            ? 'Guardando...'
            : submitLabel || (publication ? 'Guardar cambios' : 'Continuar al Editor →')}
        </button>
      </div>
    </form>
  );
}
