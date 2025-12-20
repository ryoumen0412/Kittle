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
            // Create publication as draft (with empty content)
            const id = await createPublication({
                ...data,
                content: '', // Empty content, will be filled in editor
            });
            // Redirect to editor page
            router.push(`/admin/editar/${id}/editor`);
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin');
    };

    return (
        <AdminLayout>
            <div className="animate-fadeIn max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-base md:text-lg font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-cyan)] neon-glow-cyan">
                        Nueva Publicación
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-2">
                        Paso 1: Completa los datos básicos
                    </p>
                </div>

                <div className="card p-6 md:p-8">
                    <PublicationForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
