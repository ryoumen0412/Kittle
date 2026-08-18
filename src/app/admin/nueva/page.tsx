'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import PublicationForm from '@/components/PublicationForm';
import { Publication } from '@/lib/types';
import { createPublication } from '@/lib/firebase-publications';

export default function NewPublicationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Omit<Publication, 'id'>) => {
    setIsSubmitting(true);

    try {
      const id = await createPublication({
        ...data,
        content: '',
      });
      router.push(`/admin/editar/${id}/editor`);
    } catch (error) {
      console.error('Error creating publication:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin');
  };

  return (
    <AdminLayout>
      <div className="animate-fade-in max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider block mb-1">
            Paso 1 de 2 • Ficha Técnica
          </span>
          <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
            Nueva Obra o Entrada
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Configura los datos iniciales. Podrás redactar todo el texto en el editor en el siguiente paso.
          </p>
        </div>

        <div className="indie-card p-6 md:p-8">
          <PublicationForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel="Crear y pasar al editor →"
          />
        </div>
      </div>
    </AdminLayout>
  );
}
