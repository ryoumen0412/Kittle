'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import PublicationForm from '@/components/PublicationForm';
import { Publication } from '@/lib/types';
import { getStoredPublications, updatePublication } from '@/lib/publications';

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
        const publications = getStoredPublications();
        const pub = publications.find((p) => p.id === id);

        if (pub) {
            setPublication(pub);
        } else {
            setNotFound(true);
        }
        setIsLoading(false);
    }, [id]);

    const handleSubmit = (data: Omit<Publication, 'id'>) => {
        setIsSubmitting(true);

        try {
            updatePublication(id, data);
            router.push('/admin');
        } catch (error) {
            console.error('Error updating publication:', error);
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin');
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="text-center py-12 text-[var(--text-muted)]">
                    Cargando publicacion...
                </div>
            </AdminLayout>
        );
    }

    if (notFound) {
        return (
            <AdminLayout>
                <div className="card p-12 text-center max-w-md mx-auto">
                    <h2 className="text-xl font-serif text-[var(--text-primary)] mb-2">
                        Publicacion no encontrada
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] mb-6">
                        La publicacion que intentas editar no existe
                    </p>
                    <button onClick={handleCancel} className="btn-primary">
                        Volver a publicaciones
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="animate-fadeIn max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
                        Editar Publicacion
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                        Modifica los detalles de tu publicacion
                    </p>
                </div>

                {/* Form */}
                <div className="card p-6 md:p-8">
                    {publication && (
                        <PublicationForm
                            publication={publication}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
