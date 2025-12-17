import { Publication } from '@/lib/types';
import PublicationCard from './PublicationCard';

interface PublicationGridProps {
    publications: Publication[];
    emptyMessage?: string;
}

export default function PublicationGrid({
    publications,
    emptyMessage = 'No hay publicaciones disponibles.'
}: PublicationGridProps) {
    if (publications.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-lg text-[var(--text-muted)]">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {publications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
            ))}
        </div>
    );
}
