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
            // Redirect to editor to continue writing
            router.push(`/admin/editar/${id}/editor`);
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
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-[var(--arcade-cyan)] font-[family-name:var(--font-pixel)] text-sm flicker">
                        Cargando...
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (notFound) {
        return (
            <AdminLayout>
                <div className="card p-12 text-center max-w-md mx-auto">
                    <h2 className="text-base font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-red)] mb-4">
                        No existe
                    </h2>
                    <button onClick={handleCancel} className="btn-primary">
                        ◀ Volver
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="animate-fadeIn max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-base md:text-lg font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-cyan)] neon-glow-cyan">
                        Editar Metadatos
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-2">
                        Paso 1: Actualiza los datos básicos
                    </p>

                    {/* Quick link to editor */}
                    {publication && (
                        <Link
                            href={`/admin/editar/${id}/editor`}
                            className="inline-block mt-3 text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-magenta)] hover:text-[var(--arcade-cyan)] transition-colors"
                        >
                            ▶ Ir al editor de contenido
                        </Link>
                    )}
                </div>

                <div className="card p-6 md:p-8">
                    {publication && (
                        <PublicationForm
                            publication={publication}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            isSubmitting={isSubmitting}
                            submitLabel="Guardar y continuar ▶"
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
