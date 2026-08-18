'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import PublicationForm from '@/components/PublicationForm';
import { Publication } from '@/lib/types';
import { getPublicationById, updatePublication } from '@/lib/firebase-publications';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPublicationPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPublicationById(id).then((pub) => {
      if (pub) {
        setPublication(pub);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [id]);

  const handleSubmit = async (data: Omit<Publication, 'id'>) => {
    setIsSubmitting(true);

    try {
      await updatePublication(id, data);
      router.push(`/admin/editar/${id}/editor`);
    } catch (error) {
      console.error('Error updating publication metadata:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent-burdeo)] animate-spin" />
          <span className="text-xs text-[var(--text-muted)] font-mono">Cargando ficha...</span>
        </div>
      </AdminLayout>
    );
  }

  if (notFound || !publication) {
    return (
      <AdminLayout>
        <div className="indie-card p-10 text-center max-w-md mx-auto">
          <h2 className="text-lg font-serif font-bold text-[var(--text-primary)] mb-3">
            Obra no encontrada
          </h2>
          <p className="text-xs text-[var(--text-muted)] mb-6">
            El identificador proporcionado no coincide con ningún registro.
          </p>
          <button onClick={handleCancel} className="btn-primary">
            Volver a manuscritos
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="animate-fade-in max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider block mb-1">
              Metadatos y Clasificación
            </span>
            <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
              Editar Ficha Técnica
            </h1>
          </div>

          <Link
            href={`/admin/editar/${id}/editor`}
            className="btn-secondary text-xs"
          >
            Ir al editor de texto →
          </Link>
        </div>

        <div className="indie-card p-6 md:p-8">
          <PublicationForm
            publication={publication}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel="Guardar metadatos y editar texto →"
          />
        </div>
      </div>
    </AdminLayout>
  );
}
