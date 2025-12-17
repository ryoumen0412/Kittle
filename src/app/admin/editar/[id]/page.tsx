'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import PublicationForm from '@/components/PublicationForm';
import { Publication } from '@/lib/types';
import { getPublications, updatePublication } from '@/lib/firebase-publications';

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
        getPublications().then((pubs) => {
            const pub = pubs.find((p) => p.id === id);
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
            router.push('/admin');
        } catch (error) {
            console.error('Error:', error);
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
                    Cargando...
                </div>
            </AdminLayout>
        );
    }

    if (notFound) {
        return (
            <AdminLayout>
                <div className="card p-12 text-center max-w-md mx-auto">
                    <h2 className="text-xl font-serif text-[var(--text-primary)] mb-2">
                        No existe
                    </h2>
                    <button onClick={handleCancel} className="btn-primary">
                        Volver
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="animate-fadeIn max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
                        Editar
                    </h1>
                </div>

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
