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
            await createPublication(data);
            router.push('/admin');
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
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
                        Nueva
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                        Escribir algo nuevo
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
