'use client';

import { Category, categoryLabels } from '@/lib/types';

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  showAll?: boolean;
}

const categories: (Category | 'all')[] = ['all', 'historia', 'cuento', 'novela', 'blog'];

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
  showAll = true,
}: CategoryFilterProps) {
  const filteredCategories = showAll ? categories : categories.filter((c) => c !== 'all');

  return (
    <div className="flex flex-wrap gap-2">
      {filteredCategories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              isActive
                ? 'bg-[var(--text-primary)] text-[var(--bg-base)] shadow-xs'
                : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
            }`}
          >
            {category === 'all' ? 'Todas las obras' : categoryLabels[category]}
          </button>
        );
      })}
    </div>
  );
}
