import { Publication } from '@/lib/types';
import PublicationCard from './PublicationCard';

interface PublicationGridProps {
  publications: Publication[];
  emptyMessage?: string;
}

export default function PublicationGrid({
  publications,
  emptyMessage = 'No hay obras disponibles en esta sección por ahora.',
}: PublicationGridProps) {
  if (publications.length === 0) {
    return (
      <div className="indie-card p-12 text-center my-6">
        <p className="text-sm font-serif italic text-[var(--text-muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
